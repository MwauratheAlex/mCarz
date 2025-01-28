package main

import (
	"context"
	"fmt"
	"log"
	"path/filepath"
	"sync"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func main() {
	cld, err := cloudinary.New()
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file found")
	}

	dbClient := GetMongoClient()
	defer func() {
		if err := dbClient.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	collection := dbClient.Database("Carz").Collection("Vehicle")

	vehicles, err := ReadVehicles()
	if err != nil {
		log.Fatal("Error reading vehicles", err)
	}

	var wg sync.WaitGroup

	sellerID, err := bson.ObjectIDFromHex("6798e4228f1b194800ff704c")
	if err != nil {
		panic(err)
	}

	for _, vehicle := range vehicles {
		log.Println("uploading vehicle", vehicle.RegNumber)
		wg.Add(1)

		go func(vehicle Vehicle) {
			defer wg.Done()

			var imgWg sync.WaitGroup
			imgChan := make(chan string, len(vehicle.ImgUrls))
			errChan := make(chan error, len(vehicle.ImgUrls))

			for _, img := range vehicle.ImgUrls {
				imgWg.Add(1)

				go func() {
					defer imgWg.Done()
					imgPath := filepath.Join("images", img)
					uploadedUrl, err := uploadImage(cld, ctx, imgPath)
					if err != nil {
						errChan <- fmt.Errorf("Error uploading image %s: %v", imgPath, err)
						return
					}
					imgChan <- uploadedUrl
				}()
			}

			imgWg.Wait()
			close(imgChan)
			close(errChan)

			var updatedImgUrls []string
			for url := range imgChan {
				updatedImgUrls = append(updatedImgUrls, url)
			}

			for err := range errChan {
				log.Println(err)
			}

			vehicle.ImgUrls = updatedImgUrls
			vehicle.SellerID = sellerID

			err := UploadToMongo(collection, vehicle)
			if err != nil {
				log.Printf("Error inserting vehicle %s to mongo: %v\n", vehicle.RegNumber, err)
			} else {
				log.Printf("Vehicle '%s' uploaded to mongo.\n", vehicle.RegNumber)
			}
		}(vehicle)
	}

	wg.Wait()
	log.Println("All vehicles uploaded")
}

package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func GetMongoClient() *mongo.Client {
	uri := os.Getenv("DATABASE_URL")
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	return client
}

func UploadToMongo(collection *mongo.Collection, vehicle Vehicle) error {
	_, err := collection.InsertOne(context.Background(), vehicle)
	if err != nil {
		return fmt.Errorf("error inserting vehicle into mongo: %v", err)
	}
	return nil
}

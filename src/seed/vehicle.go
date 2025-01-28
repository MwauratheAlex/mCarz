package main

import (
	"encoding/json"
	"go.mongodb.org/mongo-driver/v2/bson"
	"os"
)

type Vehicle struct {
	RegNumber          string        `json:"regNumber" bson:"regNumber"`
	Make               string        `json:"make" bson:"make"`
	Model              string        `json:"model" bson:"model"`
	Color              string        `json:"color" bson:"color"`
	YearOfManufacture  int           `json:"yearOfManufacture" bson:"yearOfManufacture"`
	Mileage            int           `json:"mileage" bson:"mileage"`
	MileageUnits       string        `json:"mileageUnits" bson:"mileageUnits"`
	HasAccidentHistory bool          `json:"hasAccidentHistory" bson:"hasAccidentHistory"`
	AskingPrice        int           `json:"askingPrice" bson:"askingPrice"`
	Location           string        `json:"location" bson:"location"`
	ImgUrls            []string      `json:"imgUrls" bson:"imgUrls"`
	Verified           bool          `json:"verified" bson:"verified"`
	Transmission       string        `json:"transimission" bson:"transmission"`
	EngineSize         int           `json:"engine_size" bson:"engineSize"`
	HorsePower         int           `json:"horse_power" bson:"horsePower"`
	Description        string        `json:"description" bson:"description"`
	SellerID           bson.ObjectID `json:"-" bson:"sellerId,omitempty"`
}

func ReadVehicles() ([]Vehicle, error) {
	file, err := os.Open("car_data.json")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var vehicles []Vehicle

	err = json.NewDecoder(file).Decode(&vehicles)
	if err != nil {
		return nil, err
	}

	return vehicles, nil
}

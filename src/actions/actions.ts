"use server"

import { vehiclesPerPage } from "@/data/data";
import { db } from "@/db";
import { SellCarFormInput } from "@/types/types";
import { Vehicle } from "@prisma/client";

export async function CreateVehicle(formData: SellCarFormInput) {
    const vehicle = formData.carDetails
    const seller = formData.contactDetails

    if (!vehicle || !seller) {
        throw new Error("vehicle or Seller data is missing")
    }

    await db.vehicle.create({
        data: {
            regNumber: vehicle.regNumber,
            make: vehicle.make,
            model: vehicle.model,
            color: vehicle.color,
            yearOfManufacture: parseInt(vehicle.yearOfManufacture),
            mileage: parseInt(vehicle.mileage),
            mileageUnits: vehicle.mileageUnits,
            hasAccidentHistory: vehicle.hasAccidentHistory === "YES",
            askingPrice: parseInt(vehicle.askingPrice),
            location: vehicle.location,
            imgUrls: vehicle.imageUrls,
            verified: false,
            Seller: {
                create: {
                    firtname: seller.firstname,
                    lastname: seller.lastname,
                    email: seller.email,
                    phone: seller.phone,
                    preferedContactMethod: seller.preferedContactMethod,
                    verified: false,
                }
            },
            engineSize: 0,
            horsePower: 0,
            description: "",
            transmission: "",

        }

    })
}

export async function GetVehicles(searchParams?: {
    query?: string;
    brand?: string;
    minYear?: string;
    maxYear?: string;
    priceGte?: string;
    priceLte?: string
    page?: string;
}): Promise<Vehicle[]> {
    const page = Number(searchParams?.page) || 1
    const skip = (page - 1) * vehiclesPerPage;

    return await db.vehicle.findMany({
        where: {
            askingPrice: {
                ...(searchParams?.priceLte && { lte: Number(searchParams.priceLte) }),
                ...(searchParams?.priceGte && { gte: Number(searchParams.priceGte) }),
            },
            ...(searchParams?.brand && { make: { contains: searchParams.brand, mode: "insensitive" } }),
            yearOfManufacture: {
                ...(searchParams?.minYear && { gte: Number(searchParams.minYear) }),
                ...(searchParams?.maxYear && { lte: Number(searchParams.maxYear) }),
            },
        },
        take: vehiclesPerPage,
        skip: skip,
    });
}

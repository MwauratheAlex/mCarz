"use server"

import { vehiclesPerPage } from "@/data/data";
import { db } from "@/db";
import { SearchParams, SellCarFormInput } from "@/types/types";
import { Prisma, Vehicle } from "@prisma/client";

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

export async function getVehicles(searchParams?: SearchParams): Promise<Vehicle[]> {
    if (searchParams?.query && searchParams.query.length > 0) {
        return searchVehicles(searchParams.query, true)
    }

    const page = Number(searchParams?.page) || 1
    const skip = (page - 1) * vehiclesPerPage;

    return await db.vehicle.findMany({
        where: getFilterFromParams(searchParams),
        take: vehiclesPerPage,
        skip: skip,
    });
}

export async function searchVehicles(searchterm: string, takeAll?: boolean): Promise<Vehicle[]> {
    const searchWords = searchterm
        .split(/\s+/)
        .map(word => word.trim())
        .filter(word => word.length > 0);

    return await db.vehicle.findMany({
        where: {
            OR: searchWords.map(word => ({
                OR: [
                    { make: { contains: word, mode: "insensitive" } },
                    { model: { contains: word, mode: "insensitive" } },
                ],
            })),
        },
        ...(takeAll ? {} : { take: 5 }),
    })
}

export async function getVehiclePages(searchParams?: SearchParams): Promise<number> {
    const count = db.vehicle.count({
        where: getFilterFromParams(searchParams)
    });
    return Math.floor((await count) / vehiclesPerPage) + 1;
}

function getFilterFromParams(searchParams?: SearchParams): Prisma.VehicleWhereInput {
    return {
        askingPrice: {
            ...(searchParams?.priceLte && { lte: Number(searchParams.priceLte) }),
            ...(searchParams?.priceGte && { gte: Number(searchParams.priceGte) }),
        },
        ...(searchParams?.brand && { make: { contains: searchParams.brand, mode: "insensitive" } }),
        yearOfManufacture: {
            ...(searchParams?.minYear && { gte: Number(searchParams.minYear) }),
            ...(searchParams?.maxYear && { lte: Number(searchParams.maxYear) }),
        },
    }
}

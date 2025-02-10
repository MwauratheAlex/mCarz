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
    const page = Number(searchParams?.page) || 1
    const skip = (page - 1) * vehiclesPerPage;

    let sort: Prisma.VehicleOrderByWithRelationInput = {}
    if (searchParams?.sort === "asc" || searchParams?.sort === "desc") {
        sort = { askingPrice: searchParams.sort }
    }

    return (await db.vehicle.findMany({
        where: getFilterFromParams(searchParams),
        take: vehiclesPerPage,
        skip: skip,
        orderBy: sort,
        select: {
            id: true,
            imgUrls: true,
            yearOfManufacture: true,
            make: true,
            model: true,
            transmission: true,
            engineSize: true,
            horsePower: true,
            description: true,
            askingPrice: true,
            location: true,
            mileage: true,
            mileageUnits: true,
            color: true,
            hasAccidentHistory: true,
        }
    })) as Vehicle[];
}

export async function getVehicleById(vehicleID: string): Promise<Vehicle | null> {
    return await db.vehicle.findFirst({
        where: {
            id: vehicleID
        }
    });
}

export async function getSimilarVehicles(price: number, id: string): Promise<Vehicle[]> {
    const delta = 500000;

    return (await db.vehicle.findMany({
        where: {
            askingPrice: {
                gte: price - delta,
                lte: price + delta,
            },
            id: { not: id }
        },
        select: {
            id: true,
            imgUrls: true,
            yearOfManufacture: true,
            make: true,
            model: true,
            transmission: true,
            engineSize: true,
            horsePower: true,
            description: true,
            askingPrice: true,
        }
    })) as Vehicle[];
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
    const filter: Prisma.VehicleWhereInput = {
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

    if (searchParams?.query && searchParams.query.length > 0) {
        const searchWords = searchParams.query
            .split(/\s+/)
            .map(word => word.trim())
            .filter(word => word.length > 0);

        filter.OR = searchWords.map(word => ({
            OR: [
                { make: { contains: word, mode: "insensitive" } },
                { model: { contains: word, mode: "insensitive" } },
            ],
        }))
    }


    return filter;
}


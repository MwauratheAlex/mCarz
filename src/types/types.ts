import { z } from "zod";

type searchParam = string | null;

export type SearchParams = {
	query: searchParam;
	brand: searchParam;
	minYear: searchParam;
	maxYear: searchParam;
	priceGte: searchParam;
	priceLte: searchParam
	page: searchParam;
}

const contactDetails = z.object({
	firstname: z.string().min(1),
	lastname: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(10),
	preferedContactMethod: z.string().min(1),
})

const carDetails = z.object({
	regNumber: z.string().min(1),
	make: z.string().min(1),
	model: z.string().min(1),
	color: z.string().min(1),
	yearOfManufacture: z.string().min(4),
	mileage: z.string().min(1),
	mileageUnits: z.string().min(1),
	hasAccidentHistory: z.string().min(1),
	askingPrice: z.string().min(1),
	location: z.string().min(1),
	imageUrls: z.string().array().min(1)
});

export const SellCarFormDataSchema = z.object({
	carDetails: carDetails,
	contactDetails: contactDetails,
});

export type SellCarFormInput = z.infer<typeof SellCarFormDataSchema>

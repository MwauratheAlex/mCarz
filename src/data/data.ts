import audi from "@/../public/audi.svg"
import bmw from "@/../public/bmw.svg"
import mercedes from "@/../public/mercedes.svg"
import mazda from "@/../public/mazda.svg"
import toyota from "@/../public/toyota.svg"
import honda from "@/../public/honda.svg"
import land_rover from "@/../public/land_rover.svg"
import subaru from "@/../public/subaru.svg"
import lexus from "@/../public/lexus.svg"
import vw from "@/../public/VW.svg"
import nissan from "@/../public/nissan.svg"
import hyundai from "@/../public/hyundai.svg"


import suvs from "@/../public/suvs.svg"
import saloons from "@/../public/saloons.svg"
import hatchbacks from "@/../public/hatchbacks.svg"
import pickups from "@/../public/pickups.svg"
import convertibles from "@/../public/convertibles.svg"
import vans from "@/../public/vans.svg"

const brands = [
    { name: "audi", icon: audi },
    { name: "bmw", icon: bmw },
    { name: "mercedes", icon: mercedes },
    { name: "mazda", icon: mazda },
    { name: "Toyota", icon: toyota },
    { name: "honda", icon: honda },//
    { name: "land_rover", icon: land_rover },
    { name: "subaru", icon: subaru },
    { name: "lexus", icon: lexus },
    { name: "vw", icon: vw },
    { name: "nissan", icon: nissan },
    { name: "hyundai", icon: hyundai },
] as const

const bodyTypes = [
    { name: "Suvs", icon: suvs },
    { name: "Saloons", icon: saloons },
    { name: "Hatchbacks", icon: hatchbacks },
    { name: "Pickup", icon: pickups },
    { name: "Cabriolet/Convertibles", icon: convertibles },
    { name: "Vans", icon: vans },
] as const


const priceRanges = [
    { range: "0 - 500K" },
    { range: "500K - 1M" },
    { range: "1M - 2M" },
    { range: "2M - 3M" },
    { range: "3M - 5M" },
    { range: "5M - 10M" },
    { range: "Above 10M" },
] as const

const faqs = [
    {
        question: "Are cars brand new or used?",
        answer: "We offer both brand new and certified pre-owned vehicles to cater for various customer preferences."
    },
    {
        question: "Do you provide financing options?",
        answer: "Yes, we offer a variety of financing options through our trusted financial partners to help you purchase your desired car."
    },
    {
        question: "Can I trade in my old car?",
        answer: "Absolutely! You can trade in your current vehicle, and we'll provide a fair valuation based on its condition and market demand."
    },
    {
        question: "Is there a return policy for purchased vehicles?",
        answer: "Yes, we offer a 7-day return policy on selected vehicles, provided they meet our return criteria."
    },
    {
        question: "Do the used cars come with a warranty?",
        answer: "Yes, all certified pre-owned vehicles come with a limited warranty and have undergone a thorough inspection process."
    },
    {
        question: "Can I book a test drive before purchasing a car?",
        answer: "Yes, you can schedule a test drive by selecting a vehicle and contacting us to arrange a convenient time."
    },
    {
        question: "Are there any additional fees when buying a car?",
        answer: "Apart from the vehicle price, additional costs may include taxes, registration fees, and documentation charges."
    },
    {
        question: "How can I sell my car through your platform?",
        answer: "You can list your car for sale by creating an account, providing details about your vehicle, and uploading high-quality photos."
    },
    {
        question: "How do you ensure the quality of used cars?",
        answer: "All used cars listed on our platform undergo a comprehensive multi-point inspection and are certified for quality and safety."
    },
    {
        question: "Do you offer car insurance services?",
        answer: "Yes, we collaborate with leading insurance providers to offer competitive insurance packages for both new and used cars."
    },
    {
        question: "Is it possible to reserve a car online?",
        answer: "Yes, you can reserve a car online by making a refundable deposit, which ensures that the car remains unavailable to other buyers."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team via phone, email, or live chat for assistance with any inquiries or issues."
    },
    {
        question: "Are there special offers or discounts available?",
        answer: "Yes, we regularly provide special offers and discounts on various vehicles. Keep an eye on our promotions page for the latest deals."
    }
] as const;

const vehiclesPerPage = 14;


export { brands, bodyTypes, priceRanges, faqs, vehiclesPerPage }

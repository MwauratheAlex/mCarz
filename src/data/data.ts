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
    { name: "honda", icon: honda },
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

export { brands, bodyTypes, priceRanges }

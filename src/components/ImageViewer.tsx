"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CustomCarouselNext, CustomCarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, RefObject, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay"
import { FaExpand, FaPause } from "react-icons/fa6";
import { RiPlayLargeLine } from "react-icons/ri";
import { BiCollapse } from "react-icons/bi";
import { PiPlayBold } from "react-icons/pi";


export function ImageViewer({ imgUrls }: { imgUrls: string[] }) {
    const [autoplay, setAutoplay] = useState<boolean>(false)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleShowModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
            document.body.style.overflow = "hidden"
        }
    };

    return (
        <>
            <ImageViewerModal imgUrls={imgUrls} ref={modalRef} />
            <div className="relative">
                <ImageCorousel
                    imgUrls={imgUrls}
                    className="md:h-[50vh] h-60"
                    autoPlay={autoplay}
                />
                <button className="absolute bottom-2 left-2 daisy-btn daisy-btn-square
                daisy-btn-ghost bg-black/15 hover:bg-black/35 group"
                    onClick={() => setAutoplay(prev => !prev)}
                >
                    {autoplay ? (
                        <FaPause size={28} className="text-white group-hover:text-blue-500 
                    transition-colors duration-500"
                            style={{ stroke: "black", strokeWidth: 6 }}
                        />
                    ) : (
                        <PiPlayBold className="text-white group-hover:text-blue-500 
                    transition-colors duration-300 md:size-8 size-4"
                            style={{ stroke: "black", strokeWidth: 4 }}
                        />
                    )}
                </button>
                <button className="absolute bottom-2 right-2 daisy-btn daisy-btn-square
                daisy-btn-ghost bg-black/15  hover:bg-black/35 group transition-colors duration-300"
                    onClick={handleShowModal}
                >
                    <FaExpand className="text-white group-hover:text-blue-500 
                    transition-colors duration-300 md:size-8 size-4 stroke-custom"
                        style={{ stroke: "black", strokeWidth: 6 }}
                    />
                </button>
            </div>
        </>
    );
}

export function ImageCorousel({ imgUrls, className, zoomHover, autoPlay, bg, nextPrev }: {
    imgUrls: string[], className?: string, zoomHover?: boolean, bg?: string,
    autoPlay?: boolean, nextPrev?: ReactNode
}) {
    return (
        <div className="mx-auto relative w-full" >
            <Carousel plugins={autoPlay ? [Autoplay({ delay: 3000 }),] : []} className="w-full"
                opts={{ loop: true }}>
                <CarouselContent >
                    {imgUrls.map((url, index) => (
                        <CarouselItem key={index}>
                            <Card className={cn(bg, "border-none")}>
                                <CardContent className={cn(
                                    "flex items-center justify-center p-0 h-48 w-full relative",
                                    className,
                                )} >
                                    <Image
                                        src={url}
                                        alt="vehicle"
                                        className={cn(
                                            "object-cover transition-all duration-300",
                                            { "group-hover:scale-105": zoomHover }
                                        )}
                                        fill
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {nextPrev ? (nextPrev) : (
                    <>
                        <CarouselPrevious className="absolute left-2 top-1/2" />
                        <CarouselNext className="absolute right-2 top-1/2" />
                    </>
                )}
            </Carousel>
        </div >
    );
}

export function ImageViewerModal({ ref, imgUrls }: {
    ref: RefObject<HTMLDialogElement | null>,
    imgUrls: string[]
}) {

    const [autoplay, setAutoplay] = useState<boolean>(false)

    const closeModal = () => {
        if (ref.current) {
            document.body.style.overflow = "auto"
            ref.current.close();
        }
    }

    const SwipeToViewMore: ReactNode = (
        <div className="md:hidden text-sm text-center flex animate-bounce 
                    items-center gap-1 justify-center py-2">
            <span className="rotate-180 text-base text-gray-600">&rarr;</span>
            <span className="text-gray-400">Swipe to view more</span>
            <span className="text-base text-gray-600">&rarr;</span>
        </div>
    );

    return (
        <dialog className="daisy-modal bg-black flex items-center justify-center" ref={ref}>
            <div className="w-full">
                {SwipeToViewMore}
                <ImageCorousel
                    imgUrls={imgUrls}
                    className=" mx-auto
                   md:w-[80vw] md:h-[70vh] bg-black"
                    bg="bg-black"
                    autoPlay={autoplay}
                    nextPrev={<>
                        <CustomCarouselPrevious
                            className="hidden md:block absolute left-0 md:left-4 top-1/2 size-8 md:size-16" />
                        <CustomCarouselNext
                            className="hidden md:block absolute right-0 md:right-8 top-1/2 size-8 md:size-16" />
                    </>}
                />
            </div>

            <button className="absolute bottom-2 left-0 md:left-8 daisy-btn daisy-btn-square
        daisy-btn-ghost hover:bg-black/35 group text-gray-200 hover:text-blue-500 transition-colors duration-75"
                onClick={() => setAutoplay(prev => !prev)}
            >
                {autoplay ? (
                    <FaPause size={28} className="group-hover:scale-125
            transition-transform duration-300" />
                ) : (
                    <RiPlayLargeLine size={28} className="group-hover:scale-125
            duration-300" />
                )}
            </button>
            <button className="absolute bottom-2 right-4 md:right-8 daisy-btn daisy-btn-square
        daisy-btn-ghost bg-black/15  hover:bg-black/35 group text-gray-200 hover:text-blue-500 
                transition-colors duration-75"
                onClick={closeModal}
            >
                <BiCollapse size={28} className="duration-300 group-hover:scale-125"
                />
            </button>
        </dialog>
    );
}


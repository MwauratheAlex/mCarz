"use client"
import {
    CldImage, CldUploadButton, CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useCallback } from 'react';
import { TbPhotoPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FieldError, Merge } from 'react-hook-form';
import { cn } from '@/lib/utils';

const uploadPreset = "kbkegw6k";

export function ImageUpload({
    values,
    onChange,
    onDelete,
    error,
}: {
    values: string[],
    onChange(value: string): void
    onDelete(url: string): void
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined
}) {
    const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info !== "string") {
            onChange(result.info.secure_url)
        }
    }, [onChange])

    const isMaxReached = values?.length >= 3;

    return (
        <div>
            <div className="daisy-label">
                <span className="daisy-label-text text-base">
                    Photos
                    <span className='ml-4 text-neutral-500'>
                        (upto 3 max)
                    </span>
                </span>
                <span className="daisy-label-text-alt text-red-500 text-base">
                    *
                </span>
            </div>
            <CldUploadButton
                onSuccess={handleUpload}
                uploadPreset={uploadPreset}
                options={{ maxFiles: 3, }}
                className={cn('daisy-input-bordered w-full', isMaxReached && "cursor-not-allowed")}
            >
                <div
                    className={cn(
                        ' daisy-input daisy-input-bordered flex',
                        'justify-between items-center text-neutral-400',
                        error && 'border-red-500',
                    )}
                >
                    <div className='uppercase'>
                        Click to Upload {values.length > 1 && "more"}
                    </div>
                    <TbPhotoPlus size={25} />
                </div>
            </CldUploadButton>
            {values?.length > 0 && <ImageCorousel images={values} onDelete={onDelete} />}
        </div>
    );
}

function ImageCorousel({ images, onDelete }: {
    images: string[],
    onDelete: (url: string) => void
}) {
    return (
        <div className='border border-neutral-200 p-2 my-2 rounded-md flex
            gap-2'>
            {images.map((imgSrc, idx) => (
                <div className='h-52 w-52 relative' key={`courousel-img-${idx}`}>
                    <button className='daisy-btn z-[999] absolute top-1 right-1
                        daisy-btn-square daisy-btn-sm bg-opacity-60 daisy-btn-error border-none
                        shadow-xl hover:bg-opacity-70 rounded-md'
                        onClick={() => onDelete(imgSrc)}
                    >
                        <IoClose size={20} />
                    </button>
                    <CldImage
                        src={imgSrc}
                        alt='vehicle'
                        fill
                        className='aspect-square object-cover rounded-md'
                    />
                </div>
            ))}
        </div>
    );
}


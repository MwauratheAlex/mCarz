'use client'
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { cn } from "@/lib/utils";
import { useState } from "react"
import { useForm, SubmitHandler, UseFormRegisterReturn, FieldError } from "react-hook-form"

type CarDetailsInput = {
  regNumber: string
  make: string
  model: string
  color: string
  askingPrice: number
  location: string
}

type ContactDetailsInput = {
  name: string
  email: string
  phone: string
}

export default function SellCarPage() {
  const [carDetailsData, setCarDetailsData] = useState<CarDetailsInput | null>(null);

  const carDetailsSubmitHandler: SubmitHandler<CarDetailsInput> = (data) => {
    setCarDetailsData(data)
    setActiveStep("contact-details")
  }

  const contactDetailsSubmitHandler: SubmitHandler<ContactDetailsInput> = (data) => {
    console.log("car details")
    console.log(carDetailsData)
    console.log("user details")
    console.log(data)
    setActiveStep("car-details")
    // Upload data to db
  }


  const [activeStep, setActiveStep] = useState<string>("car-details");

  return (
    <div>
      <PaddingWrapper>
        <div className="flex relative flex-col md:flex-row md:gap-4">
          <div className="w-full md:w-1/3 py-4 ">
            <div className="flex flex-col gap-4 sticky top-32">
              <StepIndicator
                num={1}
                title="Car Details"
                subtitle="Tell us about your car"
                active={activeStep === "car-details"}
              />
              <StepIndicator
                num={2}
                title="Contact Details"
                subtitle="Tell us about yourself"
                active={activeStep === "contact-details"}
              />

            </div>
          </div>
          <div className="w-full md:w-2/3 py-4">
            {activeStep === "car-details" && (
              <CarDetailsForm onSubmit={carDetailsSubmitHandler} />
            )}
            {activeStep === "contact-details" && (
              <ContactDetailsForm onSubmit={contactDetailsSubmitHandler} />
            )}
          </div>
        </div>
      </PaddingWrapper>
    </div>
  );
}

function StepIndicator({ num, title, subtitle, active }: {
  num: number, title: string, subtitle: string, active?: boolean
}) {
  return (
    <div className={cn(
      "flex items-center border py-4 md:py-8 px-4 border-gray-400 rounded-lg gap-8",
      { "text-[#3b9c74] border-green-600": active }
    )}>
      <div className={cn(
        "w-12 h-12 flex items-center  text-white justify-center rounded-full text-lg",
        { "bg-[#3b9c74]": active },
        { "bg-gray-500": !active },
      )}>
        {num}
      </div>
      <div>
        <p className="text-xl font-semibold">{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function CarDetailsForm(props: { onSubmit: SubmitHandler<CarDetailsInput> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarDetailsInput>()

  return (
    <div className="p-4 rounded-lg shadow-black/20
               shadow-2xl">
      <p className="text-4xl font-semibold">Car Details</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(props.onSubmit)}>
        <TextInput
          title="Registration Number"
          placeholder="KYZ 555K"
          register={register("regNumber", { required: true })}
          error={errors.regNumber}
        />
        <TextInput
          title="Make"
          placeholder="BMW "
          register={register("make", { required: true })}
          error={errors.make}
        />
        <TextInput
          title="Model"
          placeholder="X6"
          register={register("model", { required: true })}
          error={errors.model}
        />
        <TextInput
          title="Color"
          placeholder="WHITE"
          register={register("color", { required: true })}
          error={errors.color}
        />
        <TextInput
          title="Asking Price (Ksh)"
          placeholder="500000"
          register={register("askingPrice", { required: true })}
          error={errors.askingPrice}
        />
        <TextInput
          title="Location"
          placeholder="KIAMBU"
          register={register("location", { required: true })}
          error={errors.location}
        />
        <button type="submit" className="daisy-btn bg-gray-800 text-gray-50
                hover:text-white hover:bg-gray-950">
          Next
        </button>
      </form>
    </div>
  );
}


function ContactDetailsForm(props: { onSubmit: SubmitHandler<ContactDetailsInput> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsInput>()

  return (
    <div className="p-4 rounded-lg shadow-black/20
               shadow-2xl">
      <p className="text-4xl font-semibold">Contact Details</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(props.onSubmit)}>
        <TextInput
          title="Name"
          placeholder="John Doe"
          register={register("name", { required: true })}
          error={errors.name}
        />
        <TextInput
          title="Email"
          placeholder="johndoe@mail.com"
          register={register("email", { required: true })}
          error={errors.email}
        />
        <TextInput
          title="Phone"
          placeholder="0700 000 000"
          register={register("phone", { required: true })}
          error={errors.phone}
        />
        <button type="submit" className="daisy-btn bg-gray-800 text-gray-50
                hover:text-white hover:bg-gray-950">
          Next
        </button>
      </form>
    </div>
  );
}

function TextInput({ title, placeholder, register, error }: {
  title: string,
  placeholder: string
  register: UseFormRegisterReturn,
  error?: FieldError
}) {
  return (
    <label className="daisy-form-control w-full">
      <div className="daisy-label">
        <span className="daisy-label-text text-base">{title}</span>
        <span className="daisy-label-text-alt text-red-500 text-base">*</span>

      </div>
      <input
        className={cn(
          "daisy-input daisy-input-bordered w-full uppercase",
          { "border-red-400 focus:outline-red-400": error }
        )}
        type="text"
        placeholder={placeholder}
        {...register}
      />
    </label>
  );
}

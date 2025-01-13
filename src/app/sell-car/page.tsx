'use client'
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react"
import { useForm, UseFormRegisterReturn, FieldError, UseFormRegister, FieldErrors, UseFormTrigger, UseFormWatch } from "react-hook-form"

type CarDetailsInput = {
  regNumber: string
  make: string
  model: string
  color: string
  yearOfManufacture: string
  mileage: string
  mileageUnits: string
  hasAccidentHistory: string
  askingPrice: string
  location: string
}

type ContactDetailsInput = {
  firstname: string
  lastname: string
  email: string
  phone: string
  preferedContactMethod: string
}


export default function SellCarPage() {
  const [activeStep, setActiveStep] = useState<string>("car-details");

  const { register, handleSubmit, formState, trigger, watch } = useForm<{
    carDetails: CarDetailsInput,
    contactDetails: ContactDetailsInput
  }>({
    defaultValues: {
      carDetails: {},
      contactDetails: {},
    },
  })

  const onSubmit = (data: {
    carDetails: CarDetailsInput, contactDetails: ContactDetailsInput
  }) => {
    console.log("submitted Data")
    console.log(data)
  }

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
          <div className="w-full md:w-2/3 md:py-4 pb-4">
            {activeStep === "car-details" && (
              <CarDetailsForm
                register={register}
                errors={formState.errors}
                onNext={() => setActiveStep("contact-details")}
                trigger={trigger}
                watch={watch}
              />
            )}
            {activeStep === "contact-details" && (
              <ContactDetailsForm
                register={register}
                errors={formState.errors}
                onBack={() => setActiveStep("car-details")}
                onSubmit={handleSubmit(onSubmit)}
                watch={watch}
              />
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

function CarDetailsForm({ register, errors, onNext, trigger, watch }: {
  register: UseFormRegister<{
    carDetails: CarDetailsInput,
    contactDetails: ContactDetailsInput,
  }>,
  errors?: FieldErrors<{ carDetails: CarDetailsInput }>,
  onNext: () => void,
  trigger: UseFormTrigger<{ carDetails: CarDetailsInput, contactDetails: ContactDetailsInput }>,
  watch: UseFormWatch<{ carDetails: CarDetailsInput, contactDetails: ContactDetailsInput }>
}) {

  const handleNext = async () => {
    const isValid = await trigger("carDetails", { shouldFocus: true });
    console.log(errors?.carDetails)
    if (isValid) {
      onNext();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const watchedFields = watch("carDetails")

  const manufactureYears = useMemo(() => {
    const years: number[] = []
    const startingYear = 1976
    const endingYear = new Date(Date.now()).getFullYear()

    for (let i = startingYear; i <= endingYear; ++i) {
      years.push(i)
    }

    return years
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-black/20
               shadow-2xl">
      <p className="text-4xl font-semibold">Car Details</p>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <TextInput
          title="Registration Number"
          placeholder="KYZ 555K"
          register={register("carDetails.regNumber", { required: true })}
          error={watchedFields.regNumber === "" ? errors?.carDetails?.regNumber : undefined}
        />
        <TextInput
          title="Make"
          placeholder="BMW "
          register={register("carDetails.make", { required: true })}
          error={watchedFields.make === "" ? errors?.carDetails?.make : undefined}
        />
        <TextInput
          title="Model"
          placeholder="X6"
          register={register("carDetails.model", { required: true })}
          error={watchedFields.model === "" ? errors?.carDetails?.model : undefined}
        />
        <TextInput
          title="Color"
          placeholder="WHITE"
          register={register("carDetails.color", { required: true })}
          error={watchedFields.color === "" ? errors?.carDetails?.color : undefined}
        />

        <SelectInput
          title="Year of Manufacture"
          values={manufactureYears}
          register={register("carDetails.yearOfManufacture", { required: true })}
          error={watchedFields.yearOfManufacture === "" ? errors?.carDetails?.yearOfManufacture : undefined}
        />

        <div className="flex gap-2 md:gap-4">
          <TextInput
            title="Mileage"
            placeholder="200000"
            type="number"
            register={register("carDetails.mileage", { required: true })}
            error={watchedFields.mileage === "" ? errors?.carDetails?.mileage : undefined}
          />
          <SelectInput
            title="Mileage Unit"
            values={["KM", "MILES"]}
            register={register("carDetails.mileageUnits", { required: true })}
            error={watchedFields.mileageUnits === "" ? errors?.carDetails?.mileageUnits : undefined}
          />
        </div>

        <SelectInput
          title="Has Accident History"
          values={["YES", "NO"]}
          register={register("carDetails.hasAccidentHistory", { required: true })}
          error={watchedFields.hasAccidentHistory === "" ? errors?.carDetails?.hasAccidentHistory : undefined}
        />

        <TextInput
          title="Asking Price (Ksh)"
          placeholder="500000"
          type="number"
          register={register("carDetails.askingPrice", { required: true })}
          error={watchedFields.askingPrice === "" ? errors?.carDetails?.askingPrice : undefined}
        />
        <TextInput
          title="Location"
          placeholder="KIAMBU"
          register={register("carDetails.location", { required: true })}
          error={watchedFields.location === "" ? errors?.carDetails?.location : undefined}
        />
        <button className="daisy-btn bg-gray-800 text-gray-50
                hover:text-white hover:bg-gray-950"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </form>
    </div>
  );
}


function ContactDetailsForm({ register, errors, onBack, onSubmit, watch }: {
  register: UseFormRegister<{
    carDetails: CarDetailsInput,
    contactDetails: ContactDetailsInput,
  }>,
  errors?: FieldErrors<{ contactDetails: ContactDetailsInput }>,
  watch: UseFormWatch<{ carDetails: CarDetailsInput, contactDetails: ContactDetailsInput }>
  onBack: () => void,
  onSubmit: () => void
}) {

  const watchedFields = watch("contactDetails")

  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  return (
    <div className="p-4 rounded-lg shadow-black/20
               shadow-2xl">
      <p className="text-4xl font-semibold">Contact Details</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextInput
          title="First Name"
          placeholder="John"
          register={register("contactDetails.firstname", { required: true })}
          error={watchedFields.firstname === "" ? errors?.contactDetails?.firstname : undefined}
        />
        <TextInput
          title="Last Name"
          placeholder="Doe"
          register={register("contactDetails.lastname", { required: true })}
          error={watchedFields.lastname === "" ? errors?.contactDetails?.lastname : undefined}
        />
        <TextInput
          title="Email"
          placeholder="johndoe@mail.com"
          register={register("contactDetails.email", { required: true })}
          error={watchedFields.email === "" ? errors?.contactDetails?.email : undefined}
        />
        <TextInput
          title="Phone"
          placeholder="0700 000 000"
          register={register("contactDetails.phone", { required: true })}
          error={watchedFields.phone === "" ? errors?.contactDetails?.phone : undefined}
        />
        <div className="form-control">
          <label className="daisy-label cursor-pointer flex justify-start gap-4">
            <input
              type="checkbox"
              className="daisy-checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(prev => !prev)}
            />
            <span className="daisy-label-text">
              By checking this label, I agree to the terms and conditions.
            </span>
          </label>
        </div>

        <div className="flex gap-8">
          <button type="button" className="daisy-btn  grow" onClick={onBack}>
            Prev
          </button>
          <button type="submit" className="daisy-btn grow bg-gray-800 text-gray-50
                hover:text-white hover:bg-gray-950">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function TextInput({ title, placeholder, type, register, error }: {
  title: string,
  placeholder: string
  register: UseFormRegisterReturn,
  error?: FieldError
  type?: string
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
        type={type ? type : "text"}
        placeholder={placeholder}
        {...register}
      />
    </label>
  );
}


function SelectInput({ title, values, register, error }: {
  title: string,
  values: string[] | number[],
  register: UseFormRegisterReturn,
  error?: FieldError,
}) {
  return (
    <label className="daisy-form-control w-full">
      <div className="daisy-label">
        <span className="daisy-label-text text-base">{title}</span>
        <span className="daisy-label-text-alt text-red-500 text-base">*</span>
      </div>
      <select
        className={cn(
          "daisy-select daisy-select-bordered",
          { "border-red-400 focus:outline-red-400": error }
        )}
        {...register}
      >
        <option value="">Select</option>
        {values.map((value, idx) => (
          <option key={`${idx}-select-${value}`}>
            {value}
          </option>
        ))}
      </select>
    </label>);
}

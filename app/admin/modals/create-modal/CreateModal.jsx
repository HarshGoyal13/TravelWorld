"use client"
import { useForm } from "react-hook-form"
import Input from '@/ui/Input'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./schema"
import Select from "@/ui/Select"
import { optionLocations, optionTypes } from "@/data/data"
import Button from "@/ui/Button"
import { toast } from "react-hot-toast"
import { createNewListing, postImages } from "./service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ModalLayout from "../../layout/ModalLayout"

const CreateModal = ({ handleHideModal }) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET
  const router = useRouter()
  const [images, setImages] = useState([])

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ data, imageUrls }) => createNewListing(data, imageUrls),
    mutationKey: ["listings"]
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      desc: "",
      beds: 5,
      hasFreeWifi: false,
      type: "luxury",
      location: "dubai",
      pricePerNight: 123
    }
  })

  useEffect(() => {
    if (Object.keys((errors)).length > 0) {
      Object.keys((errors)).map((key) => {
        toast.error(errors[key].message)
      })
    }
  }, [errors])

  const handleImage = (e) => {
    setImages((prev) => {
      return [...prev, e.target.files[0]]
    })
  }

  const uploadImage = async (image, idx) => {
    if (!image) return

    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)

    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const imageUrl = await postImages(CLOUD_NAME, formData)
      toast.success(`Successfully uploaded image ${idx + 1}`)
      toast.dismiss(toastId)

      return imageUrl
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data) => {
    if (!images?.length) return toast.error("You must publish an image!")

    const imageUrls = await Promise.all(images.map((image, idx) => {
      const imageUrl = uploadImage(image, idx)
      return imageUrl
    }))

    const newListing = await mutateAsync({ data, imageUrls })
    toast.success("Redirecting to listing...")
    router.push(`/details/${newListing.id}`)
  }

  return (
    <ModalLayout
      isCreating
      document="listing"
      handleHideModal={handleHideModal}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full px-4 py-6 flex flex-col items-center gap-8 overflow-y-auto max-h-[80vh]"
      >
        <Input
          type="text"
          className="text-slate-600 bg-gray-100 md:w-[250px] max-w-[400px] rounded-md p-3 shadow-sm border border-gray-300 outline-none focus:ring focus:ring-blue-200"
          register={register("name")}
          placeholder="Arabian Paradise"
        />
        <Input
          type="text"
          className="text-slate-600 bg-gray-100 md:w-[250px] max-w-[400px] rounded-md p-3 shadow-sm border border-gray-300 outline-none focus:ring focus:ring-blue-200"
          register={register("desc")}
          placeholder="This hotel is amazing. It has this view...."
        />
        <Select
          data={optionLocations}
          className="text-slate-600 bg-gray-100 md:w-[250px] max-w-[400px] rounded-md p-3 shadow-sm border border-gray-300 outline-none focus:ring focus:ring-blue-200"
          register={register("location")}
        />
        <Select
          data={optionTypes}
          className="text-slate-600 bg-gray-100 md:w-[250px] max-w-[400px] rounded-md p-3 shadow-sm border border-gray-300 outline-none focus:ring focus:ring-blue-200"
          register={register("type")}
        />
        <Input
          type="number"
          className="text-slate-600 bg-gray-100 md:w-[250px] max-w-[400px] rounded-md p-3 shadow-sm border border-gray-300 outline-none focus:ring focus:ring-blue-200"
          register={register("pricePerNight", { valueAsNumber: true })}
          step={0.01}
          placeholder="$249.00"
        />
        <div className="text-slate-600 md:w-[250px] max-w-[400px] flex items-center gap-4">
          <label htmlFor="freeWifi" className="font-medium">
            Free Wifi
          </label>
          <Input
            register={register("hasFreeWifi")}
            type="checkbox"
            id="freeWifi"
            className="w-4 h-4 rounded-md text-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="w-full max-w-[400px] flex flex-col items-start gap-2">
          <input
            onChange={handleImage}
            type="file"
            className="text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200"
            id="images"
            accept="image/*"
          />
        </div>
        <Button
          disabled={isLoading}
          className="w-full max-w-[400px] bg-blue-600 text-white px-4 py-2 rounded-md shadow-md disabled:bg-blue-300 hover:bg-blue-700 transition-colors duration-200"
          label="Submit"
        />
      </form>
    </ModalLayout>
  )
}

export default CreateModal

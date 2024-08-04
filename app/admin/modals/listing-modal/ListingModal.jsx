"use client";
import React, { useEffect, useState } from "react";
import ModalLayout from "../../layout/ModalLayout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListingById } from "@/app/(pages)/details/[id]/service";
import { updateListing } from "../../(pages)/listings/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { postImages } from "./service";

const ListingModal = ({ handleHideModal, listingId }) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const [images, setImages] = useState([]);
  const router = useRouter();

  const { data: listing } = useQuery({
    queryFn: () => getListingById(listingId),
    queryKey: ["admin", "listings", { listingId }],
  });

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({ listingId, body }) => updateListing({ listingId, body }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.forEach((key) => {
        toast.error(errors[key]?.message);
      });
    }
  }, [errors]);

  useEffect(() => {
    reset({ ...listing });
  }, [listing, reset]);

  const handleImage = (e) => {
    setImages((prev) => [...prev, e.target.files[0]]);
  };

  const uploadImage = async (image, idx) => {
    if (!image) return;

    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const imageUrl = await postImages(CLOUD_NAME, formData);
      toast.success(`Successfully uploaded image ${idx + 1}`);
      toast.dismiss(toastId);

      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const imageUrls = await Promise.all(images.map((image, idx) => uploadImage(image, idx)));

    const body = { ...data, imageUrls: imageUrls.length > 0 ? imageUrls : listing.imageUrls };

    const updatedListing = await mutateAsync({ listingId, body });
    toast.success("Redirecting to listing...");
    router.push(`/details/${updatedListing.id}`);
  };

  return (
    <ModalLayout document="listing" handleHideModal={handleHideModal}>
      <div className="relative max-w-lg max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            type="text"
            placeholder="Grand Hotel"
            register={register("name")}
          />
          <Input
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            type="text"
            placeholder="The hotel was great..."
            register={register("desc")}
          />
          <Select
            register={register("location")}
            data={optionLocations}
            className="w-full rounded-md h-[40px] border border-gray-300"
          />
          <Select
            register={register("type")}
            data={optionTypes}
            className="w-full rounded-md h-[40px] border border-gray-300"
          />
          <Input
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            type="number"
            placeholder="$249.00"
            register={register("pricePerNight", { valueAsNumber: true })}
            step={0.01}
          />
          <Input
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            type="number"
            register={register("beds", { valueAsNumber: true })}
          />
          <div className="flex items-center gap-2 text-gray-600">
            <label htmlFor="freeWifi" className="flex items-center">
              Free Wifi
              <input
                type="checkbox"
                className="ml-2 h-4 w-4"
                {...register("hasFreeWifi")}
                id="freeWifi"
              />
            </label>
          </div>

          <div className="w-full max-w-[400px] flex flex-col items-start gap-2">
            <input
              onChange={handleImage}
              type="file"
              className="text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200"
              id="images"
              style={{ display: "none" }}
              accept="image/*"
              multiple
            />
          </div>

          <Button
            disabled={isPendingMutation}
            label="Submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default ListingModal;

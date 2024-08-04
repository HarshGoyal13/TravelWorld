"use client";
import React, { useEffect, useState } from "react";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredListings } from "./service";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Card from "@/components/Best-Hotal/Card";
import { schema } from "./schmea";

const Catalog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const city = searchParams.get("city");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const type = searchParams.get("type");

  const {
    city: city_name,
    value,
    image,
  } = optionLocations.find((location) => location.value === city) || {};

  const defaultValues = {
    location: value,
    min_price,
    max_price,
    type,
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [isSearching, setIsSearching] = useState(false);

  const { data: listings, isLoading, isFetching } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ["listings", getValues()],
    enabled: isSearching, // Only fetch when searching
    staleTime: 10000, // Cache for 10 seconds
  });

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key]?.message);
      });
    }
  }, [errors]);

  const onSubmit = async (data) => {
    setIsSearching(true); // Trigger the search
    await getFilteredListings(data); // Fetch data

    queryClient.invalidateQueries(["listings"]);

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`;

    router.push(newUrl, { scroll: false });

    setIsSearching(false); // End the search
  };

  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full h-48 sm:h-3/5">
        <Image
          src={image}
          alt={`${city_name} Image`}
          className="brightness-50 h-[500px] w-full object-cover"
        />
        <h3 className="absolute text-2xl sm:text-4xl md:text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white">
          {city_name}
        </h3>
      </div>
      <div className="relative z-20 -mt-4 sm:-mt-8 md:-mt-12 h-full w-full flex flex-col items-center px-4 sm:px-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border md:w-[900px] sm:w-2/3 h-auto p-4 sm:p-8 md:p-12 border-slate-500 rounded-xl bg-blue-600 text-white flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6"
        >
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-xs sm:text-sm md:text-base text-[#efefef] font-semibold">
              City
            </h3>
            <Select
              register={register("location")}
              data={optionLocations}
              className="text-blue-800 p-2 rounded-xl outline-none capitalize"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-xs sm:text-sm md:text-base text-[#efefef] font-semibold">
              Price
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                register={register("min_price", { valueAsNumber: true })}
                type="number"
                placeholder="Min. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
              <Input
                register={register("max_price", { valueAsNumber: true })}
                type="number"
                placeholder="Max. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-xs sm:text-sm md:text-base text-[#efefef] font-semibold md:mt-[-25px]">
              Type of hotel
            </h3>
            <Select
              register={register("type")}
              data={optionTypes}
              className="text-blue-800 p-2 rounded-xl outline-none capitalize"
            />
          </div>
          <Button
            disabled={isFetching}
            label={isFetching ? "Searching..." : "Search"}
            className="mt-4 sm:mt-6 px-6 py-2 text-xs sm:text-sm md:text-base bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
          />
        </form>
        <div className="w-full mt-8 sm:mt-12 md:mt-30 flex flex-wrap justify-center items-center gap-4 px-4">
          {isLoading ? (
            <div className="w-full text-center py-4">
              <span className="text-lg sm:text-xl md:text-2xl text-slate-700">
                Loading...
              </span>
            </div>
          ) : listings?.length > 0 ? (
            listings.map((place, idx) => (
              <Card key={idx} place={place} />
            ))
          ) : (
            <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-slate-700">
              No listing with those filters
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;

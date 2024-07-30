"use client";

import { format } from 'currency-formatter';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { register } from 'swiper/element/bundle';
import { useQuery } from '@tanstack/react-query';
import { AiFillStar } from 'react-icons/ai';
import { FaBed, FaWifi } from 'react-icons/fa';
import BookModal from '@/components/Book-Modal/BookModal';
import { ClipLoader } from 'react-spinners';
import { getListingById } from './service';
import Reviews from './Reviews';

register();

const Details = (ctx) => {
    const id = ctx.params.id;
    const [showModal, setShowModal] = useState(false);
    const swiperElRef = useRef(null);

    const { data: listing, isPending } = useQuery({
        queryKey: ["listings", { id }],
        queryFn: () => getListingById(id)
    });

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    if (isPending) {
        const style = {
            marginTop: "5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100vh"
        };

        return (
            <div style={style}>
                <ClipLoader color={"#123abc"} />
            </div>
        );
    }

    return (
        <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
            {showModal && <BookModal handleHideModal={handleHideModal} listing={listing}/>}
            <div className="w-full max-w-screen-lg mx-auto px-4">
                <div className="w-full h-[300px] md:h-[750px] overflow-hidden mx-auto">
                    <swiper-container
                        ref={swiperElRef}
                        slides-per-view="1"
                        navigation="true"
                        className="h-full"
                    >
                        {listing?.imageUrls?.map((imageUrl) => (
                            <swiper-slide key={imageUrl}>
                                <Image
                                    className="h-[300px] md:h-[750px] w-full object-cover rounded-lg"
                                    height="750"
                                    width="750"
                                    src={imageUrl}
                                    blurDataURL={listing.blurredImage}
                                    placeholder="blur"
                                />
                            </swiper-slide>
                        ))}
                    </swiper-container>
                </div>
                <div className="mt-8 md:mt-12 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="font-bold text-2xl md:text-4xl">
                        {listing?.name}
                    </h2>
                    <div className="mt-4 md:mt-0">
                        <span className="p-2 px-4 text-xl md:text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2">
                            <AiFillStar color="white" />
                            <span className="text-white">
                                {listing.avgRating ? listing.avgRating : "0"}
                                </span>
                        </span>
                    </div>
                </div>
                <div className="mt-8 md:mt-16 px-4 md:px-6 flex flex-col md:flex-row gap-4 md:gap-8">
                    <span className="flex items-center gap-2">
                        <CiLocationOn /> {listing.location}
                    </span>
                    <span className="flex items-center gap-2">
                        {format(listing.pricePerNight, { locale: "en-US" })}/night
                    </span>
                    <span className="flex items-center gap-2">
                        {listing.beds} <FaBed />
                    </span>
                    {listing.hasFreeWifi &&
                        <span className="flex items-center gap-2">
                            Free <FaWifi />
                        </span>
                    }
                </div>
                <div className="mt-8 md:mt-16 px-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                    <p className="text-base md:text-xl max-w-full md:max-w-xl text-slate-700">
                        {listing.desc}
                    </p>
                    <button
                        onClick={handleShowModal}
                        className="mt-4 md:mt-0 cursor-pointer rounded-lg py-2 px-6 text-base md:text-xl text-white bg-blue-500"
                    >
                        Book
                    </button>
                </div>
                <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto">
                    <h1 className="mt-16 text-3xl font-bold">
                        Reviews
                    </h1>
                    <Reviews id={id} />
                </div>
            </div>
        </div>
    );
};

export default Details;

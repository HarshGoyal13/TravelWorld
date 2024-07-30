"use client";

import { format } from 'currency-formatter';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { HashLoader } from 'react-spinners';
import { redirectToCheckout } from './service';

const BookModal = ({ handelHideMOdal, listing }) => {
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState([
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 7))
    ]);

    const selectionRange = {
        startDate: dateRange[0],
        endDate: dateRange[1],
        key: "selection"
    };

    const calcDaysDiff = () => {
        const startDate = dateRange[0];
        const endDate = dateRange[1];

        if (startDate && endDate) {
            const result = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
            return result;
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        const daysDifference = calcDaysDiff();

        await redirectToCheckout(listing, startDate, endDate, daysDifference);

        setLoading(false);
    };

    return (
        <div className='fixed inset-0 z-30 flex items-center justify-center backdrop-blur bg-gray-800 bg-opacity-50'>
            <div className="bg-white w-full max-w-md mx-4 md:mx-0 md:max-w-lg h-auto md:h-[500px] rounded-lg shadow-lg relative p-4 md:p-6 overflow-y-auto">
                <div className="border-b border-gray-200 pb-2 md:pb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-2xl">Book your hotel</h3>
                    <AiOutlineClose size={24} className="cursor-pointer" onClick={handelHideMOdal} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 md:mt-5">
                    <h2 className="font-semibold text-lg md:text-xl">{listing.name}</h2>
                    <span className="text-gray-800 text-lg">{format(listing.price, { locale: "en-US" })}</span>
                </div>
                <form className="flex flex-col gap-4 my-3 md:my-4">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        disabledDates={listing?.reservations?.flatMap(({ reservedDates }) => reservedDates)}
                        minDate={new Date()}
                        onChange={({ selection }) => setDateRange([selection.startDate, selection.endDate])}
                        className="w-full"
                    />
                </form>
                <div className="border-t border-gray-200 pt-2 md:pt-3 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-gray-700 flex items-center gap-2 mb-3 md:mb-0">
                        <span>{format(listing.
pricePerNight, { locale: "en-US" })}</span>
                        <span>X</span>
                        <span>{calcDaysDiff()}</span>
                    </div>
                    <div className="text-gray-700">Total Price: {format((listing.
pricePerNight * calcDaysDiff()), { locale: "en-US" })}</div>
                </div>
                <div className="w-full flex items-center mt-4 md:mt-5">
                    <button
                        onClick={handlePayment}
                        className="w-full md:w-3/4 mx-auto cursor-pointer rounded-lg py-2 md:py-2 px-4 md:px-5 text-base md:text-lg text-white bg-blue-500 transition-all hover:bg-blue-600"
                    >
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <HashLoader size={25} color="#fff" />
                            </div>
                        ) : (
                            "Book"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookModal;

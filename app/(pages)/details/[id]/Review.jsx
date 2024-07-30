import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { format } from 'date-fns';

const Review = ({ review }) => {
    return (
        <div className="w-full flex flex-col md:flex-row gap-4 p-4 border-b border-gray-200">
            <div className="flex-1">
                <span className="text-slate-700 block mb-2">
                    {format(new Date(review.createdAt), "MMM do yyyy")}
                </span>
                <div className="text-slate-800">
                    • {review.text}
                </div>
            </div>
            <span className="mt-2 md:mt-0 md:ml-auto flex items-center gap-2">
                {review.stars}
                <AiFillStar size={22} color="rgb(59, 130, 246)" />
            </span>
        </div>
    );
};

export default Review;

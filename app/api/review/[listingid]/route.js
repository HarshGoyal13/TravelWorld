
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        console.log("Params:", params); // Log the params to debug
        const { listingid } = params;

        if (!listingid) {
            return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 });
        }

        const listing = await db.listing.findUnique({
            where: { id: listingid },
            include: { reviews: true }
        });

        if (!listing) {
            return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
        }

        const reviewsIds = listing.reviews.map(({ id }) => id);

        const reviews = await db.review.findMany({
            where: { id: { in: reviewsIds } },
            include: { user: true },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

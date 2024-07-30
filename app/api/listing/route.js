import { NextResponse } from "next/server";
import db from "@/lib/db";
import isAdminUser from "@/lib/isAdmin";



export async function GET(req){
        try {
            const listings = await db.listing.findMany({
                take: 10
            })
    
            return NextResponse.json(listings)

    }catch(error){
        console.error("Error in show listing:", error);
        return NextResponse.error({ message: "Internal Server Error" });
    }
    
}


export async function POST(req) {
    try {
        
        await isAdminUser()

        const body = await req.json();
        Object.values(body).forEach((v) => {
            if (v === "") return NextResponse.error({ message: "Fill all fields!" });
        });

        const {
            name,
            location,
            desc,
            type,
            pricePerNight,
            beds,
            hasFreeWifi,
            imageUrls
        } = body;

        if (!Array.isArray(imageUrls) || imageUrls.some(url => url === null)) {
            return NextResponse.error({ message: "Invalid image URLs" });
        }

        const newListing = await db.listing.create({
            data: {
                name,
                location,
                desc,
                type,
                pricePerNight,
                beds,
                hasFreeWifi,
                imageUrls
            }
        });

        return NextResponse.json(newListing);
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.error({ message: "Internal Server Error" });
    }
}
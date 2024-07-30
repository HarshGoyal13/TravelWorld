import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sortListings"
import { NextResponse } from "next/server";


export async function GET(req){
    try{

        const listing = await db.listing.findMany({
            include:{
                reviews:true
            }
        })

        const sortListings = calcAndSortListings(listing).slice(0,4)

        return NextResponse.json(sortListings)

    }catch(error){
        return NextResponse.error(error)
    }
}
import Stripe from 'stripe';
import { NextResponse } from 'next/server'; // Adjust the import according to your setup
import { getCurrentUser } from '@/lib/currentUser'; // Import your authentication function
import db from '@/lib/db'; // Import your database instance

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const { listing, startDate, endDate, daysDifference } = await req.json();
    const { name, pricePerNight, id: listingId } = listing;

    const stripeObj = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name,
          },
          unit_amount: pricePerNight * 100,
        },
        quantity: daysDifference,
      },
    ];

    // Extract protocol and host from request headers
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost';
    
    // Construct dynamic URLs
    const successUrl = `${protocol}://${host}/success-page`;
    const cancelUrl = `${protocol}://${host}/`;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error({ status: 401, body: "User not authenticated" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripeObj,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        startDate,
        endDate,
        listingId,
        pricePerNight,
        daysDifference,
        userId: currentUser.id,
        email: currentUser.email,
      },
    });

    console.log("Stripe Session Created:", session);

    try {
      const newReservation = await db.reservation.create({
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          chargeId: session.id, // Assuming you store the Stripe session id
          daysDifference,
          reservedDates: [], // Assuming reservedDates is handled differently or later
          listingId, // Ensure listingId matches the Listing's id in the database
          userId: currentUser.id,
        },
      });

      console.log("New Reservation Created:", newReservation);

      return NextResponse.json({ sessionId: session.id });
    } catch (dbError) {
      console.error("Error creating reservation in DB:", dbError);
      return NextResponse.error({ status: 500, body: "Error creating reservation" });
    }
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.error({ status: 500, body: "Error creating Stripe session" });
  }
}




export async function DELETE(req) {
  try {
      const { searchParams } = new URL(req.url)
      const chargeId = searchParams.get("charge_id")
      const reservationId = searchParams.get("reservation_id")

      const refundedPayment = await stripe.refunds.create({
          charge: chargeId
      })

      console.log(refundedPayment)
      if(refundedPayment.status !== "succeeded"){
          return NextResponse.error({
             error: "Can't cancel the reservation with an id of " + reservationId
          })
      }

      return NextResponse.json({message: "Successfully cancelled the reservation"})
  } catch (error) {
      return NextResponse.error(error)
  }
}
import Hero from "@/components/Hero/Hero";
import PopularLocations from "@/components/Popular-Locations/PopularLOcations";
import BestHotel from "@/components/Best-Hotal/BestHotal";
import sea from "../public/assets/sea.jpg";
import hotel_image from "../public/assets/hr_10.jpg";

export default function Home() {
  return (
    <>
      <Hero
        image={sea}
        mainHeader="Are you ready for an Adventure?"
        secondryHeader="Browse through the popular locations."
      />
      <PopularLocations />
      <Hero
        image={hotel_image}
        mainHeader="Get the best offer for your Hotel!"
        secondryHeader="Pick your desired place."
      />
      <BestHotel />
    </>
  );
}

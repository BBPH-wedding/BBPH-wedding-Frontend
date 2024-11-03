import Navbar from "@/components/Navbar";
import Calendar from "@/sections/calendar/page";
import Hero from "@/sections/hero/page";
import History from "@/sections/history/page";
import Itinerary from "@/sections/itinerary/page";
import Travel from "@/sections/travel/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <History />
      <Calendar />
      <Itinerary/>
      <Travel/>
    </>
  );
}

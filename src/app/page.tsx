import Navbar from "@/components/Navbar";
import Calendar from "@/sections/calendar/page";
import Hero from "@/sections/hero/page";
import History from "@/sections/history/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <History />
      <Calendar />
    </>
  );
}

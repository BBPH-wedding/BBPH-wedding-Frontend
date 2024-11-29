"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Calendar from "@/sections/calendar/page";
import FAQs from "@/sections/faqs/page";
import Gallery from "@/sections/gallery/page";
import Hero from "@/sections/hero/page";
import History from "@/sections/history/page";
import Hotel from "@/sections/hotel/page";
import Itinerary from "@/sections/itinerary/page";
import Login from "@/sections/login/page";
import Note from "@/sections/note gifts/page";
import RSVP from "@/sections/RSVP/page";
import ToDos from "@/sections/to-do's/page";
import Travel from "@/sections/travel/page";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(true);
  }, []);

  const handleAuthentication = (status: boolean) => {
    setIsAuthenticated(status);
    toast.success("Welcome to our wedding website!");
  };

  if (!isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login onAuthenticate={handleAuthentication} />;
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Hero />
      <section id="history">
        <History />
      </section>
      <section id="calendar">
        <Calendar />
      </section>
      <section id="itinerary">
        <Itinerary />
      </section>
      <section id="travel">
        <Travel />
      </section>
      <Note />
      <section id="recommendations">
        <Hotel />
      </section>
      <section id="things-to-do">
        <ToDos />
      </section>
      <section id="rsvp">
        <RSVP />
      </section>

      <div className="relative">
        <img src="/BEKKY PLANT.png" alt="Bekky Wall" className="absolute top-[-38.5rem] left-[-48rem] w-[67vw]" />
        <section id="faqs">
          <FAQs />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
      </div>
      <Footer />
    </>
  );
}

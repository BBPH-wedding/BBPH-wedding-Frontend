"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Calendar from "@/sections/calendar/page";
import Hero from "@/sections/hero/page";
import History from "@/sections/history/page";
import Login from "@/sections/login/page";
import RSVP from "@/sections/RSVP/page";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthentication = (status: boolean) => {
    setIsAuthenticated(status);
  };

  if (isLoading) {
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
      <div className="bg-[#F0EBE0] h-40"></div>
      {/* <section id="itinerary">
        <Itinerary />
      </section> */}
      {/* <section id="travel">
        <Travel />
      </section> */}
      {/* <section id="recommendations">
        <Hotel />
      </section> */}
      {/* <section id="things-to-do">
        <ToDos />
      </section> */}
      <section id="rsvp">
        <RSVP />
      </section>
      {/* <section id="faqs">
        <FAQs />
      </section> */}
      {/* <section id="gallery">
        <Gallery />
      </section> */}
      <Footer />
    </>
  );
}

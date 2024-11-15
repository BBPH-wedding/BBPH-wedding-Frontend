import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Calendar from "@/sections/calendar/page";
import FAQs from "@/sections/faqs/page";
import Gallery from "@/sections/gallery/page";
import Hero from "@/sections/hero/page";
import History from "@/sections/history/page";
import Hotel from "@/sections/hotel/page";
import Itinerary from "@/sections/itinerary/page";
import RSVP from "@/sections/RSVP/page";
import ToDos from "@/sections/to-do's/page";
import Travel from "@/sections/travel/page";

export default function Home() {
  return (
    <>
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
      <section id="recommendations">
        <Hotel />
      </section>
      <section id="things-to-do">
        <ToDos />
      </section>
      <section id="rsvp">
        <RSVP />
      </section>
      <section id="faqs">
        <FAQs />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <Footer/>
    </>
  );
}

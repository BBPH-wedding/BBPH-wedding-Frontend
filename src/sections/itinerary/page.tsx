import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";

interface Event {
  title: string;
  location: string;
  dressCode: string;
  time: string;
  date: string;
  line?: boolean;
}

const events: Event[] = [
  {
    title: "Wedding Cocktail Party",
    location: "The Click Clack Hotel Medellín / La Deriva Rooftop",
    dressCode: "Casual",
    time: "5:00 PM - 11:00 PM",
    date: "Friday, January 31 / 2025",
    line: true,
  },
  {
    title: "Wedding Ceremony",
    location: "Orquideorama at the Botanical Garden",
    dressCode: "Tuxedo / Smoking",
    time: "4:00 PM",
    date: "Saturday, February 1 / 2025",
    line: true,
  },
  {
    title: "Ceremony Cocktail Party",
    location: "Orquideorama at the Botanical Garden",
    dressCode: "Tuxedo / Smoking",
    time: "5:30 PM",
    date: "Saturday, February 1 / 2025",
  },
];

const Itinerary = () => {
  return (
    <section className="h-auto py-32 bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5 text-sm md:text-lg">
      <div className="mb-20">
        <Titles title="Itinerary" color="text-primaryGreen" size="large" />
      </div>

      {events.map((event, index) => (
        <div key={index}>
          <ContainerText w="w-auto md:min-w-[50vw] z-1" h="h-dhv">
            <div className="mx-7 my-7">
              <div>
                <Titles
                  title={event.title}
                  color="text-primaryGreen"
                  size="small"
                />
                <div className="flex flex-col gap-1 mt-5 text-primary/70">
                  <p>{event.location}</p>
                  <p>Dress Code: {event.dressCode}</p>
                  <p className="tracking-[0.4rem]">{event.time}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between w-full mt-10 italic text-primary/70">
                <div>View Location</div>
                <div>{event.date}</div>
              </div>
            </div>
          </ContainerText>
          {event.line && (
            <div className="flex justify-center w-full">
              <div className="h-[5rem] bg-primaryGreen w-[1px]" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Itinerary;

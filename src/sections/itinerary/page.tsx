import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";

const Itinerary = () => {
  return (
    <section className="h-[50rem] bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5">
      <div>
        <Titles title="Itinerary" color="text-primaryGreen" size="large" />
      </div>
      <div className="mt-20">
        <ContainerText w="w-auto md:min-w-[50vw]" h="h-dhv">
          <div className="mx-7 my-7">
            <div>
              <Titles
                title="Wedding Cocktail Party"
                color="text-primaryGreen"
                size="small"
              />
              <div className="flex flex-col gap-1 mt-5 text-primary/70">
                <p className="">
                  The Click Clack Hotel Medellín / La Deriva Rooftop
                </p>
                <p>Dress Code: Casual</p>
                <p className="tracking-[0.4rem]">5:00PM - 11:00 PM</p>
              </div>
            </div>

            <div className="flex justify-between w-full mt-10 italic text-primary/70">
              <div className="">View Location</div>
              <div className="">Friday, January 31 / 2025</div>
            </div>
          </div>
        </ContainerText>
      </div>
    </section>
  );
};

export default Itinerary;

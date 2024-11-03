import Button from "@/components/Button";
import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";

const Travel = () => {
  return (
    <>
      <section className="w-auto pb-14 sm:pb-32 h-auto bg-[#F0EBE0] px-5">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="mb-14">
            <Titles
              title="Travel Recommendations"
              color="text-primaryGreen text-center"
              size="large"
            />
            <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
              Below you will find some recommendations from the best airlines,
              as well as some tips for your trip
            </p>
          </div>

          <ContainerText
            w="w-auto md:min-w-[60vw] z-1 md:text-lg text-sm text-center"
            h="h-dhv"
          >
            <div className="mx-10 my-10 md:my-20">
              <div className="flex flex-col items-center">
                <Titles
                  title="How to get to Medellin?"
                  color="text-primaryGreen"
                  size="small"
                />
                <div className="flex flex-col gap-1 mt-5 text-primary/70">
                  <p>Fly to José María Córdoba International Airport</p>
                </div>
              </div>

              <div className="mt-10 ">
                <Titles
                  title="Recommenmdations"
                  color="text-primaryGreen"
                  size="small"
                />
                <div className="flex flex-col gap-5 mt-5 text-primary/70">
                  <p>Some of the best airlines are: </p>
                  <p>
                    Air Europa, Avianca, Aeromexico, LATAM, Iberia, Copa
                    Airlines <br /> American Airlines, Viva Air, KLM, Lufthansa,
                    Air Canada, Turkish Airlines
                  </p>
                  <p>Make sure your passport has at least 6 months validity.</p>
                  <p>
                    Fill out the Colombian Immigration Survey (Check-Mig) <br />
                    before checking in for your flights.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center w-full mt-16 gap-7 md:mt-20 md:gap-20">
                <Button className="w-full">REQUIREMENTS</Button> 
                <Button className="w-full">CHECK-MIG</Button>
              </div>
            </div>
          </ContainerText>
        </div>
      </section>
    </>
  );
};

export default Travel;

import Button from "@/components/Button";
import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";
import Link from "next/link";

const airlines = [
  { name: "Air Europa", href: "https://www.aireuropa.com" },
  { name: "Avianca", href: "https://www.avianca.com" },
  { name: "Aeromexico", href: "https://www.aeromexico.com/" },
  { name: "LATAM", href: "https://www.latamairlines.com/" },
  { name: "Iberia", href: "https://www.iberia.com/" },
  { name: "Copa Airlines", href: "https://www.copaair.com/" },
  { name: "American Airlines", href: "https://www.aa.com/" },
  { name: "KLM", href: "https://www.klm.com" },
  { name: "Lufthansa", href: "https://www.lufthansa.com/" },
  { name: "Air Canada", href: "https://www.aircanada.com/" },
  { name: "Turkish Airlines", href: "https://www.turkishairlines.com/" },
];

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
                  <span className="italic">
                    Click on the names below to visit their websites.
                  </span>
                  <p>
                    {airlines.map((airline, index) => (
                      <span
                        key={index}
                        className="hover:text-primaryGreen transition-all duration-300"
                      >
                        <Link href={airline.href} target="_blank">
                          {airline.name}
                        </Link>
                        {index < airlines.length - 1 && ", "}
                        {(index + 1) % 6 === 0 && <br />}
                      </span>
                    ))}
                  </p>
                  <p>Make sure your passport has at least 6 months validity.</p>
                  <p>
                    Fill out the Colombian Immigration Survey (Check-Mig) <br />
                    before checking in for your flights.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center w-full mt-16 gap-7 md:mt-20 md:gap-20">
                <Button
                  className="w-full"
                  onClick={() =>
                    window.open(
                      "https://www.cancilleria.gov.co/en/procedures_services/visa/requirements",
                      "_blank"
                    )
                  }
                >
                  REQUIREMENTS
                </Button>
                <Button
                  className="w-full"
                  onClick={() =>
                    window.open(
                      "https://apps.migracioncolombia.gov.co/pre-registro/en",
                      "_blank"
                    )
                  }
                >
                  CHECK-MIG
                </Button>
              </div>
            </div>
          </ContainerText>
        </div>
      </section>
    </>
  );
};

export default Travel;

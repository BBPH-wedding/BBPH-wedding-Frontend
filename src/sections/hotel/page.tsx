import Button from "@/components/Button";
import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";

const Hotel = () => {
  return (
    <>
      <section className="h-auto pb-14 sm:pb-32 bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5 text-sm md:text-lg">
        <div className="mb-20">
          <Titles title="Hotels" color="text-primaryGreen" size="large" />
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            All guests are required to coordinate their own transportation from
            and to the airport. <br /> For the wedding ceremony there will be
            shuttles going out of the following hotels at 15h on february 01
          </p>
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70 font-semibold">
            El Cielo Hotel Medellin, The Click Clack Hotel Medellin, Hotel
            Estelar Medellin Square
          </p>
        </div>

        <ContainerText
          w="w-auto md:min-w-[60vw] md:text-lg text-sm text-center"
          h="h-dhv"
        >
          <div className="mx-10 my-10 md:my-20">
            <div className="flex flex-col items-center">
              <Titles
                title="Transportation"
                color="text-primaryGreen"
                size="small"
              />
              <div className="flex flex-col gap-1 mt-5 text-primary/70">
                <p>
                  Ubers work well to get around town and for airport pick up.
                  <br /> To coordinate your transportation in advance, here s a
                  company of trusted drivers you can contact:
                </p>
                <p className="font-semibold mt-5">
                  EC Transportes SAS / Raúl Vasquez <br />
                  +57 (3113435428)
                </p>
                <p className="italic text-sm">
                  *Important safety note: picking up taxis from the street is
                  not advised, especially late at night*
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center mt-10">
              <Titles
                title="Beauty Salons"
                color="text-primaryGreen"
                size="small"
              />
              <div className="flex flex-col gap-1 mt-5 text-primary/70">
                <p className="font-semibold mt-5">
                  Portada Peluquería Medellín <br />
                  <span className="font-normal">
                    Centro Comercial Vizcaya. Local 148. El Poblado, Medellín
                    (+57) 321 3931610
                  </span>
                </p>

                <p className="font-semibold mt-5">
                  Claudia Londoño Peluquería <br />
                  <span className="font-normal">
                    Centro Comercial Río Sur, Cra 43ª #6Sur-26. El Poblado,
                    Medellín (+57) 314 4890100
                  </span>
                </p>

                <p className="font-semibold mt-5">
                  Livana Salóm
                  <br />
                  <span className="font-normal">
                    Cra 36 #10-75, El Poblado, Medellín. (+57) 3017843028
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center mt-10">
              <Titles
                title="Make Up Artists"
                color="text-primaryGreen"
                size="small"
              />
              <div className="flex flex-col gap-1 mt-5 text-primary/70">
                <p className="font-semibold mt-5">
                  Diana López Makeup Studio <br />
                  <span className="font-normal">
                    Calle 10B #36-20. El Poblado, Medellín (+57) 314 8844442
                  </span>
                </p>

                <p className="font-semibold mt-5">
                  Grehisizi Makeup <br />
                  <span className="font-normal">(+57) 302 5921522</span>
                </p>

                <p className="font-semibold mt-5">
                  Zareth Makeup Studio
                  <br />
                  <span className="font-normal">
                    Cra 25 # 12Sur 59. Local 98-04. El Poblado, Medellín. (+57)
                    3012069133
                  </span>
                </p>
              </div>
            </div>
          </div>
        </ContainerText>
      </section>
    </>
  );
};

export default Hotel;

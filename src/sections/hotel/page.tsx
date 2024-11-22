import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";
import Link from "next/link";

const hotels = [
  {
    name: "The Click Clack Hotel Medellin",
    href: "https://www.clickclackhotel.com",
  },
  {
    name: "Hotel Estelar Medellin Square",
    href: "https://be.synxis.com/?adult=1&arrive=2025-01-28&chain=23120&child=0&currency=COP&depart=2025-02-04&group=2503VAOVA_006&hotel=5790&level=hotel&locale=es-MX&productcurrency=COP&rooms=1",
  },
];

const Hotel = () => {
  return (
    <>
      <section className="h-auto pb-14 sm:pb-32 bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5 text-sm md:text-lg pt-28">
        <div className="mb-20">
          <Titles title="Hotels" color="text-primaryGreen" size="large" />
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            All guests are required to coordinate their own transportation from
            and to the airport. <br /> For the wedding ceremony, there will be
            shuttles going out of the following hotels at 15h on February 01.{" "}
            <br />
            <span className="italic">
              Click on the names below to visit their websites.
            </span>
          </p>

          <p className="flex justify-center gap-[7vw] text-sm font-semibold text-center md:gap-24 mt-14 md:text-lg text-primary/70">
            {hotels.map((hotel, index) => (
              <span
                key={index}
                className="text-center transition-all duration-300 hover:text-primaryGreen"
              >
                <Link href={hotel.href} target="_blank">
                  {hotel.name}
                </Link>
              </span>
            ))}
          </p>

          <p className="mt-8 text-xs text-center md:text-sm text-primary/50">
            Use the code{" "}
            <span className="font-bold text-primaryGreen">
              &quot;REBEFEB2025MDENICO&quot;
            </span>{" "}
            to get a discount at
            <Link
              href="https://www.clickclackhotel.com"
              target="_blank"
              className="ml-1 text-primaryGreen hover:underline"
            >
              The Click Clack Hotel Medellin
            </Link>
            .
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
                  <br /> To coordinate your transportation in advance,
                  here&apos;s a company of trusted drivers you can contact:{" "}
                  <br />
                  <span className="italic">
                    Click on the names below to visit their information pages.
                  </span>
                </p>
                <p className="mt-5 font-semibold">
                  EC Transportes SAS / Raúl Vasquez <br />
                  +57 (3113435428)
                </p>
                <p className="text-sm italic">
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
                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/portadamedellin/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Portada Peluquería Medellín <br />
                  </Link>
                  <span className="font-normal">
                    Centro Comercial Vizcaya. Local 148. El Poblado, Medellín
                    (+57) 321 3931610
                  </span>
                </p>

                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/claudialonpeluqueria/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Claudia Londoño Peluquería <br />
                  </Link>
                  <span className="font-normal">
                    Centro Comercial Río Sur, Cra 43ª #6Sur-26. El Poblado,
                    Medellín (+57) 314 4890100
                  </span>
                </p>

                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/livanasalon/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Livana Salóm <br />
                  </Link>
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
                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/dianalopezmakeupstudio/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Diana López Makeup Studio <br />
                  </Link>
                  <span className="font-normal">
                    Calle 10B #36-20. El Poblado, Medellín (+57) 314 8844442
                  </span>
                </p>

                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/emakeup_cools/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Emaniel Garcia Cools <br />
                  </Link>
                  <span className="font-normal">(+57) 302 5921522</span>
                </p>

                <p className="mt-5 font-semibold">
                  <Link
                    href="https://www.instagram.com/zarethmakeup/"
                    target="_blank"
                    className="transition-all duration-300 hover:text-primaryGreen"
                  >
                    Zareth Makeup Studio <br />
                  </Link>
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

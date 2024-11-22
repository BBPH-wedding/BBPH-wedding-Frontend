import Names from "@/components/Names";
import { Toaster } from "react-hot-toast";
import img from "../../../public/HOME.png";

const image = img.src;

const Hero = () => {
  return (
    <>
      <Toaster />
      <section
        className="min-h-screen bg-center bg-cover flex flex-col justify-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="flex flex-col items-center">
          <div className="flex mt-40 md:mt-[30rem]">
            <div className="w-[14vw] h-0 border border-black mt-[10px] md:w-32" />
            <h1 className="text-[3vw] tracking-[0.5rem] mx-5 md:tracking-[1rem] md:mx-10 sm:text-[1rem] text-black">
              WEDDING PARTY
            </h1>
            <div className="w-[14vw] h-0 border border-black ml-[-0.9rem] mt-[10px] md:w-32" />
          </div>

          <div className="mt-10 md:mt-32">
            <Names
              sizeH1="text-4xl sm:text-6xl"
              sizeSpan="text-[3rem] sm:text-[4rem]"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

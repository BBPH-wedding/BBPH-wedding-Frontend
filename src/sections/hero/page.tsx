import Names from "@/components/Names";

const Hero = () => {
  return (
    <>
      <section className="h-dvh">
        <div className="flex flex-col items-center justify-center h-full ">
          <div className="flex mt-80">
            <div className="w-[14vw] h-0 border border-white mt-[10px] md:w-32" />
            <h1 className="text-[3vw] tracking-[0.5rem] mx-5 md:tracking-[1rem] md:mx-10 sm:text-[1rem]">
              WEDDING PARTY
            </h1>
            <div className="w-[14vw] h-0 border border-white ml-[-0.9rem] mt-[10px] md:w-32" />
          </div>

          <div className="mt-32">
            <Names sizeH1="text-4xl sm:text-6xl" sizeSpan="text-[3rem] sm:text-[4rem]" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

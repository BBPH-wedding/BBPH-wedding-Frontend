import Button from "@/components/Button";
import Titles from "@/components/Titles";

const Gallery = () => {
  return (
    <>
      <section className="h-auto py-14 sm:py-32 bg-[#F0EBE0] flex flex-col items-center  text-center px-5 text-sm md:text-lg">
        <div className="mb-20">
          <Titles title="Gallery" color="text-primaryGreen" size="large" />
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            Relive every special moment of our celebration by accessing the
            photo album. <br /> Click the button below to view and download the
            images from this memorable day
          </p>
          <p className="mt-10 text-sm text-center md:text-lg text-primary/70">
            Thank you for being part of our celebration!
          </p>
        </div>

        <div>
          <Button className="w-full hover:!bg-white">VIEW ALBUM</Button>
        </div>
      </section>
    </>
  );
};

export default Gallery;

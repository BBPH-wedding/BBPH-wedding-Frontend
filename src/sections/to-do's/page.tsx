import Titles from "@/components/Titles";
import store from "../../../public/stores.jpg";
import restaurant from "../../../public/restaurants.jpg";
import nightlife from "../../../public/nightlife.jpg";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

const restaurantimg = restaurant.src;
const storeimg = store.src;
const nightlifeimg = nightlife.src;

interface Category {
  title: string;
  description: string;
  img: string;
  link: string;
}

const category: Category[] = [
  {
    title: "SHOPPING",
    description:
      "Discover the best stores in Medellin and enjoy a relaxing shopping experience.",
    img: storeimg,
    link: "https://maps.app.goo.gl/fBqVkYaq6jiWuVZQ6",
  },
  {
    title: "RESTAURANTS",
    description:
      "Experience the best of Colombian cuisine at one of our favorite restaurants.",
    img: restaurantimg,
    link: "https://maps.app.goo.gl/qY546ADRgrckkD3AA",
  },
  {
    title: "NIGHTLIFE",
    description:
      "Enjoy a night of entertainment and celebration with our nightlife options.",
    img: nightlifeimg,
    link: "https://maps.app.goo.gl/MEpCmqyZ51EoZfAr9",
  },
];

const ToDos = () => {
  return (
    <>
      <section className="h-auto pb-14 sm:pb-32 bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5 text-sm md:text-lg">
        <div className="mb-20">
          <Titles title="Things To Do" color="text-primaryGreen" size="large" />
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            We invite you to discover a special selection of highlights that we
            have prepared for you. <br /> Each category contains carefully
            chosen recommendations, presented on Google Maps to facilitate your
            visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {category.map((category, index) => (
            <div key={index} className="flex flex-col group">
              <Link
                href={category.link || "#"}
                className="block h-full"
                target="_blank"
              >
                <div className="bg-white rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden h-full ">
                  <div className="relative w-full h-48">
                    <Image
                      src={category.img}
                      alt={category.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-primaryGreen mb-2 line-clamp-1">
                      {category.title}
                    </h2>
                    <p className="text-sm text-primary/70 line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-3 md:mt-5">
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            Access our specially created tourist guide to offer you an
            unforgettable experience. Click to download the PDF with <br />
            recommendations, itineraries and tips that will help you explore the
            best of the city in a practical and detailed way.
          </p>
          <div className="flex justify-center mt-10 md:mt-16">
            <Button className="w-full">DOWNLOAD PDF</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ToDos;

// shopping
// restaurants and bars
// nigthlife

"use client";

import Titles from "@/components/Titles";
import store from "../../../public/SHOPPING.jpeg";
import restaurant from "../../../public/FOOD & COFFES.jpeg";
import nightlife from "../../../public/NIGHT LIFE.jpeg";
import turism from "../../../public/TURISM.jpeg";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

const restaurantimg = restaurant.src;
const storeimg = store.src;
const nightlifeimg = nightlife.src;
const turismimg = turism.src;

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
  {
    title: "TURISM",
    description:
      "Discover the best places to visit in Medellin and enjoy a relaxing trip.",
    img: turismimg,
    link: "https://maps.app.goo.gl/MEpCmqyZ51EoZfAr9",
  }
];

const ToDos = () => {

  const handleDownload = async () => {
    try {
      const response = await fetch('/MED GUIDE.pdf');
      
      if (!response.ok) {
        throw new Error('El archivo no se pudo descargar');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'MED GUIDE.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Liberar memoria
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };


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

        <div className="grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          {category.map((category, index) => (
            <div key={index} className="flex flex-col group">
              <Link
                href={category.link || "#"}
                className="block h-full"
                target="_blank"
              >
                <div className="h-full overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg group-hover:shadow-xl ">
                  <div className="relative w-full h-48">
                    <Image
                      src={category.img}
                      alt={category.title}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      quality={100}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="mb-2 text-xl font-bold text-primaryGreen line-clamp-1">
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
            <Button className="w-full hover:!bg-white" onClick={handleDownload}>DOWNLOAD PDF</Button> 
          </div>
        </div>
      </section>
    </>
  );
};

export default ToDos;

"use client";

import Link from "next/link";
import Names from "./Names";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };


    window.addEventListener('scroll', handleScroll);


    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <nav className={`flex items-center justify-between h-24 px-[3vw] pt-4 fixed w-dvw top-0 transition-all duration-700 ${
          showBackground ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"
        }`}>
        <div className="z-30">
          <Names
            sizeH1="text-2xl uppercase sm:text-3xl"
            sizeSpan="text-3xl sm:text-5xl"
          />
        </div>
        <div>
          <ul className="items-center hidden text-sm xl:text-lg text-white gap-x-[2vw] lg:flex">
            <li>
              <Link href="#">History</Link>
            </li>
            <li>
              <Link href="#">Calendar</Link>
            </li>
            <li>
              <Link href="#">Itinerary</Link>
            </li>
            <li>
              <Link href="#">Travel</Link>
            </li>
            <li>
              <Link href="#">Recommendations</Link>
            </li>
            <li>
              <Link href="#">Things to do</Link>
            </li>
            <li>
              <Link href="#">RSVP</Link>
            </li>
            <li>
              <Link href="#">FAQS</Link>
            </li>
          </ul>

          <div className="flex lg:hidden">
            <button
              className="z-30 transition-all duration-300"
              onClick={handleMenuToggle}
            >
              <div
                className={`relative h-5 w-7 transition-all duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-[white] transition-all duration-300 ${
                    isOpen ? "top-1/2 -translate-y-1/2 rotate-90" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-full bg-[white] -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "left-1/2 -translate-x-1/2 rotate-0" : "left-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`absolute top-0 left-0 z-10 w-full h-[35rem] bg-black/30 backdrop-blur-sm
          transition-all duration-500 transform
          ${
            isOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-4"
          }`}
        >
          <div className="absolute flex justify-center w-full top-24">
            <div className="w-[94%] border-white border" /> 
          </div>
          <div className="flex items-center h-full ml-12 mt-11">
            <ul className="flex flex-col text-lg text-primary gap-y-5">
              <li>
                <Link href="#">History</Link>
              </li>
              <li>
                <Link href="#">Calendar</Link>
              </li>
              <li>
                <Link href="#">Itinerary</Link>
              </li>
              <li>
                <Link href="#">Travel</Link>
              </li>
              <li>
                <Link href="#">Recommendations</Link>
              </li>
              <li>
                <Link href="#">Things to do</Link>
              </li>
              <li>
                <Link href="#">RSVP</Link>
              </li>
              <li>
                <Link href="#">FAQS</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

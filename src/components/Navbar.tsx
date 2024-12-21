"use client";

import React, { useState, useEffect } from "react";
import Names from "./Names";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "history", label: "History" },
  { id: "calendar", label: "Calendar" },
  { id: "itinerary", label: "Itinerary" },
  { id: "travel", label: "Travel" },
  { id: "recommendations", label: "Recommendations" },
  { id: "things-to-do", label: "Things to do" },
  { id: "rsvp", label: "RSVP" },
  { id: "faqs", label: "FAQs" },
  { id: "gallery", label: "Gallery" },
];

const Navbar = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));

      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`flex items-center justify-between h-24 px-[3vw] pt-4 fixed w-dvw top-0 transition-all duration-700 ${
        showBackground
          ? "bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm z-50"
          : "bg-transparent"
      }`}
    >
      <div className="z-30">
        <Names
          sizeH1="text-2xl uppercase sm:text-3xl"
          sizeSpan="text-3xl sm:text-5xl"
        />
      </div>

      <div>
        <ul className="items-center hidden text-sm xl:text-lg gap-x-[2vw] text-black/65 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 hover:text-gray-300 ${
                  activeSection === item.id ? "text-green-900" : ""
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
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
                className={`absolute left-0 top-0 h-[2px] w-full bg-[black] transition-all duration-300 ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-90" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-[black] -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? "left-1/2 -translate-x-1/2 rotate-0" : "left-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 z-10 w-full h-[35rem] bg-white/30 backdrop-blur-sm transition-all duration-500 transform ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="absolute flex justify-center w-full top-24">
          <div className="w-[94%] border-black border" />
        </div>
        <div className="flex items-center h-full ml-12 mt-11">
          <ul className="flex flex-col text-lg text-black/65 gap-y-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 hover:text-gray-300 ${
                    activeSection === item.id ? "text-green-900" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

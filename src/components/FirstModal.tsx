"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";
import { useState } from "react";
import SecondModal from "./SecondModal";
import ThirdModal from "./ThirdModal";
import { postReservation } from "@/hooks/CreateReservation";

const Modal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsThirdModalOpen((prevState) => !prevState); // abre el tercer modal
    setIsCodeModalOpen(false); // cierra el segundo modal
  };

  const handleSendReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await postReservation({
        email,
        password,
      });
      setIsAuthModalOpen(false); 
      setIsCodeModalOpen(true); 
      console.log(data);
    } catch {
      console.error("Error al enviar la reserva:");
    }
  };

  return (
    <>
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={() => setIsAuthModalOpen(true)}>
            Reserve
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#F0EBE0] rounded-lg text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center w-full mb-4 text-xl font-semibold text-black">
              <p className="text-sm text-center md:text-xl">
                Complete Your Reservation
              </p>
            </DialogTitle>
            <DialogDescription className="text-center mb-6 text-sm md:text-[17px]">
              Please enter your email and password to proceed with the
              reservation.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-10" onSubmit={handleSendReservation}>
            <div>
              <label className="block mb-3 text-sm font-semibold text-black md:text-xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full p-5 bg-white/70 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 text-sm font-semibold text-black md:text-xl">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full p-5 bg-white/70 focus:outline-none"
              />
            </div>

            <Button type="submit" className="w-full md:w-full hover:bg-white">
              RESERVE NOW
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <SecondModal
        isCodeModalOpen={isCodeModalOpen}
        setIsCodeModalOpen={setIsCodeModalOpen}
        handleConfirm={handleConfirm}
      />
      <ThirdModal
        isModalOpen={isThirdModalOpen}
        setIsModalOpen={setIsThirdModalOpen}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default Modal;

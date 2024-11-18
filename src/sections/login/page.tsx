"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LoginProps {
  onAuthenticate: (status: boolean) => void;
}

const Login = ({ onAuthenticate }: LoginProps) => {
  const [password, setPassword] = useState("");
  const CORRECT_PASSWORD = "Junior123";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem("isAuthenticated", "true");
      onAuthenticate(true);
      toast.success("Welcome to our wedding website!");
    } else {
      toast.error("Incorrect password!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-dvh bg-[#070707] flex items-center justify-center py-8">
        <section className="flex flex-col items-center justify-center w-full max-w-2xl gap-8 px-5 mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="font-[Destiny] text-7xl sm:text-9xl leading-tight">
              Bekky
            </h1>
          </div>

          <div className="flex items-center w-full max-w-md">
            <div className="flex-1 h-0 border border-primaryGreen" />
            <h1 className="text-4xl sm:text-5xl font-[poppins] mx-6">&</h1>
            <div className="flex-1 h-0 border border-primaryGreen" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h1 className="font-[Destiny] text-7xl sm:text-9xl leading-tight">
              Nicolas
            </h1>
            <p className="text-xl sm:text-2xl font-[poppins] uppercase">
              1 February 2025
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 max-w-prose">
            <div className="w-20 h-0 border sm:w-32 border-primaryGreen" />
            <p className="font-[poppins] text-center">
              Welcome to our wedding website! We&apos;ve created this website as
              a convenient and interactive way to share all of the important
              details with you leading up to our wedding. We can&apos;t wait to
              celebrate this exciting new chapter of our lives together with
              you.
            </p>
            <div className="w-20 h-0 border sm:w-32 border-primaryGreen" />
          </div>

          <div className="flex flex-col items-center w-full max-w-md gap-5 font-[poppins] mt-4">
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center w-full max-w-md gap-5 font-[poppins]"
            >
              <label className="font-semibold">Password</label>
              <input
                className="w-full px-5 py-3 text-xl text-black border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="px-10 py-3 text-lg transition-all duration-300 border border-primaryGreen hover:bg-primaryGreen"
                type="submit"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;

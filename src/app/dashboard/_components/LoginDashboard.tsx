"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LoginProps {
  onAuthenticate: (status: boolean) => void;
}

const Login = ({ onAuthenticate }: LoginProps) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in-admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.text();
      if (data) {
        localStorage.setItem("isAuthenticatedAdmin", "true");
        localStorage.setItem("TokenAdmin", data);
        onAuthenticate(true);
      } else {
        toast.error("Incorrect email or password!");
      }
    } else {
      toast.error("Incorrect email or password!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-dvh bg-[#060606] flex items-center justify-center py-8">
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
          </div>

          <div className="flex flex-col items-center gap-5 max-w-prose">
            <div className="w-20 h-0 border sm:w-32 border-primaryGreen" />
            <p className="font-[poppins] text-center">
              Welcome to your dashboard! Here, you can easily edit, delete, or
              download your reservations in Excel format. Manage everything in
              one place to keep things organized for your special day!
            </p>
            <div className="w-20 h-0 border sm:w-32 border-primaryGreen" />
          </div>

          <div className="flex flex-col items-center w-full max-w-md gap-5 mt-4">
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center w-full max-w-md gap-5"
            >
              <label className="font-semibold font-[poppins]">Username</label>
              <input 
                className="w-full px-5 py-3 text-xl text-black border rounded-md focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="font-semibold font-[poppins]">Password</label>
              <input
                className="w-full px-5 py-3 text-xl text-black border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                className="px-10 py-3 text-lg transition-all duration-300 border border-primaryGreen hover:bg-primaryGreen font-[poppins] rounded-md"
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

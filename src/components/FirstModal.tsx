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
import SecondModal from "./SecondModal";
import ThirdModal from "./ThirdModal";
import { postReservation } from "@/hooks/CreateReservation";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAuthModalStore,
  useCodeModalStore,
  useFormModalStore,
  useReservationStore,
} from "@/store/Store";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .max(40, "Email must be at most 40 characters")
    .matches(/.+@.+\..+/, "Email must be valid (e.g. john@gmail.com)")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must be at most 15 characters")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .required("Password is required"),
});

const Modal = () => {
  const { isFormModalOpen, setIsFormModalOpen } = useFormModalStore();
  const { setIsAuthModalOpen, isAuthModalOpen } = useAuthModalStore();
  const { isCodeModalOpen, setIsCodeModalOpen } = useCodeModalStore();

  const { setUserEmail } = useReservationStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await postReservation(values);

        if (!data) {
          return;
        }
        setUserEmail(values.email);
        toast.success("Reservation created successfully");

        setIsAuthModalOpen(false);
        setIsCodeModalOpen(true);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Error in handleReservation:", error);
        }
        toast.error("Error to send reservation");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!isAuthModalOpen) {
      formik.resetForm();
    }
  }, [isAuthModalOpen]);

  return (
    <>
      <Toaster />
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={() => setIsAuthModalOpen(true)}>
            RESERVE
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
          <form className="space-y-10" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-3 text-sm font-semibold text-black md:text-xl">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full p-5 bg-white/70 focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-2 border-red-500"
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="absolute mt-2 text-sm text-red-600">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-3 text-sm font-semibold text-black md:text-xl">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full p-5 bg-white/70 focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-2 border-red-500"
                    : ""
                }`}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="absolute mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full md:w-full hover:bg-white disabled:cursor-not-allowed"
              disabled={
                formik.isSubmitting || Object.keys(formik.errors).length > 0
              }
            >
              {formik.isSubmitting ? "RESERVING..." : "RESERVE NOW"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <SecondModal
        isCodeModalOpen={isCodeModalOpen}
        setIsCodeModalOpen={setIsCodeModalOpen}
      />
      <ThirdModal
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
      />
    </>
  );
};

export default Modal;

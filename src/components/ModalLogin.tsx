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
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginReservation } from "@/hooks/EditReservation";
import {
  useEditModalStore,
  useEmailLoginStore,
  useLoginModalStore,
  useTokenLoginStore,
} from "@/store/Store";
import ModalEdit from "./EditModal";

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

const ModalLogin = () => {
  const { setUserEmailLogin } = useEmailLoginStore();
  const { setToken } = useTokenLoginStore();
  const { setIsLoginModalOpen, isLoginModalOpen } = useLoginModalStore();
  const { setIsEditModalOpen, isEditModalOpen } = useEditModalStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await LoginReservation(values);

        if (!data) {
          return;
        }

        toast.success("Login successfully");
        setToken(data);
        setUserEmailLogin(values.email);
        setIsLoginModalOpen(false);
        setIsEditModalOpen(true);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Error in handleReservation:", error);
        }
        toast.error("Error to login");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster />
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Edit reservation</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#F0EBE0] rounded-lg text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center w-full mb-4 text-xl font-semibold text-black">
              <p className="text-sm text-center md:text-xl">
                Login to your account
              </p>
            </DialogTitle>
            <DialogDescription className="text-center mb-6 text-sm md:text-[17px]">
              Please enter your email and password to edit your reservation.
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
                <div className="mt-2 text-sm text-red-600">
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
                <div className="mt-2 text-sm text-red-600">
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
              {formik.isSubmitting ? "LOGGING IN..." : "LOGIN"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <ModalEdit
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default ModalLogin;

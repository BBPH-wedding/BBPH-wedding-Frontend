import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import Button from "./Button";
import { RequestPasswordReset } from "@/hooks/EditReservation";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

interface ModalResetPasswordProps {
  isResetPasswordModalOpen: boolean;
  setIsResetPasswordModalOpen: (isOpen: boolean) => void;
}

const ModalResetPassword = ({
  isResetPasswordModalOpen,
  setIsResetPasswordModalOpen,
}: ModalResetPasswordProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await RequestPasswordReset(values.email);

        if (response) {
          toast.success("We have sent you an email to reset your password");
          setIsResetPasswordModalOpen(false);
        }

        if (response === null) {
          toast.error("We did not find any account");
        }



      } catch (error) {
        toast.error("We did not find any account");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog
      open={isResetPasswordModalOpen}
      onOpenChange={setIsResetPasswordModalOpen}
    >
      <DialogContent className="bg-[#F0EBE0] rounded-lg text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center w-full mb-4 text-xl font-semibold text-black">
            <p className="text-sm text-center md:text-xl">Reset Password</p>
          </DialogTitle>
          <DialogDescription className="text-center mb-6 text-sm md:text-[17px]">
            Enter your email to reset your password.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
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

          <Button
            type="submit"
            className="w-full md:w-full hover:bg-white disabled:cursor-not-allowed"
            disabled={
              formik.isSubmitting || Object.keys(formik.errors).length > 0
            }
          >
            {formik.isSubmitting ? "RESETTING..." : "RESET"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResetPassword;

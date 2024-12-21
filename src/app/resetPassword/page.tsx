"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/Button";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters")
      .matches(/(?=.*[0-9])/, "Password must contain at least one number")
      .matches(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      toast.error("Invalid token or expired");
      router.push("/");
    }
  }, [searchParams, router]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              password: values.newPassword,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage =
            errorData.message || "An unexpected error occurred";

          throw new Error(errorMessage);
        }
        toast.success("Password reset successfully");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error((error as Error).message || "An unexpected error occurred");
        console.warn("Error", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = (field: string) => {
    if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EBE0] p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter your new password"
                className={`w-full p-3 border rounded-md pr-10 ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("newPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your new password"
                className={`w-full p-3 border rounded-md pr-10 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <Button
            type="submit"
            className="w-full md:w-full disabled:cursor-not-allowed"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const ResetPasswordPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPasswordPageWrapper;

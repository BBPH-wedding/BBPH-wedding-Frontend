"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import Button from "./Button";
import { useEmailLoginStore, useTokenLoginStore } from "@/store/Store";
import { useFormik } from "formik";
import { completeReservation } from "@/hooks/CreateReservation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { GetReservation } from "@/hooks/EditReservation";

interface RegistrationFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

interface Formvalues {
  phoneNumber: string;
  peopleComing: { firstName: string; lastName: string }[];
  notes: string;
  status: string;
}

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Please enter a phone number")
    .max(15, "Please enter a valid phone number")
    .min(5, "Please enter a valid phone number"),
  peopleComing: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string()
        .required("Please enter a first name")
        .max(20, "Name must be at most 20 characters"),
      lastName: Yup.string()
        .required("Please enter a last name")
        .max(20, "Last name must be at most 20 characters"),
    })
  ),
  status: Yup.string().required("Please select an event status"),
  notes: Yup.string(),
});

const ModalEdit: React.FC<RegistrationFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { token } = useTokenLoginStore();
  const { userEmailLogin } = useEmailLoginStore();
  const [memberCount, setMemberCount] = useState(1);

  const formik = useFormik<Formvalues>({
    initialValues: {
      phoneNumber: "",
      peopleComing: [{ firstName: "", lastName: "" }],
      status: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await completeReservation({
          ...values,
          email: userEmailLogin,
          token: token,
        });

        if (!data) {
          return;
        }
        toast.success("Edited reservation successfully");
        setIsModalOpen(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Error in confirmReservation:", error);
        }
        toast.error("Failed to complete registration");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleIncrement = () => {
    if (memberCount < 5) {
      setMemberCount((prev) => prev + 1);

      formik.setFieldValue("peopleComing", [
        ...formik.values.peopleComing,
        { firstName: "", lastName: "" },
      ]);
    }
  };

  const handleDecrement = () => {
    if (memberCount > 1) {
      setMemberCount((prev) => prev - 1);

      formik.setFieldValue(
        "peopleComing",
        formik.values.peopleComing.slice(0, -1)
      );
    }
  };

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await GetReservation({
          email: userEmailLogin,
          token: token,
        });

        const data = response;

        if (data.peopleComing.length === 0) {
          setMemberCount(1);
          formik.setFieldValue("peopleComing", [
            { firstName: "", lastName: "" },
          ]);
        } else {
          setMemberCount(data.peopleComing.length);
          formik.setValues({
            phoneNumber: data.phoneNumber,
            peopleComing: data.peopleComing,
            notes: data.notes,
            status: data.status,
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Error fetching reservation data:", error);
        }
        toast.error("Failed to complete registration");
      } finally {
      }
    };

    if (isModalOpen) {
      fetchReservationData();
    }
  }, [userEmailLogin, token]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="bg-[#F0EBE0] rounded-lg text-black max-w-[95vw] w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-4 text-sm font-semibold text-center md:text-xl">
            Edit Reservation
          </DialogTitle>
          <DialogDescription className="mb-6 text-sm text-center sm:text-base">
            Modify your reservation details. Select new dates, adjust the number
            of guests, or make any necessary changes.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Number of Members ({memberCount}/5)
            </label>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                onClick={handleDecrement}
                className="md:w-[5rem] !w-[5rem] h-10 rounded-full !px-0 !py-0 hover:bg-white disabled:cursor-not-allowed"
                disabled={memberCount === 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-lg font-semibold text-center">
                {memberCount}
              </span>
              <Button
                type="button"
                onClick={handleIncrement}
                className="md:w-[5rem] !w-[5rem] h-10 rounded-full !px-0 !py-0 hover:bg-white disabled:cursor-not-allowed"
                disabled={memberCount === 5}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Member Names
            </label>
            <div className="space-y-3">
              {formik.values.peopleComing.map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name={`peopleComing.${index}.firstName`}
                      value={formik.values.peopleComing[index].firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`First Name ${index + 1}`}
                      className={`w-full p-5 bg-white/70 focus:outline-none ${
                        formik.touched.peopleComing?.[index]?.firstName &&
                        typeof formik.errors.peopleComing?.[index] !==
                          "string" &&
                        formik.errors.peopleComing?.[index]?.firstName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.peopleComing?.[index]?.firstName &&
                      typeof formik.errors.peopleComing?.[index] !== "string" &&
                      formik.errors.peopleComing?.[index]?.firstName && (
                        <div className="mt-1 text-sm text-red-500">
                          {formik.errors.peopleComing[index].firstName}
                        </div>
                      )}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name={`peopleComing.${index}.lastName`}
                      value={formik.values.peopleComing[index].lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`Last Name ${index + 1}`}
                      className={`w-full p-5 bg-white/70 focus:outline-none ${
                        formik.touched.peopleComing?.[index]?.lastName &&
                        typeof formik.errors.peopleComing?.[index] !==
                          "string" &&
                        formik.errors.peopleComing?.[index]?.lastName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.peopleComing?.[index]?.lastName &&
                      typeof formik.errors.peopleComing?.[index] !== "string" &&
                      formik.errors.peopleComing?.[index]?.lastName && (
                        <div className="mt-1 text-sm text-red-500">
                          {formik.errors.peopleComing[index].lastName}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Phone Number
            </label>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                placeholder="000-000-0000"
                className={`w-full p-5 bg-white/70 focus:outline-none ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-2 border-red-500"
                    : ""
                }`}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab" &&
                    e.key !== "-"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Event Status
            </label>
            <Select
              onValueChange={(value) => formik.setFieldValue("status", value)}
              value={formik.values.status}
            >
              <SelectTrigger className="w-full border-none rounded-none shadow-none p-9 bg-white/70 focus:outline-none">
                <SelectValue placeholder="Select event status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Event Status</SelectLabel>
                  <SelectItem value="Not Going">Not Going</SelectItem>
                  <SelectItem value="Confirmed">Going</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.status}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Important Notes
            </label>
            <textarea
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write any important notes here..."
              className="w-full p-5 bg-white/70 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-full hover:bg-white disabled:cursor-not-allowed"
            disabled={
              formik.isSubmitting || Object.keys(formik.errors).length > 0
            }
          >
            {formik.isSubmitting ? "CONFIRMING..." : "CONFIRM"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEdit;

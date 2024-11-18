import React, { useState } from "react";
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
import { useReservationStore, useTokenStore } from "@/store/Store";
import { useFormik } from "formik";
import { completeReservation } from "@/hooks/CreateReservation";
import toast from "react-hot-toast";
import * as Yup from "yup";

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
  notes: Yup.string().max(200, "Notes must be at most 200 characters"),
});

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { token } = useTokenStore();
  const { userEmail } = useReservationStore();
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
          email: userEmail,
          token: token,
        });

        if (!data) {
          return;
        }
        toast.success("Registration completed successfully");
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

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="bg-[#F0EBE0] rounded-lg text-black max-w-[95vw] w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-4 text-sm font-semibold text-center md:text-xl">
            Registration Form
          </DialogTitle>
          <DialogDescription className="mb-6 text-sm text-center sm:text-base">
            Please complete all required fields. In the Important Notes section,
            specify any allergies or disabilities that may require special
            attention at the event.
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
              <SelectTrigger
                className={`
        w-full border-2 p-9 rounded-none shadow-none bg-white/70 focus:outline-none 
        ${
          formik.values.status === "Confirmed"
            ? "border-green-800"
            : formik.values.status === "Not Going"
            ? "border-orange-300"
            : "border-gray-300"
        }
      `}
              >
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
            {formik.touched.notes && formik.errors.notes && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.notes}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full md:w-full hover:bg-white disabled:cursor-not-allowed"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "CONFIRMING..." : "CONFIRM"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;

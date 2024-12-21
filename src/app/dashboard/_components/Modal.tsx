import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { completeReservation } from "@/hooks/CreateReservation";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .max(15, "Please enter a valid phone number")
    .min(5, "Please enter a valid phone number"),
  peopleComing: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string()
          .required("First name is required")
          .max(20, "Name must be at most 20 characters"),

        lastName: Yup.string()
          .required("Last name is required")
          .max(20, "Last name must be at most 20 characters"),
      })
    )
    .min(1, "At least one person is required")
    .max(5, "Maximum 5 people allowed"),
  status: Yup.string().required("Status is required"),
  notes: Yup.string().max(250, "Notes must be at most 250 characters"),
});

interface Person {
  firstName: string;
  lastName: string;
}

export interface ReservationFormValues {
  email: string;
  phoneNumber: string;
  peopleComing: Person[];
  status: string;
  notes: string;
}

interface ReservationEditFormProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  selectedReservation?: Partial<ReservationFormValues | null>;
  handleDeleteReservation: () => void;
  onRefreshReservations: () => void;
}

const ReservationEditForm: React.FC<ReservationEditFormProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedReservation,
  handleDeleteReservation,
  onRefreshReservations,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] =
    useState<ReservationFormValues | null>(null);

  const handleSubmit = async (
    values: ReservationFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      setIsLoading(true);
      const tokenAdmin = localStorage.getItem("TokenAdmin");
      const reservationData = {
        ...values,
        email: selectedReservation?.email || "",
        token: tokenAdmin,
      };

      const data = await completeReservation(reservationData);

      if (data) {
        toast.success("Edited reservation successfully");
        onRefreshReservations();
        setIsLoading(false);
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to complete reservation");
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Error in confirmReservation:", error);
        setIsLoading(false);
      }
      toast.error("Failed to complete registration");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmSave = (
    values: ReservationFormValues,
  ) => {
    setPendingSubmitValues(values);
    setIsSaveConfirmOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  return (
    <>
      <Toaster />

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the reservation. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteReservation();
                setIsDeleteConfirmOpen(false);
                setIsEditModalOpen(false);
              }}
            >
              Delete Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSaveConfirmOpen} onOpenChange={setIsSaveConfirmOpen}>
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save these changes to the reservation?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSaveConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingSubmitValues) {
                  handleSubmit(pendingSubmitValues, (isSubmitting) => {
                    console.log("Submitting:", isSubmitting);
                  });
                }
                setIsSaveConfirmOpen(false);
              }}
            >
              Confirm Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Edit Reservation</DialogTitle>
            <DialogDescription>
              If you want to edit the reservation details click on the save
              button.
            </DialogDescription>
          </DialogHeader>

          <Formik<ReservationFormValues>
            initialValues={{
              email: selectedReservation?.email || "",
              phoneNumber: selectedReservation?.phoneNumber || "",
              peopleComing: selectedReservation?.peopleComing || [
                { firstName: "", lastName: "" },
              ],
              status: selectedReservation?.status || "",
              notes: selectedReservation?.notes || "",
            }}
            validationSchema={validationSchema}
            onSubmit={confirmSave}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      className="col-span-3"
                      disabled
                    />
                  </div>

                  <FieldArray name="peopleComing">
                    {({ push, remove }) => (
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-right">People Coming</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              push({ firstName: "", lastName: "" })
                            }
                            disabled={values.peopleComing.length >= 5}
                            className="flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Person
                          </Button>
                        </div>

                        {values.peopleComing.map((_, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-full">
                              <Field
                                as={Input}
                                id={`peopleComing.${index}.firstName`}
                                name={`peopleComing.${index}.firstName`}
                                placeholder={`First Name ${index + 1}`}
                                className="col-span-3"
                              />
                              {errors.peopleComing &&
                                typeof errors.peopleComing !== "string" &&
                                Array.isArray(errors.peopleComing) &&
                                errors.peopleComing[index] &&
                                typeof errors.peopleComing[index] ===
                                  "object" &&
                                errors.peopleComing[index]?.firstName &&
                                touched.peopleComing?.[index]?.firstName && (
                                  <div className="text-sm text-red-500">
                                    {
                                      (
                                        errors.peopleComing[index] as {
                                          firstName?: string;
                                        }
                                      ).firstName
                                    }
                                  </div>
                                )}
                            </div>
                            <div className="w-full">
                              <Field
                                as={Input}
                                id={`peopleComing.${index}.lastName`}
                                name={`peopleComing.${index}.lastName`}
                                placeholder={`Last Name ${index + 1}`}
                                className="col-span-3"
                              />
                              {errors.peopleComing &&
                                typeof errors.peopleComing !== "string" &&
                                Array.isArray(errors.peopleComing) &&
                                errors.peopleComing[index] &&
                                typeof errors.peopleComing[index] ===
                                  "object" &&
                                errors.peopleComing[index]?.lastName &&
                                touched.peopleComing?.[index]?.lastName && (
                                  <div className="text-sm text-red-500">
                                    {
                                      (
                                        errors.peopleComing[index] as {
                                          lastName?: string;
                                        }
                                      ).lastName
                                    }
                                  </div>
                                )}
                            </div>
                            {values.peopleComing.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                        {typeof errors.peopleComing === "string" && (
                          <div className="text-sm text-center text-red-500">
                            {errors.peopleComing}
                          </div>
                        )}
                      </div>
                    )}
                  </FieldArray>

                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="phoneNumber" className="text-right">
                      Phone Number
                    </Label>
                    <Field
                      as={Input}
                      id="phoneNumber"
                      name="phoneNumber"
                      className="col-span-3"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="col-span-4 text-sm text-red-500">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>

                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Field
                      as={Select}
                      name="status"
                      onValueChange={(value: string) =>
                        setFieldValue("status", value)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmed">Going</SelectItem>
                        <SelectItem value="Not Going">Not Going</SelectItem>
                      </SelectContent>
                    </Field>
                    {errors.status && touched.status && (
                      <div className="col-span-4 text-sm text-red-500">
                        {errors.status}
                      </div>
                    )}
                  </div>

                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Field
                      as={Input}
                      id="notes"
                      name="notes"
                      className="col-span-3"
                    />
                    {errors.notes && touched.notes && (
                      <div className="col-span-4 text-sm text-red-500">
                        {errors.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={confirmDelete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Reservation
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      Save Changes
                      {isLoading && (
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReservationEditForm;

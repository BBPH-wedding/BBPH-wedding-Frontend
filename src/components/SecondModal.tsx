import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "./Button";
import CodeInput from "./InputCode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resendCode, reservationConfirmation } from "@/hooks/CreateReservation";
import toast, { Toaster } from "react-hot-toast";
import {
  useFormModalStore,
  useReservationStore,
  useTokenStore,
} from "@/store/Store";
import { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  confirmationToken: Yup.string()
    .required("Please enter a code")
    .length(6, "Confirmation code must be 6 characters"),
});

interface SecondModalProps {
  isCodeModalOpen: boolean;
  setIsCodeModalOpen: (isOpen: boolean) => void;
}

const SecondModal: React.FC<SecondModalProps> = ({
  isCodeModalOpen,
  setIsCodeModalOpen,
}) => {
  const { setIsFormModalOpen } = useFormModalStore();
  const { userEmail } = useReservationStore();
  const { setToken } = useTokenStore();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempt, setAttempt] = useState(0);

  const handleResend = () => {
    resendCode({ email: userEmail });
    toast.success("Code resent successfully");
  };

  const handleDisabled = () => {
    handleResend();
    setButtonDisabled(true);
    setAttempt(attempt + 1);
    setTimeLeft(50);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setButtonDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 50000);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 50000);
  };

  useEffect(() => {
    if (attempt === 5) {
      setIsCodeModalOpen(false);
      setAttempt(0);
      toast.error("Too many attempts");
    }
  }, [attempt]);

  const formik = useFormik({
    initialValues: {
      confirmationToken: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await reservationConfirmation({
          ...values,
          email: userEmail,
        });

        if (!data) {
          return;
        }

        toast.success("Verified email successfully");
        setIsCodeModalOpen(false);
        setIsFormModalOpen(true);

        setToken(data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Error in confirmReservation:", error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCode = (code: string) => {
    formik.setFieldValue("confirmationToken", code);
  };

  return (
    <>
      <Toaster />
      <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
        <DialogContent className="bg-[#F0EBE0] rounded-lg text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center w-full mb-4 text-xl font-semibold text-black">
              <p className="text-sm text-center md:text-xl">
                Enter Confirmation Code
              </p>
            </DialogTitle>
            <DialogDescription className="text-center mb-10 text-sm md:text-[17px]">
              A confirmation code has been sent to your email. Please enter it
              below to complete your reservation.
            </DialogDescription>
          </DialogHeader>
          <div className="my-10">
            <form className="space-y-10" onSubmit={formik.handleSubmit}>
              <div>
                <label className="flex justify-center mb-3 text-sm font-semibold text-center text-black md:text-xl">
                  Confirmation Code
                </label>
                <div className="flex flex-col justify-center w-full">
                  <CodeInput
                    className={`p-5 bg-white/70 focus:outline-none ${
                      formik.touched.confirmationToken &&
                      formik.errors.confirmationToken
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                    {...formik.getFieldProps("confirmationToken")}
                    onChange={handleCode}
                  />
                  {formik.touched.confirmationToken &&
                    formik.errors.confirmationToken && (
                      <div className="mt-2 text-sm text-center text-red-600">
                        {formik.errors.confirmationToken}
                      </div>
                    )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full !mt-20 md:w-full hover:bg-white disabled:cursor-not-allowed"
                onClick={formik.handleSubmit}
                disabled={
                  formik.isSubmitting || Object.keys(formik.errors).length > 0
                }
              >
                {formik.isSubmitting ? "SENDING CODE..." : "SEND CODE"}
              </Button>

              <div className="flex items-center justify-center w-full !mt-5">
                <button
                  type="button"
                  className={`w-40 p-2 text-white font-semibold text-sm tracking-[0.3px] transition-all duration-300 rounded-full 
        ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primaryGreen hover:bg-primaryGreen/80"
        }`}
                  onClick={handleDisabled}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled
                    ? `Resend Code (${timeLeft}s)`
                    : "Resend again?"}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SecondModal;

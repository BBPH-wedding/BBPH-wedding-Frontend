import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "./Button";
import CodeInput from "./InputCode";

interface SecondModalProps {
  isCodeModalOpen: boolean;
  setIsCodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
}

const SecondModal: React.FC<SecondModalProps> = ({
  isCodeModalOpen,
  setIsCodeModalOpen,
  handleConfirm,
}) => {
  return (
    <>
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
            <form className="space-y-10" onSubmit={handleConfirm}>
              <div>
                <label className="flex justify-center mb-3 text-sm font-semibold text-center text-black md:text-xl">
                  Confirmation Code
                </label>
                <div className="flex justify-center w-full">
                  <CodeInput/>
                </div>
              </div>
            </form>
          </div>
          <Button type="submit" className="w-full md:w-full hover:bg-white" onClick={handleConfirm}>
            SEND CODE
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SecondModal;

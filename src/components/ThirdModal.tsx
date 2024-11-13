import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
import Button from "./Button";

interface ThirdModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleConfirm: () => void;
}

interface MemberInput {
  id: number;
  value: string;
}

const ThirdModal: React.FC<ThirdModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleConfirm,
}) => {
  const [memberCount, setMemberCount] = useState(1);
  const [memberInputs, setMemberInputs] = useState<MemberInput[]>([
    { id: 0, value: "" },
  ]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");

  const handleIncrement = () => {
    if (memberCount < 5) {
      setMemberCount((prev) => prev + 1);
      setMemberInputs((prev) => [...prev, { id: memberCount, value: "" }]);
    }
  };

  const handleDecrement = () => {
    if (memberCount > 1) {
      setMemberCount((prev) => prev - 1);
      setMemberInputs((prev) => prev.slice(0, -1));
    }
  };

  const handleMemberInputChange = (id: number, value: string) => {
    setMemberInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length === 0) return value;
    const cleaned = value.replace(/[^\d]/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return match.slice(1).filter(Boolean).join("-");
    }
    return value;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="bg-[#F0EBE0] rounded-lg text-black max-w-[95vw] w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-4 text-sm font-semibold text-center md:text-xl">
            Registration Form
          </DialogTitle>
          <DialogDescription className="mb-6 text-sm text-center sm:text-base">
          Please complete all required fields. In the &qoute;Important Notes&qoute; section, specify any allergies or disabilities that may require special attention at the event.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleConfirm}>
          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">
              Number of Members ({memberCount}/5)
            </label>

            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                onClick={handleDecrement}
                className="md:w-[5rem] w-[5rem] h-10 rounded-full !px-0 !py-0 hover:bg-white disabled:cursor-not-allowed"
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
                className="md:w-[5rem] w-[5rem] h-10 rounded-full !px-0 !py-0 hover:bg-white disabled:cursor-not-allowed"
                disabled={memberCount === 5}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">Member Names</label>
            <div className="space-y-3">
              {memberInputs.map((input) => (
                <input
                  key={input.id}
                  type="text"
                  value={input.value}
                  onChange={(e) =>
                    handleMemberInputChange(input.id, e.target.value)
                  }
                  placeholder={`Member Name ${input.id + 1}`}
                  className="w-full p-5 bg-white/70 focus:outline-none"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">Phone Number</label>
            <input
              type="tel"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneChange}
              placeholder="000-000-0000"
              className="w-full p-5 bg-white/70 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-black md:text-lg">Important Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write any important notes here..."
              className="w-full p-5 bg-white/70 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-full hover:bg-white"
            onClick={handleConfirm}
          >
            CONFIRM
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ThirdModal;

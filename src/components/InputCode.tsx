import React, { useRef, KeyboardEvent, ChangeEvent, useState } from "react";

interface CodeInputProps {
  length?: number;
  onChange?: (code: string) => void;
  value?: string;
  className?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({ length = 6, onChange, className }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [,setCode] = useState(""); 
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); 

    e.target.value = value.slice(-1); 

    if (value) {
      const newCode = getCodeFromInputs(index, value); 
      setCode(newCode); 

      onChange?.(newCode);

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const getCodeFromInputs = (currentIndex: number, currentValue: string): string => {
    const code = inputsRef.current.map((input, index) => {
      if (index === currentIndex) return currentValue; 
      return input?.value || ""; 
    });
    return code.join(""); 
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      !/^[0-9]$/.test(e.key) 
    ) {
      e.preventDefault();
      return;
    }

  
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    pastedData.split("").forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
        if (index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
      }
    });

    setCode(pastedData); 
    onChange?.(pastedData); 
  };

  React.useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          required
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className={`w-10 h-10 text-lg font-semibold text-center transition-all duration-200 border-2 border-gray-300 rounded-lg sm:w-12 sm:h-12 md:w-14 md:h-14 sm:text-xl md:text-2xl focus:outline-none focus:border-blue-500 ${className || ''}`}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          pattern="[0-9]*"
          autoComplete="off"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CodeInput;

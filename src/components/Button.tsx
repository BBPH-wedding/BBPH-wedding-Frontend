interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <>
      <button
        className="flex px-12 py-7 mt-40 text-white bg-[#272218]  hover:bg-[#F0EBE0] transition-all duration-300 font-semibold text-sm md:text-md hover:text-black"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

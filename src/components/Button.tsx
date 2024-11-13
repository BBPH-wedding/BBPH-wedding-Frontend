interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type, disabled }) => {
  return (
    <button
      className={`w-auto md:w-[20rem] items-center justify-center flex px-12 py-7 text-white bg-[#272218] hover:bg-[#F0EBE0] transition-all duration-300 font-semibold text-sm md:text-md hover:text-black ${className || ''}`}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

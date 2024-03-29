import React from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      className="w-[140px] h-[40px] bg-[#4a4a4a20] flex justify-center items-center text-[#686868] hover:shadow-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

import React from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

const PrimaryButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      className="w-[140px] h-[40px] bg-[#4a4a4a20] flex justify-center items-center text-[#a6a6a6] hover:text-[#686868] hover:shadow-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

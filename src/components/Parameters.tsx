import React, { useState } from "react";
import { clickIcon } from "../assets";

type ParameterProps = {
  parameters: Record<string, boolean>;
  onClick: (parameter: string) => void;
};

const Parameters: React.FC<ParameterProps> = ({ parameters, onClick }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleParameterSelection = (parameter: string) => {
    onClick(parameter);
    setClicked(true);
  };

  return (
    <div className="flex text-l select-none">
      <div className="grid grid-cols-2 auto-rows-fr">
        {Object.entries(parameters).map(([parameter, isActive], index) => (
          <p
            key={index}
            onClick={() => handleParameterSelection(parameter)}
            className={`${
              isActive
                ? "text-[#686868] hover:text-[#a6a6a6]"
                : "text-[#a6a6a6] hover:text-[#686868] hover:shadow-md"
            } w-[140px] h-[40px] bg-[#4a4a4a20] flex justify-center items-center font-bold cursor-pointer`}
          >
            {parameter.toUpperCase()}
          </p>
        ))}
        <img
          src={clickIcon}
          className={`${
            !clicked ? "visible" : "hidden"
          } w-6 h-6 absolute mt-6 ml-[-10px] rotate-45 animate-resize pointer-events-none`}
        />
      </div>
    </div>
  );
};

export default Parameters;

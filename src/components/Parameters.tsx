import React from "react";

type ParameterProps = {
  parameters: Record<string, boolean>;
  onClick: (parameter: string) => void;
};

const Parameters: React.FC<ParameterProps> = ({ parameters, onClick }) => {
  const handleParameterSelection = (parameter: string) => {
    onClick(parameter);
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
      </div>
    </div>
  );
};

export default Parameters;

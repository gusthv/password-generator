import { useState, useEffect } from "react";

type ParameterTypes = {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const App: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordLen, setPasswordLen] = useState<number>(12);
  const [parameters, setParameters] = useState<ParameterTypes>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyString, setCopyString] = useState<string>("");

  const handleGeneratePassword = () => {
    const { lowercase, uppercase, numbers, symbols } = parameters;

    if (!(lowercase || uppercase || numbers || symbols)) {
      setCopyString("Select a parameter!");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }

    const availablePool: string[] = [
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "0123456789",
      "!@#$%&=?+-*",
    ];

    const generatedPool: string[] = [];
    if (lowercase) generatedPool.push(availablePool[0]);
    if (uppercase) generatedPool.push(availablePool[1]);
    if (numbers) generatedPool.push(availablePool[2]);
    if (symbols) generatedPool.push(availablePool[3]);
    let passwordString = "";

    for (let i = 0; i < passwordLen; i++) {
      const chosenPool =
        generatedPool[Math.floor(Math.random() * generatedPool.length)];
      passwordString +=
        chosenPool[Math.floor(Math.random() * chosenPool.length)];
    }
    setPassword(passwordString);
  };

  const handleParameterSelection = (parameter: keyof ParameterTypes) => {
    setParameters((prevParameters) => ({
      ...prevParameters,
      [parameter]: !prevParameters[parameter],
    }));
  };

  const handleCopyToClipboard = async () => {
    if (isCopied) return;

    try {
      const clipboard = await navigator.clipboard.readText();
      if (password == clipboard) setCopyString("Already copied!");
      else {
        await navigator.clipboard.writeText(password);
        setCopyString("Copied!");
      }
    } catch (error) {
      setCopyString("Failed to copy!");
    }

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (passwordLen < 1) setPasswordLen(1);
    if (passwordLen > 16) setPasswordLen(16);
  }, [passwordLen]);

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <div className="h-screen flex items-center justify-center">
        <div>
          <p
            className={`w-[288px] mb-2 py-2 bg-[#4a4a4a5f]  border-translucent border-[2px] rounded-xl overflow-auto text-nowrap text-center font-bold text-xl ${
              isCopied ? "text-[white]" : "text-[#424242]"
            }`}
          >
            {isCopied ? copyString : password}
          </p>
          <div className="w-[288px] mb-2 grid grid-cols-2 gap-2 auto-rows-fr font-bold text-xl cursor-pointer select-none">
            <span
              className="w-[140px] h-[40px] bg-[#4a4a4a5f] border-translucent border-[2px] rounded-l-xl flex justify-center items-center text-[#424242] hover:text-[white]"
              onClick={handleGeneratePassword}
            >
              <p>GENERATE</p>
            </span>
            <span
              className="w-[140px] h-[40px] bg-[#4a4a4a5f] border-translucent border-[2px] rounded-r-xl flex justify-center items-center text-[#424242] hover:text-[white]"
              onClick={handleCopyToClipboard}
            >
              <p>COPY</p>
            </span>
          </div>
          <input
            type="number"
            value={passwordLen}
            min={1}
            max={16}
            onChange={(e) => setPasswordLen(Number(e.target.value))}
            className="w-[288px] bg-[#4a4a4a5f] border-translucent border-[2px] rounded-xl mb-2 py-2 px-4 text-[#424242] font-bold"
          />
          <div className="flex select-none">
            <div className="grid grid-cols-2 gap-2 auto-rows-fr rounded-b-2xl">
              {Object.keys(parameters).map((parameter, index) => (
                <p
                  key={index}
                  onClick={() =>
                    handleParameterSelection(
                      parameter as keyof typeof parameters
                    )
                  }
                  className={`${
                    parameters[parameter as keyof typeof parameters]
                      ? "text-[#424242] hover:text-[gray]"
                      : "text-[gray] hover:text-[#424242]"
                  } w-[140px] h-[40px] bg-[#4a4a4a5f] border-translucent border-[2px] flex justify-center items-center font-bold cursor-pointer ${
                    parameter.toUpperCase() == "SYMBOLS"
                      ? "rounded-r-xl"
                      : parameter.toUpperCase() == "NUMBERS"
                      ? "rounded-l-xl"
                      : parameter.toUpperCase() == "UPPERCASE"
                      ? "rounded-r-xl"
                      : parameter.toUpperCase() == "LOWERCASE"
                      ? "rounded-l-xl"
                      : ""
                  }`}
                >
                  {parameter.toUpperCase()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

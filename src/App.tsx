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
  const [copyFailed, setCopyFailed] = useState<boolean>(false);
  const [noParameters, setNoParameters] = useState<boolean>(false);
  const [copyString, setCopyString] = useState<string>("");

  const handleGeneratePassword = () => {
    const { lowercase, uppercase, numbers, symbols } = parameters;

    if (!(lowercase || uppercase || numbers || symbols)) {
      setCopyString("Select a parameter!");
      setNoParameters(true);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setNoParameters(false);
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
      setCopyFailed(true);
    }

    setIsCopied(true);
    setTimeout(() => {
      setCopyFailed(false);
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (passwordLen < 1) setPasswordLen(1);
    if (passwordLen > 32) setPasswordLen(32);
  }, [passwordLen]);

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#424242]">
      <div className="h-screen flex items-center justify-center">
        <div>
          <p
            className={`w-[288px] mb-2 py-2 bg-white rounded-t-xl overflow-auto text-nowrap text-center font-bold text-xl ${
              isCopied ? "text-[#46ffe6]" : "text-[#424242]"
            } ${
              copyFailed || noParameters ? "text-[#424242]" : ""
            } border-[#46ffe6] border-l-[2px] border-t-[2px] border-r-[2px]`}
          >
            {isCopied ? copyString : password}
          </p>
          <div className="w-[288px] mb-2 grid grid-cols-2 gap-2 auto-rows-fr text-white font-bold text-xl cursor-pointer select-none">
            <span
              className="w-[140px] h-[40px] bg-white border-[#46ffe6] border-[2px] flex justify-center items-center text-[#424242] hover:text-[#46ffe6]"
              onClick={handleGeneratePassword}
            >
              <p>GENERATE</p>
            </span>
            <span
              className="w-[140px] h-[40px] bg-white border-[#46ffe6] border-[2px] flex justify-center items-center text-[#424242] hover:text-[#46ffe6]"
              onClick={handleCopyToClipboard}
            >
              <p>COPY</p>
            </span>
          </div>
          <input
            type="number"
            value={passwordLen}
            min={1}
            max={32}
            onChange={(e) => setPasswordLen(Number(e.target.value))}
            className="w-[288px] bg-white border-[#46ffe6] mb-2 py-2 px-4 border-l-[2px] border-r-[2px] text-[#424242] font-bold"
          />
          <div className="flex select-none">
            <div className="bg-[#424242] grid grid-cols-2 gap-2 auto-rows-fr rounded-b-2xl">
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
                      ? "border-[#46ffe6] hover:border-[#424242] text-[#424242] hover:text-[gray]"
                      : "border-[#424242] hover:border-[#46ffe6] text-[gray] hover:text-[#46ffe6]"
                  } w-[140px] h-[40px] bg-white border-[2px] flex justify-center items-center rounded-sm font-bold cursor-pointer ${
                    parameter.toUpperCase() == "SYMBOLS"
                      ? "rounded-br-xl"
                      : parameter.toUpperCase() == "NUMBERS"
                      ? "rounded-bl-xl"
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

import { useState, useEffect } from "react";
import { Button, Parameters } from "./components";
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
      setCopyString("SELECT A PARAMETER!");
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

  const handleParameterSelection = (parameter: string) => {
    setParameters((prevParameters) => ({
      ...prevParameters,
      [parameter]: !prevParameters[parameter as keyof ParameterTypes],
    }));
  };

  const handleCopyToClipboard = async () => {
    if (isCopied) return;

    try {
      const clipboard = await navigator.clipboard.readText();
      if (password == clipboard) setCopyString("ALREADY COPIED!");
      else {
        await navigator.clipboard.writeText(password);
        setCopyString("COPIED!");
      }
    } catch (error) {
      setCopyString("FAILED TO COPY!");
    }

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (passwordLen < 4) setPasswordLen(4);
    if (passwordLen > 16) setPasswordLen(16);
  }, [passwordLen]);

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#ffffff] font-ubuntu">
      <div className="h-screen flex items-center justify-center">
        <div className="w-min-content h-min-content shadow-2xl">
          <p
            className={`w-[280px] py-2 bg-[#4a4a4a20] overflow-auto text-[#686868] text-xl text-nowrap text-center font-bold hover:shadow-md`}
          >
            {isCopied ? copyString : password}
          </p>
          <div className="w-[280px] grid grid-cols-2 auto-rows-fr select-none text-xl font-bold cursor-pointer">
            <Button onClick={handleGeneratePassword} text="CREATE" />
            <Button onClick={handleCopyToClipboard} text="COPY" />
          </div>
          <input
            type="number"
            value={passwordLen}
            min={4}
            max={16}
            onChange={(e) => setPasswordLen(Number(e.target.value))}
            className="w-[280px] bg-[#4a4a4a20] py-2 px-4 text-[#686868] font-bold hover:shadow-md"
          />
          <Parameters
            parameters={parameters}
            onClick={handleParameterSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

import { useColor } from "../context/ColorContext";
import ColorInput from "./ColorInput";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Route = () => {
  const { step } = useColor();
  if (step === 1) {
    return (<ColorInput />)
  } else if (step === 2) {
    return <Step2 />
  } else if (step === 3) {
    return <Step3 />
  }
};

export default Route;

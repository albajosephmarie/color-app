import { useColor } from "../context/ColorContext";
import ColorInput from "./ColorInput";
import Step2 from "./Step2";

const Route = () => {
  const { step } = useColor();
  if (step === 1) {
    return (<ColorInput />)
  } else if (step === 2) {
    return <Step2 />
  }
};

export default Route;

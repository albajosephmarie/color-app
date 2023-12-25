import { useState } from "react";
import { HslStringColorPicker } from "react-colorful";
import { useColor } from "../context/ColorContext";
import { colord } from "colord";

const InputHsl = () => {
  const { color, updateColor} = useColor();
  const [ colorInput, setColorInput ] = useState( colord(color).toHslString().toLowerCase());

  const handleChange = (updatedColor) =>{
    setColorInput(updatedColor)
    if (colord(updatedColor).isValid()) {
      updateColor(updatedColor);
    }
  }

  return (
    <div className="input-entry">
      <input
        className="input-color"
        type="text"
        value={colorInput}
        placeholder="rgb(0, 0, 0) - RGB"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="input-picker">
        <HslStringColorPicker color={colorInput} onChange={handleChange} />
      </div>
    </div>
  );
};

export default InputHsl;

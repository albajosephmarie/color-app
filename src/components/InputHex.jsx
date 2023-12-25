import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useColor } from "../context/ColorContext";
import { colord } from "colord";

const InputHex = () => {
  const { color, updateColor} = useColor();
  const [ colorInput, setColorInput ] = useState( colord(color).toHex());

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
        placeholder="#ffffff - Hex"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="input-picker">
        <HexColorPicker color={colorInput} onChange={handleChange} />
      </div>
    </div>
  );
};

export default InputHex;

import { useState } from "react";
import InputHex from "./InputHex";
import InputRgb from "./InputRgb";
import InputHsl from "./InputHsl";
import InputShades from "./InputShades"
import "./ColorInput.css";
import { useColor } from "../context/ColorContext"

const ColorInput = () => {
  const { generatePalette } = useColor()
  const [colorFormat, setColorFormat] = useState("RGB");
  const handleFormatChange = (format) => {
    setColorFormat(format);
  };
  return (
    <div className="color-input-card">
      <h2 className="title">Generate Palette</h2>
      <div className="color-input-container">
        <div className="radio-option">
          <input
            type="radio"
            id="hexInput"
            name="colorFormat"
            value="HEX"
            checked={colorFormat === "HEX"}
            onChange={() => handleFormatChange("HEX")}
          />
          <label htmlFor="hexInput">Hex</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="rgbInput"
            name="colorFormat"
            value="RGB"
            checked={colorFormat === "RGB"}
            onChange={() => handleFormatChange("RGB")}
          />
          <label htmlFor="rgbInput">Rgb</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="hslInput"
            name="colorFormat"
            value="HSL"
            checked={colorFormat === "HSL"}
            onChange={() => handleFormatChange("HSL")}
          />
          <label htmlFor="hslInput">Hsl</label>
        </div>
      </div>
      <div className="input-color-container">
      { colorFormat === "HEX" && <InputHex /> }
      { colorFormat === "RGB" && <InputRgb /> }
      { colorFormat === "HSL" && <InputHsl /> }
      </div>
      <InputShades />
      <button className="generate-button" onClick={generatePalette}>Generate</button>
    </div>
  );
};

export default ColorInput;

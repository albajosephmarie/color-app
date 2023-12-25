import { useState } from "react";
import { useColor } from "../context/ColorContext";

const InputShades = () => {
  const { numberOfShades, updateNumberOfShades } = useColor();
  const [number, setNumber] = useState(numberOfShades);

  const handleShadesChange = (e) => {
    setNumber(e.target.value)
    if (! isNaN(e.target.value)) {
      const newValue = parseInt(e.target.value, 10);
      updateNumberOfShades(newValue);
    }
  };

  return (
    <div className="shades-input-container">
      <fieldset className="input-entry">
        <legend>Number of shades</legend>
        <input
          type="number"
          id="ShadesID"
          name="shades"
          value={number}
          min={1}
          max={20}
          onChange={(e) => handleShadesChange(e)}
        />
      </fieldset>
    </div>
  );
};

export default InputShades;

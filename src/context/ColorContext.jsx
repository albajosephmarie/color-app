import { createContext, useContext, useReducer } from "react";
import { calcAPCA } from "apca-w3";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import mixPlugin from "colord/plugins/mix";
extend([mixPlugin]);
extend([a11yPlugin]);

const initialState = {
  color: colord("#4272a1").toHex(),
  numberOfShades: 10,
  shades: [],
  chosenPalette: [],
  step: 1,
  shadesIndex: 0,
  generatedColorIndex: 0
};

const ColorContext = createContext(initialState);
// eslint-disable-next-line react/prop-types
export function ColorProvider({ children }) {
  const [state, dispatch] = useReducer(colorReducer, initialState);

  const updateColor = (color) => {
    const updatedColor = colord(color).toHex();
    dispatch({
      type: "UPDATE_COLOR",
      payload: { color: updatedColor },
    });
  };

  const updateNumberOfShades = (shades) => {
    dispatch({
      type: "UPDATE_NUMBER_OF_SHADES",
      payload: { numberOfShades: shades },
    });
  };

  const generatePalette = () => {
    dispatch({
      type: "GENERATE_PALETTE",
    });
  };

  const chooseShadeIndex = (i) => {
    dispatch({
      type: "CHOOSE_SHADE_INDEX",
      payload: { shadesIndex: i }
    })
  }

  const choosePaletteColor = (shadesIndex, colorIndex) => {
    dispatch({
      type: "CHOOSE_PALETTE_COLOR",
      payload: { shadesIndex, colorIndex }
    })
  }

  const enterColor = () => {
    dispatch({
      type: "ENTER_COLOR"
    })
  }

  const savePalette = () => {
    console.log('save palette')
    dispatch({
      type: "SAVE_PALETTE"
    })
  }

  const pickColors = () => {
    dispatch({ 
      type: "PICK_COLORS"
    });
  }

  const value = {
    color: state.color,
    numberOfShades: state.numberOfShades,
    shades: state.shades,
    step: state.step,
    shadesIndex: state.shadesIndex,
    chosenPalette: state.chosenPalette,
    generatedColorIndex: state.generatedColorIndex,
    enterColor,
    savePalette,
    updateColor,
    pickColors,
    updateNumberOfShades,
    generatePalette,
    chooseShadeIndex,
    choosePaletteColor
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export const useColor = () => {
  const context = useContext(ColorContext);
  return context;
};

function contrastChecker(color, colorArray) {
  const newArray = colorArray
    .filter((c) => c.color !== color)
    .map((c) => {
      return {
        ...c,
        contrast: colord(color).contrast(c.color),
        apca: parseFloat(calcAPCA(c.color, color).toFixed(1)),
        AANormal: colord(color).isReadable(c.color, {
          level: "AA",
          size: "normal",
        }),
        AALarge: colord(color).isReadable(c.color, {
          level: "AA",
          size: "large",
        }),
        AAANormal: colord(color).isReadable(c.color, {
          level: "AAA",
          size: "normal",
        }),
        AAALarge: colord(color).isReadable(c.color, {
          level: "AAA",
          size: "large",
        }),
      };
    });
  return newArray;
}

function colorReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "ENTER_COLOR": {
      return { ...state, step: 1}
    }
    case "PICK_COLORS": {
      return { ...state, step: 2}
    }    
    case "SAVE_PALETTE": {
      return { ...state, step: 3}
    }
    case "UPDATE_COLOR": {
      const newColor = colord(payload.color).toHex();
      return { ...state, color: newColor };
    }
    case "UPDATE_NUMBER_OF_SHADES": {
      return { ...state, numberOfShades: payload.numberOfShades };
    }
    case "GENERATE_PALETTE": {
      const halfShades = Math.floor(state.numberOfShades / 2);
      const halfTints = state.numberOfShades - halfShades + 1;
      const color = colord(state.color);
      const generatedColor = color.toHex();
      const shades0 = color
        .shades(halfShades + 1)
        .map((c) => c.toHex())
        .slice(0, -1);
      const tints0 = color
        .tints(halfTints + 1)
        .map((c) => c.toHex())
        .slice(1, -1)
        .reverse();
      const shades1 = [...tints0, ...shades0].map((c, i) => {
        return { color: c, key: (i + 1) * 100 };
      });
      const shades = shades1.map((e, i, arr) => {
        return { ...e, data: contrastChecker(e.color, arr) };
      });
      const chosenPalette = shades.map((e) => {
        return { backgroundKey: e.key, backgroundColor: e.color, colorKey: 'none', color: 'none', contrast: 0, apca: 0, AANormal: false, AALarge: false, AAANormal: false, AAALarge: false }
      })
      const generatedColorIndex = shades.findIndex( e =>  e.color === generatedColor )
      return { ...state, shades, color: generatedColor, generatedColorIndex, chosenPalette, step: 2 };
    }
    case "CHOOSE_SHADE_INDEX": {
      return { ...state, shadesIndex: payload.shadesIndex }
    }
    case "CHOOSE_PALETTE_COLOR": {
      const shadesColor = state.shades[payload.shadesIndex]
      const textColor = shadesColor.data[payload.colorIndex]
      const chosenColor = {
        backgroundKey: shadesColor.key,
        backgroundColor: shadesColor.color,
        colorKey: textColor.key,
        color: textColor.color,
        contrast: textColor.contrast,
        apca: textColor.apca,
        AANormal: textColor.AANormal,
        AALarge: textColor.AALarge,
        AAANormal: textColor.AAANormal,
        AAALarge: textColor.AAALarge,
      }
      const chosenPalette = [...state.chosenPalette]
      chosenPalette[payload.shadesIndex] = chosenColor
      return { ...state, chosenPalette }
    }
    default:
      return state;
  }
}

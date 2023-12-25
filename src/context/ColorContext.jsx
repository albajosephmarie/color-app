import { createContext, useContext, useReducer } from "react";
import { applyDarkModeEffect } from "../utils/tinyColorUtils";
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
  darkModeShades: [],
  darkModeChosenPalette: [],
  step: 1,
  shadesIndex: 0,
  generatedColorIndex: 0,
  mode: 'light',
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

  const chooseDarkModePaletteColor = (shadesIndex, colorIndex) => {
    dispatch({
      type: "CHOOSE_DARK_MODE_PALETTE_COLOR",
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

  const setDarkMode = () => {
    dispatch({
      type: "SET_DARK_MODE"
    })
  }

  const setLightMode = () => {
    dispatch({
      type: "SET_LIGHT_MODE"
    })
  }

  const value = {
    mode: state.mode,
    color: state.color,
    numberOfShades: state.numberOfShades,
    shades: state.shades,
    step: state.step,
    shadesIndex: state.shadesIndex,
    chosenPalette: state.chosenPalette,
    generatedColorIndex: state.generatedColorIndex,
    darkModeShades: state.darkModeShades,
    darkModeChosenPalette: state.darkModeChosenPalette,
    setDarkMode,
    setLightMode,
    enterColor,
    savePalette,
    updateColor,
    pickColors,
    updateNumberOfShades,
    generatePalette,
    chooseShadeIndex,
    choosePaletteColor,
    chooseDarkModePaletteColor
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
    case "SET_DARK_MODE": {
      return { ...state, mode: 'dark'}
    }
    case "SET_LIGHT_MODE": {
      return { ...state, mode: 'light'}
    }
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
      const darkModeShades = shades.map( e =>  ({...e, color: applyDarkModeEffect(e.color)})).map((e, i, arr) => {
        return { ...e, data: contrastChecker(e.color, arr) };
      });
      console.log('dark', darkModeShades)
      const darkModeChosenPalette = darkModeShades.map((e) => {
        return { backgroundKey: e.key, backgroundColor: e.color, colorKey: 'none', color: 'none', contrast: 0, apca: 0, AANormal: false, AALarge: false, AAANormal: false, AAALarge: false }
      })
      
      const generatedColorIndex = shades.findIndex( e =>  e.color === generatedColor )
      return { ...state, shades, color: generatedColor, generatedColorIndex, chosenPalette, darkModeShades, darkModeChosenPalette, step: 2 };
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
    case "CHOOSE_DARK_MODE_PALETTE_COLOR": {
      const darkModeShadesColor = state.darkModeShades[payload.shadesIndex]
      const textColor = darkModeShadesColor.data[payload.colorIndex]
      const darkModeChosenColor = {
        backgroundKey: darkModeShadesColor.key,
        backgroundColor: darkModeShadesColor.color,
        colorKey: textColor.key,
        color: textColor.color,
        contrast: textColor.contrast,
        apca: textColor.apca,
        AANormal: textColor.AANormal,
        AALarge: textColor.AALarge,
        AAANormal: textColor.AAANormal,
        AAALarge: textColor.AAALarge,
      }
      const darkModeChosenPalette = [...state.darkModeChosenPalette]
      darkModeChosenPalette[payload.shadesIndex] = darkModeChosenColor
      return { ...state, darkModeChosenPalette}
    }
    default:
      return state;
  }
}

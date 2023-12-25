// Import the Colord library
import { colord } from "colord";

// Example function using Colord to mimic CSS filter: brightness(0.8) contrast(1.2)
export function generateDarkModeColors(lightModePalette) {
  const darkModePalette = [];

  // Adjust these factors based on how you want to mimic the filter
  const brightnessFactor = 0.8;
  const contrastFactor = 1.2;

  for (const color of lightModePalette) {
    let modifiedColor = colord(color);

    // Adjust brightness
    if (brightnessFactor < 1) {
      modifiedColor = modifiedColor.darken((1 - brightnessFactor) * 100); // darken
    } else if (brightnessFactor > 1) {
      modifiedColor = modifiedColor.lighten((brightnessFactor - 1) * 100); // lighten
    }

    // Adjust contrast
    if (contrastFactor < 1) {
      modifiedColor = modifiedColor.desaturate((1 - contrastFactor) * 100); // desaturate
    } else if (contrastFactor > 1) {
      modifiedColor = modifiedColor.saturate((contrastFactor - 1) * 100); // saturate
    }

    darkModePalette.push(modifiedColor.toHex());
  }
  console.log('palette',lightModePalette)
  console.log('darkMode', darkModePalette)
  return darkModePalette;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function applyFilters(color) {
  let rgb = colord(color).toRgbString();
  let brightness = 0.8;
  let contrast = 1.2;

  let r = Math.min(255, Math.max(0, (rgb.r - 128) * contrast + 128 * brightness));
  let g = Math.min(255, Math.max(0, (rgb.g - 128) * contrast + 128 * brightness));
  let b = Math.min(255, Math.max(0, (rgb.b - 128) * contrast + 128 * brightness));

  return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
}

export function getDarkModeColors(lightModeColors) {
  const darkModeColors = lightModeColors.map(applyFilters);
  console.log('light', lightModeColors)
  console.log('dark', darkModeColors)
  return darkModeColors
}
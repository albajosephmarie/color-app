const colord = require('colord');

// Function using colord to mimic CSS filter: brightness(0.8) contrast(1.2)
function mimicFilter(lightModePalette) {
  const darkModePalette = [];

  // Adjust these factors based on how you want to mimic the filter
  const brightnessFactor = 0.8;
  const contrastFactor = 1.2;

  for (const color of lightModePalette) {
    const modifiedColor = colord(color)
      .brightness(brightnessFactor)
      .contrast(contrastFactor)
      .toHex();

    darkModePalette.push(modifiedColor);
  }

  return darkModePalette;
}

// Example light mode palette
const lightModePalette = ["#ffffff", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"];

// Mimic filter: brightness(0.8) contrast(1.2)
const darkModePalette = mimicFilter(lightModePalette);
console.log(darkModePalette);

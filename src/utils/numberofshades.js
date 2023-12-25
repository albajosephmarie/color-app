// Import TinyColor library (make sure to include it in your project)
// Example using CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.1/tinycolor.min.js"></script>

// Example function using TinyColor
function generateShades(color, numShades) {
  const originalColor = tinycolor(color);
  const shades = [originalColor.toHexString()]; // Start with the original color

  for (let i = 1; i <= numShades / 2; i++) {
    const lightenedColor = originalColor.lighten(i * 10).toHexString();
    const darkenedColor = originalColor.darken(i * 10).toHexString();

    // Add both lightened and darkened colors to the array
    shades.unshift(darkenedColor); // Add to the beginning of the array
    shades.push(lightenedColor);   // Add to the end of the array
  }

  return shades;
}

// Example usage
const originalColor = "#3498db"; // Replace with your desired color
const numShades = 5; // Replace with your desired number of shades

const colorShades = generateShades(originalColor, numShades);
console.log(colorShades);

import tinycolor from "tinycolor2";

export function applyDarkModeEffect(color) {
  // Create a TinyColor object from the original color
  const originalColor = tinycolor(color);
  console.log("original", originalColor);

  // Adjust brightness (similar to filter: brightness(.8))
  const darkModeColor = originalColor.brighten(-20); // You can adjust the value (-100 to 100) based on your preference

  // Adjust contrast (similar to filter: contrast(1.2))
  const darkModeColorContrast = darkModeColor.saturate(10); // You can adjust the value (-100 to 100) based on your preference

  // Get the dark mode color in hex format
  return darkModeColorContrast.toHexString();
}

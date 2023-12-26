export const colorAppSvgDownload = (palette, darkModePalette) => {
  const squaresPerLine = 5;
  const squareWidth = 200;
  const squareHeight = 200;
  const margin = 10;
  const titleHeight = 40;
  const svgWidth = squaresPerLine * (squareWidth + margin) + margin;
  const svgHeight =
    Math.ceil((palette.length + 1) / squaresPerLine) * (squareHeight + margin) +
    margin +
    titleHeight;
  const svgDarkModeHeight =
    Math.ceil((darkModePalette.length + 1) / squaresPerLine) * (squareHeight + margin) +
    margin +
    titleHeight;

  const borderStrokeWidth = 2;
  const borderStrokeColor = '#ccc';
  console.log("palette", palette);

  const downloadSvg = (title) => {
    const svgContent = `
    <svg width="${svgWidth}" height="${svgHeight+svgDarkModeHeight}" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="30" font-size="24" font-weight="bold">Light Mode</text>
    ${palette.map(
      (e, index) => `
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${Math.floor(index / squaresPerLine) * (squareHeight + margin) + titleHeight}" 
            width="${squareWidth}" 
            height="200" 
            fill="white"    
            stroke="${borderStrokeColor}"
            stroke-width="${borderStrokeWidth}" />
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${Math.floor(index / squaresPerLine) * (squareHeight + margin) + titleHeight}" 
            width="${squareWidth}" 
            height="100" 
            fill="${e.backgroundColor}" />    
    `).join('')}
    <text x="10" y="${svgHeight+30}" font-size="24" font-weight="bold">Dark Mode</text>
    ${darkModePalette.map(
      (e, index) => `
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${svgHeight+Math.floor(index / squaresPerLine) * (squareHeight + margin) + titleHeight}" 
            width="${squareWidth}" 
            height="200" 
            fill="white"    
            stroke="${borderStrokeColor}"
            stroke-width="${borderStrokeWidth}" />
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${svgHeight+Math.floor(index / squaresPerLine) * (squareHeight + margin) + titleHeight}" 
            width="${squareWidth}" 
            height="100" 
            fill="${e.backgroundColor}" />    
    `).join('')}
    </svg>    
    `;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kd_colorapp.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  downloadSvg();
};

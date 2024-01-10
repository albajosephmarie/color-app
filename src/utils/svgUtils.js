export const colorAppSvgDownload = (palette, darkModePalette) => {
  const squaresPerLine = 5;
  const squareWidth = 200;
  const squareHeight = 150;
  const margin = 10;
  const titleHeight = 40;
  const svgWidth = squaresPerLine * (squareWidth + margin) + margin;
  const svgHeight =
    Math.ceil((palette.length + 1) / squaresPerLine) * (squareHeight + margin) +
    margin +
    titleHeight;
  const svgDarkModeHeight =
    Math.ceil((darkModePalette.length + 1) / squaresPerLine) *
      (squareHeight + margin) +
    margin +
    titleHeight;

  const borderStrokeWidth = 2;
  const borderStrokeColor = "#ccc";
  console.log("palette", palette);

  const readable = (normal, large, char) => {
    if (normal) {
      return " " + char + char + " ";
    } else if (large) {
      return " " + char + char + char;
    } else {
      return " " + char + char + " x";
    }
  };

  const readableColor = (normal, large) => {
    return normal || large ? "green" : "red";
  };

  const downloadSvg = (title) => {
    const svgContent = `
    <svg viewBox="0 0 ${svgWidth} ${
      svgHeight + svgDarkModeHeight + 30
    }" viewwidth="${svgWidth}" height="${
      svgHeight + svgDarkModeHeight + 30
    }" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="30" font-size="24" font-weight="bold">Light Mode</text>
    ${palette
      .map((e, index) => `
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight
            }" 
            width="${squareWidth}" 
            height="150" 
            fill="white"    
            stroke="${borderStrokeColor}"
            stroke-width="${borderStrokeWidth}" />
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight
            }" 
            width="${squareWidth}" 
            height="80" 
            fill="${e.backgroundColor}" />    
      

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 20
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              36
            }" 
            font-size="16" 
            font-weight="normal"
            fill="${e.color}">
            ${"+"}${e.apca}</text>

      <rect x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 90
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              16
            }"  
            width="90" 
            height="25" 
            fill="${readableColor(e.AANormal, e.AALarge)}" />  

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 100
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              36
            }" 
            font-size="16" 
            font-weight="normal"
            fill="white">
            ${"+"}${readable(e.AANormal, e.AALarge, "a")}</text>
                              
      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 20
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              64
            }" 
            font-size="16" 
            font-weight="normal"
            fill="${e.color}"
            >
            ${"+"}${e.contrast}:1</text>
      
      
      <rect x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 90
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              44
            }"  
            width="90" 
            height="25" 
            fill="${readableColor(e.AAANormal, e.AAALarge)}" />  

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 100
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              64
            }" 
            font-size="16" 
            font-weight="normal"
            fill="white">
            ${"+"}${readable(e.AAANormal, e.AAALarge, "A")}</text>

    
      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 20
      }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              110
            }" 
            font-size="16" 
            font-weight="normal"
            fill="black"
            text-anchor="start">
            ${"+"}${e.backgroundKey}</text>

        <text x="${
          (index % squaresPerLine) * (squareWidth + margin) + margin + 20
        }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              128
            }" 
            font-size="16" 
            font-weight="normal"
            fill="black"
            text-anchor="start">
            ${"+"}${e.backgroundColor}</text>

        <text x="${
          (index % squaresPerLine) * (squareWidth + margin) + margin + 100
        }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              110
            }" 
            font-size="16" 
            font-weight="normal"
            fill="black"
            text-anchor="start">
            ${"+"}T</text>

        <text x="${
          (index % squaresPerLine) * (squareWidth + margin) + margin + 120
        }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              110
            }" 
            font-size="16" 
            font-weight="normal"
            fill="black"
            text-anchor="start">
            ${"+"}${e.colorKey}</text>
        
        <text x="${
          (index % squaresPerLine) * (squareWidth + margin) + margin + 100
        }" 
            y="${
              Math.floor(index / squaresPerLine) * (squareHeight + margin) +
              titleHeight +
              128
            }" 
            font-size="16" 
            font-weight="normal"
            fill="black"
            text-anchor="start">
            ${"+"}${e.color}</text>
    `)
      .join("")}
    <text x="10" y="${
      svgHeight + 30
    }" font-size="24" font-weight="bold">Dark Mode</text>
    ${darkModePalette
      .map(
        (e, index) => `
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight
          }" 
          width="${squareWidth}" 
          height="150" 
          fill="white"    
          stroke="${borderStrokeColor}"
          stroke-width="${borderStrokeWidth}" />
      
      <rect x="${(index % squaresPerLine) * (squareWidth + margin) + margin}" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight
          }" 
          width="${squareWidth}" 
          height="80" 
          fill="${e.backgroundColor}" />    
      
      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 20
      }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            36
          }" 
          font-size="16" 
          font-weight="normal"
          fill="${e.color}">
          ${"+"}${e.apca}</text>

    <rect x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 90
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            16
          }"  
          width="90" 
          height="25" 
          fill="${readableColor(e.AANormal, e.AALarge)}" />  

    <text x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 100
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            36
          }" 
          font-size="16" 
          font-weight="normal"
          fill="white">
          ${"+"}${readable(e.AANormal, e.AALarge, "a")}</text>
                            
    <text x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 20
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            64
          }" 
          font-size="16" 
          font-weight="normal"
          fill="${e.color}">
          ${"+"}${e.contrast}:1</text>
    
    
    <rect x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 90
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            44
          }"  
          width="90" 
          height="25" 
          fill="${readableColor(e.AAANormal, e.AAALarge)}" />  

    <text x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 100
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            64
          }" 
          font-size="16" 
          font-weight="normal"
          fill="white">
          ${"+"}${readable(e.AAANormal, e.AAALarge, "A")}</text>

  
    <text x="${
      (index % squaresPerLine) * (squareWidth + margin) + margin + 20
    }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            110
          }" 
          font-size="16" 
          font-weight="normal"
          fill="black"
          text-anchor="start">
          ${"+"}${e.backgroundKey}</text>

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 20
      }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            128
          }" 
          font-size="16" 
          font-weight="normal"
          fill="black"
          text-anchor="start">
          ${"+"}${e.backgroundColor}</text>

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 100
      }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            110
          }" 
          font-size="16" 
          font-weight="normal"
          fill="black">
          ${"+"}T</text>

      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 120
      }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            110
          }" 
          font-size="16" 
          font-weight="normal"
          fill="black">
          ${"+"}${e.colorKey}</text>
      
      <text x="${
        (index % squaresPerLine) * (squareWidth + margin) + margin + 100
      }" 
          y="${
            svgHeight +
            Math.floor(index / squaresPerLine) * (squareHeight + margin) +
            titleHeight +
            128
          }" 
          font-size="16" 
          font-weight="normal"
          fill="black">
          ${"+"}${e.color}</text>
    `
      )
      .join("")}
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


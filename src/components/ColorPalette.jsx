import { useColor } from "../context/ColorContext";

const ColorPalette = ({ step }) => {
  const { mode, shades, darkModeShades, shadesIndex, generatedColorIndex, chooseShadeIndex, chosenPalette, darkModeChosenPalette } = useColor();
  const show = (a) => a ? "inline-block" : "none";
  const background = (a) => a ? "#c8e2fd" : "#fff";

  const checkMark = (e) => {
    if (step === 2) {
      const chosenPaletteToShow = (mode === 'dark')
        ? darkModeChosenPalette
        : chosenPalette
      const colorPalette = chosenPaletteToShow.filter(c => c.backgroundKey === e.key)
      const visible = (colorPalette[0].color !== "none")
      return (<div style={{ color: "green", marginLeft: "0.2rem", marginRight: "0.2rem", display: `${show(visible)}` }}>
        &#x2713;
      </div>);
    }
  }

  const handleClick = (i) => {
    if (step === 2) {
      chooseShadeIndex(i);
    }
  }

  let shadesToShow
  if (step === 2) {
    shadesToShow = (mode === 'dark')
      ? darkModeShades
      : shades
  } else if (step === 3) {
    shadesToShow = shades
  } else if (step === 30) {
    shadesToShow = darkModeShades
  }
  return (
    <div style={{ width: "16rem" }}>
      {shadesToShow.map((e, i) => {
        const style = { margin: "0 auto"}
        if (i===shadesIndex && step == 2) {
          style.background = '#c8e2fd'
        }
        return (
          <div
            key={e.key}
            style={style}
            // style={{
            //   backgroundColor: `${background(i == shadesIndex && step === 2)}`,
            //   margin: "0 auto",
            // }}
            onClick={() => handleClick(i)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: e.color,
                  width: "3rem",
                  height: "2.8rem",
                  display: "inline-block",
                  borderRadius: "50%",
                  margin: "0.8rem",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    width: "1rem",
                    height: "1rem",
                    display: `${show(i === generatedColorIndex)}`,
                    borderRadius: "50%",
                    marginTop: "0.8rem",
                    marginLeft: "0.9rem",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "1.2rem", color: "#333", fontWeight: "bold" }}>
                  {e.key}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#333", borderTop: "1px solid #ccc" }}>{e.color}</div>
              </div>
              {
                checkMark(e)
              }
            </div>
          </div>
        );
      })}
    </div>
  )
}
export default ColorPalette;

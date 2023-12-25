import { useColor } from "../context/ColorContext"
import ColorContrast from "./ColorContrast"
import ColorPalette from "./ColorPalette"
import ChosenPalette from "./ChosenPalette"
import BreadCrumbs from "./BreadCrumbs"

const ColorHeader = () => {
  const { color } = useColor()
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      margin: "0.4rem"
    }}>
      <div style={{ fontWeight: 'bold' }}>{color}</div>
    </div>
  )
}

const ColorMode = () => {
  const { mode, setDarkMode, setLightMode } = useColor()

  const handleDarkModeClick = () => {
    if (mode === 'light') {
      setDarkMode()
    }
  }

  const handleLightModeClick = () => {
    if (mode === 'dark') {
      setLightMode()
    }
  }

  const lightModeButtonStyle = { width: "50%", border: "1px solid #ccc", textAlign: "center", padding: "0.2rem", fontSize: "1.2rem", color: "black", background: '#ccc', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }
  const darkModeButtonStyle = { width: "50%", border: "1px solid #ccc", textAlign: "center", padding: "0.2rem", fontSize: "1.2rem", borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }

  if (mode === 'dark') {
    darkModeButtonStyle.background = 'black';
  }

  return (
    <div style={{
      display: 'flex', marginTop: "0.4rem", marginBottom: "0.4rem"
    }}>
      <button style={lightModeButtonStyle} onClick={handleLightModeClick}>&#9728;</button>
      <button style={darkModeButtonStyle} onClick={handleDarkModeClick}>&#127769;</button>
    </div>
  )
}

const Main = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: "1px solid #ccc",
        padding: "0.4rem"
      }}>
        <ColorHeader />
        <ColorMode />
        <ColorPalette step={2} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        <ColorContrast />
        <ChosenPalette step={2} />
      </div>
    </div>
  )
}

const Header = () => {
  const { enterColor, savePalette } = useColor();
  const handleClick = () => {
    enterColor()
  }
  const handleSave = () => {
    savePalette()
  }

  return (
    <div style={{
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: "space-between",
      marginBottom: "0.4rem"
    }}>
      <button style={{ alignSelf: "flex-end", color: "#93bfec", background: "white", fontWeight: "bold", padding: ".5em 1em", border: "1px solid #ccc" }} onClick={handleClick}>&nbsp;&lt;&nbsp;GO BACK</button>
      <button style={{ alignSelf: "flex-end", color: "white", background: "#93bfec", padding: ".5em 1em", border: "1px solid #ccc" }} onClick={handleSave}>&nbsp;STEP 3: SAVE &gt;&nbsp;</button>
    </div>
  )
}

const Step2 = () => {
  const { mode } = useColor()
  const style = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
    color: 'black',
    background: 'white'
  }
  if (mode === 'dark') {
    style.color = 'white';
    style.background = 'black';
  }
  return (
    <div style={style}>
      <BreadCrumbs step={2} />
      <Header />
      <Main />
    </div>
  )
}

export default Step2
import { useColor } from "../context/ColorContext"
import ColorContrast from "./ColorContrast"
import ColorPalette from "./ColorPalette"
import ChosenPalette from "./ChosenPalette"
import BreadCrumbs from "./BreadCrumbs"

const Main = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
    }}>
      <ColorPalette step={2} />
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
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '1rem',
      marginRight: '1rem',
      marginTop: '1rem',
    }}>
      <BreadCrumbs step={2}/>
      <Header />
      <Main />
    </div>
  )
}

export default Step2
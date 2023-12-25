import { useColor } from "../context/ColorContext"
import BreadCrumbs from "./BreadCrumbs"
import ColorPalette from './ColorPalette'
import ChosenPalette from "./ChosenPalette"

const Main = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
    }}>
      <ColorPalette step={3} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        <ChosenPalette step={3} />
      </div>
    </div>
  )
}

const Header = () => {
  const { pickColors, savePalette } = useColor();
  const handleClick = () => {
    pickColors()
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
      <button style={{ alignSelf: "flex-end", color: "white", background: "#93bfec", padding: ".5em 1em", border: "1px solid #ccc" }} onClick={handleSave}>&nbsp;DOWNLOAD AS SVG&gt;&nbsp;</button>
    </div>
  )
}


const Step3 = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '1rem',
      marginRight: '1rem',
      marginTop: '1rem',
    }}>
      <BreadCrumbs step={3}/>
      <Header />
      <Main />
    </div>
  )
}

export default Step3
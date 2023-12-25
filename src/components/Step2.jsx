import { useColor } from "../context/ColorContext"
import ColorContrast from "./ColorContrast"
import ColorPalette from "./ColorPalette"
import ChosenPalette from "./ChosenPalette"


const Main = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
    }}>
      <ColorPalette />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        <ColorContrast />
        <ChosenPalette />
      </div>
    </div>
  )
}

const Header = () => {
  const { enterColor } = useColor();
  const handleClick = () => {
    enterColor()
  }
  return (
    <div style={{
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: "space-between",
      marginBottom: "0.4rem"
    }}>
      <button style={{ color: "#93bfec", background: "white", fontWeight: "bold", padding: ".5em 1em", border: "1px solid #ccc" }} onClick={handleClick}>{"< GO BACK "}</button>
      <div style={{display: 'flex', justifyContent: 'space-between', width: "30rem", fontSize: "0.8rem", color: "#222"}}><div><span><span style={{color: "white", background:"#93bfec", borderRadius: "50%", padding: "0.2rem"}}>&#x2713;</span>&nbsp;Generate palette&nbsp;<span style={{ color: "#ccc"}}>&mdash;&mdash;&mdash;</span></span><span>&nbsp;&nbsp;<span style={{color: "white", background:"#93bfec", borderRadius: "50%", padding: "0.2rem"}}>&#x2713;</span>&nbsp;Match colors&nbsp;&mdash;&mdash;&mdash;</span><span>&nbsp;&nbsp;<span style={{color: "white", background:"#93bfec", borderRadius: "50%", padding: "0.2rem"}}>&#x2713;</span>&nbsp;Save</span></div></div>
      <button style={{ color: "white", background: "#93bfec", padding: ".5em 1em", border: "1px solid #ccc"}}>Download as SVG</button>
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
      <Header />
      <Main />
    </div>
  )
}

export default Step2
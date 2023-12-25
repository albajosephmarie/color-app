import ColorContrast from "./ColorContrast"
import ColorPalette from "./ColorPalette"
import ChosenPalette from "./ChosenPalette"

const Step2 = () => {
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

export default Step2
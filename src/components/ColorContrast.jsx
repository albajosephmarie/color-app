import { useState, useEffect } from 'react'
import { useColor } from '../context/ColorContext';


const ColorContrast = () => {
  const { shades, shadesIndex, choosePaletteColor } = useColor();
  const [ selected, setSelected ] = useState(null)
  const color = shades[shadesIndex].color;
  const colorKey = shades[shadesIndex].key;
  console.log('shades', shades[shadesIndex])

  useEffect(()=>{
    setSelected(null)
  }, [shadesIndex])

  const readable = (normal, large, char) => {
    if (normal) {
      return <div style={{ background: 'green', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2713;{" " + char + char}</div>
    } else if (large) {
      return <div style={{ background: 'green', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2713;{" " + char + char + char}</div>
    } else {
      return <div style={{ background: 'red', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2717;{" " + char + char}</div>
    }
  }
  const handleClick = (shadesindex, colorIndex, key) => {
    setSelected(key)
    choosePaletteColor(shadesIndex, colorIndex)
  };

  const borderStyle = (key) => {
    if (selected === null || key !== selected) {
      return '1px solid #ccc'
    } else if ( selected !== null && key === selected) {
      return '2px solid black'
    }
  } 
  return (
    <div style={{ border: '1px solid #ccc' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'lighter', margin: '0.8rem' }}>Select one:</h2>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.4rem',  marginLeft: "0.4rem", marginBottom: "0.4rem"
      }}>
        {
          shades[shadesIndex].data.map((e, colorIndex) => {
            return (
              <div key={e.key} style={{
                border: `${borderStyle(e.key)}`,
                minWidth: '12rem',
                height: '9rem',
                margin: '0.2rem',
              }}
                onClick={() => {
                 handleClick(shadesIndex, colorIndex, e.key)
                }}
              >
                <div style={{
                  borderBottom: '1px solid #ccc',
                  height: '5rem',
                  background: color,
                  color: e.color,
                }}>
                  <div style={{
                    display: 'inline-block',
                    width: "50%",
                    fontSize: "1rem",
                    paddingTop: "1.2rem",
                    paddingRight: "1rem",
                    textAlign: "right",
                  }}>
                    <div>
                      {e.apca}
                    </div>
                    <div style={{
                      marginBottom: "0.2rem"
                    }}></div>
                    <div>
                      {e.contrast}:1
                    </div>
                  </div>
                  <div style={{
                    display: 'inline-block',
                    width: "50%",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}>
                    {readable(e.AANormal, e.AALarge, 'a')}
                    <div style={{
                      marginBottom: "0.2rem"
                    }}></div>
                    {readable(e.AAANormal, e.AAALarge, 'A')}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'inline-block', width: "50%", paddingTop: "1rem", paddingLeft: "1.2rem" }}><div style={{ fontSize: "1rem", fontWeight: "bold" }}>{colorKey}</div><div style={{ fontSize: "0.8rem", color: "#a2a2a2", marginTop: "0.2rem" }}>{color}</div></div>
                  <div style={{ display: 'inline-block' }}><div style={{ fontSize: "1rem", fontWeight: "bold" }}><span style={{ fontSize: "1rem", fontWeight: "normal", background: "black", color: "white", padding: "0.1rem" }}>𝕋</span>{" "}{e.key}</div><div style={{ fontSize: "0.8rem", color: "#a2a2a2", marginTop: "0.2rem" }}>{e.color}</div></div>
                </div>

              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default ColorContrast
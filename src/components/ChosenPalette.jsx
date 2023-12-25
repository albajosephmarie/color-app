import { useState } from "react"
import { useColor } from "../context/ColorContext"

const ChosenCard = (e) => {
  const readable = (normal, large, char) => {
    if (normal) {
      return <div style={{ background: 'green', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2713;{" " + char + char}</div>
    } else if (large) {
      return <div style={{ background: 'green', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2713;{" " + char + char + char}</div>
    } else {
      return <div style={{ background: 'red', color: 'white', paddingLeft: '0.4rem', marginRight: '0.6rem' }}>&#x2717;{" " + char + char}</div>
    }
  }
  if (e.colorKey === 'none') {
    return (
      <>
        <div style={{
          borderBottom: '1px solid #ccc',
          height: '5rem',
          backgroundSize: '6% 25%',  // Smaller squares
          backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)',
          backgroundPosition: '0 0, 35px 35px',
        }}>
        </div>
        <div>
          <div style={{ display: 'inline-block', width: "50%", paddingTop: "1rem", paddingLeft: "1.2rem" }}><div style={{ fontSize: "1rem", fontWeight: "bold", color: "#aaa" }}>{e.backgroundKey}</div><div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.2rem" }}>{e.backgroundColor}</div></div>
          <div style={{ display: 'inline-block' }}></div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div style={{
          borderBottom: '1px solid #ccc',
          height: '5rem',
          background: e.backgroundColor,
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
          <div style={{ display: 'inline-block', width: "50%", paddingTop: "1rem", paddingLeft: "1.2rem" }}><div style={{ fontSize: "1rem", fontWeight: "bold" }}>{e.backgroundKey}</div><div style={{ fontSize: "0.8rem", color: "#a2a2a2", marginTop: "0.2rem" }}>{e.backgroundColor}</div></div>
          <div style={{ display: 'inline-block' }}><div style={{ fontSize: "1rem", fontWeight: "bold" }}><span style={{ fontSize: "1rem", fontWeight: "normal", background: "black", color: "white", padding: "0.1rem" }}>𝕋</span>{" "}{e.colorKey}</div><div style={{ fontSize: "0.8rem", color: "#a2a2a2", marginTop: "0.2rem" }}>{e.color}</div></div>
        </div>
      </>
    )
  }
}

const ChosenPalette = () => {
  const { chosenPalette } = useColor()
  console.log('chosenPalette', chosenPalette)

  return (
    <div style={{ border: '1px solid #ccc' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'lighter', margin: '0.8rem 0 0.1rem 0.8rem' }}>Your chosen palette will appear below:</h2>
      <div style={{ fontSize: '1rem', marginLeft: "0.8rem", color: "#999" }}>10 colors</div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.4rem', width: '100%', marginLeft: "0.4rem", marginBottom: "0.4rem"
      }}>
        {
          chosenPalette.map((e) => {
            return (
              <div key={e.backgroundKey} style={{
                border: '1px solid #ccc',
                minWidth: '12rem',
                height: '9rem',
                marginTop: '0.2rem',
                marginLeft: "0.2rem",
              }}>
                {
                  ChosenCard(e)
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChosenPalette
import PadBank from "components/PadBank"
import { useEffect, useState } from "react"
import soundsData1 from "sounds/sounds1"
import soundsData2 from "sounds/sounds2"
// import { FaFreeCodeCamp } from "react-icons/fa"

function App() {
  const [power, setPower] = useState(true)
  const [display, setDisplay] = useState(String.fromCharCode(160))
  const [currentPadBank, setCurrentPadBank] = useState(soundsData1)
  const [currentPadBankId, setCurrentPadBankId] = useState("Heater Kit")
  const [sliderVal, setSliderVal] = useState(0.3)
  
  const selectBank = () => {
    if (power) {
      if (currentPadBankId === "Heater Kit") {
        setCurrentPadBank(soundsData2)
        setDisplay("Smooth Piano Kit")
        setCurrentPadBankId("Smooth Piano Kit")
      } else {
        setCurrentPadBank(soundsData1)
        setDisplay("Heater Kit")
        setCurrentPadBankId("Heater Kit")
      }
    }
  }
  
  const displayClipName = (name) => {
    if (power) {
      setDisplay(name)
    }
  }

  const editVolume = (e) => {
    if (power) {
      setSliderVal(e.target.value)
      setDisplay("Volume: " + Math.round(e.target.value * 100))
      setTimeout(() => clearDisplay(), 1000)
    }
  }

  const clearDisplay = () => {
    setDisplay(String.fromCharCode(160))
  }

  const togglePower = () => {
    setPower(!power)
    setDisplay(String.fromCharCode(160))
  }
  
  useEffect(() => {
    const clips = [].slice.call(document.getElementsByClassName("clip"))
    clips.forEach((sound) => {
      sound.volume = sliderVal
    })
  }, [sliderVal])

  return (
    <div className="inner-container" id="drum-machine">
      <PadBank
        clipVolume={sliderVal}
        currentPadBank={currentPadBank}
        power={power}
        updateDisplay={displayClipName}
        style={power ? { background: "#1ec8ce" } : { background: "#476b68" }}
      />

      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <button
            style={
              power
                ? { background: "#0ad82c" }
                : { background: "#063d0f", boxShadow: "none" }
            }
            onClick={togglePower}
          />
        </div>

        <p id="display">{display}</p>

        <div className="volume-slider">
          <input
            type="range"
            max="1"
            min="0"
            step="0.01"
            onChange={editVolume}
            value={sliderVal}
          />
        </div>

        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={selectBank}>
            <div
              className="inner"
              style={
                currentPadBank === soundsData1
                  ? { float: "left" }
                  : { float: "right" }
              }></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

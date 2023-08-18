import React from "react"
import DrumPad from "./DrumPad"

const PadBank = (props) => {
  const { currentPadBank, power, updateDisplay } = props

  return (
    <div className="pad-bank">
      {currentPadBank.map((drumObj, i) => (
        <DrumPad
          key={i}
          clip={drumObj.url}
          clipId={drumObj.id}
          keyCode={drumObj.keyCode}
          keyTrigger={drumObj.keyTrigger}
          power={power}
          updateDisplay={updateDisplay}
        />
      ))}
    </div>
  )
}

export default PadBank

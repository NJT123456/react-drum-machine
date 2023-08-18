import React, { useEffect, useState } from "react"

const DrumPad = (props) => {
  const { clip, clipId, keyCode, keyTrigger, power, updateDisplay } = props
  const inactiveStyle = {
    transform: "scale(1)",
    boxShadow: "none",
  }

  const activeStyle = {
    transform: "scale(0.95)",
    boxShadow: "1px 1px 4px 4px #ce1e1e, -1px -1px 4px 4px #ce1e1e",
  }
  const [playing, setPlaying] = useState(false)

  const onPlay = () => {
    if(power){
      const sound = document.getElementById(keyTrigger)
      sound.currentTime = 0
      sound.play()
      setPlaying(true)
      setTimeout(()=>setPlaying(false), 100)
      updateDisplay(clipId)
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      onPlay()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [clipId])

  return (
    <div className="outer-drum-pad" style={!power ? {background: '47#6b68'} : playing ? activeStyle : inactiveStyle}>
      <div className="drum-pad" id={clipId} onClick={onPlay}>
        <audio className="clip" id={keyTrigger} src={clip} />
        {keyTrigger}
      </div>
    </div>
  )
}

export default DrumPad

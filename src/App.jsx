import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonMoved, setNoButtonMoved] = useState(false)
  const [noButtonDimensions, setNoButtonDimensions] = useState({ width: 0, height: 0 })
  const [yesButtonPosition, setYesButtonPosition] = useState({ x: 0, y: 0 })
  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)

  const handleYes = () => {
    setResponse('yes')
  }

  const handleNo = (e) => {
    e.preventDefault()
    // Move the NO button 2cm away from the mouse cursor
    // 2cm ≈ 75.6 pixels (at 96 DPI), using 75 pixels for simplicity
    const distanceFromMouse = 75 // pixels (approximately 2cm)
    
    // Get mouse position relative to viewport
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    // Get actual button dimensions if not already stored
    let buttonWidth, buttonHeight
    if (noButtonMoved) {
      buttonWidth = noButtonDimensions.width
      buttonHeight = noButtonDimensions.height
    } else if (noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect()
      buttonWidth = rect.width
      buttonHeight = rect.height
      setNoButtonDimensions({ width: buttonWidth, height: buttonHeight })
      
      // Store YES button position to keep it fixed
      if (yesButtonRef.current) {
        const yesRect = yesButtonRef.current.getBoundingClientRect()
        setYesButtonPosition({ x: yesRect.left, y: yesRect.top })
      }
    } else {
      buttonWidth = 150
      buttonHeight = 50
    }
    
    // Calculate a random angle to move the button away from mouse
    // This ensures it moves in a random direction but always 2cm away
    const angle = Math.random() * 2 * Math.PI
    
    // Calculate new button center position 2cm away from mouse
    const newCenterX = mouseX + Math.cos(angle) * distanceFromMouse
    const newCenterY = mouseY + Math.sin(angle) * distanceFromMouse
    
    // Convert center position to top-left position
    let newX = newCenterX - buttonWidth / 2
    let newY = newCenterY - buttonHeight / 2
    
    // Ensure button stays within window bounds
    const maxX = window.innerWidth - buttonWidth
    const maxY = window.innerHeight - buttonHeight
    const minX = 0
    const minY = 0
    
    newX = Math.max(minX, Math.min(maxX, newX))
    newY = Math.max(minY, Math.min(maxY, newY))
    
    setNoButtonPosition({ x: newX, y: newY })
    setNoButtonMoved(true)
  }

  if (response === 'yes') {
    return (
      <div className="container success">
        <div className="heart">💖</div>
        <h1 className="success-message">Yay! I'm so happy! 💕</h1>
        <p className="sub-message">You've made my day! Happy Valentine's Day! ❤️</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="question">Will you be my valentine?</h1>
      <div className="buttons">
        <button 
          ref={yesButtonRef}
          className="btn btn-yes" 
          onClick={handleYes}
          style={noButtonMoved ? {
            position: 'fixed',
            left: `${yesButtonPosition.x}px`,
            top: `${yesButtonPosition.y}px`,
          } : {}}
        >
          YES
        </button>
        {noButtonMoved && (
          <div 
            className="btn-placeholder" 
            style={{
              width: `${noButtonDimensions.width}px`,
              height: `${noButtonDimensions.height}px`
            }}
          />
        )}
        <button
          ref={noButtonRef}
          className="btn btn-no"
          onClick={handleNo}
          style={noButtonMoved ? {
            position: 'fixed',
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transition: 'all 0.3s ease'
          } : {}}
        >
          NO
        </button>
      </div>
    </div>
  )
}

export default App

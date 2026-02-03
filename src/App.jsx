import { useState } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonMoved, setNoButtonMoved] = useState(false)

  const handleYes = () => {
    setResponse('yes')
  }

  const handleNo = () => {
    // Move the NO button to a random position
    const maxX = window.innerWidth - 150
    const maxY = window.innerHeight - 50
    const newX = Math.random() * maxX
    const newY = Math.random() * maxY
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
        <button className="btn btn-yes" onClick={handleYes}>
          YES
        </button>
        <button
          className="btn btn-no"
          onClick={handleNo}
          style={noButtonMoved ? {
            position: 'absolute',
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

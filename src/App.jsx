import { useState, useEffect } from 'react'
import Fruity from "./Components/Fruity"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (htmlElement) {
      if (darkMode) { htmlElement.classList.add('dark') }
      else { htmlElement.classList.remove('dark') }
    }
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className='flex absolute left-2 top-2'>
        {darkMode ? '☀️' : '🌑'}
      </button>
      <Fruity />
    </>
  )
}

export default App

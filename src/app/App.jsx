import { useState } from 'react'
import { GlobalProvider } from '../context/global/globalContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalProvider>
      <div>
        <p>Smart move</p>
      </div>
        
    </GlobalProvider>
  )
}

export default App

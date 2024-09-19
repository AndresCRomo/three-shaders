import { useState } from 'react'

import Sandbox from './components/Sandbox.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{height: '100vh'}}>
      <Sandbox/>
    </div>
  )
}

export default App

import { useState } from 'react'
import { KeyboardControls } from '@react-three/drei'
import Sandbox from './components/Sandbox.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{height: "100vh"}}>
      <KeyboardControls
      map={[
        {name: 'DerechaUp', keys:['ArrowRight', 'd', 'D','KeyD']},
        {name: 'IzquierdaUp', keys:['ArrowLeft', 'a', 'A','KeyA']},
      ]}
      >
        <Sandbox/>
      </KeyboardControls>
    </div>
  )
}

export default App

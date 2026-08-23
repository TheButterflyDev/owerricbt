import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import NavBar from './components/layout/navbar'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <section id="center" className="flex flex-col gap-6.25 place-content-center place-items-center grow max-[1024px]:gap-4.5 max-[1024px]:px-5 max-[1024px]:pt-8 max-[1024px]:pb-6">
        
        <div>
          <h1>OWERRI CBT HI-TECH</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="text-base py-1.25 px-2.5 rounded-[5px] text-(--accent) bg-(--accent-bg) border-2 border-transparent transition-colors duration-300 mb-6 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

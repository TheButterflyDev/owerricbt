import NavBar from "./components/layout/navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import JambNewsPage from "./pages/jamb-news"

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jamb-news" element={<JambNewsPage />} />
        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

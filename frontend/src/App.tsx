import NavBar from "./components/layout/navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import JambNewsPage from "./pages/jamb-news"
import Resources from "./pages/resources"
import ContactUs from "./pages/contact-us"
import EventsPage from "./pages/events"

function App() {
  

  return (
    <>
      <NavBar />  
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jamb-news" element={<JambNewsPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App

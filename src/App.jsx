import React from "react"
import Gallery from "./Gallery.jsx"
import Invite from "./Invite.jsx"
import About from "./About.jsx"
import Contact from "./Contact.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Invite />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App



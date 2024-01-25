import React from 'react'
import './css/main.css'
import NavBar from './Components/NavBar'
import Header from './Components/Header'
import Product from './Components/Product'
import Review from './Components/Review'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>

      <Router>
        <NavBar/>
        <Header/>
        <Product/>
        <Review/>
        <Footer/>
        <Routes>
          <Route />
        </Routes>
      </Router>

    </div>
  )
}

export default App

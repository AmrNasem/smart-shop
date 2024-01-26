import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Cards from '../components/Cards'
import Sales from '../components/Sales'
import Product from '../components/Product'
import Footer from '../components/Footer'
import Timer from '../components/Timer'
import Products_Slider from '../components/Products_Slider'
import Brands from '../components/Brands'
import Posters from '../components/Posters'
const Home = () => {
    return (
        <div>
            <Navbar />
            <Slider />
            <Cards />
            <hr style={{width:"90%", color:"#54A4AF"}}/>
            <Sales/>
            <Product/>
            <Timer/>
            <Products_Slider/>
            <Brands/>
            <Posters/>
            <Footer/>
        </div>
    )
}

export default Home
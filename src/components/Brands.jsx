import React from 'react';
import styles from "../styles/brands.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/brands');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className={styles.container}>
            <h1>البراندات</h1>
            <hr />
            <div className={styles.cards}>
                {brands.map((brand, index) => (
                    <div className={styles.card} key={index}>
                        <img src={require(`../assets/${brand.src}`)} alt={`brand ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Brands
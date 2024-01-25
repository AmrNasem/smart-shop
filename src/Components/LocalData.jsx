import React from 'react'
import Product from './Product';
import { useState,useEffect } from 'react';

function LocalData() {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8000/SingleProduct')  
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []); 

  return (
      <div>
              {data.map((product, i) => (
                <Product key={i} product={product} minWidth="240px" />
              ))}
      </div>
  );
}
export default LocalData
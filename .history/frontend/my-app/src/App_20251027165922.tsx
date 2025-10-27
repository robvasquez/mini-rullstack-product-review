import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    fetch('/products')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const [products, setProducts] = React.useState([]);

  return (
    <div className="App">
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

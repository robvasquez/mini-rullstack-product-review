import React from 'react';
import { ProductProvider } from './context/ProductContext';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default App;

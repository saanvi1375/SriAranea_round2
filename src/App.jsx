import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('All Products:', data.products);
        
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const firstFiveOddProducts = products
    .filter(product => product.id % 2 !== 0)
    .slice(0, 5);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <h1 className="title">Our Products</h1>
      
      <h2 className="subtitle">First 5 Products with Odd IDs</h2>
      <div className="products-grid">
        {firstFiveOddProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Rating:</strong> {product.rating} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

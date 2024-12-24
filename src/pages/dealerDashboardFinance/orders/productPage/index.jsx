import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss'; // Add custom CSS for styling
import samsung_logo from '../../../../assets/img/samsung logo.png';
import config from '../../../../config';

const { backend_url } = config;

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [segment, setSegment] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cart, setCart] = useState([]);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            console.log("Filters being sent:", { query, segment, category, minPrice, maxPrice });
            const response = await axios.post(`${backend_url}/product/dealer/all`, 
                {
                    query: query?.trim() || undefined,  // Trim whitespace and send undefined if empty
                    segment: segment || undefined,     // Send only if segment is not empty
                    category: category || undefined,   // Send only if category is not empty
                    minPrice: minPrice ? parseFloat(minPrice) : undefined, // Convert to float if provided
                    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined, // Convert to float if provided
                    status: 'live'                     // Default status
                }
            );
            console.log("Response from API:", response.data);
            console.log("Backend url: ", {backend_url})
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add to Cart functionality
    const addToCart = (product, quantity) => {
        const existingProduct = cart.find((item) => item._id === product._id);
        if (existingProduct) {
            existingProduct.quantity += quantity;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    // Reset Filters
    const resetFilters = () => {
        setQuery('');
        setSegment('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        fetchProducts(); // Ensure products are refreshed after reset
    };

    // Fetch products whenever filters change
    useEffect(() => {
        fetchProducts();
        console.log("Products: ", products)
    }, [query, segment, category, minPrice, maxPrice]);

    return (
        <div className="products-page">
            {/* Filters Section */}
            <div className="filters sticky-filters">
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => {setQuery(e.target.value);
                        console.log("Query updated:", e.target.value);  }
                    }
                />
                <select value={segment} onChange={(e) => setSegment(e.target.value)}>
                    <option value="">All Segments</option>
                    <option value="6-10K">6-10K</option>
                    <option value="10-15K">10-15K</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="smartphone">Smartphones</option>
                    <option value="tab">Tablets</option>
                    <option value="wearable">Wearable</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

            {/* Products Section */}
            <div className="products-container">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={samsung_logo} alt="Samsung Logo" className="product-logo" />
                        <div className="category-tag">
                            {product.Category.charAt(0).toUpperCase() + product.Category.slice(1)}
                        </div>
                        <div className="product-info">
                            <h3>{product.Model}</h3>
                            <p>
                                {product.ProductCode} | {product.Price} INR
                            </p>
                            <div className="quantity-container">
                                <input
                                    type="number"
                                    defaultValue={1}
                                    min={1}
                                    onChange={(e) => {
                                        product.quantity = parseInt(e.target.value) || 1;
                                    }}
                                    className="quantity-input"
                                />
                                <button
                                    onClick={() =>
                                        addToCart(product, product.quantity || 1)
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Counter */}
            <div className="cart-counter">
                <p>Cart: {cart.reduce((total, item) => total + item.quantity, 0)} items</p>
            </div>
        </div>
    );
};

export default ProductPage;
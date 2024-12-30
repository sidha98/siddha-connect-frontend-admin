import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Navigate, useNavigate } from "react-router-dom";
import "./style.scss"; // Add custom CSS for styling
import samsung_logo from "../../assets/img/samsung logo.png";
import config from "../../config";
import box_icon from "../../assets/img/package.png";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { UserContext } from "../../../../context/userContext";
import { jwtDecode } from "jwt-decode";

const { backend_url } = config;

Modal.setAppElement("#root"); // Set the app root for accessibility

const ProductsForDealers = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  // Fetch products from API
  const fetchProducts = async () => {
    try {
      console.log("Filters being sent:", {
        query,
        segment,
        category,
        minPrice,
        maxPrice,
      });
      const response = await axios.post(`${backend_url}/product/dealer/all`, {
        query: query?.trim() || undefined,
        segment: segment || undefined,
        category: category || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        status: "live",
      });
      console.log("Response from API:", response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Reset Filters
  const resetFilters = () => {
    setQuery("");
    setSegment("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    fetchProducts();
  };
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

    // Create Order
    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
          alert("Your cart is empty!");
          return;
        }
      
        try {
          // Retrieve the token from localStorage
          const token = localStorage.getItem("token");
      
          if (!token) {
            alert("You are not authenticated. Please log in again.");
            return;
          }
      
          // Decode the token to extract dealer information
          const decodedToken = jwtDecode(token);
          const dealerCode = decodedToken.dealerCode;
          const dealerName = decodedToken.shopName;
      
          if (!dealerCode || !dealerName) {
            alert("Invalid dealer information in token. Please contact support.");
            return;
          }
      
          // Prepare products data for the order
          const productsForOrder = cart.map((item) => ({
            ProductId: item._id,
            Quantity: item.quantity,
            Price: item.Price,
          }));
      
          // Make the API call to create the order
          const response = await axios.post(
            `${backend_url}/dealer/create-order`,
            {
              DealerCode: dealerCode,
              DealerName: dealerName,
              products: productsForOrder,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            }
          );
      
          alert("Order placed successfully!");
          setCart([]);
          setIsCartOpen(false);
          navigate("/orders");
        } catch (error) {
          console.error("Error placing order:", error.message || error.response?.data || error);
          alert("Failed to place order. Please try again.");
        }
      };
      

  // Fetch products whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [query, segment, category, minPrice, maxPrice]);

  return (
    <div className="products-page">
      {/* Filters Section */}
      <div className="filters sticky-filters">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

        <div className="products-container">
        {products.map((product) => (
            <div key={product._id} className="product-card">
            <div className="product-image-wrapper">
                <img
                src={samsung_logo}
                alt={`${product.Model} Logo`}
                className="product-logo"
                />
                <span className="category-tag">
                {product.Category.charAt(0).toUpperCase() +
                    product.Category.slice(1)}
                </span>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.Model}</h3>
                <p className="product-details">
                Code: {product.ProductCode} <br />
                Price: {product.Price} INR
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
                    onClick={() => addToCart(product, product.quantity || 1)}
                    className="add-to-order-btn"
                >
                    Add to Order
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>

      {/* Floating Cart Icon */}
      <div className="floating-cart" onClick={() => setIsCartOpen(true)}>
        <div className="box-icon">
          <img src={box_icon} alt="" />
          <div className="cart-count">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCartOpen}
        onRequestClose={() => setIsCartOpen(false)}
        className="cart-modal"
        overlayClassName="cart-overlay"
      >
        <h2 className="cart-title">Your Order</h2>
        <div className="cart-item-wrapper">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.Model}</span>
                  <div className="cart-quantity-control">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      -
                    </button>
                    <span className="cart-quantity">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                  <span className="cart-item-price">
                    {item.Price} INR per unit = {item.Price * item.quantity} INR
                  </span>
                </div>
                <button
                  className="remove-from-cart-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">Your box is empty</p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: </strong>
              {cart.reduce(
                (total, item) => total + item.Price * item.quantity,
                0
              )}{" "}
              INR
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        )}

        <button
          className="close-cart-modal"
          onClick={() => setIsCartOpen(false)}
        >
          <TiDelete />
        </button>
      </Modal>
    </div>
  );
};

export default ProductsForDealers;

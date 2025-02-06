import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import samsung_logo from "../../../../assets/img/samsung logo.png";
import samsungRect from "../../../../assets/img/samsung-rect.png";
import config from "../../../../config";
import box_icon from "../../../../assets/img/package.png";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { UserContext } from "../../../../context/userContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const { backend_url } = config;

Modal.setAppElement("#root");

const ProductPage = () => {
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

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${backend_url}/product/dealer/all`, {
        query: query?.trim() || undefined,
        segment: segment || undefined,
        category: category || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        status: "live",
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    toast.success(`${product.Model} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const emptyCart = () => {
    setCart([]);
  };

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

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authenticated. Please log in again.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const dealerCode = decodedToken.dealerCode;
      const dealerName = decodedToken.shopName;

      if (!dealerCode || !dealerName) {
        alert("Invalid dealer information in token. Please contact support.");
        return;
      }

      const productsForOrder = cart.map((item) => ({
        ProductId: item._id,
        Quantity: item.quantity,
        Price: item.Price,
      }));

      await axios.post(
        `${backend_url}/dealer/create-order`,
        {
          DealerCode: dealerCode,
          DealerName: dealerName,
          products: productsForOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      setCart([]);
      setIsCartOpen(false);
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error.message || error);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, segment, category, minPrice, maxPrice]);

  return (
    <div className="products-page">
      <div className="filters sticky-filters">
        <input
          type="text"
          placeholder="🔍 Search..."
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
          placeholder="💰 Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="💰 Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={resetFilters}>Reset</button>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-wrapper">
              <img src={samsungRect} alt={`${product.Model} Logo`} className="product-logo" />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.Model}</h3>
              <p className="product-details">
                {product.ProductCode} <br />
                Price: {product.Price} INR
              </p>
              <div className="quantity-container">
                <span className="qty-label">Qty:</span>
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
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span className="cart-quantity">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
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
              )} INR
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <button className="Empty-cart-btn" onClick={emptyCart}>
              Empty Cart
            </button>
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

export default ProductPage;

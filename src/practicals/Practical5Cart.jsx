// Practical 5: Product List with Add to Cart
// Fetches from DummyJSON API, adds/removes items, calculates total
import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, Trash2, Plus, ArrowRight, Check, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    price: 9.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    price: 19.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png'
  },
  {
    id: 3,
    title: 'Powder Canister',
    price: 14.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png'
  },
  {
    id: 4,
    title: 'Red Lipstick',
    price: 12.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png'
  },
  {
    id: 5,
    title: 'Red Nail Polish',
    price: 8.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png'
  }
];

export default function Practical5Cart({ onToast }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [screen, setScreen] = useState('products');
  const [loading, setLoading] = useState(true);

  // Step 4: Fetch products once when app starts
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((r) => r.json())
      .then((j) => {
        if (j && j.products && j.products.length > 0) {
          setProducts(j.products);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('DummyJSON network fallback:', err);
        setProducts(FALLBACK_PRODUCTS);
        setLoading(false);
      });
  }, []);

  // Step 5: ADD TO CART: create const addToCart = (item: any) => { setCart([...cart, item]); }
  const addToCart = (item) => {
    setCart([...cart, item]);
    if (onToast) onToast(`Added "${item.title.slice(0, 20)}..." to cart!`, 'success');
  };

  // Step 6: REMOVE: create const removeFromCart = (index: number) => { setCart(cart.filter((_, i) => i !== index)); }
  const removeFromCart = (index) => {
    const itemToRemove = cart[index];
    setCart(cart.filter((_, i) => i !== index));
    if (onToast) onToast(`Removed item from cart`, 'info');
  };

  // Step 7: TOTAL: calculate total price
  const total = Number(cart.reduce((sum, p) => sum + Number(p.price || 0), 0).toFixed(2));

  const handleCheckout = () => {
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    if (onToast) onToast(`Order simulated for $${total}!`, 'success');
  };

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 5</div>
        <h2 className="rn-heading">Shopping Cart App</h2>
        <p className="rn-subheading">DummyJSON API & Screen Navigation</p>
      </div>

      {/* Screen Toggle Nav Buttons */}
      <div className="rn-nav-tabs">
        <button
          type="button"
          className={`rn-tab-btn ${screen === 'products' ? 'active' : ''}`}
          onClick={() => setScreen('products')}
        >
          <ShoppingBag size={16} />
          <span>Products</span>
        </button>

        <button
          type="button"
          className={`rn-tab-btn ${screen === 'cart' ? 'active' : ''}`}
          onClick={() => setScreen('cart')}
        >
          <ShoppingCart size={16} />
          <span>Cart ({cart.length})</span>
        </button>
      </div>

      {/* Screen: Products */}
      {screen === 'products' ? (
        <div className="rn-products-view">
          {loading ? (
            <div className="rn-loading-state">
              <div className="rn-spinner"></div>
              <p>Fetching products from DummyJSON...</p>
            </div>
          ) : (
            <div className="rn-product-list">
              {products.map((item) => (
                <div key={item.id} className="rn-product-card">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="rn-product-thumb"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/60x60?text=Product';
                    }}
                  />
                  <div className="rn-product-details">
                    <h4 className="rn-product-name">{item.title}</h4>
                    <span className="rn-product-cost">${item.price}</span>
                  </div>
                  <button
                    type="button"
                    className="rn-button rn-button-primary rn-btn-sm"
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Screen: Cart */
        <div className="rn-cart-view">
          {cart.length === 0 ? (
            <div className="rn-empty-cart">
              <ShoppingCart size={48} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Browse products and click "Add to Cart"</p>
              <button
                type="button"
                className="rn-button rn-button-secondary rn-btn-inline"
                onClick={() => setScreen('products')}
              >
                Go to Products
              </button>
            </div>
          ) : (
            <>
              <div className="rn-cart-list">
                {cart.map((item, index) => (
                  <div key={index} className="rn-cart-item">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="rn-cart-item-thumb"
                    />
                    <div className="rn-cart-item-info">
                      <h4 className="rn-cart-item-title">{item.title}</h4>
                      <span className="rn-cart-item-price">${item.price}</span>
                    </div>
                    <button
                      type="button"
                      className="rn-btn-remove"
                      onClick={() => removeFromCart(index)}
                      title="Remove from cart"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Price Bar as specified: Total: {total} */}
              <div className="rn-total-checkout-bar">
                <div className="rn-total-row">
                  <span className="rn-total-label">Grand Total:</span>
                  <span className="rn-total-amount">${total}</span>
                </div>
                <button
                  type="button"
                  className="rn-button rn-button-primary rn-checkout-btn"
                  onClick={handleCheckout}
                >
                  <span>Simulate Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

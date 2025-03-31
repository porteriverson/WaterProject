import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.projectId}>
                {item.projectName}: ${item.donationAmount.toFixed(2)}
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.projectId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: </h3>
      <button className="btn btn-info">Checkout</button>
      <button className="btn btn-info" onClick={() => navigate('/projects')}>
        Continue browsing
      </button>
    </>
  );
}

export default CartPage;

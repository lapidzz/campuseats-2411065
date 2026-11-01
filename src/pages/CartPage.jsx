import { useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';

export default function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (details) => {
    placeOrder(details);
    navigate('/orders'); 
  };

  if (cart.length === 0) {
    return <p className="muted" style={{ padding: '2rem', textAlign: 'center' }}>Your cart is empty. Pick something from a menu first.</p>;
  }

  return (
    <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div className="card" style={{ padding: '1rem' }}>
        <ul className="cart-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {cart.map((line) => (
            <CartItem key={line.item.id} line={line} onChangeQty={changeQty} onRemove={removeFromCart} />
          ))}
        </ul>
        <p className="cart-total" style={{ textAlign: 'right', fontSize: '1.15rem', fontWeight: 700, margin: '1rem 0' }}>
          Total: RM {total.toFixed(2)}
        </p>
      </div>
      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router';

export default function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>No orders yet</h2>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Browse Vendors</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#005a44' }}>Order #{orders.length - index}</h3>
          <p><strong>Name:</strong> {order.name} | <strong>Pickup:</strong> {order.pickupTime}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.item.id}>{item.qty}x {item.item.name} - RM {(item.item.price * item.qty).toFixed(2)}</li>
            ))}
          </ul>
          <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartContext } from './cart-context';

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [orders, setOrders] = useLocalStorage('orders', []);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const changeQty = (itemId, delta) => {
    setCart((prev) => {
      return prev.map((line) => {
        if (line.item.id === itemId) {
          return { ...line, qty: line.qty + delta };
        }
        return line;
      }).filter((line) => line.qty > 0); 
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const placeOrder = (details) => {
    const orderTotal = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    const newOrder = { ...details, total: orderTotal, date: new Date().toISOString(), items: cart };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}
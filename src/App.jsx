import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';
import CartPage from './components/CartPage';
import { Loading, ErrorMessage } from './components/Status';

function App() {
  // --- State ---
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('menu'); 
  const [lastOrder, setLastOrder] = useState(null); 
  const [timeLeft, setTimeLeft] = useState('');

  // --- Fetch Data (Lab B2) ---
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        if (data.length > 0) setSelectedVendorId(data[0].id);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const selectedVendor = vendors.find(v => v.id === selectedVendorId);

  // --- Handlers ---
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleChangeQty = (itemId, delta) => {
    setCart((prev) => {
      return prev.map((line) => {
        if (line.item.id === itemId) {
          return { ...line, qty: line.qty + delta };
        }
        return line;
      }).filter((line) => line.qty > 0); 
    });
  };

  const handleRemove = (itemId) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  // This is the completed handlePlaceOrder function (replaces the PDF TODO)
  const handlePlaceOrder = (details) => {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    setLastOrder({ ...details, total });
    setCart([]);
    setView('done');
  };

  // --- Feature 5: Countdown ---
  const dailySpecial = selectedVendor?.menu.find(item => item.special);

  useEffect(() => {
    if (!dailySpecial || !dailySpecial.specialEndTime || view !== 'menu') return;

    const updateCountdown = () => {
      const now = new Date();
      const end = new Date();
      const [hours, minutes] = dailySpecial.specialEndTime.split(':');
      end.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft('Offer ended!');
        return;
      }

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    updateCountdown(); 
    const timerId = setInterval(updateCountdown, 1000); 

    return () => clearInterval(timerId); 
  }, [dailySpecial, view]);

  return (
    <div className="app">
      <Header 
        cartCount={cartCount} 
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
        
        {loading && <Loading />}
        {error && <ErrorMessage message={error} onRetry={() => setReloadKey(k => k + 1)} />}

        {!loading && !error && view === 'menu' && (
          <>
            <h2>Choose a vendor</h2>
            <div className="grid">
              {vendors.map(vendor => (
                <VendorCard 
                  key={vendor.id} 
                  vendor={vendor} 
                  isSelected={vendor.id === selectedVendorId} 
                  onSelect={setSelectedVendorId} 
                />
              ))}
            </div>

            {selectedVendor && (
              <>
                <h2>Menu: {selectedVendor.name}</h2>
                
                {dailySpecial && (
                  <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #ffeeba', display: 'flex', justifyContent: 'space-between' }}>
                    <span>🌟 Today's Special: {dailySpecial.name} for RM {dailySpecial.price.toFixed(2)}!</span>
                    <span style={{ color: '#b3261e' }}>Ends in: {timeLeft}</span>
                  </div>
                )}

                <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
              </>
            )}
          </>
        )}

        {!loading && !error && view === 'cart' && (
          <>
            <h2>Your cart</h2>
            <CartPage 
              cart={cart} 
              onChangeQty={handleChangeQty} 
              onRemove={handleRemove} 
              onPlaceOrder={handlePlaceOrder} 
            />
          </>
        )}

        {!loading && !error && view === 'done' && lastOrder && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2 style={{ color: '#005a44' }}>Order Placed Successfully! 🎉</h2>
            <p>Thank you, <strong>{lastOrder.name}</strong>.</p>
            <p>Pickup at <strong>{lastOrder.pickupTime}</strong> at Mahallah {lastOrder.mahallah}.</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Paid: RM {lastOrder.total.toFixed(2)}</p>
            <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>Order More</button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;
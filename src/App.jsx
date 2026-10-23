import { useState } from 'react';
import { vendors } from './data/vendors'; 
import Header from './components/Header';
import Footer from './components/Footer';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cartCount, setCartCount] = useState(0);

  const selectedVendor = vendors.find(v => v.id === selectedVendorId);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // FEATURE 5: Find the daily special for the selected vendor
  const dailySpecial = selectedVendor.menu.find(item => item.special);

  return (
    <div className="app">
      <Header cartCount={cartCount} />

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
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

        <h2>Menu: {selectedVendor.name}</h2>

        {/* FEATURE 5: Daily Special Banner */}
        {dailySpecial && (
          <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #ffeeba' }}>
            🌟 Today's Special: {dailySpecial.name} for RM {dailySpecial.price.toFixed(2)}!
          </div>
        )}

        {/* Menu List */}
        <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />

      </main>

      <Footer />
    </div>
  );
}

export default App;
import { useVendors } from '../hooks/useVendors';
import { Loading, ErrorMessage } from '../components/Status';
import { Link } from 'react-router';

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // Feature 5: Find all specials
  const allSpecials = vendors.flatMap(vendor => 
    vendor.menu.filter(item => item.special).map(item => ({ ...item, vendorId: vendor.id, vendorName: vendor.name }))
  );

  return (
    <div>
      {/* Feature 5: Today's Specials Section */}
      {allSpecials.length > 0 && (
        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ffeeba' }}>
          <h3 style={{ marginTop: 0, color: '#856404' }}>🌟 Today's Specials</h3>
          
          {/* Use grid for specials too so they are equal size */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {allSpecials.map(special => (
              <Link 
                key={special.id} 
                to={`/vendor/${special.vendorId}`} 
                style={{ textDecoration: 'none', color: '#856404', background: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ffeeba', display: 'flex', flexDirection: 'column' }}
              >
                <strong style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{special.name}</strong>
                <span>RM {special.price.toFixed(2)}</span>
                <div style={{ fontSize: '0.85rem', marginTop: 'auto', color: '#666' }}>at {special.vendorName}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2>Choose a vendor</h2>
      {/* Grid for Vendors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {vendors.map(vendor => (
          <Link key={vendor.id} to={`/vendor/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div 
              className="card vendor-card" 
              style={{ 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: '220px' // Forces all cards to be at least this tall
              }}
            >
              <div className="thumb" style={{ width: '50px', height: '50px', background: '#005a44', color: 'white', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '15px' }}>
                {vendor.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px 0' }}>{vendor.name}</h3>
              <p className="muted" style={{ fontSize: '0.95rem', color: '#666', margin: '0 0 5px 0' }}>{vendor.location}</p>
              <p className="muted" style={{ fontSize: '0.95rem', color: '#666', margin: '0 0 15px 0' }}>Open: {vendor.openHours}</p>
              
              <span style={{ 
                marginTop: 'auto', // Pushes the badge to the bottom
                alignSelf: 'flex-start',
                fontSize: '0.85rem', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                background: vendor.isOpen ? '#d4edda' : '#f8d7da', 
                color: vendor.isOpen ? '#155724' : '#721c24' 
              }}>
                {vendor.isOpen ? 'Open now' : 'Closed'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
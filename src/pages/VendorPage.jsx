import { useParams } from 'react-router';
import { useVendors } from '../hooks/useVendors';
import { useCart } from '../hooks/useCart';
import MenuList from '../components/MenuList';
import { Loading, ErrorMessage } from '../components/Status';

export default function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();
  const { addToCart } = useCart();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find(v => v.id === id);

  if (!vendor) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Vendor not found</h2>
        <p>The vendor ID "{id}" does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Menu: {vendor.name}</h2>
      <p className="muted" style={{ marginBottom: '20px' }}>{vendor.location} | Open: {vendor.openHours}</p>
      <MenuList items={vendor.menu} onAdd={addToCart} />
    </div>
  );
}
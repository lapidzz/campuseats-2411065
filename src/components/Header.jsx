import { NavLink } from 'react-router';
import { useCart } from '../hooks/useCart';

function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <NavLink to="/" end style={{ color: '#fff', textDecoration: 'none' }}>Vendors</NavLink>
        <NavLink to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart <span className="badge">{count}</span></NavLink>
        <NavLink to="/orders" style={{ color: '#fff', textDecoration: 'none' }}>My Orders</NavLink>
      </nav>
    </header>
  )
}
export default Header;
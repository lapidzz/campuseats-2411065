function Header({ cartCount, onShowMenu, onShowCart }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <button 
          type="button" 
          className="link" 
          onClick={onShowMenu} 
          style={{ background: 'none', border: 0, color: '#fff', cursor: 'pointer', font: 'inherit' }}
        >
          Vendors
        </button>
        <button 
          type="button" 
          className="link cart" 
          onClick={onShowCart} 
          style={{ background: 'none', border: 0, color: '#fff', cursor: 'pointer', font: 'inherit' }}
        >
          Cart <span className="badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  )
}

// THIS IS THE LINE YOU ARE MISSING
export default Header;
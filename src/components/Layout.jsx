import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
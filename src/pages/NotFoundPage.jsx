import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
      <h2>404 - Page Not Found</h2>
      <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Go Home</Link>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: 72, fontWeight: 900, color: '#1e7e34', marginBottom: 16 }}>404</h1>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 28 }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-green"><Home size={15} /> Back to Home</Link>
    </div>
  );
}

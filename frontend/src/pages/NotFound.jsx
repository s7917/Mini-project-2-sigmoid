import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1 className="page-title">404</h1>
      <p className="page-subtitle">This page does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
    </div>
  );
}

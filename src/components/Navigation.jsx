import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import {useAuth} from "../context/AuthContext.jsx";
import "./Navigation.css"
function Navigation() {
  const location = useLocation();
  const { getUserSavedArticles } = useArticles();
  const savedArticles = getUserSavedArticles();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            <Link
                to="/saved"
                className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({savedArticles.length})
            </Link>
          </div>
        </div>
        <div className="nav-user">
          {isAuthenticated ? (
              <div className="user-info">
                <span className="username">👤 {user.username}</span>
                {user.role === 'admin' && (
                    <span className="admin-badge">Admin</span>
                )}
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </div>
          ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
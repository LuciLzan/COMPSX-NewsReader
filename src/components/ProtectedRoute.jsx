//Via resource 3

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Save the location they tried to access
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
}

export default ProtectedRoute;
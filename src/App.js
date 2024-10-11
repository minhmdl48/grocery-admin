import {Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Login from './scenes/login';
import Dashboard from './scenes/dashboard';
import AddProduct from './scenes/products/AddProduct';
import Categories from './scenes/category';
import AddCategory from './scenes/category/AddCategory';
import Orders from './scenes/order';
import ProductsByCategory from './scenes/category/ProductsByCategory';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Products from './scenes/products';
import UpdateCategory from './scenes/category/UpdateCategory';
import Customers from './scenes/customer';
import { useNavigate } from 'react-router-dom';
import Chat from './scenes/chat';

const ProtectedRoute = ({ children, isAuthenticated , loading}) => {
  if (loading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); 
    }
    setLoading(false);
  }, []);
  


  return (
    <div className="app">
      {location.pathname !== "/login" && <Sidebar />}
      <div className={location.pathname === "/login" ? '' : 'content'}>
        {location.pathname !== "/login" && <Topbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Products /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Dashboard /></ProtectedRoute>} />
          <Route path="/products/add" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><AddProduct /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Categories /></ProtectedRoute>} />
          <Route path="/categories/add" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><AddCategory /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Orders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Customers/></ProtectedRoute>} />
          <Route path="/update-category/:categoryId" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><UpdateCategory /></ProtectedRoute>} />
          <Route path="/categories/:categoryId" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><ProductsByCategory /></ProtectedRoute>} />

          <Route path="/chat/:customerId" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Chat/></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
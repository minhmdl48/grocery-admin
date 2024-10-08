import {Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <Sidebar />}
      <div className={isLoginPage ? '' : 'content'}>
        {!isLoginPage && <Topbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Products /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
          <Route path="/products/add" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddProduct /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Categories /></ProtectedRoute>} />
          <Route path="/categories/add" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddCategory /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Orders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Customers/></ProtectedRoute>} />
          <Route path="/update-category/:categoryId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateCategory /></ProtectedRoute>} />
          <Route path="/categories/:categoryId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProductsByCategory /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
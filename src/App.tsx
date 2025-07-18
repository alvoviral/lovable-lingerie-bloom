
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Finance from './pages/Finance';
import Marketplaces from './pages/Marketplaces';
import Calendar from './pages/Calendar';
import Whatsapp from './pages/Whatsapp';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <NotificationProvider>
          <CustomerProvider>
            <Router>
              <AuthProvider>
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/vendas" element={
                    <ProtectedRoute>
                      <Sales />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/estoque" element={
                    <ProtectedRoute>
                      <Inventory />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/clientes" element={
                    <ProtectedRoute>
                      <Customers />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/financas" element={
                    <ProtectedRoute>
                      <Finance />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/marketplaces" element={
                    <ProtectedRoute>
                      <Marketplaces />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/agenda" element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/whatsapp" element={
                    <ProtectedRoute>
                      <Whatsapp />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/relatorios" element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/configuracoes" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/perfil" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </Router>
          </CustomerProvider>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import PaidClients from './pages/PaidClients';
import Insurance from './pages/Insurance';
import Partners from './pages/Partners';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Visitors from './pages/Visitors';
import Users from './pages/Users';
import { getAdminRole } from './lib/storage';

function isAuthenticated() {
  return localStorage.getItem('wairb_admin_auth') === 'true';
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

function IndexRoute() {
  const role = getAdminRole();
  if (role === 'percepteur') return <Navigate to="/clients" replace />;
  return <Dashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<IndexRoute />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients-payes" element={<PaidClients />} />
          <Route path="assurances" element={<Insurance />} />
          <Route path="partenaires" element={<Partners />} />
          <Route path="budget" element={<Budget />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="visiteurs" element={<Visitors />} />
          <Route path="utilisateurs" element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

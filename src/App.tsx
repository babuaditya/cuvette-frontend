import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthenticatedLayout from './layouts/authenticatedLayout';
import UnauthenticatedLayout from './layouts/unauthenticatedLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Home = () => <div>Home</div>;

const App = () => {
  return (
    <AuthProvider>
      <Router basename='cuvette-frontend.netlify.app'>
        <Routes>
          <Route path="/" element={<UnauthenticatedLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

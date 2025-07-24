import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';      // added Register import
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import FlaggedRecords from './components/FlaggedRecords';
import PrivateRoute from './components/PrivateRoute'; // added PrivateRoute import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   {/* added register route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <FlaggedRecords />
            </PrivateRoute>
          }
        />
        {/* Redirect root path to login for clarity */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

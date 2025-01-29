import logo from './logo.svg';
import './App.css';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import CarForm from './components/CarForm';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Private Routes */}
        <Route 
          path="/"
          element={
            <PrivateRoute>
              <CarList />
            </PrivateRoute>
          }
        />
        <Route 
          path="/cars/new"
          element={
            <PrivateRoute>
              <CarForm />
            </PrivateRoute>
          }
        />
        <Route 
          path="/cars/:id"
          element={
            <PrivateRoute>
              <CarDetail />
            </PrivateRoute>
          }
        />
        <Route 
          path="/cars/edit/:id"
          element={
            <PrivateRoute>
              <CarForm editMode />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

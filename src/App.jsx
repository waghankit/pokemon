import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles.css'


export default function App() {

  return (
    <div className="background" style={{ textAlign: 'center' }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

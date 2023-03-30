import React from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
//Pages
import HomePage from "./pages/HomePage.js";
import FavoritesPage from "./pages/FavoritesPage.js";
import DetailsPage from "./pages/DetailsPage.js";
import SearchPage from "./pages/SearchPage.js";
//React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/search/:name" element={<SearchPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

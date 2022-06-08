import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Favourites from "./components/Favourites";

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favourites" element={<Favourites />} />
      </Routes>

    </div>
  );
}
export default App
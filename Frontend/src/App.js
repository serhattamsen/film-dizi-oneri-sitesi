import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import ChooseFilms from "./components/ChooseFilms";
import RecommendPage from "./components/RecommendPage"; // varsa



function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      document.body.style.background = "#f2f2f2";
      document.body.style.color = "#000";
    } else {
      document.body.style.background = 'url("https://i.gifer.com/3Yws.gif") no-repeat center center fixed';
      document.body.style.backgroundSize = "cover";
      document.body.style.color = "#fff";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/choose-films" element={<ChooseFilms />} />
      <Route path="/recommend" element={<RecommendPage />} />

    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

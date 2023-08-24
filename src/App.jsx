import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

//Import Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";

//Import Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

//Import Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Signup from "./assets/pages/Signup";

//Import Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

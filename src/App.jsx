import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

//Import Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";

//Import Components
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

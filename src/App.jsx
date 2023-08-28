import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

//Import Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";

//Import Components
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [descPrice, setdescPrice] = useState("");

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
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
        descPrice={descPrice}
        setdescPrice={setdescPrice}
      />
      <Routes>
        <Route
          path="/"
          element={<Home search={search} descPrice={descPrice} />}
        ></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
        <Route path="/publish" element={<Publish token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

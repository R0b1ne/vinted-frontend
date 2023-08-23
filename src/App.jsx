import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

//Import Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";

//Import Components
import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer data={data} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

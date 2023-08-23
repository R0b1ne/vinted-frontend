import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import background from "../images/background.jpg";

const Home = () => {
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

  //   console.log(data);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <section
        style={{ backgroundImage: `url(${background})` }}
        className="home-part1"
      >
        <div>
          <h1>Prêts à faire du tri dans vos placards?</h1>
          <button> Commencer à vendre</button>
        </div>
      </section>

      <section className="home-part2">
        {data.offers.map((offer) => {
          //   console.log(offer);
          return (
            <div className="card-container" key={offer._id}>
              <Link
                to={`/offer/${offer._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card-avatar-username">
                  <span>{offer.product_name}</span>
                </div>
                <div>
                  <img
                    src={offer.product_pictures[0].secure_url}
                    alt={offer.product_name}
                  />
                </div>
                <div>{offer.product_price} €</div>
              </Link>
            </div>
          );
        })}

        <p>Je suis la page Home</p>
      </section>
    </div>
  );
};
export default Home;

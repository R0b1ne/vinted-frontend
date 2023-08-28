import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import background from "../images/background.jpg";

const Home = ({ search, descPrice }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${descPrice}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, descPrice]);

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
          <Link to="/publish">
            <button> Commencer à vendre</button>
          </Link>
        </div>
      </section>

      <section className="home-part2">
        {data.offers.map((offer) => {
          //   console.log(offer);
          return (
            <Link
              className="card-container"
              key={offer._id}
              to={`/offer/${offer._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card-avatar-username">
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.owner.account.username}
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <div className="picture-card">
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
              </div>
              <p>{offer.product_price} €</p>
              {/* <p>{offer.product_details[0].MARQUE}</p> */}
              {offer.product_details.map((detail, index) => {
                //   if (detail.MARQUE) {
                //     return <p key={index}>{detail.MARQUE}</p>;
                //   } else if (detail.TAILLE) {
                //     return <p key={index}>{detail.TAILLE}</p>;
                //   } else {
                //     return null;
                //   }
                if (detail.MARQUE || detail.TAILLE) {
                  return <p key={index}>{detail.MARQUE || detail.TAILLE}</p>;
                } else {
                  return null;
                }
              })}
            </Link>
          );
        })}
      </section>
    </div>
  );
};
export default Home;

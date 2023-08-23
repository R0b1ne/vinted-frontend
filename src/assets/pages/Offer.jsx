import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
  // useParams permet de récupérer les params présent dans l'url de la page
  const { id } = useParams();
  const offer = data.offers.find((offer) => offer._id === id);

  console.log(id);
  return (
    <div>
      {offer && (
        <div className="offer-body">
          <div className="offer-container">
            <div>
              <img
                src={offer.product_pictures[0].secure_url}
                alt={offer.product_pictures[0].secure_url}
              />
            </div>
            <div>
              <div className="offer-infos">
                <span>{offer.product_price} €</span>
                {offer.product_details.map((detail, index) => {
                  return (
                    <div key={index}>
                      <p>{detail.MARQUE}</p>
                      <p>{detail.ÉTAT}</p>
                      <p>{detail.COULEUR}</p>
                      <p>{detail.EMPLACEMENT}</p>
                    </div>
                  );
                })}
                <p>{offer.product_name}</p>
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;

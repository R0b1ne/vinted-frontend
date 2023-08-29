import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token, title, price }) => {
  // State qui sert à savoir si ma requête de paiement est en cour
  const [isLoading, setIsLoading] = useState(false);
  //   State qui sert à savoir si le paiement a été validé
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Va nous permettre de faire une requête vers stripe pour lui envoyer les code
  const stripe = useStripe();
  //   Va nous permettre de récupérer les données bancaires (les codes) de l'utilisateur
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      // Je récupère le contenu du CardElement
      const cardElement = elements.getElement(CardElement);
      //   J'envoie ces informations à stripe pour qu'il valide l'existence de la carte
      const stripeResponse = await stripe.createToken(cardElement, {
        name: token, // J'envoie un identifiant de celui qui paye pour savoir qui est à l'origine de la transaction
      });
      console.log(token);
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //   Je fais une requête à mon back et je lui envoie mon stripeToken
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(response.data);
      setIsLoading(false);
      //   Si la réponse contient succeeded, je fais apparaitre "payment completed"
      if (response.data.status === "succeeded") {
        setPaymentCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const total = price + 0.4 + 0.8;

  return (
    <div className="checkOutForm-container">
      <form onSubmit={handleSubmit}>
        <h1>Résumé de la commmande</h1>
        <div className="checkOutForm-details">
          <p>
            Commande <span>{price} €</span>
          </p>
          <p>
            Frais protection acheteurs <span>0.4 €</span>
          </p>
          <p>
            Frais de port <span>0.8 €</span>
          </p>
        </div>
        <div>
          <p>
            Total <span>{total} €</span>
          </p>
        </div>
        <CardElement />
        {paymentCompleted === true ? (
          <p>Payment Completed</p>
        ) : (
          <button disabled={isLoading}>Pay</button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;

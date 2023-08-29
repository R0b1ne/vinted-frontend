import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
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
        name: "L'id de l'utilisateur", // J'envoie un identifiant de celui qui paye pour savoir qui est à l'origine de la transaction
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //   Je fais une requête à mon back et je lui envoie mon stripeToken
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
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
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {paymentCompleted === true ? (
        <p>Payement Completed</p>
      ) : (
        <input type="submit" disabled={isLoading} />
      )}
    </form>
  );
};

export default CheckoutForm;

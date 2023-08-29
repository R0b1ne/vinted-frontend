import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Navigate } from "react-router-dom";

import CheckOutForm from "../components/CheckOutForm";

// je me connecte à mon compte stripe en front, en utilisant ma clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, price } = location.state;

  console.log("name => ", title);
  console.log("price => ", price);
  console.log("token => ", token);

  // Elements  va devoir englober toute la logique de paiement. Je lui donne en props stripePromise pour lui montrer que je suis bien connecté à mon compte

  return token ? (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        {<CheckOutForm token={token} title={title} price={price} />}
      </Elements>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};
export default Payment;

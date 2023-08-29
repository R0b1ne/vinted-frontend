import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log({ username });
    // console.log({ email });
    const post = {
      username: username,
      email: email,
      password: password,
      newsletter: newsletter,
    };
    try {
      //   Je fais disparaitre le message d'erreur
      setErrorMessage("");
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        post
      );
      handleToken(response.data.token);
      // If the token has been created redirect to "/"
      navigate("/");

      console.log("response.data => ", response.data);
      console.log("response.data.token => ", response.data.token);
    } catch (error) {
      // console.log(error.response.data); // Pour voir le message d'erreur transmis par le serveur
      console.log(error.response); // Pour voir le status de la réponse
      // Si je reçois le message "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleNewsletterChange = () => {
    setNewsletter(!newsletter);
  };
  //   console.log(newsletter);

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          name="password"
          autoComplete="on"
          value={password}
          onChange={handlePasswordChange}
        />
        <label>
          <input
            type="checkbox"
            onChange={handleNewsletterChange}
            value={newsletter}
          />
          S'inscrire à notre newsletter
        </label>
        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <Link to="/login">Tu as déjà un compte ? Connectes-toi !</Link>
    </div>
  );
};
export default Signup;

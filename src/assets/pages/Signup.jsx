import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

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
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        post
      );
      Cookies.set("token", response.data.token, { expires: 14 });
      // If the token has been created redirect to "/"
      if (response.data.token) {
        navigate("/");
      }

      console.log("response.data => ", response.data);
      console.log("response.data.token => ", response.data.token);
    } catch (error) {
      console.log(error.message);
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
    <div>
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};
export default Signup;

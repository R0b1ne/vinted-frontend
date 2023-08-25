import vintedLogo from "../assets/images/vintedLogo.png";
import { Link } from "react-router-dom"; //rappel

const Header = ({ token, handleToken }) => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={vintedLogo} alt="logo" />
        </Link>
        <div>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Recherche des articles"
            />
          </form>
        </div>
        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Déconnexion
          </button>
        ) : (
          <div className="header-buttons">
            <Link to="/signup">
              <button className="header-button">S'inscrire</button>
            </Link>
            <Link to="/Login">
              <button className="header-button">Se connecter</button>
            </Link>
            <button className="header-button">Vends tes articles</button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;

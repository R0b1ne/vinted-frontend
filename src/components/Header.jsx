import vintedLogo from "../assets/images/vintedLogo.png";
import { Link } from "react-router-dom"; //rappel

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  descPrice,
  setdescPrice,
}) => {
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
              value={search}
              name="name"
              placeholder="Recherche des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </form>
          <button
            type="button"
            value="submit"
            onClick={() => {
              setdescPrice("price-desc");
              console.log(descPrice);
            }}
          >
            Prix descendant
          </button>
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
          </div>
        )}
        <Link to={token ? "/publish" : "/login"}>
          <button className="header-button">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};
export default Header;

import vintedLogo from "../assets/images/vintedLogo.png";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div>
          <img src={vintedLogo} alt="logo" />
        </div>
        <div>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Recherche des articles"
            />
          </form>
        </div>
        <div className="header-buttons">
          <button className="header-button">S'inscrire</button>
          <button className="header-button">Se connecter</button>
          <button className="header-button">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};
export default Header;

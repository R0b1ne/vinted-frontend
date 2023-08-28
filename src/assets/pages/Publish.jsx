import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  // State qui contient l'url fourni par cloudinary
  const [imgFromCloudinary, setImgFromCloudinary] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log({ title });
    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();

      // Rajouter 2 paires clef/valeur à mon formdata
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange);

      // Je donne 3 arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImgFromCloudinary(response.data.secure_url);
      console.log("response.data => ", response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="publish-container">
      <div>
        <h2>Vends ton article</h2>
      </div>
      <form className="form-publish" onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          {imgFromCloudinary && <img src={imgFromCloudinary} alt="" />}
        </div>
        <div>
          <input
            placeholder="Titre"
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="Décris ton article"
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Marque"
            type="text"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
          <input
            placeholder="Taille"
            type="text"
            name="size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
          <input
            placeholder="Couleur"
            type="text"
            name="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
          <input
            placeholder="Etat"
            type="text"
            name="condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          />
          <input
            placeholder="Lieu"
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Price"
            type="number"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        {
          <label>
            <input type="checkbox" onChange={() => setExchange(!exchange)} />
            Je suis intéressé(e) par les échanges
          </label>
        }
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  );
};
export default Publish;

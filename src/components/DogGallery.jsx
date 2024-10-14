import { useState, useEffect } from 'react';

function DogGallery() {
  const [dogImages, setDogImages] = useState([]);
  const [popupImage, setPopupImage] = useState(null); // Pour gérer l'image du popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Gérer l'état d'ouverture du popup

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/8')
      .then((res) => res.json())
      .then((data) => {
        setDogImages(data.message);
      });
  }, []);

  // Ouvrir le popup avec l'image cliquée
  const openPopup = (image) => {
    setPopupImage(image); // Définit l'image du popup
    setIsPopupOpen(true); // Ouvre le popup
  };

  // Fermer le popup
  const closePopup = () => {
    setIsPopupOpen(false); // Ferme le popup
    setPopupImage(null);   // Réinitialise l'image du popup
  };

  return (
    <>
    {/* Popup d'affichage d'image */}
    {isPopupOpen && (
      <div id="popup-bg" className="active" onClick={closePopup}>
        <div id="popup-content" onClick={(e) => e.stopPropagation()}>
          <div id="popup-close" onClick={closePopup}>
            <ion-icon name="close-circle"></ion-icon>
          </div>
          <img id="popup-img" src={popupImage} alt="Popup Dog" />
        </div>
      </div>
    )}

      {/* <div className="gallery">
        {dogImages.map((image, index) => (
          <img key={index} src={image} alt={`Chien numéro ${index}`} onClick={() => openPopup(image)} />
        ))}
      </div> */}

      {/* Galerie d'images */}
      <div className="gallery2">
        {dogImages.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openPopup(image)}
          >
            <img src={image} alt={`Dog ${index}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default DogGallery;
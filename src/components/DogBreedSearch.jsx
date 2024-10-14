import { useState, useEffect } from 'react';

function DogBreedSearch() {
  const [breeds, setBreeds] = useState([]);
  const [breedInput, setBreedInput] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImages, setDogImages] = useState([]);
  const [popupImage, setPopupImage] = useState(null); // Pour gérer l'image du popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Gérer l'état d'ouverture du popup
  const [showError, setShowError] = useState(false);

  let list = document.getElementById('dropdown');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      });
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setBreedInput(input);
    setShowError(false); // Réinitialise l'erreur lors de la saisie
    list.style.display = 'block'
  };

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
    setBreedInput(breed);
    list.style.display = 'none'
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchedBreed = breedInput.trim().toLowerCase(); 

    if (breeds.includes(searchedBreed)) {
      setSelectedBreed(searchedBreed);
      fetch(`https://dog.ceo/api/breed/${searchedBreed}/images`)
        .then((res) => res.json())
        .then((data) => {
          setDogImages(data.message);
        });
    } else {
      setShowError(true);
      setDogImages([]); // Réinitialise les images en cas d'erreur
    }
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(breedInput.toLowerCase())
  );

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
      <div className="breed-search">
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
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Entrez une race de chien"
              value={breedInput}
              onChange={handleChange}
              required
              />
              {filteredBreeds.length > 0 && breedInput !== '' && (
                <ul className="dropdown" id='dropdown'>
                  {filteredBreeds.map((breed) => (
                    <li key={breed} onClick={() => handleBreedSelect(breed)}>
                      {breed}
                    </li>
                  ))}
                </ul>
              )}     
          </div>
            <button type="submit">Rechercher</button>
        </form>
          {showError && (
            <div className="error-message">Race introuvable, vérifiez l&apos;orthographe.</div>
          )}
      </div>
      <div className="gallery2">
        {dogImages.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openPopup(image)}
          >
            <img key={index} src={image} alt={`Chien de race ${selectedBreed}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default DogBreedSearch;
import { useState } from 'react';

function DogBreedSearch() {
  const [breed, setBreed] = useState('');
  const [dogImages, setDogImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((res) => res.json())
      .then((data) => {
        setDogImages(data.message);
      });
  };

  return (
    <div className="breed-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez une race de chien"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      <div className="gallery">
        {dogImages.map((image, index) => (
          <img key={index} src={image} alt={`Chien de race ${breed}`} />
        ))}
      </div>
    </div>
  );
}

export default DogBreedSearch;
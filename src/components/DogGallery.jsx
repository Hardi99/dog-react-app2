import { useState, useEffect } from 'react';

function DogGallery() {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/8')
      .then((res) => res.json())
      .then((data) => {
        setDogImages(data.message);
      });
  }, []);

  return (
    <div className="gallery">
      {dogImages.map((image, index) => (
        <img key={index} src={image} alt={`Chien numéro ${index}`} />
      ))}
    </div>
  );
}

export default DogGallery;
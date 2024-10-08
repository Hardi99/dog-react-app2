import { useState, useEffect } from 'react';

function Home() {
  const [randomDogImage, setRandomDogImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setRandomDogImage(data.message);
      });
  }, []);

  return (
    <div className="home">
      <h1>Bienvenue sur le Portfolio Canin!</h1>
      <img src={randomDogImage} alt="Un chien aléatoire" />
    </div>
  );
}

export default Home;
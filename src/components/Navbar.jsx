import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/gallery">Galerie de chiens</Link>
        </li>
        <li>
          <Link to="/breed">Recherche par race</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
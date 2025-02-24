import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/people">Персонажи</Link></li>
        <li><Link to="/planets">Планеты</Link></li>
        <li><Link to="/starships">Корабли</Link></li>
        <li><Link to="/films">Фильмы</Link></li>
        <li><Link to="/species">Расы</Link></li>
        <li><Link to="/vehicles">Транспорт</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
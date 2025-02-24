import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/swapi";
import Loader from "./Loader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await fetchData(`people/?search=${query}`);
      setResults(data.results);
    } catch (error) {
      console.error("Ошибка поиска", error);
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите имя персонажа..."
      />
      <button onClick={handleSearch}>Искать</button>
      {loading && <Loader />}
      <ul className="search-results">
        {results.map((result) => (
          <li key={result.url}>
            <button onClick={() => navigate(`/people/${result.url.split("/").slice(-2, -1)[0]}`)}>
              {result.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
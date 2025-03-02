import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../api/swapi";
import "../styles/SearchBar.css";
import Loader from "./Loader";

interface SWAPIEntity {
  url: string;
  name?: string;
  title?: string;
  [key: string]: unknown;
}

interface SearchResult {
  category: string;
  key: string;
  items: SWAPIEntity[];
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Используем реальные endpoint'ы SWAPI: для "characters" используем "people"
  const categories = [
    { key: "people", label: "Characters" },
    { key: "planets", label: "Planets" },
    { key: "starships", label: "Starships" },
    { key: "vehicles", label: "Vehicles" },
    { key: "species", label: "Species" },
    { key: "films", label: "Films" },
  ];

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    const allResults: SearchResult[] = [];
    try {
      for (const cat of categories) {
        const data = await fetchData(
          cat.key,
          undefined,
          `?search=${encodeURIComponent(searchTerm)}`
        );
        if (data.count > 0) {
          allResults.push({
            category: cat.label,
            key: cat.key,
            items: data.results as SWAPIEntity[],
          });
        }
      }
      setResults(allResults);
    } catch (err) {
      console.error("Search error", err);
      setError("Ошибка при выполнении поиска");
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Поиск по категориям</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Введите запрос..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Поиск
        </button>
      </form>
      {loading && <div className="search-loading"><Loader/></div>}
      {error && <div className="search-error">{error}</div>}
      <div className="search-results">
        {!loading && results.length === 0 && (
          <div className="no-results">Ничего не найдено</div>
        )}
        {results.map((result) => (
          <div key={result.category} className="result-category">
            <h3 className="category-title">{result.category}</h3>
            <ul className="result-list">
              {result.items.map((item: SWAPIEntity) => {
                const parts = item.url.split("/").filter(Boolean);
                const id = parts[parts.length - 1];
                return (
                  <li key={item.url} className="result-item">
                    <Link to={`/${result.key}/${id}`} state={{ entity: item }}>
                      {item.name || item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

import { useState } from "react";
import Loader from "../../components/Loader";
import type { Species as SpeciesType } from "../../types/Species"; // <-- Используем "as SpeciesType"
import { Link } from "react-router-dom";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import Pagination from "../../components/PaginationBar";
import "../../styles/Resource.css";

const Species = () => {
  const [page, setPage] = useState(1);
  const {
    data: species,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<SpeciesType>("species", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Расы</h2>
      <div className="resource-list">
        {species.map((specie) => {
          // Извлекаем id персонажа из URL, например "https://swapi.dev/api/people/1/" → "1"
          const specieId = specie.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={specie.url}
              to={`/people/${specieId}`}
              state={{ specie }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{specie.name}</h3>
                <p className="resource-info">
                  {specie.classification && `Классификация: ${specie.classification}`}
                  <br />
                  {specie.language &&
                    `Язык: ${specie.language}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Species;

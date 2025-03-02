import { useState } from "react";
import Loader from "../../components/Loader";
import type { Species as SpeciesType } from "../../types/Species"; // <-- Используем "as SpeciesType"
import { Link } from "react-router-dom";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import Pagination from "../../components/PaginationBar";

const Species = () => {
  const [page, setPage] = useState(1);
  const { data: species, totalCount, loading, error } = useSwapiPagination<SpeciesType>("species", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Расы</h2>
      <ul>
      {species.map((specie) => {
          // Извлекаем id фильма из URL
          const specieId = specie.url.split("/").slice(-2, -1)[0];
          return (
            <li key={specie.url}>
              {/* Передаем весь объект фильма через state */}
              <Link to={`/species/${specieId}`} state={{ specie }}>
                {specie.name}
              </Link>
            </li>
          );
        })}
      </ul>
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

import { useState } from "react";
import Loader from "../../components/Loader";
import { Film } from "../../types/Film";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";

const Films = () => {
  const [page, setPage] = useState(1);
  const { data: films, totalCount, loading, error } = useSwapiPagination<Film>("films", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Фильмы</h2>
      <ul>
        {films.map((film) => {
          // Извлекаем id фильма из URL
          const filmId = film.url.split("/").slice(-2, -1)[0];
          return (
            <li key={film.url}>
              {/* Передаем весь объект фильма через state */}
              <Link to={`/films/${filmId}`} state={{ film }}>
                {film.title}
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

export default Films;

import { useState } from "react";
import Loader from "../../components/Loader";
import { Film } from "../../types/Film";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import "../../styles/Resource.css";

const Films = () => {
  const [page, setPage] = useState(1);
  const {
    data: films,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<Film>("films", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Фильмы</h2>
      <div className="resource-list">
        {films.map((film) => {
          const filmId = film.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={film.url}
              to={`/films/${filmId}`}
              state={{ film }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{film.title}</h3>
                <p className="resource-info">
                  {film.director && `Директор: ${film.director}`}
                  <br />
                  {film.release_date && `Дата релиза: ${film.release_date}`}
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

export default Films;

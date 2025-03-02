import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import { useState } from "react";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import { People as PeopleType } from "../../types/People";
import Loader from "../../components/Loader";
import "../../styles/People.css";

const People = () => {
  const [page, setPage] = useState(1);
  const { data: peoples, totalCount, loading, error } = useSwapiPagination<PeopleType>("people", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div className="error">Ошибка: {String(error)}</div>;

  return (
    <div className="people-container">
      <h2 className="people-title">Персонажи</h2>
      <div className="people-list">
        {peoples.map((people) => {
          // Извлекаем id персонажа из URL, например "https://swapi.dev/api/people/1/" → "1"
          const peopleId = people.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={people.url}
              to={`/people/${peopleId}`}
              state={{ people }}
              className="people-card"
            >
              <div className="card-content">
                <h3 className="people-name">{people.name}</h3>
                <p className="people-info">
                  {people.gender && `Пол: ${people.gender}`}<br />
                  {people.birth_year && `Год рождения: ${people.birth_year}`}
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

export default People;

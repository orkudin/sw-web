// src/pages/Vehicles.tsx
import { useState } from "react";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import Loader from "../../components/Loader";
import { Vehicle } from "../../types/Vehicle";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import "../../styles/Resource.css";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const {
    data: vehicles,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<Vehicle>("vehicles", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Транспорт</h2>
      <div className="resource-list">
        {vehicles.map((vehicle) => {
          // Извлекаем id персонажа из URL, например "https://swapi.dev/api/people/1/" → "1"
          const vehicleId = vehicle.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={vehicle.url}
              to={`/vehicles/${vehicleId}`}
              state={{ vehicle }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{vehicle.name}</h3>
                <p className="resource-info">
                  {vehicle.model && `Модель: ${vehicle.model}`}
                  <br />
                  {vehicle.manufacturer &&
                    `Производитель: ${vehicle.manufacturer}`}
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

export default Vehicles;

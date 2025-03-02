// src/pages/Vehicles.tsx
import { useState } from "react";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import Loader from "../../components/Loader";
import { Vehicle } from "../../types/Vehicle";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const { data: vehicles, totalCount, loading, error } = useSwapiPagination<Vehicle>("vehicles", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  return (
    <div>
      <h2>Транспорт</h2>
      <ul>
        {vehicles.map((vehicle) => {
          // Извлекаем id из URL, например: "https://swapi.dev/api/vehicles/4/" → "4"
          const vehicleId = vehicle.url.split("/").slice(-2, -1)[0];
          return (
            <li key={vehicle.url}>
              <Link to={`/vehicles/${vehicleId}`} state={{ vehicle }}>
                {vehicle.name}
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

export default Vehicles;

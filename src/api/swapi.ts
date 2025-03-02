// src/api/swapi.ts
import axios from "axios";

const API_URL = "https://swapi.dev/api";

export const fetchData = async (
  endpoint: string,
  id?: string,
  query?: string
) => {
  try {
    let url = "";
    if (id) {
      url = `${API_URL}/${endpoint}/${id}/`;
    } else {
      url = `${API_URL}/${endpoint}/`;
    }
    if (query) {
      // Если URL заканчивается на слэш, убираем его перед добавлением query
      if (url.endsWith("/")) {
        url = url.slice(0, -1);
      }
      url += query;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки данных", error);
    throw error;
  }
};

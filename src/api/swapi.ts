import axios from "axios";

const API_URL = "https://swapi.dev/api";

export const fetchData = async (endpoint: string, id?: string) => {
  try {
    const url = id ? `${API_URL}/${endpoint}/${id}/` : `${API_URL}/${endpoint}/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки данных", error);
    throw error;
  }
};
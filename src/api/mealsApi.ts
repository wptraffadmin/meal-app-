// import axios from "axios";
// import { Meal } from "../types/types";

// const API_URL = "https://www.themealdb.com/api/json/v1/1";

// // Отримати всі рецепти за ключовим словом
// export const fetchMealsBySearch = async (query: string) => {
//   const response = await axios.get(`${API_URL}/search.php?s=${query}`);
//   return response.data.meals || [];
// };

// // Отримати рецепт за ID
// export const fetchMealById = async (id: string) => {
//   const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
//   return response.data.meals?.[0] || null;
// };

// // Отримати всі категорії
// export const fetchCategories = async () => {
//   const response = await axios.get(`${API_URL}/categories.php`);
//   return response.data.categories;
// };
  
// // export const fetchMealsByCategory = async (category: string) => {
// //     const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
// //     return response.data.categories;
// //   };
// export const fetchMealsByCategory = async (category: string): Promise<Meal[]> => {
//     const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
//     return response.data.meals || []; // Повертає масив страв або порожній масив
//   };
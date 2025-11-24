import axios from 'axios';
import { Meal, MealResponse, CategoryResponse, AreaResponse } from '../types/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  getAllMeals: async (): Promise<Meal[]> => {
    const response = await axios.get<MealResponse>(`${BASE_URL}/search.php?s=`);
    return response.data.meals || [];
  },

  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await axios.get<MealResponse>(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  },

  getMealById: async (id: string): Promise<Meal | null> => {
    const response = await axios.get<MealResponse>(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await axios.get<CategoryResponse>(`${BASE_URL}/categories.php`);
    return response.data.categories.map(category => category.strCategory);
  },

  getAreas: async (): Promise<string[]> => {
    const response = await axios.get<AreaResponse>(`${BASE_URL}/list.php?a=list`);
    return response.data.meals.map(area => area.strArea);
  },
}; 
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface MealResponse {
  meals: Meal[] | null;
}

export interface Category {
  strCategory: string;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface Area {
  strArea: string;
}

export interface AreaResponse {
  meals: Area[];
} 
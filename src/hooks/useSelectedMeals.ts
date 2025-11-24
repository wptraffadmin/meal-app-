import { create } from 'zustand';
import { Meal } from '../types/meal';

interface SelectedMealsStore {
  selectedMeals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  clearSelectedMeals: () => void;
}

export const useSelectedMeals = create<SelectedMealsStore>((set) => ({
  selectedMeals: [],
  addMeal: (meal) =>
    set((state) => ({
      selectedMeals: [...state.selectedMeals, meal],
    })),
  removeMeal: (mealId) =>
    set((state) => ({
      selectedMeals: state.selectedMeals.filter((meal) => meal.idMeal !== mealId),
    })),
  clearSelectedMeals: () => set({ selectedMeals: [] }),
})); 
import { useSelectedMeals } from '../hooks/useSelectedMeals';
import { MealCard } from '../components/MealCard';
import styles from './SelectedMealsPage.module.css';

export const SelectedMealsPage = () => {
  const { selectedMeals, clearSelectedMeals } = useSelectedMeals();

  const allIngredients = selectedMeals.reduce((acc, meal) => {
    const ingredients = Array.from({ length: 20 }, (_, i) => ({
      ingredient: meal[`strIngredient${i + 1}`],
      measure: meal[`strMeasure${i + 1}`],
    })).filter(({ ingredient }) => ingredient);

    return [...acc, ...ingredients];
  }, [] as { ingredient: string | null; measure: string | null }[]);

  const uniqueIngredients = allIngredients.reduce((acc, { ingredient, measure }) => {
    if (!ingredient) return acc;
    const existing = acc.find((item) => item.ingredient === ingredient);
    if (existing) {
      existing.measure = `${existing.measure} + ${measure}`;
    } else {
      acc.push({ ingredient, measure });
    }
    return acc;
  }, [] as { ingredient: string; measure: string | null }[]);

  if (selectedMeals.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h1 className={styles.emptyStateTitle}>Вибраних рецептів немає</h1>
        <p className={styles.emptyStateText}>Додайте рецепти на сторінці всіх рецептів</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Вибрані рецепти</h1>
        <button
          onClick={clearSelectedMeals}
          className={styles.clearButton}
        >
          Очистити вибрані
        </button>
      </div>

      <div className={styles.grid}>
        {selectedMeals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} showAddButton={false} />
        ))}
      </div>

      <div className={styles.ingredientsCard}>
        <h2 className={styles.ingredientsTitle}>Список інгредієнтів</h2>
        <ul className={styles.ingredientsList}>
          {uniqueIngredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              {ingredient} - {measure}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.instructions}>
        <h2 className={styles.instructionsTitle}>Інструкції по приготуванню</h2>
        {selectedMeals.map((meal, index) => (
          <div key={meal.idMeal} className={styles.recipeInstructions}>
            <h3 className={styles.recipeTitle}>{meal.strMeal}</h3>
            <p className={styles.instructionsText}>{meal.strInstructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { MealCard } from '../components/MealCard';
import styles from './MealPage.module.css';

export const MealPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: meal, isLoading } = useQuery({
    queryKey: ['meal', id],
    queryFn: () => api.getMealById(id!),
  });

  if (isLoading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (!meal) {
    return <div className={styles.error}>Рецепт не знайдено</div>;
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter(({ ingredient }) => ingredient);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={styles.image}
          />
        </div>
        <div>
          <h1 className={styles.title}>{meal.strMeal}</h1>
          <div className={styles.info}>
            <div>Категорія: {meal.strCategory}</div>
            <div>Кухня: {meal.strArea}</div>
            {meal.strTags && <div>Теги: {meal.strTags}</div>}
          </div>
          <div className={styles.ingredients}>
            <h2 className={styles.ingredientsTitle}>Інгредієнти:</h2>
            <ul className={styles.ingredientsList}>
              {ingredients.map(({ ingredient, measure }, index) => (
                <li key={index}>
                  {ingredient} - {measure}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h2 className={styles.instructionsTitle}>Інструкції:</h2>
            <p className={styles.instructionsText}>{meal.strInstructions}</p>
          </div>
          {meal.strYoutube && (
            <div>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeLink}
              >
                Переглянути відео на YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
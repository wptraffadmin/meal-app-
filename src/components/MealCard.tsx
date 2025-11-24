import { Meal } from '../types/meal';
import { useSelectedMeals } from '../hooks/useSelectedMeals';
import { Link } from 'react-router-dom';
import styles from './MealCard.module.css';

interface MealCardProps {
  meal: Meal;
  showAddButton?: boolean;
}

export const MealCard = ({ meal, showAddButton = true }: MealCardProps) => {
  const { addMeal, removeMeal, selectedMeals } = useSelectedMeals();
  const isSelected = selectedMeals.some((m) => m.idMeal === meal.idMeal);

  return (
    <div className={styles.card}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{meal.strMeal}</h3>
        <div className={styles.info}>
          <span>{meal.strCategory}</span>
          <span>{meal.strArea}</span>
        </div>
        <div className={styles.actions}>
          <Link
            to={`/meal/${meal.idMeal}`}
            className={styles.link}
          >
            Детальніше
          </Link>
          {showAddButton && (
            <button
              onClick={() => (isSelected ? removeMeal(meal.idMeal) : addMeal(meal))}
              className={`${styles.button} ${isSelected ? styles.buttonRemove : styles.buttonAdd}`}
            >
              {isSelected ? 'Видалити' : 'Додати'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 
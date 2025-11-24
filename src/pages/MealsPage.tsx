import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { MealCard } from '../components/MealCard';
import { Pagination } from '../components/Pagination';
import { SearchInput } from '../components/SearchInput';
import styles from './MealsPage.module.css';

const ITEMS_PER_PAGE = 12;

export const MealsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals', searchQuery],
    queryFn: () => (searchQuery ? api.searchMeals(searchQuery) : api.getAllMeals()),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.strCategory === selectedCategory)
    : meals;

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <SearchInput onSearch={setSearchQuery} />
      </div>

      <div className={styles.filterContainer}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">Всі категорії</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Завантаження...</div>
      ) : (
        <>
          <div className={styles.grid}>
            {paginatedMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}; 
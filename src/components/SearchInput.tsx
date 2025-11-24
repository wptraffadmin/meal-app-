import { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export const SearchInput = ({ onSearch, debounceMs = 500 }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Пошук рецептів..."
      className={styles.input}
    />
  );
}; 
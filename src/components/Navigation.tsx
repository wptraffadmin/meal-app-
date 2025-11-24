import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            Рецепти
          </Link>
          <div className={styles.links}>
            <Link to="/" className={styles.link}>
              Всі рецепти
            </Link>
            <Link to="/selected" className={styles.link}>
              Вибрані рецепти
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 
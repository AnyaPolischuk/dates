import { CircularCarousel } from '../../components/CircularCarousel/CircularCarousel';
import styles from './MainPage.module.scss';

export const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lineVertical}></div>
      <div className={styles.lineGorizontal}></div>
      <div className={styles.titleLine}></div>
      <h1 className={styles.title}>Исторические даты</h1>
      <CircularCarousel/>
    </div>
  )
}

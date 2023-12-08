import { useEffect, useState } from 'react';

import { data } from '../../data';
import styles from './YearsCounter.module.scss';

type YearsCounterProps = {
  prevItem: number,
  activeItem: number
}

export const YearsCounter: React.FC<YearsCounterProps> = ({ prevItem, activeItem }) => {
  const prevItemPrevYear = data[prevItem].startYear;
  const prevItemActiveYear = data[prevItem].endYear;
  const activeItemActiveYear = data[activeItem].endYear;
  const activeItemPrevYear = data[activeItem].startYear;

  const [prevYear, setPrevYear] = useState<number>(prevItemPrevYear);
  const [activeYear, setActiveYear] = useState<number>(prevItemActiveYear);

  useEffect(() => {
    if (prevYear < activeItemPrevYear) {
      const timer = setInterval(() => {
        setPrevYear((prevNumber) => prevNumber + 1);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [prevYear, activeItemPrevYear]);

  useEffect(() => {
    if (activeYear < activeItemActiveYear) {
      const timer = setInterval(() => {
        setActiveYear((prevNumber) => prevNumber + 1);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [activeYear, activeItemActiveYear]);

  useEffect(() => {
    if (prevYear > activeItemPrevYear) {
      const timer = setInterval(() => {
        setPrevYear((prevNumber) => prevNumber - 1);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [prevYear, activeItemPrevYear]);

  useEffect(() => {
    if (activeYear > activeItemActiveYear) {
      const timer = setInterval(() => {
        setActiveYear((prevNumber) => prevNumber - 1);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [activeYear, activeItemActiveYear]);

  return (
    <div className={styles.container}>
      <h2 className={styles.prevYear}>{prevYear}</h2>
      <h2 className={styles.activeYear}>{activeYear}</h2>
    </div>
  );
};



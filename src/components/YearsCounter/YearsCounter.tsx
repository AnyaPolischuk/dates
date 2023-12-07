import { useEffect, useState } from "react";
import { data } from "../../data";

type YearsCounterProps = {
  prevItem: number,
  activeItem: number
}

export const YearsCounter = ({ prevItem, activeItem }: YearsCounterProps) => {
  const prevItemPrevYear = data[prevItem].startYear;
  const prevItemActiveYear = data[prevItem].endYear;
  const activeItemActiveYear = data[activeItem].endYear;
  const activeItemPrevYear = data[activeItem].startYear;

  const [prevYear, setPrevYear] = useState(prevItemPrevYear);
  const [activeYear, setActiveYear] = useState(prevItemActiveYear);

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

  return <h1>{prevYear} ----- {activeYear}</h1>;
};



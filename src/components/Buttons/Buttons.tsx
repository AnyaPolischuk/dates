import { data } from '../../data';
import styles from './Buttons.module.scss';

type ButtonsProps = {
  prevClickHandler: (amount: number) => void,
  nextClickHandler: (amount: number) => void,
  itemStepRef: { current: number },
  activeItem: number
}

export const Buttons = ({ prevClickHandler, nextClickHandler, itemStepRef, activeItem }: ButtonsProps) => {
  return (
    <div>
      <button
        onClick={() => prevClickHandler(itemStepRef.current)}
        disabled={activeItem === 0 ? true : false }
        className={styles.prev}>
        {`<`}
      </button>
      <button
        onClick={() => nextClickHandler(-itemStepRef.current)}
        disabled={ activeItem + 1 === data.length ? true : false } 
        className={styles.next}>
        {`>`}
      </button>
    </div>
  )
}



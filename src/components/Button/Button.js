// React spinner
import { SpinnerDotted } from 'spinners-react';

// Style
import style from './Button.module.scss';

export default function Button({ text, isLoading }) {
  return (
    <button className={style.button}>
      {isLoading ? (
        <SpinnerDotted size={15} thickness={100} speed={100} color='#ffffff' />
      ) : (
        text
      )}
    </button>
  );
}

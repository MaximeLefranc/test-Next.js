// Style
import style from './Success.module.scss';

export default function Success({ message }) {
  return <div className={style.success}>{message}</div>;
}

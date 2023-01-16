// Next
import Link from 'next/link';

// Style
import style from './ClientFilter.module.scss';

export default function ClientFilter({ client }) {
  return (
    <>
      <Link href={`/${client}/`} className={style.ButtonYears}>
        Tout
      </Link>
      <Link href={`/${client}/2019`} className={style.ButtonYears}>
        2019
      </Link>
      <Link href={`/${client}/2020`} className={style.ButtonYears}>
        2020
      </Link>
      <Link href={`/${client}/2021`} className={style.ButtonYears}>
        2021
      </Link>
      <Link href={`/${client}/2022`} className={style.ButtonYears}>
        2022
      </Link>
      <Link href={`/${client}/2023`} className={style.ButtonYears}>
        2023
      </Link>
    </>
  );
}

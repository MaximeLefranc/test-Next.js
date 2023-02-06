// Next
import Link from 'next/link';

// Style
import style from './ClientFilter.module.scss';

export default function ClientFilter({ client, years }) {
  return (
    <>
      <Link href={`/${client}/`} className={style.ButtonYears}>
        Tout
      </Link>
      {years.map((year, index) => (
        <Link
          key={index}
          href={`/${client}/${year}`}
          className={style.ButtonYears}
        >
          {year}
        </Link>
      ))}
    </>
  );
}

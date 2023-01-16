// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// Style
import style from './CardProject.module.scss';

export default function CardProject({ darkMode }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';

  return (
    <Link
      href={{
        pathname: '/projets/[slug]',
        query: {
          slug: 'trocservices',
        },
      }}
    >
      <div className={`${style.Card} ${classDarkMode}`}>
        <h3 className={style.Card__title}>Troc&apos;Services</h3>
        <p className={style.Card__describe}>
          Site d&apos;échange communautaire de services entres particuliers, le
          tout, gratuitement sans dépenser un centime.
        </p>
      </div>
    </Link>
  );
}

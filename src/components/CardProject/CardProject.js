// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// Style
import style from './CardProject.module.scss';

export default function CardProject({ darkMode, titre, slug, description }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';

  return (
    <Link
      href={{
        pathname: '/projets/[slug]',
        query: {
          slug: slug,
        },
      }}
    >
      <div className={`${style.Card} ${classDarkMode}`}>
        <h3 className={style.Card__title}>{titre}</h3>
        <p className={style.Card__describe}>{description}</p>
      </div>
    </Link>
  );
}

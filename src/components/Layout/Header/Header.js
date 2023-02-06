// Next
import Image from 'next/image';
import Link from 'next/link';

// Logo
import moon from '../../../../public/icons8-croissant-de-lune-50.png';
import sun from '../../../../public/icons8-sun-star-48.png'

// Style
import style from './Header.module.scss';

export default function Header({ darkMode, setDarkMode }) {
  // Constants
  const logoDarkMode = darkMode ? sun : moon;
  const classDarkMode = darkMode ? style.dark : '';

  // Methods
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`${style.header} ${classDarkMode}`}>
      <div className={style.header__div}>
        <h1 className={style.header__div__title}>
          <Link href='/'>Maxime</Link>
        </h1>
        <nav className={style.header__div__nav}>
          <ul className={style.header__div__nav__ul}>
            <li className={style.header__div__nav__ul__li}>
              <Link href='/'>Accueil</Link>
            </li>
            <li className={style.header__div__nav__ul__li}>
              <Link href='/projets'>Projets</Link>
            </li>
            <li className={style.header__div__nav__ul__li}>
              <Link href='/ajouter'>Ajouter</Link>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`${style.header__button} ${classDarkMode}`}
        type='button'
        onClick={handleDarkMode}
      >
        <Image
          className={style.header__button__logo}
          src={logoDarkMode}
          alt='logo dark mode'
        />
      </button>
    </header>
  );
}

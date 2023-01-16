// Component
import CardProject from '@/components/CardProject/CardProject';

// Style
import style from './Projet.module.scss';

export default function Projects({ darkMode }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';

  return (
    <>
      <h1 className={`${style.title} ${classDarkMode}`}>Mes Projets</h1>
      <div className={style.cards}>
        <CardProject darkMode={darkMode} />
        <CardProject darkMode={darkMode} />
        <CardProject darkMode={darkMode} />
      </div>
    </>
  );
}

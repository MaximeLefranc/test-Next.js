// Mongo
import { connectToDatabase } from 'helpers/mongodb';

// Component
import CardProject from '@/components/CardProject/CardProject';

// Style
import style from './Projet.module.scss';

export default function Projects({ darkMode, projects }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';

  return (
    <>
      <h1 className={`${style.title} ${classDarkMode}`}>Mes Projets</h1>
      <div className={style.cards}>
        {projects.map((project) => (
          <CardProject
            key={project._id}
            darkMode={darkMode}
            slug={project.slug}
            titre={project.titre}
            description={project.description}
          />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let projects;
  try {
    // Connexion
    const client = await connectToDatabase();
    const db = client.db();
    // Récupérer les projets
    projects = await db.collection('projets').find().toArray();
  } catch (error) {
    projects = [];
  }
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
}

// Mongo
import { MongoClient } from 'mongodb';

// Component
import CardProject from '@/components/CardProject/CardProject';

// Style
import style from './Projet.module.scss';

export default function Projects({ darkMode, projects }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';
  console.log(projects);

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

export async function getStaticProps() {
  let projects;
  let client;
  try {
    // Connexion à MongoDB
    client = await MongoClient.connect(
      'mongodb+srv://MaxLefranc:MaxLefranc@cluster0.n3gaejm.mongodb.net/portfolio?retryWrites=true&w=majority'
    );
    // Connexion à la DB
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

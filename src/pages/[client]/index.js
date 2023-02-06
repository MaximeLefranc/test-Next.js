// Mongo
import { connectToDatabase } from 'helpers/mongodb';

// Next
import { useRouter } from 'next/router';
import Head from 'next/head';

// Component
import CardProject from '@/components/CardProject/CardProject';
import ClientFilter from '@/components/ClientFilter/ClientFilter';

// Style
import style from './Client.module.scss';

export default function ProjectOfClient({ darkMode, projects, years }) {
  // Constants
  const router = useRouter();
  const clientName =
    router.query.client === 'perso'
      ? 'Projet personnels'
      : `Projet de ${router.query.client}`;

  return (
    <>
      <Head>
        <title>{clientName}</title>
      </Head>
      <h1 className='main__title'>{clientName}</h1>
      <ClientFilter client={router.query.client} years={years} />
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

/* 
getStaticProps = Pages statiques (qui ne changent plus jamais)
getStaticPaths = Pages dynamiques 
*/

export async function getStaticPaths() {
  // Connexion à MangoDB
  const client = await connectToDatabase();
  const db = client.db();

  // Récupèrer les projets
  const projects = await db.collection('projets').find().toArray();

  let arrayPaths = projects.map((project) => {
    if (project.client === 'Projet personnel') {
      return 'perso';
    } else {
      return project.client;
    }
  });
  arrayPaths = [...new Set(arrayPaths)];
  const dynamicPaths = arrayPaths.map((path) => ({
    params: {
      client: path,
    },
  }));
  console.log(dynamicPaths);
  return {
    paths: dynamicPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let projects;
  let years;
  const { params } = context;
  let clientSlug = params.client;

  if (clientSlug === 'perso') {
    clientSlug = 'Projet personnel';
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();
    projects = await db
      .collection('projets')
      .find({ client: clientSlug })
      .sort({ annee: 'asc' })
      .toArray();
    projects = JSON.parse(JSON.stringify(projects));

    years = projects.map((project) => project.annee);
    years = [...new Set(years)];
  } catch (error) {
    projects = [];
  }
  return {
    props: {
      projects: projects,
      years: years.sort(),
    },
    revalidate: 3600,
  };
}

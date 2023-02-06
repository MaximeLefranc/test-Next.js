// MongoDB
import { connectToDatabase } from 'helpers/mongodb';

// Next
import { useRouter } from 'next/router';
import Head from 'next/head';

// Component
import CardProject from '@/components/CardProject/CardProject';
import ClientFilter from '@/components/ClientFilter/ClientFilter';

// Style
import style from './Client.module.scss';

export default function ProjectOfClientPerYear({ darkMode, projects, years }) {
  // Constants
  const router = useRouter();
  const clientName =
    router.query.client === 'perso'
      ? `Projet personnels (${router.query.annee})`
      : `Projet de ${router.query.client} (${router.query.annee})`;

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

export async function getStaticPaths() {
  // Connexion à MangoDB
  const client = await connectToDatabase();
  const db = client.db();

  // Récupèrer les projets
  const projects = await db.collection('projets').find().toArray();

  let arrayPaths = projects.map((project) => {
    if (project.client === 'Projet personnel') {
      return ['perso', project.annee];
    } else {
      return [project.client, project.annee];
    }
  });
  arrayPaths = [...new Set(arrayPaths)];
  const dynamicPaths = arrayPaths.map((path) => ({
    params: {
      client: path[0],
      annee: path[1].toString(),
    },
  }));

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
  const yearSlug = params.annee;

  if (clientSlug === 'perso') {
    clientSlug = 'Projet personnel';
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();
    projects = await db
      .collection('projets')
      .find({ client: clientSlug })
      .toArray();
    projects = JSON.parse(JSON.stringify(projects));

    years = projects.map((project) => project.annee);
    years = [...new Set(years)];

    projects = projects.filter(
      (project) => project.annee.toString() === yearSlug
    );
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

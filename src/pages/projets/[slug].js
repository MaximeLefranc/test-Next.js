// Mongo DB
import { connectToDatabase } from 'helpers/mongodb';

// Next
import Link from 'next/link';
import Head from 'next/head';

// Style
import style from './Projet.module.scss';

export default function ProjectDetail({ project }) {
  // Constants
  const { titre, description, client, annee, slug } = project;
  const clientToShow = client === 'Projet personnel' ? 'perso' : client;

  return (
    <>
      <Head>
        <title>{titre}</title>
      </Head>
      <h1 className={style.title}>{titre}</h1>
      <small className={style.small}>
        <Link href={`/${clientToShow}`}>{`${client} ${annee}`}</Link>
      </small>
    </>
  );
}

export async function getServerSideProps(context) {
  let project;
  const { params } = context;
  const slug = params.slug;

  try {
    // Connexion à MongoDB
    const client = await connectToDatabase();
    const db = client.db();
    project = await db.collection('projets').find({ slug: slug }).toArray();
  } catch (error) {
    project = [];
  }

  if (!project[0]) {
    return {
      // notFound: true,
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project))[0],
    },
  };
}
// export async function getStaticPaths() {
//   // Variables
//   let projects;

//   try {
//     // Connexion à MongoDB
//     const client = await connectToDatabase();
//     const db = client.db();

//     // Récupèrer les projets
//     projects = await db.collection('projets').find().toArray();
//   } catch (error) {
//     projects = [];
//   }

//   const dynamicPaths = projects.map((projects) => ({
//     params: {
//       slug: projects.slug,
//     },
//   }));

//   return {
//     paths: dynamicPaths,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps(context) {
//   let project;
//   const { params } = context;
//   const slug = params.slug;

//   try {
//     // Connexion à MongoDB
//     const client = await connectToDatabase();
//     const db = client.db();
//     project = await db.collection('projets').find({ slug: slug }).toArray();
//   } catch (error) {
//     project = [];
//   }

//   if (!project[0]) {
//     return {
//       // notFound: true,
//       redirect: {
//         destination: '/',
//       },
//     };
//   }

//   return {
//     props: {
//       project: JSON.parse(JSON.stringify(project))[0],
//     },
//     revalidate: 3600,
//   };
// }

// Auth
import { getSession, signOut } from 'next-auth/client';

// Next
import CardProject from '@/components/CardProject/CardProject';
import Image from 'next/image';
import Head from 'next/head';

// Picture
import myPicture from '../../public/max.jpg';
import trash from '../../public/trash.png';

// Mongo DB
import { connectToDatabase } from 'helpers/mongodb';

// Spinner
import { SpinnerDotted } from 'spinners-react';

// Axios
import axios from 'axios';

export default function Index({
  darkMode,
  projects,
  user,
  isLoading,
  setIsLoading,
  setError,
}) {
  // Methods
  const handleDeleteProfile = () => {
    if (!isLoading) {
      setIsLoading(true);
      console.log(isLoading);
      setError(null);
      axios
        .delete('/api/user/delete')
        .then((response) => {
          signOut();
        })
        .catch((error) => {
          setError('Une erreur est survenue');
        });
      setIsLoading(false);
    }
  };

  return (
    <main className='main'>
      <Head>
        <title>Le portfolio d&apos;un développeur (Maxime)</title>
      </Head>
      <h1 className='main__title'>
        {user ? `Bienvenue ${user.name}` : 'Bienvenue sur mon portfolio'}
      </h1>
      <div className='main__div'>
        <div>
          <h2 className='main__title--secondary'>
            Je m&apos;appelle
            <span className='main__title--secondary--span'> Maxime</span>
          </h2>
          <p className='main__description'>
            Je suis développeur Front-end spécialisé en React et Next.js.
            J&apos;ai aussi de bonnes notions en Back-end avec des connaissances
            en PHP, Symfony, MySQL et MongoDB.
            <br />
            Envie de collaborer avec moi?
          </p>
          <p>
            <a className='main__link' href='mailto:maxilefranc@gmail.com'>
              Contactez-moi !
            </a>
            {user && (
              <button className='main__button' onClick={handleDeleteProfile}>
                {isLoading ? (
                  <SpinnerDotted
                    size={15}
                    thickness={100}
                    speed={100}
                    color='#ffffff'
                  />
                ) : (
                  <Image
                    src={trash}
                    alt='trash icon'
                    width={15}
                    height={15}
                    className='main__trash'
                  />
                )}
                Supprimer mon profil
              </button>
            )}
          </p>
        </div>
        <Image
          src={myPicture}
          alt='profil picture'
          width={200}
          height={200}
          className='main__picture'
        />
      </div>
      <h2 className='main__title__projects'>Mes derrniers projets</h2>
      <div className='main__cards'>
        {projects.map((project) => (
          <CardProject
            key={project._id}
            darkMode={darkMode}
            titre={project.titre}
            slug={project.slug}
            description={project.description}
          />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  // Variables
  let projects;
  const session = await getSession({ req: context.req });
  let user = null;

  if (session) {
    user = session.user;
  }

  try {
    // Connection to MongoDB
    const client = await connectToDatabase();
    const db = client.db();
    projects = await db
      .collection('projets')
      .find()
      .sort({ annee: -1 })
      .limit(3)
      .toArray();
  } catch (error) {
    console.error(error);
    projects = [];
  }

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      user: user,
    },
  };
}

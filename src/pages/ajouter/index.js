//Auth
import { getSession } from 'next-auth/client';

// Next.js
import Head from 'next/head';
import { useRouter } from 'next/router';

// React-Hook-Form
import { useForm } from 'react-hook-form';

// Axios
import axios from 'axios';

// Components
import Error from '@/components/Error/Error';
import Button from '@/components/Button/Button';

//Styles
import style from './Ajouter.module.scss';

export default function Add({
  darkMode,
  isLoading,
  setIsLoading,
  error,
  setError,
}) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Methods
  const handleOnSubmit = (data) => {
    if (!isLoading) {
      // Send the new project on next API
      setIsLoading(true);
      setError(null);
      axios
        .post('/api/projet', data)
        .then((response) => {
          setIsLoading(false);
          router.replace(`/projets/${response.data.project.slug}`);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.response.data.message || 'Une erreur est survenue');
        });
    }
  };
  return (
    <>
      <Head>
        <title>Ajouter un article</title>
      </Head>
      <h1 className={style.title}>Ajouter un projet</h1>
      <section className={style.section}>
        <main className={`${style.main} ${classDarkMode}`}>
          {(errors.titre ||
            errors.slug ||
            errors.client ||
            errors.annee ||
            errors.description ||
            errors.contenu) && (
            <Error message='Veuillez remplir tous les champs du formulaire' />
          )}
          {error && <Error message={error} />}
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <p className={style.p}>
              <label className={style.label} htmlFor='titre'>
                Titre
              </label>
              <input
                className={`${`${style.input} ${classDarkMode}`} ${classDarkMode}`}
                id='titre'
                placeholder='Titre du projet'
                {...register('titre', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='slug'>
                Slug
              </label>
              <input
                className={`${style.input} ${classDarkMode}`}
                id='slug'
                placeholder='Slug du projet'
                {...register('slug', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='client'>
                Client
              </label>
              <input
                className={`${style.input} ${classDarkMode}`}
                id='Client'
                placeholder='Client associ?? projet'
                {...register('client', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='annee'>
                Ann??e
              </label>
              <input
                className={`${style.input} ${classDarkMode}`}
                id='annee'
                placeholder='Ann??e de cr??ation du projet'
                {...register('annee', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='description'>
                Description
              </label>
              <textarea
                className={`${style.input} ${classDarkMode}`}
                id='decription'
                placeholder='Description du projet'
                rows='5'
                {...register('description', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='contenu'>
                Contenu
              </label>
              <textarea
                className={`${style.input} ${classDarkMode}`}
                id='contenu'
                placeholder='Contenu du projet'
                rows='5'
                {...register('contenu', {
                  required: true,
                })}
              />
            </p>
            <div className={style.divButton}>
              <Button text='Ajouter' isLoading={isLoading} />
            </div>
          </form>
        </main>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: false,
      },
    };
  }
  if (session && !session.user.roles.includes('administrateur')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}

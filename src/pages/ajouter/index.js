// Next.js
import Head from 'next/head';

// React-Hook-Form
import { useForm } from 'react-hook-form';

//Styles
import style from './Ajouter.module.scss';

export default function Add({ darkMode }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Methods
  const handleOnSubmit = (data) => {
    console.log(data);
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
            <div className={style.error}>
              Veuillez remplir tous les champs du formulaire
            </div>
          )}
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
                placeholder='Client associé projet'
                {...register('client', {
                  required: true,
                })}
              />
            </p>
            <p className={style.p}>
              <label className={style.label} htmlFor='annee'>
                Année
              </label>
              <input
                className={`${style.input} ${classDarkMode}`}
                id='annee'
                placeholder='Année de création du projet'
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
              <button className={style.button}>Ajouter</button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}

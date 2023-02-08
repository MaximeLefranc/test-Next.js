// Next
import Head from 'next/head';

// React Hook Form
import { useForm } from 'react-hook-form';

// Component
import Button from '@/components/Button/Button';

// Style
import style from './Connexion.module.scss';

export default function Connection({ darkMode }) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Methods
  const handleSubmitAuthent = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <h1 className={style.title}>Connexion</h1>
      <section className={style.section}>
        <main className={`${style.container} ${classDarkMode}`}>
          <form
            onSubmit={handleSubmit(handleSubmitAuthent)}
            className={style.container__form}
          >
            <p>
              <label className={style.container__form__label} htmlFor='email'>
                Adresse email
              </label>
              <input
                className={`${style.container__form__input} ${classDarkMode}`}
                type='email'
                placeorder='Adresse email'
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <small className={style.small}>
                  Veuillez renseigner ce champ.
                </small>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <small className={style.small}>
                  Votre adresse email n&apos;est pas correcte.
                </small>
              )}
            </p>
            <p>
              <label
                className={style.container__form__label}
                htmlFor='password'
              >
                Mot de passe
              </label>
              <input
                className={`${style.container__form__input} ${classDarkMode}`}
                type='password'
                placeorder='Mot de passe'
                {...register('password', {
                  required: true,
                })}
              />
              {errors.password && (
                <small className={style.small}>
                  Veuillez renseigner ce champ.
                </small>
              )}
            </p>
            <div className={style.container__form__divButton}>
              <Button>Connexion</Button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}

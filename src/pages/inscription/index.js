// Component
import Button from '@/components/Button/Button';
import Error from '@/components/Error/Error';
import Success from '@/components/Success/Success';

// Axios
import axios from 'axios';

// Next
import Head from 'next/head';

// React Hook Form
import { useForm } from 'react-hook-form';

// Style
import style from './Inscription.module.scss';

export default function Inscription({
  darkMode,
  isLoading,
  setIsLoading,
  error,
  setError,
  isRegistered,
  setIsRegistered,
}) {
  // Constants
  const classDarkMode = darkMode ? style.dark : '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Methods
  const handleSubmitInscription = (data) => {
    if (!isLoading) {
      // Send the new project on next API
      setIsLoading(true);
      setError(null);
      axios
        .post('/api/inscription', data)
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          setIsRegistered(response.data.user);
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
        <title>Inscription</title>
      </Head>
      <h1 className={style.title}>Inscription</h1>
      <section className={style.section}>
        <main className={`${style.container} ${classDarkMode}`}>
          {error && <Error message={error} />}
          {isRegistered ? (
            <Success
              message={`Félicitations ${isRegistered.pseudo}! Vous pouvez maintenant vous connecter`}
            />
          ) : (
            <form
              onSubmit={handleSubmit(handleSubmitInscription)}
              className={style.container__form}
            >
              <p>
                <label
                  className={style.container__form__label}
                  htmlFor='pseudo'
                >
                  Pseudo
                </label>
                <input
                  className={`${style.container__form__input} ${classDarkMode}`}
                  type='text'
                  placeorder='Pseudo'
                  {...register('pseudo', {
                    required: true,
                  })}
                />
                {errors.pseudo && (
                  <small className={style.small}>
                    Veuillez renseigner ce champ.
                  </small>
                )}
              </p>
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
                <Button>Inscription</Button>
              </div>
            </form>
          )}
        </main>
      </section>
    </>
  );
}

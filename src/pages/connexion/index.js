// Auth
import { signIn, getSession } from 'next-auth/client';

// Next
import Head from 'next/head';
import { useRouter } from 'next/router';

// React Hook Form
import { useForm } from 'react-hook-form';

// Component
import Button from '@/components/Button/Button';
import Error from '@/components/Error/Error';

// Style
import style from './Connexion.module.scss';

export default function Connection({
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
  const handleSubmitAuthent = async (data) => {
    setIsLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      console.log(result);
      router.replace('/');
    }
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <h1 className={style.title}>Connexion</h1>
      <section className={style.section}>
        <main className={`${style.container} ${classDarkMode}`}>
          {error && <Error message={error} />}
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
              <Button text='Connexion' isLoading={isLoading} />
            </div>
          </form>
        </main>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

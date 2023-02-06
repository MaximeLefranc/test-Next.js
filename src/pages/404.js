// Next.JS
import Head from 'next/head';

export default function Error404() {
  return (
    <div className='error404'>
      <Head>
        <title>Erreur 404, page introuvable</title>
      </Head>
      404
      <h1 className='error404__title'>la page demandée n&apos;existe pas</h1>
    </div>
  );
}

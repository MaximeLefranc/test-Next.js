// Next
import { useRouter } from 'next/router';

// Component
import CardProject from '@/components/CardProject/CardProject';
import ClientFilter from '@/components/ClientFilter/ClientFilter';

// Style
import style from './Client.module.scss';

export default function ProjectOfClientPerYear() {
  // Constants
  const router = useRouter();
  const clientName =
    router.query.client === 'perso'
      ? `Projet personnels (${router.query.annee})`
      : `Projet de ${router.query.client} (${router.query.annee})`;

  return (
    <>
      <h1 className='main__title'>{clientName}</h1>
      <ClientFilter client={router.query.client} />
      <div className={style.cards}>
        <CardProject />
        <CardProject />
      </div>
    </>
  );
}

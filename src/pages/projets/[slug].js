// Next
import { useRouter } from 'next/router';
import Link from 'next/link';

// Style
import style from './Projet.module.scss';

export default function ProjectDetail() {
  // Constants
  const router = useRouter();

  return (
    <>
      <h1 className={style.title}>{router.query.slug}</h1>
      <small className={style.small}>
        <Link href='/perso'>Projet personnel</Link>
      </small>
    </>
  );
}

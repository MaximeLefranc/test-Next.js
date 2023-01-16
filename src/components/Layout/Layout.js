// Components
import Footer from './Footer/Footer';
import Header from './Header/Header';

// Styles
import style from './Layout.module.scss';

export default function Layout({ children, darkMode, setDarkMode }) {
  // Constant
  const classDarkMode = darkMode ? style.dark : '';

  return (
    <div className={`${style.layout} ${classDarkMode}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`${style.children} ${classDarkMode}`}>{children}</div>
      <Footer />
    </div>
  );
}

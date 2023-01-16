// Next
import { useState } from 'react';

// Styles
import '@/styles/default.scss';

// Component
import Layout from '@/components/Layout/Layout';

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
      <Component {...pageProps} darkMode={darkMode} />
    </Layout>
  );
}

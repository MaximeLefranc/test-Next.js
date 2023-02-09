// Auth
import { Provider } from 'next-auth/client';

// Next
import { useState } from 'react';

// Styles
import '@/styles/default.scss';

// Component
import Layout from '@/components/Layout/Layout';

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Provider session={pageProps.session}>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Component
          {...pageProps}
          darkMode={darkMode}
          isLoading={isLoading}
          error={error}
          isRegistered={isRegistered}
          setIsLoading={setIsLoading}
          setError={setError}
          setIsRegistered={setIsRegistered}
        />
      </Layout>
    </Provider>
  );
}

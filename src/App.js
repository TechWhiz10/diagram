import React, { useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { fetchData } from './services/dataFetcher';

import MyRouter from './routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Energy Project - Home</title>
        <meta
          name="description"
          content="Energy Project"
        />
      </Helmet>
      <div>
        <MyRouter />
      </div>
    </HelmetProvider>
  );
};

export default App;

import {
    createBrowserRouter,
    RouterProvider,
  } from 'react-router-dom';
  
  import Home from './pages/Home';
  import About from './pages/About';
  import Error from './pages/error';
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,  // On affiche la page d'accueil ici
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);
  
  export default router;
  
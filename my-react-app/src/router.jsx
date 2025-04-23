import {
    createBrowserRouter,
    RouterProvider,
  } from 'react-router-dom';
  
  import Home from './pages/Home';
  import About from './pages/About';
//   import NotFound from './pages/NotFound';
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,  // On affiche la page d'accueil ici
    },
    {
      path: '/about',
      element: <About />,
    },
    // {
    //   path: '*',
    //   element: <NotFound />,
    // },
  ]);
  
  export default router;
  
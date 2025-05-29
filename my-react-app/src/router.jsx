/**
 * Application route configuration using React Router
 * @module AppRouter
 * @requires react-router-dom
 * @requires ./pages/Home
 * @requires ./pages/About
 * @requires ./pages/Error
 * @requires ./components/Appartement
 */

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Appartement from "./pages/Appartement";

/**
 * Main application route configuration
 * @type {import('react-router-dom').RouteObject[]}
 * @const
 * @namespace routerConfig
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    /**
     * @description Homepage displaying property listings
     * @route /
     */
  },
  {
    path: "/about",
    element: <About />,
    /**
     * @description Company information page
     * @route /about
     */
  },
  {
    path: "/appartement/:id",
    element: <Appartement />,
    /**
     * @description Detailed property view
     * @route /apartment/:id
     * @param {string} id - Unique property identifier (UUID or slug)
     */
  },
  {
    path: "*",
    element: <Error />,
    /**
     * @description Fallback route for unmatched URLs (404)
     * @route /*
     */
  },
]);

export default router;

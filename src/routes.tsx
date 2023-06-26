import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "./layout/Dashboard";
import { StatisticsPage, AboutPage } from "./pages";

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/statistics" />, index: true },
        { path: "statistics", element: <StatisticsPage /> },
        { path: "about", element: <AboutPage /> },
      ],
    },
  ]);
  return routes;
};

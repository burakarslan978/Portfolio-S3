import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import LoginPage from "./components/LoginPage";

const AppRoutes = [
  {
    index: true,
    element: <LoginPage />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
  path: '/fetch-data',
  element: <FetchData />
  },
  {
  path: '/login',
  element: <LoginPage />
  }


];

export default AppRoutes;

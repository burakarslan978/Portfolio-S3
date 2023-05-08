import LoginPage from "./LoginPage";
import Home from "./Home";
import SavedVideos from "./SavedVideos";
import VideoStream from "./VideoStream"

const AppRoutes = [
  {
    index: true,
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/savedvideos',
    element: <SavedVideos />
  },
  {
    path:"/video/:id",
    element:<VideoStream />
  }
  
];

export default AppRoutes;

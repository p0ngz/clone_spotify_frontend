import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// layout
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// page
import HomePage from "./pages/main/HomePage";
import PlaylistPage from "./pages/main/PlaylistPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/playlist/:playlistId" element={<PlaylistPage/>}/>
      </Route>
      <Route path="/auth" element={<AuthLayout />} />
    </>,
  ),
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

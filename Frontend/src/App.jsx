import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  Layout,
  Home,
  ThemeProvider,
  Signin,
  Signup,
  JwtSuccess,
  OTPVerification,
  MainHome,
} from "./ie.js";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const MyRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jwt-success" element={<JwtSuccess />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/mainhome" element={<MainHome />} />
      </>
    )
  );
  return (
    <ThemeProvider>
      <RouterProvider router={MyRouter} />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </ThemeProvider>
  );
}

export default App;

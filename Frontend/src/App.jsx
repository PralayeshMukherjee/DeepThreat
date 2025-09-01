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
  MainLayout,
  DeepThreatDashboard,
  History,
  Contact,
  EditProfile,
  HelpSupport,
  MeSection,
  About
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
          <Route path="about" element={<About/>}/>
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jwt-success" element={<JwtSuccess />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/mainlayout" element={<MainLayout />}>
          <Route index element={<MainHome />} />
          <Route path="mainhome" element={<MainHome />} />
          <Route path="deepthreatdashboard" element={<DeepThreatDashboard />} />
          <Route path="history" element={<History />} />
          <Route path="contact" element={<Contact />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="helpsupport" element={<HelpSupport />} />
          <Route path="MeSection" element={<MeSection />} />
        </Route>
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

import MainHeader from "./Pages/MainHeader.jsx";
import MainFooter from "./Pages/MainFooter.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};
export default MainLayout;

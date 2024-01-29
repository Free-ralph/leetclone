import { Outlet } from "react-router-dom";
import Nabvar from "../../components/Nabvar";


import "./layout.css";
const Layout = () => {
  return (
    <main className="w-screen h-screen overflow-x-hidden custom-scrollbar bg-light-background text-light-text dark:bg-dark-primary">
      <>
        <Nabvar />

        <div>
          <Outlet />
        </div>
      </>
    </main>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import Navbar from "../../sharedComponents/navbar/Navbar";
import Footer from "../../sharedComponents/footer/Footer";

const LayOut = () => {
  return (
    <div>
      <Navbar className=""></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default LayOut;

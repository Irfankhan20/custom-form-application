import Navbar from "../../sharedComponents/navbar/Navbar";
import Footer from "../../sharedComponents/footer/Footer";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default LayOut;

import { createBrowserRouter } from "react-router-dom";
import LayOut from "./components/mainLayout/LayOut";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import AllUsers from "./pages/allUsers/AllUsers";
import MakeForm from "./pages/makeForm/MakeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut></LayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/allusers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/makeform",
        element: <MakeForm></MakeForm>,
      },
    ],
  },
]);

export default router;

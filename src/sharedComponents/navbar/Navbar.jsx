import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../pages/provider/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-[#1196f6] ">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="bg-[#1196f6] text-white menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
          >
            <li className="">
              <Link to="/allusers">All Users</Link>
            </li>
            <li>
              <Link to="/makeform">Make Form</Link>
            </li>
          </ul>
        </div>
        <Link to="/">
          <img
            className="w-[180px] h-[40px]"
            src="https://i.ibb.co/XW42z3S/ras-limited-removebg-preview.png"
            alt=""
          />
        </Link>
      </div>
      <div className="navbar-center hidden  lg:flex">
        <ul className="menu text-white menu-horizontal px-1">
          <li>
            <Link to="/allusers" className="text-xl">
              All Users
            </Link>
          </li>
          <li>
            <Link to="/makeform" className="text-xl">
              Make Form
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            {user ? (
              <div className="flex items-center">
                <Link to="/profile">
                  <button className="flex items-center">
                    <img
                      className=" rounded-full w-8 h-8 mr-3"
                      src={user.photoURL}
                      alt={user.displayName}
                    />
                    <span data-tip={user.displayName} className="text-white">
                      {user.displayName}
                    </span>
                  </button>
                </Link>

                <button
                  onClick={handleLogOut}
                  className="text-xl text-white px-3 font-medium ml-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/signin"
                className="text-white"
                activeClassName="active"
              >
                <button className="text-xl px-3 font-medium">Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

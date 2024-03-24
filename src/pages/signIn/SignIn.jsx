import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import app from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const SignIn = () => {
  const auth = getAuth(app);
  const { signInUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";
  const provider = new GoogleAuthProvider();

  //login with google
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.data);
        navigate(from, { replace: true });
        toast.success("Successfully logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //signIn user
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // navigate after login
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);

        toast.error("Login failed. Please check your email and password.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // show password function
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero h-[calc(100vh-69px)]  bg-[#b7e1f2]">
      <div className="hero-content flex-col ">
        <div className="card shrink-0  lg:w-[450px]  shadow-2xl bg-base-100">
          <div className="text-center ">
            <h1 className="text-5xl font-bold mt-10">Login </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* email input  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email")}
                className="input input-bordered"
                required
              />
            </div>

            {/* password input  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered"
              />

              <span className="relative w-[30px] text-xl flex justify-end -top-8 left-[90%] ">
                {showPassword ? (
                  <FaEye
                    className="hover:cursor-pointer"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <FaEyeSlash
                    className="hover:cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
              </span>

              {/* forget input  */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#459af0] text-white hover:bg-[#0b5299] ">
                Login
              </button>
            </div>
            <p>
              Are you new here? Please{" "}
              <Link className="text-[#459af0] font-bold" to="/signup">
                signup
              </Link>
            </p>

            {/* or line */}
            <div className="flex justify-between items-center text-center mt-3">
              <div className="flex-1">
                <img
                  src="https://i.ibb.co/GspjGPV/divider.png"
                  alt=""
                  className="h-5 w-32"
                />
              </div>
              <div className="flex-1">Or continue with</div>
              <div className="flex-1">
                <img
                  src="https://i.ibb.co/GspjGPV/divider.png"
                  alt=""
                  className="h-5 w-32"
                />
              </div>
            </div>

            {/* social login  */}
            <div className="text-center">
              <div className="text-center mt-3">
                <button onClick={handleGoogleSignIn} className="px-4">
                  <img
                    className="w-10"
                    src="https://i.ibb.co/ftwyb00/Google-G-Logo-svg.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

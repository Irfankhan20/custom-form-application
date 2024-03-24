import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAxios from "../../hooks/UseAxios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosInstace = useAxios();
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from.pathname || "/";

  // show password function
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    const userInfo = {
      displayName: data.name,
      photoURL: data.photo,
    };
    createUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        updateUserProfile(userInfo)
          .then(async () => {
            const userData = {
              name: data.name,
              email: data.email,
              role: data.userType,
              photo: data.photo,
            };
            const res = await axiosInstace.post("/users", userData);
            console.log(res.data.success);
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Registration Error",
              text: "An error occurred during user registration.",
            });
          });
      })
      .catch((error) => {
        console.log(error.message);
        // Add proper error handling for profile update
        Swal.fire({
          icon: "error",
          title: "Profile Update Error",
          text: "An error occurred during profile update.",
        });
      });
  };

  return (
    <div className="hero h-[calc(100vh-69px)]  bg-[#b7e1f2]">
      <div className="hero-content flex-col ">
        <div className="card shrink-0  lg:w-[500px]  shadow-2xl bg-base-100 p-3">
          <div className="text-center ">
            <h1 className="text-5xl font-bold mt-10">Sign up </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name")}
                className="input input-bordered"
                required
              />
            </div>
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
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Photo URL"
                {...register("photo")}
                className="input input-bordered"
                required
              />
            </div>

            {/* user type dropdown */}
            <div className="form-control">
              <label className="label">User Type</label>
              <select
                {...register("userType", { required: true })}
                name="userType"
                className="input input-bordered"
                required
              >
                <option value="user">User</option>
                <option value="deliveryman">Admin</option>
              </select>
            </div>

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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#459af0] text-white hover:bg-[#0b5299]">
                Sign Up
              </button>
            </div>
            <p>
              Do you have and account? Please{" "}
              <Link className="text-[#459af0] font-bold" to="/signin">
                LogIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast, ToastContainer } from "react-toastify";
import bg from "../../assets/login_half.png";
import logo from "../../assets/play-box-logo.png";
import Cookies from "js-cookie"; 

const Login = () => {
  // State for form input and error handling
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; 


  // Redirect to specified page if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Function to validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await login(formData).unwrap();
        dispatch(setCredentials({ ...res }));

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            navigate("/");
          },
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        toast.error(err?.data?.message || "Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#050813]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Left section: form */}
      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        <div className="mb-8">
          <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        {/* Login form */}
        <form onSubmit={submitHandler} className="w-[75%]">
          <div className="my-[3rem]">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border-b ${
                errors.email ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border-b ${
                errors.password ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem] disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {isLoading && <Loader />}

          <div className="mt-4 text-center w-full">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right section: background image */}
      <div className="w-[60%] h-full">
        <img src={bg} alt="Background" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;

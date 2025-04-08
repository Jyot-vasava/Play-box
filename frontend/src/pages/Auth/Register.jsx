import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useRegisterMutation } from "../../redux/api/users";
import { toast, ToastContainer } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

import logo from "../../assets/play-box-logo.png";
import netflix from "../../assets/netflix.png";
import mx from "../../assets/mx.jpg";
import disney from "../../assets/disney.jpg";
import prime from "../../assets/prime.png";

const Register = () => {

  // Package options for subscription
  const packages = [
    {
      id: 1,
      name: "Silver",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "Disney", logo: disney },
      ],
      price: 299,
    },
    {
      id: 2,
      name: "Gold",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "MX Player", logo: mx },
        { name: "Disney", logo: disney },
      ],
      price: 599,
    },
    {
      id: 3,
      name: "Platinum",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "Prime", logo: prime },
        { name: "MX Player", logo: mx },
        { name: "Disney+ Hotstar", logo: disney },
      ],
      price: 999,
    },
  ];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[\W_]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    if (!selectedPackage) {
      newErrors.package = "Please select a subscription package";
      toast.error("Please select a subscription package");
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          tier: selectedPackage,
        };
        console.log("Submitting payload:", payload);

        const response = await register(payload).unwrap();

        toast.success("Registration successful! Please log in.", {
          onClose: () => {
            navigate("/login");
          },
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.error("Registration error:", err);
        toast.error(
          err?.data?.message || "Registration failed. Please try again."
        );
      }
    }
  };

  const handlePackageSelection = (pkg) => {
    const tierMap = {
      1: "silver",
      2: "gold",
      3: "platinum",
    };
    setSelectedPackage(tierMap[pkg.id]);
    if (errors.package) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.package;
        return newErrors;
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#050813] text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Left Section: Form */}
      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        <div className="mb-8">
          <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="w-[75%]">
          <div className="my-[2rem]">
            <label htmlFor="username" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`mt-1 p-2 w-full border-b ${
                errors.username ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Enter Name"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="my-[2rem]">
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

          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`mt-1 p-2 w-full border-b ${
                errors.confirmPassword ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem] disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}

          <div className="mt-4 text-center w-full">
            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-teal-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Section: Packages */}
      <div className="w-[60%] h-full flex flex-col justify-start p-8">
        <h1 className="text-3xl font-semibold mb-2">Subscription</h1>
        <p className="text-gray-400 mb-4">Choose your package</p>

        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex items-center justify-between rounded-lg p-6 shadow-md cursor-pointer ${
                selectedPackage ===
                (pkg.id === 1 ? "silver" : pkg.id === 2 ? "gold" : "platinum")
                  ? "bg-gray-700"
                  : "bg-gray-800"
              }`}
              onClick={() => handlePackageSelection(pkg)}
            >
              <div className="flex flex-col">
                <p className="text-xl font-semibold mb-2">{pkg.name} Package</p>
                <div className="flex space-x-4">
                  {pkg.services.map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-24 h-16 bg-gray-700 rounded-md"
                    >
                      <img
                        src={service.logo}
                        alt={`${service.name} logo`}
                        className="h-10"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <p className="text-xl font-semibold">₹{pkg.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageSelection(pkg);
                  }}
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                    selectedPackage ===
                    (pkg.id === 1
                      ? "silver"
                      : pkg.id === 2
                      ? "gold"
                      : "platinum")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    selectedPackage ===
                    (pkg.id === 1
                      ? "silver"
                      : pkg.id === 2
                      ? "gold"
                      : "platinum")
                  }
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;

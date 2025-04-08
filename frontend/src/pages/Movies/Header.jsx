import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = () => navigate("/login");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-[rgb(17,17,43)] px-5 py-2 text-white shadow-[0_4px_8px_rgba(59,59,171,0.4)] fixed w-full top-0 left-0 h-[60px] z-50">
      <Link
        to="/"
        className="mt-2 text-3xl w-[200px] h-[50px] font-bold flex items-center"
      >
        <img src={logo} alt="" className="h-full w-auto" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button lg:hidden p-2"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <Link
          to="/"
          className="text-white hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="text-white hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Browse Movies
        </Link>
        <Link
          to="/about"
          className="text-white hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          About
        </Link>

        {userInfo ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white"
            >
              {userInfo.username}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-1 h-4 w-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-600 rounded-md shadow-lg">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-md"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setDropdownOpen(false);
                      
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-[#e50914] text-white px-6 py-2 text-lg font-semibold rounded-md hover:bg-[#b10610] transform hover:scale-105 transition-all"
          >
            Sign In / Sign Up
          </button>
        )}
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[60px] left-0 w-full bg-[rgb(17,17,43)] shadow-lg lg:hidden"
        >
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Movies
            </Link>
            <Link
              to="/about"
              className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {userInfo ? (
              <>
                {userInfo.isAdmin && (
                  <Link
                    to="/admin/movies/dashboard"
                    className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-800 rounded-md text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleSignIn();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#e50914] text-white px-6 py-2 mt-2 text-lg font-semibold rounded-md hover:bg-[#b10610] transform hover:scale-105 transition-all"
              >
                Sign In / Sign Up
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
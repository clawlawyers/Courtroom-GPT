import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clawlogo from "../../assets/icons/clawlogo1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setSignInFormModal,
} from "../../features/bookCourtRoom/LoginReducreSlice";

const Header = () => {
  const handleSignForm = useSelector((state) => state.user.signUpModal);
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFeaturesClick = (compoName) => {
    if (location.pathname !== "/") {
      // Navigate to homepage
      navigate("/");
      // Wait for navigation to complete, then scroll to the feature section
      setTimeout(() => {
        const element = document.getElementById(compoName);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Adjust timeout to ensure navigation is complete before scrolling
    } else {
      // If already on homepage, directly scroll
      const element = document.getElementById(compoName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className=" w-5/6 m-auto bg-[#3E3E3E] bg-opacity-40 flex items-center justify-center px-4 py-1 rounded-full shadow-lg absolute top-0 left-2 right-0  mt-3">
      <div className="flex-1 flex flex-col cursor-pointer items-start  justify-center h-full">
        <img src={clawlogo} alt="CLAW Logo" className=" w-[120px] h-auto" />
      </div>

      {/* Hamburger Icon */}
      <div>
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col ml-8 items-center">
          <span className="block w-7 h-1 bg-white mb-1"></span>
          <span className="block w-7 h-1 bg-white mb-1"></span>
          <span className="block w-7 h-1 bg-white"></span>
        </button>

        <div
          className={`hidden lg:flex items-center justify-end gap-x-16 flex-grow`}>
          <Link
            to="/"
            className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">
            CLAW Home
          </Link>
          <Link
            to="/pricing-plans"
            className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">
            Pricing
          </Link>
          <p
            onClick={() => handleFeaturesClick("videoBanner")}
            // href="#videoBanner"
            className="m-0 text-white text-base font-medium hover:text-[#9AFFDB] no-underline cursor-pointer">
            Features
          </p>
          <p
            onClick={() => handleFeaturesClick("Testimonilcard")}
            // href="#Testimonilcard"
            className="m-0 text-white text-base font-medium hover:text-[#9AFFDB] no-underline cursor-pointer">
            Testimonials
          </p>
          {currentUser ? (
            <p
              onClick={() => dispatch(logout())}
              className="cursor-pointer m-0 bg-gradient-to-bl from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline">
              Logout
            </p>
          ) : (
            <Link
              // onClick={() => dispatch(setSignInFormModal())}
              to={"/login"}
              className="cursor-pointer m-0 bg-gradient-to-bl from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 top-[60px] left-0 right-0 bg-[#0E1118] bg-opacity-100 rounded-lg p-4 lg:hidden">
          {/* Close Icon */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white mb-2 flex justify-end w-full cursor-pointer">
            {/* SVG for close icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="block text-white text-base font-medium bg-transparent hover:bg-[#4473f6] hover:text-white rounded-md mb-2 cursor-pointer no-underline p-2">
            CLAW Home
          </Link>
          <Link
            to="/pricing-plans"
            className="block text-white text-base font-medium bg-transparent hover:bg-[#4473f6] hover:text-white rounded-md mb-2 cursor-pointer no-underline p-2">
            Pricing
          </Link>
          <Link
            to="/#videoBanner"
            className="block text-white text-base font-medium bg-transparent hover:bg-[#4473f6] hover:text-white rounded-md mb-2 cursor-pointer no-underline p-2">
            Features
          </Link>
          <Link
            to="/#Testimonilcard"
            className="block text-white text-base font-medium bg-transparent hover:bg-[#4473f6] hover:text-white rounded-md mb-2 cursor-pointer no-underline p-2">
            Testimonials
          </Link>

          {currentUser ? (
            <p
              onClick={() => {
                dispatch(logout());
              }}
              className="cursor-pointer m-0 bg-gradient-to-bl from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline">
              Logout
            </p>
          ) : (
            <Link
              to="/login"
              className="block text-white text-base font-medium bg-transparent hover:bg-[#4473f6] hover:text-white rounded-md mb-2 cursor-pointer no-underline p-2">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

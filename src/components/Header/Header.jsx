import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="w-full bg-[#3E3E3E] bg-opacity-40 flex items-center justify-between px-3 py-1 rounded-full shadow-lg mt-3 absolute">
      <div className="flex flex-col items-center justify-center h-full">
        <img src={clawlogo} alt="CLAW Logo" className="w-[120px] h-auto" />
      </div>

      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col items-center"
      >
        <span className="block w-8 h-1 bg-white mb-1"></span>
        <span className="block w-8 h-1 bg-white mb-1"></span>
        <span className="block w-8 h-1 bg-white"></span>
      </button>

      <div
        className={`hidden md:flex items-center justify-end gap-x-16 flex-grow`}
      >
        <Link
          to="/"
          className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline"
        >
          CLAW Home
        </Link>
        <Link
          to="/pricing-plans"
          className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline"
        >
          Pricing
        </Link>
        <Link
          to=""
          className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline"
        >
          Our Reach
        </Link>
        <Link
          to=""
          className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline"
        >
          Testimonials
        </Link>
        {currentUser ? (
          <p
            onClick={() => dispatch(logout())}
            className="cursor-pointer m-0 bg-gradient-to-bl from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline"
          >
            Logout
          </p>
        ) : (
          <Link
            // onClick={() => dispatch(setSignInFormModal())}
            to={"/login"}
            className="cursor-pointer m-0 bg-gradient-to-bl from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 top-[60px] left-0 right-0 bg-[#0E1118] bg-opacity-100 rounded-lg p-4 md:hidden"
        >
          {/* Close Icon */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white mb-2 flex justify-end w-full"
          >
            {/* SVG for close icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
            className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline"
          >
            CLAW Home
          </Link>
          <Link
            to=""
            className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline"
          >
            Pricing
          </Link>
          <Link
            to=""
            className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline"
          >
            Our Reach
          </Link>
          <Link
            to=""
            className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline"
          >
            Testimonials
          </Link>
          <Link
            to=""
            className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

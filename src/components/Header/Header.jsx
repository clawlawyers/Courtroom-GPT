import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clawlogo from "../../assets/icons/clawlogo.png"


const Header = () => {
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

   
    document.addEventListener('mousedown', handleClickOutside);
    
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#0E1118] bg-opacity-50 flex items-center justify-between p-4 rounded-lg shadow-lg w-11/12 mx-auto my-5 h-[90px] relative">
      <div className="flex flex-col items-center justify-center h-full"> 
        <img src={clawlogo} alt="CLAW Logo" className="w-[140px] h-auto" />
        <span className="courtroom-text text-white text-lg mb-2" style={{
            position:'absolute',
            top:'49px'
        }}>COURTROOM</span> 
      </div>

      {/* Hamburger Icon */}
      <button onClick={toggleMenu} className="md:hidden flex flex-col items-center">
        <span className="block w-8 h-1 bg-white mb-1"></span>
        <span className="block w-8 h-1 bg-white mb-1"></span>
        <span className="block w-8 h-1 bg-white"></span>
      </button>

      
      <div className={`hidden md:flex items-center justify-end gap-x-16 flex-grow`}>
        <Link to="/" className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">CLAW Home</Link>
        <Link to="" className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">Pricing</Link>
        <Link to="" className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">Our Reach</Link>
        <Link to="" className="text-white text-base font-medium hover:text-[#9AFFDB] no-underline">Testimonials</Link>
        <Link to="" className="bg-gradient-to-b from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline">War Room</Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={menuRef} className="absolute top-[90px] left-0 right-0 bg-[#0E1118] bg-opacity-50 rounded-lg p-4 md:hidden">
          {/* Close Icon */}
          <button onClick={() => setIsOpen(false)} className="text-white mb-2 flex justify-end w-full">
            {/* SVG for close icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Link to="/" className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline">CLAW Home</Link>
          <Link to="" className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline">Pricing</Link>
          <Link to="" className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline">Our Reach</Link>
          <Link to="" className="block text-white text-base font-medium hover:text-[#9AFFDB] mb-2 no-underline">Testimonials</Link>
          <Link to="" className="block bg-gradient-to-b from-[#006E6E] to-[#003131] text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300 hover:opacity-90 no-underline">War Room</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
import React, { useState } from 'react';
import TableImage from "../../assets/images/table.png";
import LoginImage from "../../assets/images/loginImage.png";
import UserForm from '../../components/Pricing/UserForm';
import Header from '../../components/Header/Header';

const LoginPageNew = () => {
  const [showUserForm, setShowUserForm] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-gray-900 text-white p-4">
        <Header/>  {/* header component*/}
        <div className="text-center space-y-2 mb-8">
          <div 
            className="text-7xl font-bold mt-6"
            style={{
              background: 'linear-gradient(to bottom, #003131 0%, #00FFA3 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            War Room
          </div>
          <h2 className="text-lg font-semibold">
            By <span className="text-white py-8">AI Courtroom</span>
          </h2>
          
          <div className="border-t border-white w-2/3 mx-auto my-2"></div>
          <p className="text-white-400 max-w-xl mx-auto mt-2">
            Experience fighting your case in front of a senior advocate of the Supreme Court.
            Try to defeat the factually heaviest lawyer, <span className="font-semibold">the Claw AI</span>,
            if you ever want the chance to defeat an actual lawyer in that case.
          </p>
        </div>
        
        <div 
          className="w-full max-w-4xl rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center"
          style={{
            background: 'linear-gradient(to right,#018585 0%,#016666 37%,#004040 82%,#003737 93%,#003131 100%)'
          }}
        >
          <div className="hidden md:flex md:w-1/2 justify-center relative">
            <img src={TableImage} alt="Table" className="w-1/2 h-auto absolute bottom-0" />
            <img
              src={LoginImage}
              alt="Girl with Laptop"
              className="w-1/3 h-auto relative"
              style={{ bottom: '0.5rem' }}
            />
          </div>
          
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <h3 className="text-left mb-6 text-white">
              <span className="block text-3xl font-bold">Enter</span>
              <span className="block text-4xl font-bold text-teal-300">Your Details</span>
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-1" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter Your Full Name"
                  className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-1" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Enter Your Mobile Number"
                  className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </form>
            
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowUserForm(true)}
                className="w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2"
              >
                Verify Number
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UserForm Popup Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-transparent w-full max-w-2xl mx-4">
            <button
              onClick={() => setShowUserForm(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <UserForm onClose={() => setShowUserForm(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPageNew;
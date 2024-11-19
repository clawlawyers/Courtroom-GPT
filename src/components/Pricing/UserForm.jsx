
import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import clawCourtRoomImage from "../../assets/images/clawcourtroom.png"

const UserForm = ({handleCloseForm}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
   
      <div className="w-full max-w-5xl bg-transparent flex rounded-lg overflow-hidden border-2 border-blue-400">
       
        <div className="hidden sm:block w-2/5 relative bg-amber-900">
          <img
            src={clawCourtRoomImage}
            alt="Courtroom"
            className="w-full h-full object-cover"
          />
          
        </div>

      
        <div className=" w-full sm:w-3/5 bg-slate-600/90 p-8 relative">
         
          <button className="absolute top-6 right-6 text-white hover:text-gray-300"
          onClick={handleCloseForm}
          >
            <X size={24} />
          </button>

          <div className="max-w-md mx-auto pt-8">
            <h2 className="text-white text-2xl font-semibold mb-8">
              Enter Your Details
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none"
              />

              <input
                type="tel"
                placeholder="Contact No."
                className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>Record The Courtroom</span>
              </label>

              <button
                type="submit"
                className="w-full p-3 rounded bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors mt-8"
              >
                Proceed For Payment
              </button>
            </form>
          </div>
        </div>
      </div>
   
  );
};

export default UserForm;
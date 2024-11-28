import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import clawCourtRoomImage from "../../assets/images/clawcourtroom.png";
import { useDispatch } from "react-redux";
import { setSignInFormModal } from "../../features/bookCourtRoom/LoginReducreSlice";

const UserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "3",
        overflow: "auto",
      }}
    >
      <div className="w-full h-[95%] max-w-5xl bg-transparent flex rounded-lg overflow-hidden border-2 border-blue-400">
        <div className="hidden sm:block w-2/5 relative bg-amber-900">
          <img
            src={clawCourtRoomImage}
            alt="Courtroom"
            className="w-full h-full object-cover"
          />
        </div>

        <div className=" w-full sm:w-3/5 bg-slate-600/90 p-8 relative">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => dispatch(setSignInFormModal())}
          >
            <X size={24} />
          </button>
          {newUser ? (
            <div className="max-w-md mx-auto pt-8">
              <h2 className="text-white text-2xl font-semibold mb-8">
                Sign Up
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none text-black"
                />

                <input
                  type="tel"
                  placeholder="Contact No."
                  className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none  text-black"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none  text-black"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none pr-12  text-black"
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
                    className="w-4 h-4 rounded border-gray-300  text-black"
                  />
                  <span>Record The Courtroom</span>
                </label>

                <button
                  type="submit"
                  className="w-full p-3 rounded bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors mt-8"
                >
                  Register
                </button>
              </form>
              <p className="pt-2">
                Have an account already ? {"  "}
                <span
                  onClick={() => setNewUser(!newUser)}
                  className="text-teal-600 font-semibold cursor-pointer"
                >
                  Login Here
                </span>
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto pt-8">
              <h2 className="text-white text-2xl font-semibold mb-8">Login</h2>

              <form className="space-y-4">
                <input
                  type="tel"
                  placeholder="Contact No."
                  className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none  text-black"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full p-3 rounded bg-gray-200/90 placeholder-gray-500 focus:outline-none pr-12  text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 rounded bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors mt-8"
                >
                  Login
                </button>
              </form>
              <p className="pt-2">
                Not registered yet ? {"  "}
                <span
                  onClick={() => setNewUser(!newUser)}
                  className="text-teal-600 font-semibold cursor-pointer"
                >
                  Signup Now
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;

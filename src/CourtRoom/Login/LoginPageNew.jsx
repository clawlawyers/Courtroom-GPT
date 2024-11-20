import React, { useState } from "react";
import TableImage from "../../assets/images/table.png";
import LoginImage from "../../assets/images/loginImage.png";

const LoginPageNew = () => {
  const [isOTPMode, setIsOTPMode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleVerify = () => {
    if (isOTPMode) {
      // Verify OTP action
      setIsVerified(true);
    } else {
      // Switch to OTP mode
      setIsOTPMode(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-gray-900 text-white p-4">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <div
          className="text-7xl font-bold mt-6"
          style={{
            background: "linear-gradient(to bottom, #003131 0%, #00FFA3 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          War Room
        </div>
        <h2 className="text-lg font-semibold">
          By <span className="text-white py-8">AI Courtroom</span>
        </h2>
        <div className="border-t border-white w-2/3 mx-auto my-2"></div>
        <p className="text-white-400 max-w-xl mx-auto mt-2">
          Experience fighting your case in front of a senior advocate of the
          Supreme Court. Try to defeat the factually heaviest lawyer,{" "}
          <span className="font-semibold">the Claw AI</span>, if you ever want
          the chance to defeat an actual lawyer in that case.
        </p>
      </div>

      {/* Form Section */}
      <div
        className="w-full max-w-4xl rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center"
        style={{
          background:
            "linear-gradient(to right,#018585 0%,#016666 37%,#004040 82%,#003737 93%,#003131 100%)",
        }}
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 justify-center relative">
          <img
            src={TableImage}
            alt="Table"
            className="w-1/2 h-auto absolute bottom-0"
          />
          <img
            src={LoginImage}
            alt="Girl with Laptop"
            className="w-1/3 h-auto relative"
            style={{ bottom: "0.5rem" }}
          />
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          {!isVerified ? (
            <>
              {/* Before Verification */}
              <h3 className="text-left mb-6 text-white">
                <span className="block text-3xl font-bold">
                  {isOTPMode ? "Welcome" : "Enter"}
                </span>
                <span className="block text-4xl font-bold text-teal-300">
                  {isOTPMode ? userName || "Guest" : "Your Details"}
                </span>
              </h3>
              <form className="space-y-4">
                {!isOTPMode && (
                  <>
                    {/* Full Name Input */}
                    <div>
                      <label
                        className="block text-gray-300 text-sm font-semibold mb-1"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Enter Your Full Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                    {/* Mobile Number Input */}
                    <div>
                      <label
                        className="block text-gray-300 text-sm font-semibold mb-1"
                        htmlFor="mobileNumber"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobileNumber"
                        placeholder="Enter Your Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                  </>
                )}
                {isOTPMode && (
                  <>
                    {/* OTP Input */}
                    <div>
                      <label
                        className="block text-gray-300 text-sm font-semibold mb-1"
                        htmlFor="otp"
                      >
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                  </>
                )}
              </form>
              {/* Button */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleVerify}
                  className="w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                >
                  {isOTPMode ? "Verify OTP" : "Verify Number"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* After Verification */}
              <h3 className="text-center mb-6 text-white">
                <span className="block text-3xl font-bold">Welcome</span>
                <span className="block text-4xl font-bold text-teal-300">
                  {userName || "Guest"}
                </span>
              </h3>
              <p className="text-center text-white-400 mb-4">
                Mobile Number Registered Successfully
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                >
                  Enter War Room
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPageNew;

import React, { useState } from "react";
import loginnewImage from "../../assets/images/loginImg.png";

import {
  auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "../../utils/firebase";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/bookCourtRoom/LoginReducreSlice";

const LoginPageNew = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()

  const [isOTPMode, setIsOTPMode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [verificationId, setVerificationId] = useState("");
  const [isFirst, setIsfirst] = useState(true);

  const handleVerify = () => {
    if (isOTPMode) {
      setIsVerified(true);
    } else {
      setIsOTPMode(true);
    }
  };

  const handleVerifyNumber = async (e) => {
    e.preventDefault();
    setIsOTPMode(true);
    // setOtpLoading(true);
    // // console.log(window.recaptchaVerifier);
    // if (isFirst) {
    //   console.log("recaptchaVerifier");
    //   window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
    //     size: "invisible",
    //     callback: (response) => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       console.log(response);
    //     },
    //     auth,
    //   });
    //   setIsfirst(false);
    // } else if (!window.recaptchaVerifier) {
    //   console.log("recaptchaVerifier");
    //   window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
    //     size: "invisible",
    //     callback: (response) => {
    //       console.log(response);
    //     },
    //     auth,
    //   });
    // }
    // signInWithPhoneNumber(auth, "+91" + mobileNumber, window.recaptchaVerifier)
    //   .then((confirmationResult) => {
    //     setVerificationId(confirmationResult?.verificationId);
    //     toast.success("OTP sent successfully !");
    //     setIsOTPMode(true);
    //     setOtpLoading(false);
    //     // setIsDisabled(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Error during OTP request");
    //     setOtpLoading(false);
    //   });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (otp.length === 6) {
        // const credential = PhoneAuthProvider.credential(verificationId, otp);
        // await signInWithCredential(auth, credential);

        const response = await fetch(
          `${NODE_API_ENDPOINT}/courtroomFree/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: mobileNumber,
              name: userName,
            }),
          }
        );
        var data = await response.json();
        // if(data.message=="inavlid session"){
        //   toast.error("Something went wrong.Please try again!");
        //   setIsOTPMode(false);
        // }
        console.log(data)
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          dispatch(login({ user: data }));
          setIsVerified(true);
        } else {
          toast.error("Something went wrong.Please try again!");
          setIsOTPMode(false);
        }
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-gray-900 text-white p-4">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <div
          className="text-8xl font-bold mt-6"
          style={{
            background: "linear-gradient(to bottom, #003131 0%, #00FFA3 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",

            color: "transparent",
          }}
        >
          War Room
        </div>

        <h2 className="text-lg font-semibold">
          By <span className="text-white py-8">AI Courtroom</span>
        </h2>
        <div className="border-t border-white w-full mx-auto my-3">
          <p className="text-white-400 mt-4">
            Experience fighting your case in front of a senior advocate of
            supreme court
          </p>
          <p>
            Try to defeat the factually heaviest lawyer,{" "}
            <span className="font-semibold">the Claw AI,</span>
          </p>
          <p className="relative top-[-1rem]">
            if you ever want the chance to defeat an actual lawyer in that case
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="w-full max-w-4xl rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center border-2 border-white sm:h-[447px]"
        style={{
          background:
            "linear-gradient(to right,#018585 0%,#016666 37%,#004040 82%,#003737 93%,#003131 100%)",
        }}
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 justify-center relative">
          <img
            src={loginnewImage}
            alt="loginimage"
            className="w-auto h-auto relative"
          />
        </div>

        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          {!isVerified ? (
            <>
              <h3 className="text-left mb-6 text-white">
                <span className="block text-3xl font-bold">
                  {isOTPMode ? "Welcome" : "Enter"}
                </span>
                <span className="block text-4xl font-bold text-teal-300">
                  {isOTPMode ? userName || "Guest" : "Your Details"}
                </span>
              </h3>
              <div className="space-y-4">
                {!isOTPMode && (
                  <form className="" onSubmit={handleVerifyNumber}>
                    <div>
                      <label
                        className="block text-gray-300 text-sm font-semibold mb-1"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        id="fullName"
                        placeholder="Enter Your Full Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-3  rounded-lg outline-none focus:ring-2 focus:ring-teal-400 border border-white"
                        style={{ backgroundColor: "#FFFFFF35" }}
                      />
                    </div>
                    <div className="pt-2">
                      <label
                        className="block text-gray-300 text-sm font-semibold mb-1"
                        htmlFor="mobileNumber"
                      >
                        Mobile Number
                      </label>
                      <input
                        required
                        type="text"
                        id="mobileNumber"
                        placeholder="Enter Your Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full p-3  rounded-lg outline-none focus:ring-2 focus:ring-teal-400 border border-white"
                        style={{ backgroundColor: "#FFFFFF35" }}
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        // onClick={handleVerifyNumber}
                        className="w-full sm:w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                      >
                        {otpLoading ? (
                          <CircularProgress size={15} sx={{ color: "white" }} />
                        ) : (
                          "Verify Number"
                        )}
                      </button>
                    </div>
                  </form>
                )}
                {isOTPMode && (
                  <form onSubmit={handleVerifyOtp}>
                    <label
                      className="block text-gray-300 text-sm font-semibold mb-1"
                      htmlFor="otp"
                    >
                      Enter OTP
                    </label>
                    <input
                      required
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        // onClick={handleVerifyOtp}
                        className="w-full sm:w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                      >
                        {isLoading ? (
                          <CircularProgress size={15} sx={{ color: "white" }} />
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
              {/* <div className="flex justify-end mt-4">
                {isOTPMode ? (
                  <button
                    type="button"
                    // onClick={handleVerifyOtp}
                    className="w-full sm:w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                  >
                    Verify OTP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyNumber}
                    className="w-full sm:w-2/5 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                  >
                    Verify Number
                  </button>
                )}
              </div> */}
            </>
          ) : (
            <>
              <h3 className="mb-6 text-white">
                <span className="block text-3xl font-bold">Welcome</span>
                <span className="block text-4xl font-bold text-teal-300">
                  {userName || "Guest"}
                </span>
              </h3>
              <p className="text-white-400 mb-4">
                Mobile Number Registered Successfully
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/courtroom-ai")}
                  type="button"
                  className="w-full sm:w-2/5 sm:h-12 p-2 text-white font-semibold rounded-lg shadow-md border-2 hover:bg-teal-700 transition duration-300"
                >
                  Enter War Room
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div id="recaptcha" />
    </div>
  );
};

export default LoginPageNew;

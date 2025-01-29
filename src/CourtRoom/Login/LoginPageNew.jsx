import React, { useEffect, useState } from "react";
import CalendarComponent from "../../components/DateTime/Calendar";
import styles from "../BookNow/BookNow.module.css";
import image from "../../assets/images/courtroomPhoto.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NODE_API_ENDPOINT, OTP_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "../../features/bookCourtRoom/bookingSlice";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import {
  auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "../../utils/firebase";
import Header from "../../components/Header/Header";
import { setUser } from "../../features/bookCourtRoom/LoginReducreSlice";
import { Helmet } from "react-helmet";

const LoginPageNew = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [record, setRecord] = useState(false);
  const [email, setEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [isFirst, setIsfirst] = useState(true);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [otpVerifySuccess, setOtpVerifySuccess] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

  const [showPass, setShowPass] = useState(true);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const bookingDataSlice = useSelector((state) => state?.booking?.planData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerifySuccess) {
      toast.error("Please verify phone number to proceed!");
    } else if (!password) {
      toast.error("Please enter a password!");
    } else {
      setLoading(true);

      const bookingData = {
        // phoneNumber: contact,
        name: userName,
        email: email,
        password,
      };
      try {
        const response = await axios.post(
          `${NODE_API_ENDPOINT}/courtroomPricing/book-courtroom`,
          {
            ...bookingData,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": verifyToken,
            },
          }
        );
        console.log(response);
        dispatch(setUser(response.data.respo));
        localStorage.setItem(
          "userToken",
          JSON.stringify({
            token: response.data.respo.token,
            expiresAt: response.data.respo.expiresAt,
          })
        );
        // dispatch(setBookingData(bookingData));
        setLoading(false);
        // navigate(-1);  // make it conditional and also make a cart slice where users selected plan will store
        if (bookingDataSlice !== "") {
          navigate("/buy-plan");
        } else {
          navigate("/pricing-plans");
        }
      } catch (error) {
        console.log(error);
        toast.error("Sign in failed!");
        setLoading(false);
      }
    }
  };

  // const handleSendOTP = async (e) => {
  //   e.preventDefault();
  //   // handleDisableButton();
  //   setOtpLoading(true);
  //   console.log("sendOTP");
  //   const response = await axios.post(
  //     `${NODE_API_ENDPOINT}/courtroomPricing/book-courtroom-validation`,
  //     {
  //       phoneNumber: contact,
  //       email: email,
  //     }
  //   );
  //   const checkValid = response.data.data.data;
  //   // const checkValid = true;
  //   if (checkValid) {
  //     toast.success("Phone number is valid!");
  //     if (isFirst) {
  //       console.log("recaptchaVerifier");
  //       window.recaptchaVerifier = new RecaptchaVerifier(
  //         auth,
  //         "recaptcha-container",
  //         {
  //           size: "invisible",
  //           callback: (response) => {
  //             // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           },
  //         },
  //         auth
  //       );
  //       setIsfirst(false);
  //     } else if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(
  //         auth,
  //         "recaptcha-container",
  //         {
  //           size: "invisible",
  //           callback: (response) => {
  //             // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           },
  //         },
  //         auth
  //       );
  //     }

  //     signInWithPhoneNumber(auth, "+91" + contact, window.recaptchaVerifier)
  //       .then((confirmationResult) => {
  //         setVerificationId(confirmationResult.verificationId);
  //         toast.success("OTP sent successfully!");
  //         setOtpSuccess(true);
  //         setOtpLoading(false);
  //         setIsDisabled(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error during OTP request:", error);
  //         toast.error("Error in sending OTP");
  //         setOtpLoading(false);
  //       });
  //   } else {
  //     toast.error("This contact already exists!! Please try another number");
  //     setOtpLoading(false);
  //     setContact("");
  //   }
  // };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    // handleDisableButton();
    setOtpLoading(true);
    console.log("sendOTP");
    const response = await axios.post(
      `${NODE_API_ENDPOINT}/courtroomPricing/book-courtroom-validation`,
      {
        phoneNumber: contact,
        email: email,
      }
    );
    const checkValid = response.data.data.data;
    // const checkValid = true;
    if (checkValid) {
      toast.success("Phone number is valid!");
      try {
        const handleOTPsend = await fetch(`${OTP_ENDPOINT}/generateOTPmobile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: contact,
            siteName: "www.courtroom.clawlaw.in",
          }),
        });

        if (!handleOTPsend.ok) {
          console.error("Failed to send OTP");
          toast.error("Failed to send OTP");
          throw new Error("Failed to send OTP");
        }
        const data = await handleOTPsend.json();
        if (data.authtoken) {
          setOtpToken(data.authtoken);
        }

        toast.success("OTP sent successfully!");
        setOtpSuccess(true);
        setOtpLoading(false);
        setIsDisabled(true);
      } catch (error) {
        toast.error("Failed to send OTP");
        setOtpLoading(false);
      }
    } else {
      toast.error("This contact already exists!! Please try another number");
      setOtpLoading(false);
      setContact("");
    }
  };

  useEffect(() => {
    let intervalId;
    if (isDisabled && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(intervalId);
      setIsDisabled(false);
      setCountdown(30); // Reset countdown
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isDisabled, countdown]);

  const handleRetryClick = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    //  API call here

    console.log("sendOTP");
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }

    signInWithPhoneNumber(auth, "+91" + contact, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        toast.success("OTP sent successfully!");
        setOtpSuccess(true);
        setOtpLoading(false);
        setIsDisabled(true);
      })
      .catch((error) => {
        console.error("Error during OTP request:", error);
        toast.error("Error in sending OTP");
        setOtpLoading(false);
      });
  };

  // const handleVerifyOTP = (e) => {
  //   e.preventDefault();
  //   setOtpLoading(true);
  //   const credential = PhoneAuthProvider.credential(verificationId, otp);
  //   localStorage.setItem("loginOtp", otp);

  //   signInWithCredential(auth, credential)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       toast.success("Phone number verified successfully!");
  //       setOtpLoading(false);
  //       setOtpVerifySuccess(true);
  //       setOtp("");
  //       setOtpSuccess(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error during OTP verification:", error);
  //       toast.error("Error during OTP verification");
  //       setOtp("");
  //       setOtpLoading(false);
  //     });
  // };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    // const credential = PhoneAuthProvider.credential(verificationId, otp);
    // localStorage.setItem("loginOtp", otp);
    try {
      if (otp.length === 6) {
        setOtpLoading(true);

        const verifyOTPResponse = await fetch(
          `${OTP_ENDPOINT}/verifyotpmobile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": otpToken,
            },
            body: JSON.stringify({
              otp: otp,
            }),
          }
        );

        if (!verifyOTPResponse.ok) {
          const err = verifyOTPResponse.json();
          setOtpLoading(false);
          toast.error(err.error);
          return;
        }

        const OTPdata = await verifyOTPResponse.json();
        console.log(OTPdata);
        if (OTPdata.authtoken) {
          console.log(verifyToken);
          // await loginToUser(OTPdata.authtoken);

          setVerifyToken(OTPdata.authtoken);
        }
        console.log(verifyToken);
        toast.success("Phone number verified successfully!");
        setOtpLoading(false);
        setOtpVerifySuccess(true);
        setOtp("");
        setOtpSuccess(false);
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("Error during OTP verification");
      setOtp("");
      setOtpLoading(false);
    }
  };

  return (
    <div className={styles.topContainer}>
      <Helmet>
        <title>Seamless Access to Courtroom AI</title>
        <meta
          name="description"
          content="Log in to Courtroom AI and start streamlining your legal processes today. Enjoy secure, uninterrupted access to powerful tools."
        />
        <meta
          name="keywords"
          content="legal pricing plans, Courtroom AI costs, affordable legaltech, flexible plans, lawyer tools, Courtroom subscriptions, budget-friendly legal solutions, AI-powered pricing, legal services cost, law tech savings"
        />
      </Helmet>
      <div className="h-10"></div>
      <div className="w-full sm:w-[80%] m-2 sm:m-auto grid grid-cols-1 sm:grid-cols-[30%_70%] border-2 rounded-lg p-2">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col gap-3 justify-center  items-center">
          <h2 className="text-5xl font-bold">Sign In</h2>
          <form
            // className={`${styles.forms} gap-4 lg:gap-5`}
            className="w-full px-5 flex flex-col justify-center gap-4"
            onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="p-3 rounded text-black"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded text-black"
            />
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  id="contact"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="flex-1 p-3 rounded text-black"
                />
                {!otpVerifySuccess ? (
                  <button
                    style={{
                      background:
                        "linear-gradient(100deg, #008080 0%, #15B3B3 100%)",
                    }}
                    className="rounded px-3 w-28"
                    disabled={otpLoading || contact === "" || email === ""}
                    onClick={handleSendOTP}>
                    {otpLoading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                ) : (
                  <button
                    style={{
                      background:
                        "linear-gradient(100deg, #008080 0%, #00ffa3 100%)",
                    }}
                    className="rounded px-3 w-28">
                    Verified
                  </button>
                )}
              </div>
              {otpSuccess && (
                <div className="flex gap-3">
                  <input
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="p-2 rounded text-black"
                  />
                  <button
                    onClick={handleRetryClick}
                    disabled={isDisabled}
                    className="bg-transparent border rounded px-5">
                    {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
                  </button>
                  <motion.button
                    onClick={handleVerifyOTP}
                    disabled={otpLoading || otp === ""}
                    whileTap={{ scale: "0.95" }}
                    className="text-white bg-gradient-to-r from-[#008080] to-[#003131] rounded p-2 w-28">
                    {otpLoading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      "Verify OTP"
                    )}
                  </motion.button>
                </div>
              )}
            </div>
            {otpVerifySuccess ? (
              <div className="w-full relative text-black">
                <input
                  className="p-3 rounded-lg w-full"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPass ? (
                  <svg
                    className="h-8 w-8 absolute top-3 right-5"
                    onClick={() => setShowPass(false)}
                    style={{
                      cursor: "pointer",
                    }}
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                      fill-rule="nonzero"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8 absolute top-3 right-5"
                    onClick={() => setShowPass(true)}
                    style={{
                      cursor: "pointer",
                    }}
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http:www.w3.org/2000/svg">
                    <path
                      d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z"
                      fill-rule="nonzero"
                    />
                  </svg>
                )}
              </div>
            ) : null}

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="record"
                name="record"
                checked={record}
                onChange={() => setRecord(true)}
              />
              <label htmlFor="record">Record the CourtRoom</label>
            </div>
            <motion.button
              whileTap={{ scale: "0.95" }}
              className=""
              type="submit"
              style={{
                background: "linear-gradient(100deg, #008080 0%, #15B3B3 100%)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}>
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Register"
              )}
            </motion.button>
          </form>
          <p className="">
            Have an account already ? {"  "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#00ffa3] font-semibold cursor-pointer">
              Login Here
            </span>
          </p>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPageNew;

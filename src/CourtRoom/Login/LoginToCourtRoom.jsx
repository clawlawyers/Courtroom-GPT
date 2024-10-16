import React, { useEffect, useState } from "react";
import balances from "../../assets/images/BalanceScales.png";
import clawLogo from "../../assets/images/claw-login.png";
import Styles from "./LoginToCourtRoom.module.css";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/bookCourtRoom/LoginReducreSlice";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "../../utils/firebase";
// import { setUser } from "../../features/bookCourtRoom/LoginReducreSlice";

const TimerComponent = React.memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  return (
    <h1 style={{ fontSize: "20px" }}>
      {currentTime.getHours() < 10
        ? `0${currentTime.getHours()}`
        : currentTime.getHours()}
      :
      {currentTime.getMinutes() < 10
        ? `0${currentTime.getMinutes()}`
        : currentTime.getMinutes()}
      :
      {currentTime.getSeconds() < 10
        ? `0${currentTime.getSeconds()}`
        : currentTime.getSeconds()}
    </h1>
  );
});

function LoginToCourtRoom() {
  const currentUser = useSelector((state) => state.user.user);
  const caseOverView = useSelector((state) => state.user.caseOverview);
  const navigate = useNavigate();
  const [verificationId, setVerificationId] = useState("");
  const [isFirst, setIsfirst] = useState(true);

  // if (currentUser && caseOverView === "NA") {
  //   navigate("/courtroom-ai");
  // } else if (currentUser && (caseOverView !== "NA" && caseOverView !== "")) {
  //   navigate("/courtroom-ai/arguments");
  // }

  const [isHovered, setIsHovered] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});

  const dispatch = useDispatch();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    const loginInfo = await fetch(`${NODE_API_ENDPOINT}/courtroom/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: phone }),
    });

    if (!loginInfo.ok) {
      toast.error("Your phone number is not valid for current slot");
      // throw new Error("Failed to send OTP");
      return;
    }

    const jsonData = await loginInfo.json();
    if (jsonData === "No bookings found for the current time slot.") {
      toast.error("No bookings found for the current time slot.");
      setOtpLoading(false);
      setErrorState(true);
      setErrorData(["No bookings found for the current time slot."]);
      return;
      // throw new Error("No bookings found for the current time slot.");
    }
    setLoginDetails(jsonData);

    if (isFirst) {
      console.log("recaptchaVerifier");
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
      setIsfirst(false);
    } else if (!window.recaptchaVerifier) {
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

    signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier)
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

    //api call
    // if (true) {
    //   setOtpSuccess(true);
    //   setOtpLoading(false);
    //   setIsDisabled(true);
    // }
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

  const handleRetryClick = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    // const loginInfo = await fetch(`${NODE_API_ENDPOINT}/courtroom/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ phoneNumber: phone }),
    // });

    // if (!loginInfo.ok) {
    //   toast.error("Your phone number is not valid for current slot");
    //   throw new Error("Failed to send OTP");
    // }

    // const jsonData = await loginInfo.json();
    // setLoginDetails(jsonData);

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

    signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier)
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

    //  API call here
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpLoading(true);

    if (otp.length === 6) {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      localStorage.setItem("loginOtp", otp);

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          toast.success("Phone number verified successfully!");
          setOtpLoading(false);
          setOtp("");

          const loginInfo = await fetch(
            `${NODE_API_ENDPOINT}/courtroom/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ phoneNumber: phone }),
            }
          );

          if (!loginInfo.ok) {
            toast.error("Your phone number is not valid for current slot");
            // throw new Error("Failed to send OTP");
            return;
          }

          const jsonData = await loginInfo.json();
          if (jsonData === "No bookings found for the current time slot.") {
            toast.error("No bookings found for the current time slot.");
            setOtpLoading(false);
            setErrorState(true);
            setErrorData(["No bookings found for the current time slot."]);
            return;
            // throw new Error("No bookings found for the current time slot.");
          }
          setLoginDetails(jsonData);
          dispatch(login({ user: loginDetails }));
          navigate("/courtroom-ai");
        })
        .catch((error) => {
          console.error("Error during OTP verification:", error);
          toast.error("Error during OTP verification");
          setOtp("");
          setOtpLoading(false);
        });
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center pt-14"
      style={{
        background: `radial-gradient(circle at 50% 0%, #018585, transparent 40%),
      radial-gradient(circle at 100% 50%, #351f58d0, transparent 50%),
      radial-gradient(circle at 0% 90%, #018585, transparent 60%)`,
      }}
    >
      {/* top cont */}
      <div className="grid md:grid-cols-2 items-center">
        <div className="w-full flex items-center justify-center">
          <img
            style={{ width: "100%", height: "100%" }}
            src={balances}
            alt="balance"
          />
        </div>
        <div className="relative w-full flex items-center justify-center">
          <div className="w-[80%]">
            <div
              style={{
                background: errorState
                  ? "gray"
                  : "linear-gradient(135deg,#0e5156,#018585 90%)",
                padding: "40px",
                // border: "3px solid white",
                border: errorState ? "3px solid red" : "3px solid white",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className={Styles.topContainerImage}
                  src={clawLogo}
                  alt="logo"
                />
                <h1 style={{ fontSize: "15px" }}>COURTROOM</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px 0px",
                }}
              >
                <h1 style={{ fontSize: "20px" }}>Current Time:</h1>
                <TimerComponent />
              </div>
              {!otpSuccess ? (
                <form onSubmit={handleSendOtp} style={{ margin: "20px 0px" }}>
                  <h1
                    className="flex"
                    style={{ fontSize: "15px", marginTop: "25px" }}
                  >
                    Enter your verified phone number
                  </h1>

                  <div className={Styles.phoneContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376" />
                    </svg>
                    <input
                      required
                      type="text"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex  items-center justify-end">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: "0.95" }}
                      className="px-3 py-2 w-28"
                      style={{
                        background: "none",
                        border: "2px solid white",
                        borderRadius: "5px",
                      }}
                    >
                      {otpLoading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Send OTP"
                      )}
                    </motion.button>
                  </div>
                  <hr
                    style={{
                      height: "0px",
                      border: "none",
                      borderTop: "5px solid white",
                    }}
                  />
                  <h1 style={{ fontSize: "15px" }}>
                    By signing up,you agree to our Terms of Service & Privacy
                    Policy
                  </h1>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} style={{ margin: "20px 0px" }}>
                  <h1
                    className="flex"
                    style={{ fontSize: "15px", marginTop: "25px" }}
                  >
                    OTP
                  </h1>

                  <div className={Styles.phoneContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z" />
                    </svg>
                    <input
                      required
                      type="text"
                      placeholder="Enter your Otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row  items-center justify-end gap-2">
                    <button
                      onClick={handleRetryClick}
                      disabled={isDisabled}
                      className="bg-transparent border-2 rounded px-4 py-2"
                    >
                      {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
                    </button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: "0.95" }}
                      className="px-3 py-2 w-32"
                      style={{
                        background: "none",
                        border: "2px solid white",
                        borderRadius: "5px",
                      }}
                    >
                      {otpLoading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Verify OTP"
                      )}
                    </motion.button>
                  </div>
                  <hr
                    style={{
                      height: "0px",
                      border: "none",
                      borderTop: "5px solid white",
                    }}
                  />
                  <h1 style={{ fontSize: "15px" }}>
                    By signing up,you agree to our Terms of Service & Privacy
                    Policy
                  </h1>
                </form>
              )}
            </div>
          </div>
          {errorState ? (
            <div
              className="left-[-22px] md:left-[-38px]"
              style={{
                position: "absolute",
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(3px)",
                top: "0px",
                width: "110%",
                height: "95%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "white",
                  border: "2px solid black",
                  borderRadius: "10px",
                  width: "90%",
                  padding: "20px 15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <svg
                    onClick={() => {
                      setErrorState(false);
                      setErrorData([]);
                    }}
                    style={{ cursor: "pointer" }}
                    width="24"
                    height="24"
                    stroke="#008080"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{ margin: "0", fontSize: "20px", color: "#008080" }}
                  >
                    {errorData[0]}
                  </h1>
                  <p style={{ color: "gray" }}>{errorData[1]}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* bottom cont */}
      <div
        className="w-full"
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={{
              hover: { x: "100%" },
            }}
            initial={{ x: "0%" }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #00ffa3, #008080)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div style={{ width: "50%" }}>
              <h1
                style={{
                  color: "#008080",
                  fontWeight: 800,
                  textWrap: "wrap",
                }}
              >
                Experience the AI Courtroom
              </h1>
            </div>
            <Link to={"/contact"}>
              <button
                style={{
                  backgroundColor: isHovered ? "white" : "#008080",
                  color: isHovered ? "#008080" : "white",
                  margin: "15px",
                  padding: "12px 40px",
                  borderRadius: 10,
                  border: "none",
                  fontSize: 27,
                }}
              >
                Contact us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default LoginToCourtRoom;

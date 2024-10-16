import React, { useEffect, useState } from "react";
import CalendarComponent from "../../components/DateTime/Calendar";
import styles from "../BookNow/BookNow.module.css";
import image from "../../assets/images/courtroomPhoto.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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

const BookNow = () => {
  const dispatch = useDispatch();
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [errorData, setErrorData] = useState("");
  const [errorState, setErrorState] = useState(false);
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

  const navigate = useNavigate();

  console.log(scheduledSlots);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpVerifySuccess) {
      setLoading(true);

      const formattedBookings = scheduledSlots.map((booking) => {
        // Create a new Date object to avoid mutating the original date
        let date = new Date(booking.date);

        // Add one day
        date.setDate(date.getDate() + 1);

        // Format the date
        const formattedDate = date.toISOString().split("T")[0];

        // Extract the hour from the time string
        const hour = parseInt(booking.time[0].split(":")[0], 10);

        // Return the formatted booking
        return { date: formattedDate, hour };
      });

      const bookingData = {
        phoneNumber: contact,
        name: userName,
        email: email,
        recording: record,
        slots: formattedBookings, // Add scheduledSlots to bookingData
      };
      const respos = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/book-courtroom-validation`,
        {
          ...bookingData,
        }
      );
      if (respos.data.data.data === "Slot can be book") {
        dispatch(setBookingData(bookingData));
        setLoading(false);
        navigate("/confirm-booking");
        // loadRazorpay(bookingData);
      } else {
        setErrorState(true);
        setLoading(false);
        setErrorData("same number or email not allowed at same time slot");
        toast.error("same number or email not allowed at same time slot");
      }
      // TODO : backend post request
    } else {
      toast.error("Please verify phone number to proceed!");
    }
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    // handleDisableButton();
    setOtpLoading(true);
    console.log("sendOTP");
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

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    localStorage.setItem("loginOtp", otp);

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Phone number verified successfully!");
        setOtpLoading(false);
        setOtpVerifySuccess(true);
        setOtp("");
        setOtpSuccess(false);
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        toast.error("Error during OTP verification");
        setOtp("");
        setOtpLoading(false);
      });
  };

  return (
    <div className={styles.topContainer}>
      <div className="p-5">
        <h1
          style={{
            fontWeight: 800,
            margin: "0",
          }}
        >
          Book your Court Room
        </h1>
      </div>
      <div className=" w-full h-full mt-14 md:mt-0">
        <CalendarComponent
          scheduledSlots={scheduledSlots}
          setScheduledSlots={setScheduledSlots}
        />
      </div>

      <div
        // className={styles.formContainer}
        className="w-full grid md:grid-cols-[30%_70%]"
      >
        <div className="">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col gap-5 justify-center  items-center">
          <h2 className="text-5xl font-bold ">Enter your Details</h2>
          <form
            // className={`${styles.forms} gap-4 lg:gap-5`}
            className="w-full px-5 flex flex-col justify-center gap-4"
            onSubmit={handleSubmit}
          >
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
                  type="text"
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
                    disabled={otpLoading}
                    onClick={handleSendOTP}
                  >
                    {otpLoading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      "Verify"
                    )}
                  </button>
                ) : (
                  <button
                    style={{
                      background:
                        "linear-gradient(100deg, #008080 0%, #00ffa3 100%)",
                    }}
                    className="rounded px-3 w-28"
                  >
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
                    className="bg-transparent border rounded px-5"
                  >
                    {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
                  </button>
                  <motion.button
                    onClick={handleVerifyOTP}
                    disabled={otpLoading || otp === ""}
                    whileTap={{ scale: "0.95" }}
                    className="text-white bg-gradient-to-r from-[#008080] to-[#003131] rounded p-2 w-28"
                  >
                    {otpLoading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      "Verify OTP"
                    )}
                  </motion.button>
                </div>
              )}
            </div>

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
              // disabled={!otpVerifySuccess}
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
              }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Confirm Booking"
              )}
            </motion.button>
          </form>
        </div>
        {errorState ? (
          <div
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(5px)",
            }}
          >
            <div className="border-2 border-red-500 rounded-lg bg-white flex flex-col ">
              <div className="flex justify-end p-2">
                <svg
                  onClick={() => {
                    setErrorState(false);
                    setErrorData("");
                  }}
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="24"
                  stroke="red"
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

              <p className="text-black text-lg font-semibold p-5">
                Same number or email not allowed at same time slot
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default BookNow;

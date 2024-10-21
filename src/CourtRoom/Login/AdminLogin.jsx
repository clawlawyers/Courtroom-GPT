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

function AdminLogin() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [tokenCheckLoading, setTokenCheckLoading] = useState(false);
  const [tokenVerified, setTokenVerified] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleCheckToken = async (e) => {
    e.preventDefault();
    setTokenCheckLoading(true);

    if (token !== "9950866260ADMIN") {
      toast.error("Invalid token. Please try again.");
      return;
    }
    const slotBooked = await fetch(`${NODE_API_ENDPOINT}/courtroom/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: token }),
    });

    if (!slotBooked.ok) {
      toast.error("Invalid token. Please try again.");
      return;
    }

    const parsedSlotBooked = await slotBooked.json();

    if (parsedSlotBooked === "No bookings found for the current time slot.") {
      let currentDate, currentHour;

      if (process.env.NODE_ENV === "production") {
        // Get current date and time in UTC
        const now = new Date();

        // Convert to milliseconds
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

        // IST offset is +5:30
        const istOffset = 5.5 * 60 * 60000;

        // Create new date object for IST
        const istTime = new Date(utcTime + istOffset);

        // Format the date to YYYY-MM-DD
        currentDate = `${istTime.getFullYear()}-${String(
          istTime.getMonth() + 1
        ).padStart(2, "0")}-${String(istTime.getDate()).padStart(2, "0")}`;

        currentHour = istTime.getHours();
      } else {
        // Get the current date and hour in local time (for development)
        const now = new Date();
        currentDate = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        currentHour = now.getHours();
      }

      console.log(currentDate);
      console.log(currentHour);

      // book current slot
      const bookSlot = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/adminLogin/book-courtroom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: token,
            phoneNumber: token,
            email: "admin@gmail.com",
            slots: [{ date: currentDate, hour: currentHour }],
            recording: false,
            password: token,
          }),
        }
      );
      if (!bookSlot.ok) {
        toast.error("Failed to book slot. Please try again.");
        return;
      }
      toast.success("Slot booked successfully!");
      setTokenVerified(true);
      setTokenCheckLoading(false);
    } else {
      setTokenVerified(true);
      setTokenCheckLoading(false);
    }

    // //api calls
    // if (true) {
    //   setTokenVerified(true);
    //   setTokenCheckLoading(false);
    // }
  };

  const handleCheckPassword = async (e) => {
    e.preventDefault();
    setTokenCheckLoading(true);
    const slotBooked = await fetch(`${NODE_API_ENDPOINT}/courtroom/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: token }),
    });

    if (!slotBooked.ok) {
      toast.error("Invalid token. Please try again.");
      setTokenCheckLoading(false);
      return;
    }

    const loginDetails = await slotBooked.json();

    if (loginDetails === "No bookings found for the current time slot.") {
      toast.error("No bookings found for the current time slot.");
    }

    dispatch(login({ user: loginDetails }));
    navigate("/courtroom-ai");
    setTokenCheckLoading(false);
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
                background: "linear-gradient(135deg,#0e5156,#018585 90%)",
                padding: "40px",
                border: "3px solid white",
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
              {!tokenVerified ? (
                <form
                  onSubmit={handleCheckToken}
                  style={{ margin: "20px 0px" }}
                >
                  <h1
                    className="flex"
                    style={{ fontSize: "15px", marginTop: "25px" }}
                  >
                    Enter admin token
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
                      placeholder="Enter your token..."
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>

                  <div className="flex  items-center justify-end">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: "0.95" }}
                      className="px-3 py-2 w-36"
                      style={{
                        background: "none",
                        border: "2px solid white",
                        borderRadius: "5px",
                      }}
                    >
                      {tokenCheckLoading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Check Token"
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
                <form
                  onSubmit={handleCheckPassword}
                  style={{ margin: "20px 0px" }}
                >
                  <h1
                    className="flex"
                    style={{ fontSize: "15px", marginTop: "25px" }}
                  >
                    Enter Password
                  </h1>

                  <div className={Styles.phoneContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z" />
                    </svg>
                    <input
                      required
                      type="text"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row  items-center justify-end gap-2">
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
                      {tokenCheckLoading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Login"
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
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

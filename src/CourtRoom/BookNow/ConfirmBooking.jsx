import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "../../utils/firebase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { setClearBooking } from "../../features/bookCourtRoom/bookingSlice";

const couponArr = [{ name: "exam50", discount: 50 }];

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state?.booking?.bookingData);
  // console.log(bookingData);
  const slots = bookingData?.slots;

  const [otp, setOtp] = useState("");
  // const [hasFilled, setHasFilled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [verificationId, setVerificationId] = useState("");
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [paymentGatewayLoading, setPaymentGatewayLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [otpVerifySuccess, setOtpVerifySuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(null);

  // console.log(bookingData.phoneNumber);

  useEffect(() => {
    if (bookingData === "") {
      navigate("/book-now");
    }
  }, [bookingData]);

  const handlePayment = async () => {
    setPaymentGatewayLoading(true);
    await loadRazorpay(bookingData);
    // setPaymentGatewayLoading(false);
  };

  const loadRazorpay = async (bookingData) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setPaymentGatewayLoading(false);
    };
    script.onload = async () => {
      try {
        // const planeName = `${type}_${request}_${session}`;
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/booking-payment/create-order`,
          {
            amount: discountPercentage
              ? slots.length * 100 * (discountPercentage / 100)
              : slots.length * 100,
            phoneNumber: bookingData.phoneNumber,
            currency: "INR",
            receipt: receipt,
            numberOfSlot: slots.length,
          }
        );

        console.log(result);

        const { amount, id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;
        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
          amount: String(amount),
          currency: currency,
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              bookingData,
              amount,
            };

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/booking-payment/verifyPayment`,
              data
            );
            // alert(result.data.status);
            toast(result.data.status);

            setPaymentGatewayLoading(false);
            navigate("/login");
          },

          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        toast.error(error.message);

        setPaymentGatewayLoading(false);
      } finally {
        setPaymentGatewayLoading(false);
        dispatch(setClearBooking());
      }
    };
    document.body.appendChild(script);
  };

  // const [phoneNumber, setPhoneNumber] = useState('');

  // const handleDisableButton = () => {
  //   if (isDisabled) return;

  //   setIsDisabled(true);
  //   setTimeout(() => {
  //     setIsDisabled(false);
  //   }, 30000);
  // };

  const handleSendOTP = () => {
    // handleDisableButton();
    setOtpLoading(true);
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

    signInWithPhoneNumber(
      auth,
      "+91" + bookingData?.phoneNumber,
      window.recaptchaVerifier
    )
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
        setProceedToPayment(true);
        setOtpVerifySuccess(true);
        setOtp("");
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        toast.error("Error during OTP verification");
        setOtp("");
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

    signInWithPhoneNumber(
      auth,
      "+91" + bookingData?.phoneNumber,
      window.recaptchaVerifier
    )
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

  const handleCouponCode = (e) => {
    e.preventDefault();
    const couponFind = couponArr.find(
      (x) => x.name.toLowerCase() === couponCode.toLowerCase()
    );
    if (couponFind) {
      setDiscountPercentage(couponFind.discount);
      setCouponApplied(true);
      toast.success("Coupon applied successfully !");
    } else {
      toast.error("No coupon found!");
      setCouponCode("");
    }
  };

  const handleResetCode = (e) => {
    e.preventDefault();
    setCouponCode("");
    setDiscountPercentage(null);
    setCouponApplied(false);
  };

  return (
    <div className="flex flex-col p-5 w-[80%] m-auto gap-2">
      {!proceedToPayment ? (
        <div className="w-full flex flex-col md:flex-row p-2 justify-center items-center gap-5 bg-[#303030] rounded border-2 border-[#018585]">
          <div className="py-2 flex items-center gap-2">
            <p className="m-0">Verify Phone:</p>
            <h2 className="font-bold m-0 text-xl">
              {bookingData?.phoneNumber}
            </h2>
          </div>
          {!otpSuccess ? (
            <div className="flex flex-col md:flex-row gap-2 m-2">
              <motion.button
                disabled={otpLoading}
                whileTap={{ scale: "0.95" }}
                className="border-2 rounded p-2 w-28"
                onClick={handleSendOTP}
              >
                {otpLoading ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </div>
          ) : (
            <form
              onSubmit={handleVerifyOTP}
              className="flex flex-col md:flex-row justify-center gap-2 m-2"
            >
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
                type="submit"
                disabled={otpLoading}
                whileTap={{ scale: "0.95" }}
                className="text-white bg-gradient-to-r from-[#008080] to-[#003131] rounded p-2 w-28"
              >
                {otpLoading ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </motion.button>
            </form>
          )}
        </div>
      ) : (
        ""
      )}
      {otpVerifySuccess ? (
        <>
          {couponApplied ? (
            <form
              onSubmit={handleResetCode}
              className="flex justify-center items-center gap-3 p-3"
            >
              <p className="m-0">Have a Coupon Code ? Apply Here : </p>
              <input
                required
                readOnly
                className="p-2 rounded text-black"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="submit"
                className="bg-card-gradient px-3 py-2 rounded"
              >
                Reset
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleCouponCode}
              className="flex justify-center items-center gap-3 p-3"
            >
              <p className="m-0">Have a Coupon Code ? Apply Here : </p>
              <input
                required
                className="p-2 rounded text-black"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="submit"
                className="bg-card-gradient px-3 py-2 rounded"
              >
                Apply
              </button>
            </form>
          )}
        </>
      ) : null}
      {/* Card Section */}
      <section className="w-full h-max flex flex-col md:flex-row justify-center items-start gap-2">
        {/* Card 1 */}
        <div className="p-4 border border-white max-w-[50%] h-max rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Booking Details</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2">
            {/* <h3 className="font-semibold">CLAW courtroom</h3>
            <p className="text-neutral-200 text-sm">
              Access to AI Powered CLAW courtroom
            </p> */}

            <p>
              User Id: <span className="font-bold">{bookingData.name}</span>
            </p>
            <p>
              Email: <span className="font-bold">{bookingData.email}</span>
            </p>
            <p>
              Phone Number:{" "}
              <span className="font-bold">{bookingData.phoneNumber}</span>
            </p>
          </div>
          <div className="h-0.5 bg-white w-full" />
          {/* Time Slot */}
          <div className="flex flex-col gap-1 w-full px-2">
            <p>Timer Slot: </p>
            <div className="flex flex-row flex-wrap items-center gap-2 w-full h-full">
              {slots?.map((idx) => (
                <div
                  key={idx}
                  className="bg-slot-gradient flex flex-row flex-wrap items-center align-baseline rounded-lg justify-center px-2 py-3 text-black font-bold text-xs border"
                >
                  {idx?.date}
                  {" ,"}
                  {idx?.hour}:00
                </div>
              ))}
            </div>
            <div className="w-full flex flex-row justify-end">
              <button
                onClick={() => navigate("/book-now")}
                className="border-2 font-semibold border-white rounded-md p-2"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        {otpVerifySuccess ? (
          <div className="p-4 border border-white rounded-md bg-card-gradient flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Payment Details</h3>
              <div className="h-0.5 bg-white w-full" />
            </div>
            <div className="mx-2 gap-2">
              <h3 className="font-bold text-lg">
                Price per slot: <span className="text-lg">Rs. 100</span> /-
              </h3>
              <h3 className="font-bold text-lg">
                No. of slots booked: {slots?.length}
              </h3>
            </div>
            <div className="h-0.5 bg-white w-full" />
            <br />
            {/* Amount to Pay */}
            <div className="flex flex-col w-full px-2">
              {discountPercentage ? (
                <p className="text-xl font-bold">
                  Amount to Pay:{" "}
                  {100 * slots?.length * (discountPercentage / 100)}
                </p>
              ) : (
                <p className="text-xl font-bold">
                  Amount to Pay: {100 * slots?.length}
                </p>
              )}
              <div className="flex flex-row w-full justify-end">
                <motion.button
                  whileTap={{ scale: "0.95" }}
                  // disabled={!proceedToPayment}
                  onClick={handlePayment}
                  className="border-2 font-semibold border-white rounded-md p-2"
                  // style={{
                  //   borderColor: !proceedToPayment ? "grey" : "white",
                  //   color: !proceedToPayment ? "grey" : "white",
                  //   cursor: !proceedToPayment ? "not-allowed" : "pointer",
                  // }}
                >
                  {paymentGatewayLoading ? (
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      stroke="white"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z" />
                    </svg>
                  ) : (
                    "Proceed to Payment"
                  )}
                </motion.button>
              </div>
              <br />
              <div className="h-0.5 bg-white w-full" />
            </div>
          </div>
        ) : null}
      </section>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default ConfirmBooking;

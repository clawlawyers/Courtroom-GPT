import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase";
import toast from "react-hot-toast";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const bookingData = useSelector((state) => state.booking.bookingData);
  const slots = bookingData.slots;
  console.log(bookingData.phoneNumber);

  const handlePayment = async () => {
    await loadRazorpay(bookingData);
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => console.log(error));
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    try {
      if (otp.length === 6) {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(otp);
        const { uid, phoneNumber } = result.user;
        toast.success(`${phoneNumber} verified`);
        // const response = await fetch(`${NODE_API_ENDPOINT}/client/verify`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     phoneNumber: phoneNumber.slice(3),
        //     verified: true,
        //   }),
        // });
        // console.log(response);
        // const { data } = await response.json();
        // console.log(data);
        // const userMongoId = data.mongoId;
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      toast.error(error.message);
      // setError(error.message || "Invalid Otp!");
    } finally {
      // setIsLoading(false);
    }
  };

  const loadRazorpay = async (bookingData) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        // const planeName = `${type}_${request}_${session}`;
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/booking-payment/create-order`,
          {
            amount: slots.length * 100,
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
          key: "rzp_test_UWcqHHktRV6hxM",
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
            alert(result.data.status);

            navigate("/login");
          },

          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert(error.message);
      } finally {
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="h-screen flex flex-col justify-start pt-20 w-full items-center align-middle">
      {/* Card Section */}
      <section className="w-full h-max flex flex-row justify-start  items-start gap-20 px-40">
        {/* Card 1 */}
        <div className="p-4 border border-white w-2/3 h-max rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Confirm your booking</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2">
            <h3 className="font-semibold">CLAW courtroom</h3>
            <p className="text-neutral-200 text-sm">
              Access to AI Powered CLAW courtroom
            </p>

            <p>
              UserId: <span className="font-bold">{bookingData.name}</span>
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
          <div className="flex flex-col gap-3 w-full px-2">
            <p>Timer Slot: </p>
            <div className="flex flex-row flex-wrap justify-between items-center gap-2 w-full h-full">
              {slots?.map((idx) => (
                <div
                  key={idx}
                  className="bg-slot-gradient flex flex-row flex-wrap  p-3 items-center align-baseline rounded-lg justify-center px-3 text-black font-bold text-xs"
                >
                  {idx.date}
                  {" ,"}
                  {idx.hour}:00
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
              <div>
                {hasFilled ? (
                  <form onSubmit={verifyOtp}>
                    <input
                      style={{ color: "black" }}
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <label htmlFor="otp"></label>
                    <button>verify</button>
                  </form>
                ) : (
                  <form onSubmit={handleSendOtp}>
                    <input
                      style={{ color: "black" }}
                      id="mobileNum"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <label htmlFor="mobileNum"></label>
                    <button>send otp</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 border border-white w-1/2 rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Payment Details</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2 gap-2">
            <h3 className="font-bold text-lg">
              Price per slot: <span className="text-lg">Rs. 100</span> /-
            </h3>
            <h3 className="font-bold text-lg">
              No. of slots booked: {slots.length}
            </h3>
          </div>
          <div className="h-0.5 bg-white w-full" />
          <br />
          {/* Amount to Pay */}
          <div className="flex flex-col w-full px-2">
            <p className="text-xl font-bold">
              Amount to Pay: {100 * slots.length}
            </p>
            <div className="flex flex-row w-full justify-end">
              <button
                onClick={handlePayment}
                className="border-2 font-semibold border-white rounded-md p-2"
              >
                Proceed to Payment
              </button>
            </div>
            <br />
            <div className="h-0.5 bg-white w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmBooking;

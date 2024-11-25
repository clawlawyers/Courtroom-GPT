import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { setClearBooking } from "../../features/bookCourtRoom/bookingSlice";
import {
  retrieveCourtroomAuth,
  setUser,
} from "../../features/bookCourtRoom/LoginReducreSlice";

const BuyPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state?.booking?.planData);
  const currentUser = useSelector((state) => state.user.user);

  const [paymentGatewayLoading, setPaymentGatewayLoading] = useState(false);

  useEffect(() => {
    if (bookingData === "") {
      navigate("/pricing-plans");
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
        const { planType, ...rest } = bookingData;
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/courtroomPayment/create-order`,
          {
            ...rest,
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
              bookingData: {
                planId: rest.planId,
                endDate:
                  planType === "Monthly"
                    ? new Date(new Date().setDate(new Date().getDate() + 30))
                    : new Date(),
              },
              mongoId: currentUser.mongoId,
              amount: rest.amount,
            };

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/courtroomPayment/verifyPayment`,
              data
            );
            toast.success(result.data.status);

            setPaymentGatewayLoading(false);
            dispatch(setUser(null));
            dispatch(retrieveCourtroomAuth());
            navigate("/courtroom-ai");
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
      }
      // finally {
      //   setPaymentGatewayLoading(false);
      //   dispatch(retrieveCourtroomAuth());
      // }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="flex flex-col w-[80%] p-5 m-auto gap-2">
      <div className="h-10"></div>
      {/* Card Section */}
      <section className="h-max flex justify-center items-start gap-2 w-full">
        <div className="p-4 border border-white rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Payment Details</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2 gap-2">
            <h3 className="text-lg">
              Package Type :{" "}
              <span className="font-bold">{bookingData?.planType}</span>
            </h3>
          </div>
          <div className="h-0.5 bg-white w-full" />
          <br />
          {/* Amount to Pay */}
          <div className="flex flex-col w-full px-2">
            <p className="text-xl font-bold">
              Total Payable : ₹ {bookingData?.amount}
            </p>
            <div className="flex flex-row w-full justify-end">
              <motion.button
                whileTap={{ scale: "0.95" }}
                onClick={handlePayment}
                className="border-2 font-semibold border-white rounded-md p-2"
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
      </section>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default BuyPlan;

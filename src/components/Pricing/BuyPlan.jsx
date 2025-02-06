import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  console.log(currentUser);

  useEffect(() => {
    if (bookingData === "") {
      navigate("/pricing-plans");
    }
  }, [bookingData, navigate]);

  const handlePayment = async () => {
    setPaymentGatewayLoading(true);
    await loadRazorpay(bookingData);
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
          { ...rest, phoneNumber: currentUser.phoneNumber }
        );

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
              bookingData: {
                planId: rest.planId,
                endDate: rest.expiryDate,
              },
              amount: rest.amount,
              mongoId: currentUser.mongoId,
            };

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/courtroomPayment/verifyPayment`,
              data
            );
            toast.success(result.data.status);
            // dispatch(retrieveCourtroomAuth());
            const newPlanData = {
              ...currentUser,
              plan: result.data.respo.updatePlan,
            };
            console.log(newPlanData);
            dispatch(setUser(newPlanData));
            setPaymentGatewayLoading(false);
            navigate("/courtroom-ai");
          },
          theme: { color: "#3399cc" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        toast.error(error.message);
        setPaymentGatewayLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative w-[90%] max-w-5xl flex flex-col md:flex-row justify-between gap-6">
        <div
          className="w-full md:w-[60%] flex flex-col justify-start"
          style={{ marginTop: "20%" }}>
          <h1 className="text-4xl font-bold" style={{ marginLeft: "-20px" }}>
            Payment Confirmation
          </h1>
          <p className="text-gray-400 mb-8" style={{ marginLeft: "-20px" }}>
            Please Confirm Your Purchase Items Before Proceeding with your
            Payment.
          </p>
        </div>

        <div
          className="relative w-full md:w-[50%]"
          style={{ marginTop: "20%" }}>
          <div
            className="relative bg-teal-700 p-6 rounded-lg shadow-lg text-white flex flex-col"
            style={{ height: "300px" }}>
            <button
              onClick={() => navigate("/pricing-plans")}
              className="absolute -top-12 right-4 px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800">
              Go Back
            </button>

            <div className="flex justify-between mb-4">
              <span className="text-lg">Package Type</span>
              <span className="text-lg">
                {bookingData?.planType || "Monthly"}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Package Amount</span>
              <span className="text-lg">
                ₹ {bookingData?.amount || "19999"}
              </span>
            </div>

            <hr
              className="border-white border-4"
              style={{ marginTop: "25%" }}
            />

            <div className="flex justify-between text-lg font-bold mt-auto">
              <span>Total Payable</span>
              <span>₹ {bookingData?.amount || "19999"}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 w-full py-3 bg-teal-500 rounded hover:bg-teal-600 font-semibold">
            {paymentGatewayLoading ? "Loading..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPlan;

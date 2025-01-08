import React from "react";
import { useNavigate } from "react-router-dom";

const TimeUp = ({ setFeedbackForm }) => {
  const navigate = useNavigate();

  const navigateToPricingPage = () => {
    window.open("https://courtroom.clawlaw.in/pricing-plans", "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-pink-50 border-4 border-red-500 rounded-2xl shadow-lg p-8 w-full max-w-xl text-center"
        style={{ backgroundColor: "#FFE0E0" }}
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">Time Is Up</h1>
        <p className="text-gray-700 mb-2">
          Your Free Time of 30 Mins for War Room is Over
        </p>
        <div className="border-t border-black my-4"></div>
        <p className="text-black font-semibold mb-2">
          To Continue Using Contact Administrator or
        </p>
        <p className="text-black font-semibold mt-[-0.7rem]">Buy a Plan</p>
        <div className="mt-6 flex flex-wrap justify-between items-center gap-4 md:gap-8">
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <button
              onClick={() => navigate("/contact")}
              className="bg-white text-gray-800 hover:bg-teal-500 font-semibold px-4 py-2 rounded-lg shadow-md border-2 border-[#018585] hover:bg-gray-100 transition duration-200 w-full md:w-auto"
            >
              Contact Us
            </button>
            <button
              onClick={() => setFeedbackForm(true)}
              className="bg-white text-gray-800 font-semibold hover:bg-teal-500 px-4 py-2 rounded-lg shadow-md border-2 border-[#018585] hover:bg-gray-100 transition duration-200 w-full md:w-auto"
            >
              Feedback
            </button>
          </div>

          <button
            onClick={navigateToPricingPage}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md border-2 border-[#00FFA3] hover:bg-teal-700 transition duration-200 w-full md:w-auto font-semibold"
          >
            Buy A Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeUp;

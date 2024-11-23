import React, { useState } from "react";
import "./Pricing.css";
import UserForm from "./UserForm.jsx";
import Header from "../Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlanData } from "../../features/bookCourtRoom/bookingSlice.js";

const pricingArr = [
  {
    _id: "673b016b0e5b711498e50a9a",
    planName: "Student",
    price: 199,
    duration: "Daily",
    totalTime: 3,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: false,
      AiDrafterNormal: false,
      AiDrafterPro: false,
      FirstDraft: false,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: false,
      LegalGPT: false,
      caseSearch: false,
      testimonyAssessment: false,
      _id: "673b016b0e5b711498e50a9b",
    },
    __v: 0,
  },
  {
    _id: "673b01b40e5b711498e50a9d",
    planName: "Student",
    price: 1499,
    duration: "Monthly",
    totalTime: 30,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: false,
      AiDrafterNormal: false,
      AiDrafterPro: false,
      FirstDraft: false,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: false,
      LegalGPT: false,
      caseSearch: false,
      testimonyAssessment: false,
      _id: "673b01b40e5b711498e50a9e",
    },
    __v: 0,
  },
  {
    _id: "673b02810e5b711498e50aa0",
    planName: "Intern",
    price: 299,
    duration: "Daily",
    totalTime: 3,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: true,
      AiDrafterNormal: true,
      AiDrafterPro: false,
      FirstDraft: false,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: false,
      LegalGPT: true,
      caseSearch: true,
      testimonyAssessment: false,
      _id: "673b02810e5b711498e50aa1",
    },
    __v: 0,
  },
  {
    _id: "673b029a0e5b711498e50aa3",
    planName: "Intern",
    price: 1999,
    duration: "Monthly",
    totalTime: 30,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: true,
      AiDrafterNormal: true,
      AiDrafterPro: false,
      FirstDraft: false,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: false,
      LegalGPT: true,
      caseSearch: true,
      testimonyAssessment: false,
      _id: "673b029a0e5b711498e50aa4",
    },
    __v: 0,
  },
  {
    _id: "673b033b0e5b711498e50aa6",
    planName: "Junior Advocate",
    price: 499,
    duration: "Daily",
    totalTime: 3,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: true,
      AiDrafterNormal: true,
      AiDrafterPro: true,
      FirstDraft: true,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: true,
      LegalGPT: true,
      caseSearch: true,
      testimonyAssessment: true,
      _id: "673b033b0e5b711498e50aa7",
    },
    __v: 0,
  },
  {
    _id: "673b034e0e5b711498e50aa9",
    planName: "Junior Advocate",
    price: 4499,
    duration: "Monthly",
    totalTime: 30,
    features: {
      AiLawyer: true,
      AiJudge: true,
      AiAssistant: true,
      AiDrafterNormal: true,
      AiDrafterPro: true,
      FirstDraft: true,
      Verdict: true,
      RelevantCaseLaws: true,
      Evidences: true,
      LegalGPT: true,
      caseSearch: true,
      testimonyAssessment: true,
      _id: "673b034e0e5b711498e50aaa",
    },
    __v: 0,
  },
];

const PricingPlans = () => {
  const handleSignForm = useSelector((state) => state.user.signUpModal);
  const currentUser = useSelector((state) => state.user.user);

  const [billingCycle, setBillingCycle] = useState("monthly");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plans = [
    {
      title: "STUDENT",
      price: { daily: "₹199/-", monthly: "₹1499/-" },
      features: ["AI Judge", "AI Lawyer", "Relevant Case Laws", "Verdict"],
    },
    {
      title: "INTERN",
      price: { daily: "₹299/-", monthly: "₹1999/-" },
      features: [
        "All features of STUDENT",
        "AI Assistant",
        "Case Search",
        "AI Drafter (Beta)",
      ],
    },
    {
      title: "JUNIOR ADVOCATE",
      price: { daily: "₹499/-", monthly: "₹4,499/-" },
      features: [
        "All Features of INTERN",
        "Testimony + Evidence",
        "LegalGPT",
        "First Draft of Arguments",
      ],
      popular: true,
    },
    {
      title: "LAW FIRM",
      features: [
        "Custom Case Law Jurisdiction Model",
        "Custom Drafting",
        "Document Management System",
      ],
      custom: true,
    },
  ];

  const handleBuyPlan = (plan) => {
    console.log(plan);
    console.log(currentUser);
    if (currentUser) {
      const findPlanData = pricingArr.find(
        (x) =>
          x.planName.toLowerCase() === plan.title.toLowerCase() &&
          x.duration.toLowerCase() === billingCycle
      );
      if (findPlanData) {
        const newObj = {
          amount: findPlanData.price,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          planId: findPlanData._id,
          phoneNumber: currentUser.phoneNumber,
          planType: findPlanData.duration,
        };
        dispatch(setPlanData(newObj));
        navigate("/buy-plan");
      }
    } else {
      navigate("/login-new");
    }
  };

  return (
    <>
      <div
        className={`p-5 sm:p-8 max-w-6xl mx-auto transition-all duration-300
        }`}
      >
        <div className="h-16"></div>
        <h3 className="text-2xl sm:text-3xl font-medium leading-snug text-center text-white mb-2">
          Get Started With
        </h3>
        <div
          className="title text-center mb-6 font-extrabold text-transparent bg-clip-text text-4xl sm:text-5xl md:text-6xl"
          style={{
            background:
              "linear-gradient(179.42deg, #018585 30.96%, #00FFA3 99.5%)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            lineHeight: "1.2",
          }}
        >
          AI COURTROOM
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base ${
              billingCycle === "daily"
                ? "bg-[#9AFFDB] text-[#018585]"
                : "bg-white text-[#018585]"
            }`}
            onClick={() => setBillingCycle("daily")}
          >
            Daily
          </button>
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base ${
              billingCycle === "monthly"
                ? "bg-[#9AFFDB] text-[#018585]"
                : "bg-white text-[#018585]"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-lg shadow-lg overflow-hidden flex flex-col bg-[rgba(217,217,217,0.37)] border-4 border-white p-6 ${
                plan.popular ? "popular-plan" : ""
              }`}
              style={{ height: "100%" }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                {plan.title}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-white">
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.custom ? (
                <>
                  <hr className="border-t border-white my-4" />
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="text-white font-bold mb-2 sm:mb-0">
                      CONNECT TO ADMINISTRATOR
                    </div>
                    <button
                      className="text-white py-2 px-6 sm:px-8 rounded transition-colors border border-white font-bold"
                      style={{
                        background:
                          "linear-gradient(180deg, #006E6E 0%, #003131 100%)",
                      }}
                    >
                      CONTACT US
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {billingCycle === "daily"
                      ? plan.price?.daily
                      : plan.price?.monthly}
                  </div>
                  <button
                    className="text-white py-2 px-6 rounded transition-colors border border-white font-bold"
                    style={{
                      background:
                        "linear-gradient(180deg, #006E6E 0%, #003131 100%)",
                    }}
                    onClick={() => handleBuyPlan(plan)}
                  >
                    Get It Now
                  </button>
                </div>
              )}
              {plan.popular && (
                <div className="popular-badge">MOST OPTED SUBSCRIPTION</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingPlans;

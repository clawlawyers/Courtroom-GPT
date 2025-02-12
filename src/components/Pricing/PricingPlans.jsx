import React, { useState } from "react";
import "./Pricing.css";
import UserForm from "./UserForm.jsx";
import Header from "../Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlanData } from "../../features/bookCourtRoom/bookingSlice.js";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { NODE_API_ENDPOINT } from "../../utils/utils.js";

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
  const bookingData = useSelector((state) => state?.booking?.planData);
  console.log(bookingData);
  const [billingCycle, setBillingCycle] = useState("daily");

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
    // console.log(plan);
    // console.log(currentUser);
    let newObj;
    const findPlanData = pricingArr.find(
      (x) =>
        x.planName.toLowerCase() === plan.title.toLowerCase() &&
        x.duration.toLowerCase() === billingCycle
    );
    console.log(findPlanData);
    if (currentUser) {
      if (findPlanData) {
        if (currentUser?.plan) {
          if (findPlanData.price > currentUser.plan.plan.price) {
            const { planType, ...rest } = bookingData;

            newObj = {
              createPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/create-order`,
              createPaymentPayload: {
                amount: findPlanData.price - currentUser.plan.plan.price,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
                planId: findPlanData._id,
                planType: findPlanData.duration,
                planName: findPlanData.planName,
                expiryDate: currentUser.plan.endData,
                phoneNumber: currentUser.phoneNumber,
              },
              verifyPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/verifyPayment`,
              verifyPaymentPayload: {
                bookingData: {
                  planId: findPlanData._id,
                  endDate: currentUser.plan.endData,
                },
                amount: findPlanData.price - currentUser.plan.plan.price,
                mongoId: currentUser.mongoId,
              },
            };
            // console.log(newObj);
            // dispatch(setPlanData(newObj));
            // navigate("/buy-plan");
            openPaymentGateway(newObj);
          } else {
            toast.error("Please subscribe to a higher plan than current plan!");
          }
        } else {
          const { planType, ...rest } = bookingData;
          newObj = {
            createPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/create-order`,
            createPaymentPayload: {
              amount: findPlanData.price,
              currency: "INR",
              receipt: `receipt_${Date.now()}`,
              planId: findPlanData._id,
              planType: findPlanData.duration,
              expiryDate:
                billingCycle === "monthly"
                  ? new Date(new Date().setDate(new Date().getDate() + 30))
                  : new Date(),
              phoneNumber: currentUser.phoneNumber,
            },
            verifyPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/verifyPayment`,
            verifyPaymentPayload: {
              bookingData: {
                planId: findPlanData._id,
                endDate:
                  billingCycle === "monthly"
                    ? new Date(new Date().setDate(new Date().getDate() + 30))
                    : new Date(),
              },
              amount: findPlanData.price,
              mongoId: currentUser.mongoId,
            },
          };
          // dispatch(setPlanData(newObj));
          // navigate("/buy-plan");
          openPaymentGateway(newObj);
        }
      } else {
        toast.error("Details not found for selected plan!");
      }
    } else {
      const { planType, ...rest } = bookingData;
      newObj = {
        createPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/create-order`,
        createPaymentPayload: {
          amount: findPlanData.price,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          planId: findPlanData._id,
          planType: findPlanData.duration,
          expiryDate:
            billingCycle === "monthly"
              ? new Date(new Date().setDate(new Date().getDate() + 30))
              : new Date(),
        },
        verifyPaymentURL: `${NODE_API_ENDPOINT}/courtroomPayment/verifyPayment`,
        verifyPaymentPayload: {
          bookingData: {
            // planId: rest.planId,
            // endDate: rest.expiryDate,
            planId: findPlanData._id,
            endDate:
              billingCycle === "monthly"
                ? new Date(new Date().setDate(new Date().getDate() + 30))
                : new Date(),
          },
          amount: findPlanData.price,
          mongoId: currentUser.mongoId,
        },
      };
      // dispatch(setPlanData(newObj));
      // toast.error("Please signin or login first");
      // navigate("/login-new");
      openPaymentGateway(newObj);
    }
  };

  const openPaymentGateway = (newObj) => {
    var encodedStringBtoA = btoa(JSON.stringify(newObj));
    console.log(newObj);
    console.log(encodedStringBtoA);
    window.open(`http://localhost:5173/?user=${encodedStringBtoA}`);
  };

  return (
    <div className="">
      <Helmet>
        <title>Affordable Plans for Legal Professionals </title>
        <meta
          name="description"
          content="Explore flexible pricing plans designed for legal professionals. Courtroom AI ensures value for every budget with unmatched features."
        />
        <meta
          name="keywords"
          content="legal pricing plans, Courtroom AI costs, affordable legaltech, flexible plans, lawyer tools, Courtroom subscriptions, budget-friendly legal solutions, AI-powered pricing, legal services cost, law tech savings"
        />
      </Helmet>
      <div className="w-[80%] m-auto pb-10">
        <div className="h-28"></div>
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
          }}>
          AI COURTROOM
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base transition duration-300 ease-in-out transform ${
              billingCycle === "daily"
                ? "bg-[#018585] text-[white] hover:bg-[#52a8a8]]"
                : "bg-white text-[#226e6e] hover:bg-gray-200"
            } hover:scale-105`}
            onClick={() => setBillingCycle("daily")}>
            Daily
          </button>
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base transition duration-300 ease-in-out transform ${
              billingCycle === "monthly"
                ? "bg-[#018585] text-[white] hover:bg-[#008080] hover:text-[white]"
                : "bg-white text-[#018585] hover:bg-[#E0FFFA] hover:text-[#5a8781]"
            } hover:scale-105`}
            onClick={() => setBillingCycle("monthly")}>
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
              style={{ height: "100%" }}>
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
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(180deg, #39dcdc 0%, #0a5e5e 100%)")
                      } // Hover background
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(180deg, #006E6E 0%, #003131 100%)")
                      } // Reset background
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
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(180deg, #39dcdc 0%, #0a5e5e 100%)")
                    } // Hover background
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(180deg, #006E6E 0%, #003131 100%)")
                    } // Reset background
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
    </div>
  );
};

export default PricingPlans;

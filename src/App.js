import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { retrieveAuth } from "./features/auth/authSlice";
import NotFound from "./NotFound/index.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../src/utils/utils.js";
import CourtRoom from "./CourtRoom/CourtRoom.jsx";
import LoginToCourtRoom from "./CourtRoom/Login/LoginToCourtRoom.jsx";
import BookNow from "./CourtRoom/BookNow/BookNow.jsx";
import CourtroomAiHome from "./CourtRoom/CourtroomAi/CourtroomAiHome.jsx";
import CourtRoomAiLayout from "./CourtRoom/CourtroomAi/CourtRoomAiLayout.jsx";
import CourtroomArgument from "./CourtRoom/CourtroomAi/CourtroomArgument.jsx";
import UploadDoc from "./CourtRoom/CourtroomAi/UploadDoc.jsx";
import Verdict from "./CourtRoom/CourtroomAi/Verdict.jsx";
import Contact from "./CourtRoom/ContactUs/Contact.jsx";
import { retrieveCourtroomAuth } from "./features/bookCourtRoom/LoginReducreSlice.js";
import FooterBanner from "./FooterBanner/FooterBanner.jsx";
import ConfirmBooking from "./CourtRoom/BookNow/ConfirmBooking.jsx";
import Admin from "./CourtRoom/admin/Admin.jsx";
import AdminLayout from "./CourtRoom/admin/AdminLayout.jsx";
import CourtRoomUsers from "./CourtRoom/admin/Admin.jsx";
import AllowedBooking from "./CourtRoom/admin/AllowedBooking.jsx";
import AllowedLogin from "./CourtRoom/admin/AllowedLogin.jsx";
import AiDrafter from "./CourtRoom/CourtroomAi/AiDrafter.jsx";
import CaseLaws from "./CourtRoom/CourtroomAi/CaseLaws.jsx";
import AdminLogin from "./CourtRoom/Login/AdminLogin.jsx";
import Login from "./CourtRoom/Login/Login.jsx";
import RelevantCaseLaws from "./CourtRoom/CourtroomAi/RelevantCaseLaws.jsx";
import AiDrafterPro from "./CourtRoom/CourtroomAi/AiDrafterPro.jsx";
import UploadAdditionalDoc from "./CourtRoom/CourtroomAi/UploadAdditionalDoc.jsx";
import PricingPlans from "./components/Pricing/PricingPlans.jsx";
import LoginPageNew from "./CourtRoom/Login/LoginPageNew.jsx";
import Header from "./components/Header/Header.jsx";
import UserForm from "./components/Pricing/UserForm.jsx";
import BuyPlan from "./components/Pricing/BuyPlan.jsx";
import { Helmet } from "react-helmet";

function App() {
  const currentUser = useSelector((state) => state.user.user);
  const handleSignForm = useSelector((state) => state.user.signUpModal);

  useEffect(() => {
    store.dispatch(retrieveCourtroomAuth());
  }, []);

  const CourtRoomLayout = () => {
    return (
      <div className="">
        <Helmet>
          <title>Redefine Legal Strategy with Courtroom AI </title>
          <meta
            name="description"
            content="Discover Courtroom AI, a revolutionary platform transforming legal analysis and courtroom preparation for professionals."
          />
          <meta
            name="keywords"
            content="Courtroom AI, legal analysis, lawyer tools, AI for courtrooms, legal preparation, AI-powered legaltech, Courtroom solutions, legal strategy, Courtroom tools, legal industry innovation"
          />
        </Helmet>
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
        <FooterBanner />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CourtRoomLayout />,
      children: [
        {
          path: "",
          element: <CourtRoom />,
        },
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            {
              path: "/admin/court-room",
              element: <CourtRoomUsers />,
            },
            {
              path: "/admin/allowed-booking",
              element: <AllowedBooking />,
            },
            {
              path: "/admin/allowed-login",
              element: <AllowedLogin />,
            },
          ],
        },
        // {
        //   path: "/login",
        //   element: <LoginToCourtRoom />,
        // },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin-login",
          element: <AdminLogin />,
        },
        {
          path: "/book-now",
          element: <BookNow />,
        },
        {
          path: "/confirm-booking",
          element: <ConfirmBooking />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/pricing-plans",
          element: <PricingPlans />,
        },
        {
          path: "/buy-plan",
          element: <BuyPlan />,
        },
        {
          path: "/login-new",
          element: <LoginPageNew />,
        },
      ],
    },
    {
      path: "courtroom-ai",
      element: <CourtRoomAiLayout />,
      children: [
        {
          path: "",
          element: <UploadDoc />,
        },
        {
          path: "/courtroom-ai/addFile",
          element: <UploadAdditionalDoc />,
        },
        {
          path: "/courtroom-ai/arguments",
          element: <CourtroomArgument />,
        },
        {
          path: "/courtroom-ai/verdict",
          element: <Verdict />,
        },
        {
          path: "/courtroom-ai/aiDraft",
          element: <AiDrafter />,
        },
        {
          path: "/courtroom-ai/aiDraftPro",
          element: <AiDrafterPro />,
        },
        {
          path: "/courtroom-ai/caseLaws",
          element: <CaseLaws />,
        },
        {
          path: "/courtroom-ai/relevantCaseLaws",
          element: <RelevantCaseLaws />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;

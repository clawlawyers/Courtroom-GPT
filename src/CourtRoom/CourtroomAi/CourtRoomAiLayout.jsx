import React, { useState, useEffect, useCallback, useRef } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import Styles from "./CourtroomAiLayout.module.css";
import splashVideo from "../../assets/images/door open.mp4";
import splashImage from "../../assets/images/splashImage.png";
import LogoSplash from "../../assets/images/logoSplash.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retrieveCourtroomAuth } from "../../features/bookCourtRoom/LoginReducreSlice";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";

const CourtRoomAiLayout = () => {
  const currentUser = useSelector((state) => state.user.user);
  const { status } = useSelector((state) => state.user);
  const caseOverView = useSelector((state) => state.user.caseOverview);
  console.log(status);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const BATCH_INTERVAL = 60 * 1000;

  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  // console.log(currentUser?.token);
  // console.log(currentUserRef.current);

  const updateEngagementTime = useCallback(async (engagementData) => {
    console.log(currentUser?.token);
    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/storeTime`,
        engagementData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating engagement time:", error);
    }
  }, []);

  const flushQueue = useCallback(() => {
    const user = currentUserRef.current;
    if (user) {
      updateEngagementTime({
        phoneNumber: user.phoneNumber,
        engagementTime: 60,
        timestamp: Date.now(),
      });
    }
  }, [updateEngagementTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      flushQueue();
    }, BATCH_INTERVAL);

    return () => {
      clearInterval(interval);
      flushQueue();
    };
  }, [flushQueue]);

  useEffect(() => {
    let timer;
    if (!currentUser || status === "loading") {
      setLoading(true); // set loading while waiting for user data
      timer = setTimeout(() => {
        toast.error("Please Login First");
        navigate("/login");
      }, 2000);
    } else {
      setLoading(false);
    }

    if (currentUser && !currentUser?.plan) {
      toast.error("You don't have any active plans");
      navigate("/pricing-plans");
    }

    return () => clearTimeout(timer);
  }, [currentUser, status]);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser?.plan) {
      console.log("inside ai");
      console.log(caseOverView);

      if (caseOverView !== "NA" && caseOverView !== "") {
        console.log("inside condition");
        console.log(caseOverView);
        const sidebarconatiner = document.getElementById("conatiner-sidebar")
        sidebarconatiner.click()
        navigate("/courtroom-ai/arguments");
      } else {
        navigate("/courtroom-ai");
      }
    }
  }, [caseOverView, currentUser]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex flex-col gap-1 justify-center items-center">
          <CircularProgress sx={{ color: "#008080" }} size={50} />
          <p className="text-white m-0 ">Auth Loading ...</p>
        </div>
      ) : (
        <div className="">
          <div className="h-screen grid grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[25%_75%] bg-gradient-to-r from-[#008080] to-[#0e1118]">
            <AiSidebar className="h-screen m-0 overflow-hidden" />
            <div>
              <div className="h-screen m-0 overflow-hidden">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourtRoomAiLayout;

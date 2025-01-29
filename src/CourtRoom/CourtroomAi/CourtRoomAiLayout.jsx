// src/components/CourtRoomAiLayout.js

import React, { useState, useEffect } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retrieveCourtroomAuth } from "../../features/bookCourtRoom/LoginReducreSlice";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const CourtRoomAiLayout = () => {
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.user.user);
  // console.log(currentUser);
  const caseOverView = useSelector((state) => state.user.caseOverview);
  const { status } = useSelector((state) => state.user);
  console.log(caseOverView);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (!currentUser || status === "loading") {
      setLoading(true); // set loading while waiting for user data
      timer = setTimeout(() => {
        toast.error("Please Login First");
        navigate("/");
      }, 2000);
    } else {
      setLoading(false);
    }

    return () => clearTimeout(timer);
  }, [currentUser, status]);

  useEffect(() => {
    if (caseOverView !== "NA" && caseOverView !== "") {
      console.log("inside condition");
      // console.log(caseOverView);
      // const sidebarconatiner = document.getElementById("conatiner-sidebar");
      // sidebarconatiner.click();
      navigate("/courtroom-ai/arguments");
    } else {
      navigate("/courtroom-ai");
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
        <div className="flex h-screen bg-gradient-to-r from-[#008080] to-[#0e1118]">
          <AiSidebar className="min-h-screen m-0 overflow-hidden" />
          <div className="flex-1 h-screen">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default CourtRoomAiLayout;

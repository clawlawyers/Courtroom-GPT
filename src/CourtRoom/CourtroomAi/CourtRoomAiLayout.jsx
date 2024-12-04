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

    // if (currentUser && !currentUser?.plan) {
    //   toast.error("You don't have any active plans");
    //   navigate("/pricing-plans");
    // }

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
      <div
        className="md:hidden absolute top-0 left-0 w-full h-screen flex justify-center items-center "
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(3px)",
        }}
      >
        <div className="w-full px-1 flex flex-col items-center justify-center">
          <h1 className="text-xl text-center">
            Content available in Desktop Screen only !
          </h1>
          <button
            onClick={() => navigate("/")}
            className="border rounded-lg px-4 py-1 hover:bg-white hover:bg-opacity-15"
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default CourtRoomAiLayout;

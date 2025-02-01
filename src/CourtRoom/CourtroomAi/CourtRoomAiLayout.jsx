// src/components/CourtRoomAiLayout.js

import React, { useState, useEffect } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  retrieveCourtroomAuth,
} from "../../features/bookCourtRoom/LoginReducreSlice";
import toast from "react-hot-toast";
import { CircularProgress, Modal, Rating } from "@mui/material";
import TimeUp from "../../components/TimeUpComponent/TimeUp";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { setPopupMenu } from "../../features/toggle/toggleSlice";

const CourtRoomAiLayout = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [rateValue, setRateValue] = React.useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [countdownOver, setCountDownOver] = useState(false);

  const currentUser = useSelector((state) => state.user.user);
  // console.log(currentUser);
  const caseOverView = useSelector((state) => state.user.caseOverview);
  // console.log(caseOverView);
  const { status } = useSelector((state) => state.user);
  // const countdownOver = useSelector((state) => state.toggle.popup);
  console.log(countdownOver);
  var slotTimeInterval = useSelector((state) => state?.user?.user?.slot);
  console.log(slotTimeInterval);

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

  useEffect(() => {
    let todaysSlot = new Date(slotTimeInterval);
    console.log(slotTimeInterval);
    const todaysSlotTime =
      todaysSlot.getTime() + todaysSlot.getTimezoneOffset() * 60000;
    const Offset = 0.5 * 60 * 60000 + 5.5 * 60 * 60000;
    var slot = new Date(todaysSlotTime + Offset);

    const currenttime = new Date();
    const utcTime =
      currenttime.getTime() + currenttime.getTimezoneOffset() * 60000;
    const slotutcTime = slot.getTime() + slot.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 60 * 60000;
    const currentItcTime = new Date(utcTime + istOffset);
    const slotcurrentItcTime = new Date(slotutcTime);

    const realcurrentItcTime = new Date(
      currentItcTime.getFullYear(),
      currentItcTime.getMonth(),
      currentItcTime.getDate(),
      currentItcTime.getHours(),
      currentItcTime.getMinutes(),
      currentItcTime.getSeconds()
    );

    const slotrealcurrentItcTime = new Date(
      slotcurrentItcTime.getFullYear(),
      slotcurrentItcTime.getMonth(),
      slotcurrentItcTime.getDate(),
      slotcurrentItcTime.getHours(),
      slotcurrentItcTime.getMinutes(),
      slotcurrentItcTime.getSeconds()
    );

    if (slotrealcurrentItcTime < realcurrentItcTime) {
      console.log("rendered in ai layout");
      setCountDownOver(true);
      // dispatch(setPopupMenu());
    }

    const intervalId = setInterval(() => {
      console.log("interval");
      const todaysSlotTime =
        todaysSlot.getTime() + todaysSlot.getTimezoneOffset() * 60000;
      const Offset = 0.5 * 60 * 60000 + 5.5 * 60 * 60000;
      var slot = new Date(todaysSlotTime + Offset);

      const currenttime = new Date();
      const utcTime =
        currenttime.getTime() + currenttime.getTimezoneOffset() * 60000;
      const slotutcTime = slot.getTime() + slot.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      const currentItcTime = new Date(utcTime + istOffset);
      const slotcurrentItcTime = new Date(slotutcTime);

      const realcurrentItcTime = new Date(
        currentItcTime.getFullYear(),
        currentItcTime.getMonth(),
        currentItcTime.getDate(),
        currentItcTime.getHours(),
        currentItcTime.getMinutes(),
        currentItcTime.getSeconds()
      );

      const slotrealcurrentItcTime = new Date(
        slotcurrentItcTime.getFullYear(),
        slotcurrentItcTime.getMonth(),
        slotcurrentItcTime.getDate(),
        slotcurrentItcTime.getHours(),
        slotcurrentItcTime.getMinutes(),
        slotcurrentItcTime.getSeconds()
      );
      console.log(slotcurrentItcTime, realcurrentItcTime);
      if (slotrealcurrentItcTime < realcurrentItcTime) {
        console.log("time over");
        // dispatch(setPopupMenu());
        setCountDownOver(true);
        clearInterval(intervalId); // Stop checking once time is over
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [slotTimeInterval]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroomFree/api/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
          body: JSON.stringify({
            rating: rateValue.toString(),
            feedback: feedbackMessage,
            userId: currentUser?.userId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Thankyou for the feedback!");
      EndSessionToCourtroom();
      setFeedbackLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit feedback!");
      setFeedbackLoading(false);
    }
  };

  const EndSessionToCourtroom = async () => {
    dispatch(logout());

    navigate("/");
  };

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
          <Modal open={countdownOver}>
            <div
              className="z-50"
              style={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(3px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!feedbackForm ? (
                <TimeUp setFeedbackForm={setFeedbackForm} />
              ) : (
                <div
                  className="flex flex-col justify-center gap-20 p-5"
                  style={{
                    background: "linear-gradient(to right,#0e1118,#008080)",
                    border: "4px solid white",
                    borderRadius: "10px",
                  }}
                >
                  <div className="flex flex-col gap-5">
                    <h1 className="text-[20px] sm:text-3xl">
                      Provide your valuable feedback
                    </h1>
                    <form
                      onSubmit={handleFeedbackSubmit}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex">
                        <p>Rate your Experience :</p>
                        <Rating
                          required
                          sx={{ color: "white" }}
                          name="simple-controlled"
                          value={rateValue}
                          onChange={(event, newValue) => {
                            setRateValue(newValue);
                          }}
                        />
                      </div>
                      <textarea
                        required
                        className="p-2 rounded text-black min-h-20 max-h-40"
                        placeholder="Provide a detailed description...."
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => EndSessionToCourtroom()}
                          className="border rounded px-4 py-2"
                        >
                          Skip & Exit
                        </button>
                        <button
                          type="submit"
                          className="border rounded px-4 py-2"
                        >
                          {feedbackLoading ? (
                            <CircularProgress color="inherit" size={15} />
                          ) : (
                            "Submit Feedback"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default CourtRoomAiLayout;

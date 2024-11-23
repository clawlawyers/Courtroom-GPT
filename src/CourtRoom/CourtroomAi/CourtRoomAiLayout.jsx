import React, { useState, useEffect } from "react";
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

const CourtRoomAiLayout = () => {
  const currentUser = useSelector((state) => state.user.user);
  console.log(currentUser);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!currentUser?.plan?.isActive) {
  //     toast.error("Please login to continue !");
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (!currentUser) {
      setLoading(true); // set loading while waiting for user data
    } else {
      setLoading(false);
    }

    if (currentUser && !currentUser?.plan?.isActive) {
      toast.error("Please login to continue!");
      navigate("/login");
    }
  }, [currentUser]);

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

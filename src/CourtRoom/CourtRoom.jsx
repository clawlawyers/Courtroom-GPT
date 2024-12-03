import React from "react";
import Home from "./Home/Home";
import UserForm from "../components/Pricing/UserForm";
import { useSelector } from "react-redux";

function CourtRoom() {
  const handleSignForm = useSelector((state) => state.user.signUpModal);
  return (
    <>
      <Home />
    </>
  );
}

export default CourtRoom;

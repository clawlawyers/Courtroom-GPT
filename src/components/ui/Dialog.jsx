import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import logo from "../../assets/icons/clawlogo.png";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Adjust the import path accordingly
import { setOverview } from "../../features/bookCourtRoom/LoginReducreSlice";

import clawLogo from "../../assets/icons/clawlogo1.png";
import TipsComponent from "../UploadDoc/TipsComponent";

const Dialog = ({
  open,
  onClose,
  title,
  text,
  buttonText,
  onButtonClick,
  image,
  inputText,
  setInputText,
  currentUser,
  NODE_API_ENDPOINT,
}) => {
  // console.log(image);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [currentText, setCurrentText] = useState("");
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const charsPerPage = 1000; // Define this value outside the function

  // Function to split text into pages
  const getPages = (text) => {
    const pages = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
      pages.push(text.slice(i, i + charsPerPage));
    }
    return pages;
  };

  // Update pages when inputText changes
  useEffect(() => {
    const newPages = getPages(inputText);
    setPages(newPages);
    // setCurrentText(newPages[currentPage] || "");
    setCurrentText(
      inputText
        .replaceAll("\\\\n\\\\n", " \n")
        .replaceAll("\\\\n", " \n")
        .replaceAll("\\n\\n", " \n")
        .replaceAll("\\n", " \n")
        .replaceAll("\n", " \n")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "")
    );
  }, [inputText]);

  // Update inputText when pages change
  useEffect(() => {
    setInputText(pages.join(""));
  }, [pages]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setPages((pages) => {
        const updatedPages = [...pages];
        updatedPages[currentPage] = currentText;
        return updatedPages;
      });
      setCurrentPage(currentPage - 1);
      setCurrentText(pages[currentPage - 1] || "");
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setPages((pages) => {
        const updatedPages = [...pages];
        updatedPages[currentPage] = currentText;
        return updatedPages;
      });
      setCurrentPage(currentPage + 1);
      setCurrentText(pages[currentPage + 1] || "");
    }
  };

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
    setInputText(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      await axios.post(`${NODE_API_ENDPOINT}/courtroomPricing/edit_case`, {
        user_id: currentUser.userId,
        case_overview: inputText,
      });
      dispatch(setOverview(inputText));
      setUploading(false);
      setAnalyzing(false);
      setUploadComplete(false);
      setPreviewContent("");
      navigate("/courtroom-ai/");
    } catch (error) {
      setUploading(false);
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      toast.error("Failed to save case overview");
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.style.width = "auto";
      dialogRef.current.style.height = "auto";
      const rect = dialogRef.current.getBoundingClientRect();
      if (rect.width > window.innerWidth * 0.8) {
        dialogRef.current.style.width = "90vw";
      }
      if (rect.height > window.innerHeight * 0.8) {
        dialogRef.current.style.height = "90vh";
      }
    }
  }, [open, inputText, text, image, pages]);

  if (!open) return null;

  return (
    <div className="h-screen fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#0e1118] to-[#008080] w-auto border border-white rounded-md p-4 relative">
        {/* Dialog Content */}
        <div className="w-full  flex flex-col">
          <div className="w-full flex justify-center items-center gap-10 px-2 relative">
            <h1 className="text-2xl text-white font-bold">{title}</h1>
            <Close
              className="absolute right-0 cursor-pointer"
              onClick={onClose}
            />
          </div>
          {text && (
            <div className=" flex justify-between items-center h-[80vh] w-full gap-5">
              <div className="flex flex-row justify-center w-full h-full items-center">
                <div
                  className={`${
                    isEditing ? "border-4  border-teal-400" : "border-none"
                  } rounded-md delay-150 flex flex-col w-[30rem] bg-white text-black h-full overflow-y-auto`}>
                  <div className="w-full  px-2 my-2 items-center flex flex-row ">
                    <p className="uppercase font-bold my-2 w-full ">
                      Document Preview
                    </p>
                    <div className="flex flex-row w-full items-center">
                      <div className="h-1 bg-neutral-900 w-2/3" />
                      <div className="bg-neutral-900 rounded-md">
                        <img
                          className="w-[44px] h-[29px]"
                          src={logo}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="w-full h-full p-2.5 text-black resize-none border-none"
                    value={currentText}
                    onChange={handleTextChange}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="h-full w-1 bg-neutral-200/40" />
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-center items-center">
                  <img src={clawLogo} className="h-auto w-auto" alt="logo" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full flex flex-row my-2 justify-between gap-2">
                    <button
                      className="w-full uppercase rounded-lg border-2 hover:bg-teal-500 text-sm border-white text-white hover:bg-white hover:bg-opacity-25 py-2"
                      variant="outlined"
                      onClick={onClose} // Modify if needed
                    >
                      Upload a Document
                    </button>
                    <button
                      className="text-white text-sm hover:bg-teal-500 border-2 border-white w-full uppercase rounded-lg hover:bg-white hover:bg-opacity-25 py-2"
                      variant="outlined"
                      onClick={handleEditToggle}>
                      {isEditing ? "Save Changes" : "Edit current document"}
                    </button>
                  </div>
                  <button
                    className="text-white text-sm w-full border-2 hover:bg-teal-500  border-white uppercase rounded-lg hover:bg-white hover:bg-opacity-25 py-2"
                    variant="outlined"
                    onClick={onButtonClick}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          {image && (
            <>
              {image === "/static/media/analyzing.e4732f49b92ee72868c4.gif" ? (
                <div className="flex flex-col justify-center items-center align-middle">
                  {/* <img className="h-72 w-auto" src={image} alt="" /> */}
                  <div className="flex justify-center items-center h-72 w-auto">
                    <CircularProgress size={100} sx={{ color: "white" }} />
                  </div>
                  <div className="w-[30rem] h-16 text-center">
                    <TipsComponent />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row w-full justify-center items-center align-middle">
                  <img className="h-40" src={image} alt="" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        {buttonText && (
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: "0.95" }}
              className="bg-white text-black rounded-md px-4 py-2 font-semibold"
              onClick={onButtonClick}>
              {buttonText}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;

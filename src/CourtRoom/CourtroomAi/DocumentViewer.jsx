import React, { useState, useEffect, useCallback } from "react";
import "./verdict.css";
import Markdown from "react-markdown";
import logo from "../../assets/icons/clawlogo.png";
import verdictLogo from "../../assets/icons/verdict_logo.png";
import { motion } from "framer-motion";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DocumentViewer = ({ text }) => {
  const currentUser = useSelector((state) => state.user.user);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pages, setPages] = useState([]);

  const updatePageSize = useCallback(() => {
    const height = window.innerHeight;
    const newSize = Math.max(height * 0.8, 1);
    setPageSize(newSize);
  }, []);

  const updatePages = useCallback(() => {
    if (pageSize <= 0) return;

    const newPages = [];
    for (let i = 0; i < text.length; i += pageSize) {
      newPages.push(text.slice(i, i + pageSize));
    }
    setPages(newPages);
  }, [text, pageSize]);

  useEffect(() => {
    updatePageSize();
    updatePages();
    const handleResize = () => {
      updatePageSize();
      updatePages();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePageSize, updatePages]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadVerdict = async () => {
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/download`,
        {
          user_id: currentUser.userId,
          data: text,
          type: "Verdict",
        },
        {
          responseType: "blob", // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `verdict_${currentUser.userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading case history:", error);
      toast.error("Error downloading case history");
    }
  };

  return (
    <div className="flex h-screen gap-5 px-40">
      <button onClick={handlePrevious} disabled={currentPage === 0}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </button>
      <div className="flex flex-col items-center bg-[#7ebab2] my-3">
        <img
          src={verdictLogo}
          //   className="w-max h-max object-cover"
          alt="verdict"
        />
        <img className="w-24 h-[5rem]" src={logo} alt="logo" />
        <div className="flex flex-col items-start justify-center px-5 h-screen overflow-auto text-black">
          <Markdown>{pages[currentPage]}</Markdown>
        </div>
        <div className="flex flex-row w-full justify-end items-center py-2 px-3">
          <motion.button
            whileTap={{ scale: "0.95" }}
            className="border-2 border-white p-2 rounded-lg"
            onClick={() => downloadVerdict()}
          >
            Download
          </motion.button>
        </div>
      </div>
      <button onClick={handleNext} disabled={currentPage === pages.length - 1}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </button>
    </div>
  );
};

export default DocumentViewer;

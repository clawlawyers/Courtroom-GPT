import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/clawlogo.png";
import verdictLogo from "../../assets/icons/verdict_logo.png";
import { motion } from "framer-motion";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useSelector } from "react-redux";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import LoadingDialog from "../../components/LoadingDialog";
import toast from "react-hot-toast";
import "./sidebar.css";

const Verdict = () => {
  const currentUser = useSelector((state) => state.user.user);
  const [verdict, setVerdict] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVerdict = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${NODE_API_ENDPOINT}/courtroom/api/rest`,
          {
            user_id: currentUser.userId,
          }
        );
        const verdictText = response.data.data.restDetail.verdict;
        console.log("verdict text is", verdictText);
        setVerdict(verdictText);
        setPages(splitTextIntoPages(verdictText, 700));
      } catch (error) {
        console.error("Error fetching verdict:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.userId) {
      getVerdict();
    }
  }, [currentUser.userId]);

  const splitTextIntoPages = (text, maxChars) => {
    const words = text.split(" ");
    const pages = [];
    let currentPage = "";

    words.forEach((word) => {
      if ((currentPage + word).length > maxChars) {
        pages.push(currentPage.trim());
        currentPage = "";
      }
      currentPage += `${word} `;
    });

    if (currentPage.trim()) {
      pages.push(currentPage.trim());
    }

    return pages;
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadVerdict = async () => {
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/download`,
        {
          user_id: currentUser.userId,
          data: verdict,
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
    <main className="flex flex-row justify-center items-center h-full w-full py-10 space-x-4">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingDialog />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center w-10">
            {currentPage > 0 && (
              <motion.button
                whileTap={{ scale: "0.9" }}
                className="border-2 border-white p-2 rounded-full"
                onClick={handlePreviousPage}
              >
                <ArrowLeft />
              </motion.button>
            )}
          </div>
          <section className="bg-[#7ebab2] w-2/5 flex flex-col h-full justify-start items-center rounded-md shadow-lg shadow-neutral-800 relative">
            <div className="flex flex-col justify-center items-center">
              <img
                src={verdictLogo}
                className="w-max h-max object-cover"
                alt="verdict"
              />
              <img className="w-24" src={logo} alt="logo" />
            </div>
            <section className="px-4 flex flex-col h-full justify-between items-center relative overflow-auto scrollable-div cursor-default">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <p className="text-sm text-black whitespace-pre-line">
                  {pages[currentPage]}
                </p>
              </motion.div>
            </section>
            <div className="flex flex-row w-full justify-end items-center px-2 py-4">
              <motion.button
                whileTap={{ scale: "0.95" }}
                className="border-2 border-white p-2 rounded-lg"
                onClick={() => downloadVerdict()}
              >
                Download
              </motion.button>
            </div>
          </section>
          <div className="flex justify-center items-center w-10">
            {currentPage < pages.length - 1 && (
              <motion.button
                whileTap={{ scale: "0.9" }}
                className="border-2 border-white p-2 rounded-full"
                onClick={handleNextPage}
              >
                <ArrowRight />
              </motion.button>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Verdict;

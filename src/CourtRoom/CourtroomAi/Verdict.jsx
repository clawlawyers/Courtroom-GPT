import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/clawlogo.png";
import verdictLogo from "../../assets/icons/verdict_logo.png";
import { motion } from "framer-motion";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useSelector } from "react-redux";

const Verdict = () => {
  const currentUser = useSelector((state) => state.user.user);
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    const getVerdict = async () => {
      const verdict = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/rest`,
        {
          user_id: currentUser.userId,
        }
      );
      console.log(verdict.data.data.restDetail.verdict);
      setVerdict(verdict.data.data.restDetail.verdict);
    };
    if (currentUser.userId) {
      getVerdict();
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-full w-full py-10 relative">
      <section className="bg-[#7ebab2] w-2/5 flex flex-col h-full justify-start items-center rounded-md shadow-lg shadow-neutral-800 relative">
        <div className="flex flex-col justify-center items-center">
          <img
            src={verdictLogo}
            className=" w-max h-max object-cover"
            alt="verdict"
          />
          <img className="w-24" src={logo} alt="logo" />
        </div>
        <section className="px-5 pb-5 flex flex-col h-full justify-between items-center">
          <p className="text-lg text-black mt-5">{verdict}</p>
          <div className="flex flex-row w-full justify-end items-center">
            <motion.button
              whileTap={{ scale: "0.9" }}
              className="border-2 border-white p-2 rounded-lg"
            >
              Download
            </motion.button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Verdict;

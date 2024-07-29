import React from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const LoadingDialog = () => {
 

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-gradient-to-r from-[#0e1118] to-[#008080] h-[50vh] w-[50%] border border-white rounded-md p-4 relative"
      >
        {/* Close Button */}
      

        {/* Dialog Content */}
        <div className="flex flex-col h-full w-full justify-center items-center">
          <CircularProgress  />
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;

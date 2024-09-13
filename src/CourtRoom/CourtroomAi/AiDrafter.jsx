import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/images/evidenceLoad.gif";

const AiDrafter = () => {
  const drafterDoc = useSelector((state) => state.drafter.drafterDoc);

  const [promptText, setPromptText] = useState("");
  const [promptTextbox, setPromptTextbox] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="p-3 h-screen">
      <div className="border-2 border-black h-full bg-[#D9D9D9] rounded-md">
        <div className="py-3 h-full flex flex-col gap-2">
          <div className="px-3 flex justify-between">
            <p className="m-0 text-xl font-bold text-teal-700">AI Drafter</p>
            <Close
              onClick={handleNavigation}
              className="text-teal-700 cursor-pointer"
            />
          </div>
          <div className="flex-1 grid grid-cols-[65%_35%] gap-2 px-3 h-[80%]">
            <div className="bg-[#00808034] rounded-md h-full overflow-scroll">
              {drafterDoc ? (
                <p className="m-0 p-2 text-sm text-black h-full overflow-auto">
                  {drafterDoc}
                </p>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <img className="h-28 w-28" src={loader} />
                </div>
              )}
            </div>
            <div className="h-full bg-[#046162] rounded-md flex flex-col gap-2 p-2">
              {!promptTextbox ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="m-0 text-lg font-bold">
                    Want to Edit Document ?
                  </p>
                  <p className="text-sm">Enter Your Prompt to Edit Document</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-2  py-2">
                  <p className="h-[40vh] overflow-auto text-sm m-0">
                    {promptText}
                  </p>
                  <button className="bg-[#002828] rounded text-white py-2">
                    Confirm Update Document
                  </button>
                  <button
                    onClick={() => {
                      setPromptTextbox(false);
                      setPromptText("");
                    }}
                    className="bg-[#002828] rounded text-white py-2"
                  >
                    Re-Enter Prompt
                  </button>
                </div>
              )}
              <div className="flex gap-2 relative bg-white p-1 rounded-md">
                <input
                  className="flex-1 p-2 rounded-md text-xs text-black"
                  placeholder="Enter Prompt To Edit Document"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
                <button
                  disabled={promptText === ""}
                  onClick={() => setPromptTextbox(true)}
                  className="py-1 px-4 bg-[#008080] rounded-md text-sm text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-2">
            <button className="border-2 border-teal-700 rounded-md px-3 py-2 text-black">
              Download Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDrafter;

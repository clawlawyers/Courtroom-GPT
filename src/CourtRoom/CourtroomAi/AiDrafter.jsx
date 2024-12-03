import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/images/evidenceLoad.gif";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { editDrafter, removeDrafter } from "../../features/laws/drafterSlice";
import Markdown from "react-markdown";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import TipsComponent from "../../components/UploadDoc/TipsComponent";

const AiDrafter = () => {
  const drafterDoc = useSelector((state) => state.drafter.drafterDoc);
  const currentUser = useSelector((state) => state.user.user);

  const [promptText, setPromptText] = useState("");
  const [promptTextbox, setPromptTextbox] = useState(false);
  const [drafterText, setDrafterText] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate(-1);
  };

  const handleEditDoc = async () => {
    dispatch(removeDrafter());
    setEditLoading(true);
    try {
      const props = await fetch(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/edit_application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ query: promptText }),
        }
      );

      if (!props.ok) {
        const error = await props.json();
        console.log(error.error);
        if (error.error === "Please refresh the page") {
          throw new Error("Please refresh the page");
        }
        throw new Error("API request failed");
      }
      const parsedProps = await props.json();
      dispatch(
        editDrafter({
          drafterDoc: parsedProps.data.editApplication.application,
        })
      );
      setPromptTextbox(false);
      setPromptText("");
      setEditLoading(false);
    } catch (error) {
      console.log(error);
      setEditLoading(false);
      if (error.message === "Please refresh the page") {
        toast.error("Please refresh the page");
        return;
      }
    }
  };

  useEffect(() => {
    console.log("asdasdadasdasd");
    // console.log(drafterDoc);
    setDrafterText(
      drafterDoc
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "")
    );
    // console.log(drafterText);
  }, [drafterDoc]);

  const handleDownload = async () => {
    const response = await fetch(
      `${NODE_API_ENDPOINT}/courtroomPricing/get_pdf`,
      {
        // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ document: drafterDoc }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    // Assuming the backend sends the PDF as a blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a link to download the PDF
    const a = document.createElement("a");
    a.href = url;
    a.download = "Document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
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
              {drafterText ? (
                <p
                  className="m-0 p-2 text-sm text-black h-full overflow-auto +"
                  dangerouslySetInnerHTML={{ __html: drafterText }}></p>
              ) : (
                <div className="h-full flex flex-col justify-center items-center gap-4">
                  <img className="h-28 w-28" src={loader} alt="Loading..." />
                  <div className="w-[30rem] h-16 text-center">
                    <TipsComponent />
                  </div>
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
                  <textarea
                    readOnly
                    className="max-h-[40vh] overflow-auto text-sm m-0 text-black p-2 rounded"
                    value={promptText}
                  />
                  {/* {promptText} */}
                  {/* </p> */}
                  <button
                    onClick={handleEditDoc}
                    className="bg-[#002828] rounded text-white py-2">
                    {editLoading ? (
                      <CircularProgress color="inherit" size={15} />
                    ) : (
                      "Confirm Update Document"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPromptTextbox(false);
                      setPromptText("");
                    }}
                    className="bg-[#002828] rounded text-white py-2">
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
                  className="py-1 px-4 bg-[#008080] rounded-md text-sm text-white">
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-2">
            <button
              onClick={handleDownload}
              className="border-2 border-teal-700 rounded-md px-3 py-2 text-black">
              Download Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDrafter;

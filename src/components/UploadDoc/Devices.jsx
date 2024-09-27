import React, { useState, useEffect } from "react";
import Drive from "../../assets/icons/drive.svg";
import DropBox from "../../assets/icons/dropbox.svg";
import pc from "../../assets/icons/local.svg";
import styles from "../../CourtRoom/CourtroomAi/UploadDoc.module.css";
import Dialog from "../ui/Dialog";

// import { gapi } from "gapi-script";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import upload from "../../assets/icons/Animation - 1721365056046.json";
import { useNavigate } from "react-router-dom";
import analyze from "../../assets/icons/Animation - 1721467138603.json";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setOverview } from "../../features/bookCourtRoom/LoginReducreSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import uploadImage from "../../assets/images/uploading.gif";
import analyzingImage from "../../assets/images/analyzing.gif";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import useDrivePicker from "react-google-drive-picker";

const Devices = ({ uploadedFile, setUploadedFile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  // console.log(currentUser);
  const [openPicker, data, authResponse] = useDrivePicker();

  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploaddrivedialog, setuploaddrivedialog] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [caseOverview, setCaseOverview] = useState("");
  const [closed, setClosed] = useState(false);
  const [files, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  // const [openPicker, authResponse] = useDrivePicker();
  const [open, setOpen] = useState(false);
  const [content, setconetnt] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "90%",
    width: "50%",
  };

  const handleChange = (e) => {
    console.log("Textarea changed:", e.target.value);
    setCaseOverview(e.target.value);
  };

  const handleSave = async () => {
    // text save logic

    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/edit_case`,
        {
          // user_id: currentUser.userId,
          case_overview: inputText,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      dispatch(setOverview(inputText));
      setUploading(false);
      setAnalyzing(false);
      setUploadComplete(false);
      setPreviewContent("");
    } catch (error) {
      toast.error("Failed to save case overview");
    }
  };
  const handleClick = (source) => {
    switch (source) {
      case "local":
        handleUploadFromComputer();
        break;
      case "drive":
        handleUploadFromDrive();
        break;
      case "dropbox":
        handleUploadFromDropBox();
        break;
      default:
        break;
    }
  };

  const handleUploadFromComputer = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.jpg"; // Specify the accepted file types
    fileInput.multiple = true; // Allow multiple file selection
    fileInput.addEventListener("change", async (event) => {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        setUploading(true);

        const formData = new FormData();
        files.forEach((file, index) => {
          if (index === 0) {
            console.log("filetype");
            console.log(typeof file);
            console.log(file);
            formData.append(`file`, file); // Append all files under the same key
          } else {
            formData.append(`file${index}`, file); // Append all files under the same key
          }
        });

        formData.append("isMultilang", true); // this is for multilang

        try {
          const response = await axios.post(
            `${NODE_API_ENDPOINT}/courtroom/newcase`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );

          // Handle response and update state
          setPreviewContent(response.data.data.case_overview.case_overview);
          setInputText(response.data.data.case_overview.case_overview);
          setUploading(false);
          setAnalyzing(true);

          setTimeout(() => {
            setAnalyzing(false);
            setUploadComplete(true);
          }, 3000);
        } catch (error) {
          console.log(error);
          toast.error("Error uploading file");
        }
      }
    });
    fileInput.click();
  };

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1013135670873-p4t4ef4m5qvpr5j993ar1tr5k58g136d.apps.googleusercontent.com",
      developerKey: "AIzaSyDSW4OuWpzk19KMGdylGkDuZzhFD2tagXQ",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: async (data) => {
        console.log(data);
        if (data?.docs) {
          const file = data.docs[0]; // Get the first selected file
          console.log("Selected file:", file);

          try {
            // Check if it's a Google Docs Editors file or a binary file
            const fileData = await fetchFileFromGoogleDrive(
              file.id,
              file.mimeType
            );
            console.log("File content:", fileData);

            // Send the file data to your backend
            await sendFileToBackend(file, fileData);
          } catch (error) {
            console.error("Error fetching file data:", error);
          }
        } else {
          console.log("No file selected or auth token missing");
        }
      },
    });
  };

  // Fetch file data based on its MIME type (Google Docs Editors files or binary)
  const fetchFileFromGoogleDrive = async (fileId, mimeType) => {
    const baseUrl = `https://www.googleapis.com/drive/v3/files/${fileId}`;
    let url;

    // Check if the file is a Google Docs Editors file
    if (
      mimeType === "application/vnd.google-apps.document" ||
      mimeType === "application/vnd.google-apps.spreadsheet" ||
      mimeType === "application/vnd.google-apps.presentation"
    ) {
      // Use export for Docs Editors files
      const exportMimeType =
        mimeType === "application/vnd.google-apps.document"
          ? "application/pdf"
          : mimeType === "application/vnd.google-apps.spreadsheet"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/vnd.openxmlformats-officedocument.presentationml.presentation";

      url = `${baseUrl}/export?mimeType=${exportMimeType}`;
    } else {
      // Use direct download for binary files
      url = `${baseUrl}?alt=media`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (!response.ok) {
      const resp = await response.text();
      console.log(resp);
      throw new Error("Failed to fetch file from Google Drive");
    }

    const fileBlob = await response.blob(); // Get the file content as a blob
    return fileBlob;
  };

  const sendFileToBackend = async (file, fileData) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", fileData, file.name); // Append file content
    formData.append("fileName", file.name); // Append additional metadata

    formData.append("isMultilang", true); // this is for multilang

    const response = await fetch(`${NODE_API_ENDPOINT}/courtroom/newcase`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to backend");
    }

    console.log("File successfully sent to backend");

    const data = await response.json();

    console.log(data.data);
    console.log(data.data.case_overview.case_overview);

    // Handle response and update state
    setPreviewContent(data.data.case_overview.case_overview);
    setInputText(data.data.case_overview.case_overview);
    setUploading(false);
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setUploadComplete(true);
    }, 3000);
  };

  const handleUploadFromDrive = async () => {
    setuploaddrivedialog(true);
    await handleOpenPicker();

    setuploaddrivedialog(false);
  };

  const handleUploadFromDropBox = async () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    dispatch(setOverview(""));
    setUploading(false);
    setAnalyzing(false);
    setUploadComplete(false);
    setPreviewContent("");
  };
  const handleTextInputUpload = async () => {
    setUploading(true);
    setOpen(false);
    try {
      let data = JSON.stringify({
        case_overview: content,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${NODE_API_ENDPOINT}/courtroom/api/new_case/text`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      // const response = await axios.post(
      //   `${NODE_API_ENDPOINT}/courtroom/api/new_case/text`,
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${currentUser.token}`,
      //     },
      //   }
      // );

      // Handle response and update state
      console.log(response);
      setPreviewContent(response.data.data.fetchedOverview.case_overview);
      setInputText(response.data.data.fetchedOverview.case_overview);
      setUploading(false);
      setAnalyzing(true);

      setTimeout(() => {
        setAnalyzing(false);
        setUploadComplete(true);
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading file");
    }
  };

  return (
    <>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // height: "100%",
          margin: "10px",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <div
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("drive")}
          >
            <img className="p-5" src={Drive} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Upload from Drive
            </h4>
          </div>
          <div className={styles.verticalLine}></div>
          <div
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("dropbox")}
          >
            <img className="p-5" src={DropBox} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Write Your Own Text
            </h4>
          </div>
          <div className={styles.verticalLine}></div>
          <div
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("local")}
          >
            <img className="p-5" src={pc} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Upload from your PC
            </h4>
          </div>
        </section>
        <Dialog
          setOnChange={handleChange}
          open={uploading || analyzing || uploadComplete}
          onClose={handleDialogClose}
          title={
            uploading
              ? "Uploading Your Document"
              : analyzing
              ? "Analyzing the Document"
              : uploadComplete
              ? "Upload Complete"
              : ""
          }
          text={uploading || analyzing ? "" : previewContent}
          inputText={inputText}
          setInputText={setInputText}
          buttonText={`${uploadComplete ? "" : ""}`}
          onButtonClick={handleSave}
          image={uploading ? uploadImage : analyzing ? analyzingImage : ""}
        >
          {uploading && (
            <img className="h-20 w-20" src={uploadImage} alt="uploading" />
          )}
          {analyzing && (
            <img className="fit-content" src={analyzingImage} alt="uploading" />
          )}
          {/* {uploaddrivedialog && <UploadDrive></UploadDrive>} */}
          {uploadComplete && (
            <textarea
              className="w-full h-64  p-2.5 mb-4 text-black rounded-md "
              value={caseOverview}
              onChange={handleChange}
            />
          )}
        </Dialog>
      </motion.div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-scroll  gap-6 flex flex-col">
          <textarea
            id="content"
            className="p-2 border-2"
            name="w3review"
            rows="20"
            cols="50"
            value={content}
            placeholder="Write your own Content..."
            onChange={(e) => {
              setconetnt(e.target.value);
            }}
          ></textarea>

          <button
            onClick={handleTextInputUpload}
            className="bg-[#008080] text-white rounded-md shadow-lg px-4 py-2 w-[30%]"
          >
            Upload
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default Devices;

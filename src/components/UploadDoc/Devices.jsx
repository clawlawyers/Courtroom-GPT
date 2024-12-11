import React, { useState, useEffect } from "react";
import Drive from "../../assets/icons/drive.svg";
import DropBox from "../../assets/icons/dropbox.svg";
import Document from "../../assets/icons/document5.svg";
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
import {
  setFightingSideModal,
  setOverview,
} from "../../features/bookCourtRoom/LoginReducreSlice";
import { useSelector } from "react-redux";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import uploadImage from "../../assets/images/uploading.gif";
import analyzingImage from "../../assets/images/analyzing.gif";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import useDrivePicker from "react-google-drive-picker";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./Devices.css";
import { setinputCaseTutorial } from "../../features/sidebar/sidebarSlice";
import { CircularProgress, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

const Devices = ({
  uploadedFile,
  setUploadedFile,
  languageArr,
  appendFile,
}) => {
  const inputCaseTutorial = useSelector(
    (state) => state.sidebar.inputCaseTutorial
  );
  const caseOverView = useSelector((state) => state.user.caseOverview);
  const driveUpload = useSelector((state) => state.sidebar.driveUpload);

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#uploaddrive",
        popover: {
          title: "DrIve upload",
          description:
            "click this button to upload a case file (.docx , .pdf) directly from the drive  ",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#uploadtext",
        popover: {
          title: "Write text",
          description: "click this button to write the case file   ",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#uploadpc",
        popover: {
          title: "PC upload",
          description:
            "click this button to upload a case file (.docx , .pdf) directly from the pc  ",
          side: "left",
          align: "start",
        },
      },
    ],
  });
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
  const [toBeUploadedFiles, setToBeUploadedFiles] = useState([]);
  // console.log(toBeUploadedFiles);
  const [fileNames, setFileNames] = useState({});

  const [uploadProgress, setUploadProgress] = useState({});
  // console.log(uploadProgress);
  const [uploadedSuccessFully, setUploadedSuccessFully] = useState([]);
  // console.log(uploadedSuccessFully);
  const [fileUploading, setFileUploading] = useState(false);
  // const [uploadUrl, setUploadUrl] = useState('');

  const [handleLocalUploadDialog, setHandleLocalUploadDialog] = useState(false);

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
  useEffect(() => {
    if (!inputCaseTutorial) {
      if (caseOverView == "NA" || caseOverView == "") {
        driverObj.drive();
        dispatch(setinputCaseTutorial());
      }
    }
  }, []);

  const handleSave = async () => {
    // text save logic

    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroomFree/edit_case`,
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
      // dispatch(setFightingSideModal(true));
      setUploading(false);
      setAnalyzing(false);
      setUploadComplete(false);
      setPreviewContent("");
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      toast.error("Failed to save case overview");
    }
  };
  const handleClick = (source) => {
    driverObj.destroy();
    switch (source) {
      case "local":
        setHandleLocalUploadDialog(true);
        setToBeUploadedFiles([]);
        setUploadProgress({});
        setUploadedSuccessFully([]);
        setFileNames({});
        // handleUploadFromComputer();
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
    fileInput.accept = ".pdf,.docx,.txt";
    // fileInput.multiple = true;
    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      // if (files.length > 0) {
      const maxFileSize = 15 * 1024 * 1024;

      if (
        toBeUploadedFiles.length > 0 &&
        toBeUploadedFiles.some((x) => x.name === file.name)
      ) {
        toast.error("You have already selected this file!");
      } else {
        if (file.size < maxFileSize) {
          setToBeUploadedFiles((prev) => [...prev, file]);
        } else {
          toast.error(
            `File uploaded exceeds the 15 MB limit.Please try another file`
          );
        }
      }
    });
    fileInput.click();
  };

  useEffect(() => {
    const uploadFiles = async () => {
      setFileUploading(true);
      const file = toBeUploadedFiles[toBeUploadedFiles.length - 1];
      // for (const file of toBeUploadedFiles) {
      try {
        // console.log(file.name);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("isMultilang", true);

        const response = await axios.post(
          `${NODE_API_ENDPOINT}/courtroomFree/fileUpload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        // setFileNames((prev) => [...prev, response.data.data.fileName]);
        setFileNames((prev) => ({
          ...prev,
          [response.data.data.fileName]: file.name,
        }));
        // console.log(response.data);
        uploadFileWithProgress(
          response.data.data.uploadUrl,
          file,
          response.data.data.fileName
        );
        setFileUploading(false);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setFileUploading(false);
        if (error.response.data.error === "Please refresh the page") {
          console.log("working");
          toast.error(error.response.data.error);
          return;
        }
      }
      // }
    };

    if (toBeUploadedFiles.length > 0) {
      uploadFiles();
    }
  }, [toBeUploadedFiles]);

  const uploadFileWithProgress = async (url, file, fileId) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      }
    };
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.setRequestHeader("x-goog-resumable", "start");
    xhr.setRequestHeader("Access-Control-Allow-Origin", `*`);

    // Send the file
    xhr.send(file);

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("File uploaded successfully!");
        setUploadProgress((prevProgress) => {
          const newProgress = { ...prevProgress };
          delete newProgress[fileId];
          return newProgress;
        });
        setUploadedSuccessFully((prevSuccessfullyUploaded) => [
          ...prevSuccessfullyUploaded,
          fileId,
        ]);
      } else {
        console.error("Error uploading file:", xhr.responseText);
      }
    };
  };

  useEffect(() => {
    Object.keys(fileNames).forEach((fileName) => {
      if (
        uploadProgress[fileNames[fileName]] === 100 &&
        !uploadedSuccessFully.includes(fileName)
      ) {
        // setUploadProgress((prevProgress) => {
        //   const newProgress = { ...prevProgress };
        //   delete newProgress[fileName];
        //   return newProgress;
        // });
        // setUploadedSuccessFully([...uploadedSuccessFully, fileId]);
        setUploadedSuccessFully((prevSuccessfullyUploaded) => [
          ...prevSuccessfullyUploaded,
          fileName,
        ]);
      }
    });
  }, [uploadProgress]);

  const checkUploadSuccessfull = () => {
    console.log(toBeUploadedFiles);
    console.log(uploadedSuccessFully);

    if (
      uploadedSuccessFully.length > 0 &&
      toBeUploadedFiles.length === uploadedSuccessFully.length
    ) {
      callOverView();
      setHandleLocalUploadDialog(false);
    } else {
      toast("First Add Files..!", {
        icon: "⚠️",
        style: {
          // border: "1px solid #ffa726", // Warning color (orange)
          padding: "16px",
          // color: "#ff9800", // Text color (orange)
        },
      });
      // setHandleLocalUploadDialog(false);
      // setToBeUploadedFiles([]);
      // setUploadProgress({});
      // setUploadedSuccessFully([]);
      // setFileNames({});
    }
  };

  const callOverView = async () => {
    setAnalyzing(true);
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomFree/getoverview-formfilename`,
        {
          // user_id: currentUser.userId,
          action: appendFile ? "append" : "add",
          language: languageArr.map((a) => a.toLowerCase()).join(","),
          fileNameArray: uploadedSuccessFully,
          isMultilang: true,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // toast.success("Overview fetched successfully!");
      // console.log(response.data);
      // setPreviewContent(response.data.data.case_overview);
      const totalLength = response.data.data.case_overview.split(" ").length;
      const temp = totalTimeLength(totalLength);
      console.log(temp);
      const summaryResponse = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomFree/api/case_summary`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = summaryResponse.data.data.fetchedCaseSummary.case_overview;
      setPreviewContent(data);
      setInputText(data);
      setAnalyzing(false);
      setUploadComplete(true);
    } catch (error) {
      setAnalyzing(false);
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      toast.error("Failed to load case overview");
    } finally {
      setUploadedSuccessFully([]);
      setHandleLocalUploadDialog(false);
      setToBeUploadedFiles([]);
      setUploadProgress({});
      setFileNames({});
    }
  };

  const handleDeleteFileFromUploaded = (fileId) => {
    const findFileId = Object.keys(fileNames).find(
      (key) => fileNames[key] === fileId
    );
    if (findFileId) {
      const findFileIndex = toBeUploadedFiles.findIndex(
        (x) => x.name === fileId
      );
      if (findFileIndex !== -1) {
        toBeUploadedFiles.splice(findFileIndex, 1);
      }
      const successfulUploadedIndex = uploadedSuccessFully.indexOf(findFileId);
      if (successfulUploadedIndex !== -1) {
        uploadedSuccessFully.splice(successfulUploadedIndex, 1);
      }
      setUploadProgress((prevProgress) => {
        const updatedProgress = { ...prevProgress };
        delete updatedProgress[fileId];
        return updatedProgress;
      });
      setFileNames((prevProgress) => {
        const updatedProgress = { ...prevProgress };
        delete fileNames[findFileId];
        return updatedProgress;
      });
    }
    // console.log(fileNames);
    // console.log(toBeUploadedFiles);
    // console.log(uploadedSuccessFully);
    // console.log(uploadProgress);
  };

  function totalTimeLength(totalLength) {
    let split;
    if (totalLength > 1000000) {
      split = 200000;
    } else {
      split = 20000;
    }

    const totalDoc = 15000;
    let numSplits;

    if (totalLength % split === 0) {
      numSplits = totalLength / split;
    } else {
      numSplits = Math.floor(totalLength / split) + 1;
    }

    if (totalLength < totalDoc) {
      return 2; // Time in seconds
    } else {
      return (numSplits + 1) * 4; // Time in seconds
    }
  }

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

    const response = await fetch(`${NODE_API_ENDPOINT}/courtroomFree/newcase`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
      if (error.error === "Please refresh the page") {
        // throw new Error("Please refresh the page");
        toast.error(error.error);
        return;
      }
      throw new Error("API request failed");
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
    // setuploaddrivedialog(true);
    // await handleOpenPicker();
    // setuploaddrivedialog(false);
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
    setHandleLocalUploadDialog(false);
    setToBeUploadedFiles([]);
    setUploadProgress({});
    setUploadedSuccessFully([]);
    setFileNames({});
  };

  const handleTextInputUpload = async () => {
    setUploading(true);
    setOpen(false);
    try {
      let data = JSON.stringify({
        case_overview: content,
        action: "add",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${NODE_API_ENDPOINT}/courtroomFree/api/new_case/text`,
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
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      toast.error("Error uploading file");
    }
  };

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          sx={{ color: "#008080" }}
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "text.secondary", fontSize: 12 }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "10px",
        }}>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "30px",
          }}>
          <div
            id="uploaddrive"
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("drive")}>
            <img className="p-5" src={Drive} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Upload from Drive
            </h4>
          </div>
          <div className={styles.verticalLine}></div>
          <div
            id="uploadtext"
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("dropbox")}>
            <img className="p-5 h-1 w-1 text-white" src={Document} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Write Your Own Text
            </h4>
          </div>
          <div className={styles.verticalLine}></div>
          <div
            id="uploadpc"
            className={`${styles.images} gap-10 `}
            onClick={() => handleClick("local")}>
            <img className="p-5" src={pc} alt="" />
            <h4 className="font-semibold text-neutral-500">
              Upload from your PC
            </h4>
          </div>
        </section>
        <Dialog
          setOnChange={handleChange}
          open={analyzing || uploadComplete}
          onClose={handleDialogClose}
          title={
            analyzing
              ? "Analyzing the Document"
              : uploadComplete
              ? "Upload Complete"
              : ""
          }
          text={analyzing ? "" : previewContent}
          inputText={inputText}
          setInputText={setInputText}
          buttonText={`${uploadComplete ? "" : ""}`}
          onButtonClick={handleSave}
          image={analyzing ? analyzingImage : ""}></Dialog>
      </motion.div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={style}
          className="overflow-scroll  gap-6 flex flex-col rounded-lg">
          <textarea
            id="content"
            className="p-2 border-2 border-black rounded-lg"
            name="w3review"
            rows="20"
            cols="50"
            value={content}
            placeholder="Write your own Content..."
            onChange={(e) => {
              setconetnt(e.target.value);
            }}></textarea>

          <button
            onClick={handleTextInputUpload}
            className="bg-[#008080] text-white rounded-md shadow-lg px-4 py-2 w-[30%]">
            Upload
          </button>
        </Box>
      </Modal>
      {handleLocalUploadDialog && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "3",
            overflow: "auto",
          }}>
          <div
            className="w-2/4 h-2/3 rounded-lg border-2 border-white p-2 flex flex-col  "
            style={{ background: "linear-gradient(90deg,#003838,#018585)" }}>
            <h1 className="text-center text-lg">Uploaded Documents</h1>
            <div className=" p-2 w-full h-[82%] rounded-lg border bg-gray-50 bg-opacity-15  mb-2 overflow-auto flex flex-col gap-2">
              <>
                {Object.entries(uploadProgress).map(
                  ([fileId, progress], index) => (
                    <div
                      className="bg-white text-black rounded-lg p-2 flex justify-between items-center"
                      key={fileId}>
                      <div className="flex gap-1 items-center">
                        <DescriptionIcon sx={{ color: "#008080" }} />
                        <p className="m-0 text-sm text-[#008080]">{fileId}</p>
                      </div>
                      <div className=" flex gap-2 items-center">
                        {progress === 100 ? (
                          <DeleteIcon
                            onClick={() => handleDeleteFileFromUploaded(fileId)}
                            className="cursor-pointer"
                          />
                        ) : (
                          <CircularProgressWithLabel value={progress} />
                        )}
                      </div>
                    </div>
                  )
                )}
              </>
              {fileUploading ? (
                <div className="bg-white text-black rounded-lg p-2 flex justify-between items-center animate-pulse">
                  <p className="text-[#008080] m-0 py-2">
                    Uploading in progress...
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex w-full justify-between">
              <div>
                <button
                  onClick={() => {
                    setHandleLocalUploadDialog(false);
                    setToBeUploadedFiles([]);
                    setUploadProgress({});
                    setUploadedSuccessFully([]);
                  }}
                  className="bg-slate-500 hover:bg-slate-400 border-2 px-4 py-1 rounded-lg">
                  Cancel
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUploadFromComputer}
                  className="hover:bg-teal-500 border-2 font-semibold text-[white] px-4 py-1 rounded-lg">
                  Add Files
                </button>
                <button
                  disabled={
                    toBeUploadedFiles.length !== uploadedSuccessFully.length ||
                    uploadedSuccessFully.length === 0
                  }
                  onClick={checkUploadSuccessfull}
                  className={`border-2 px-4 py-1 rounded-lg ${
                    toBeUploadedFiles.length !== uploadedSuccessFully.length ||
                    uploadedSuccessFully.length === 0
                      ? "opacity-25 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                  style={{
                    background: "linear-gradient(90deg,#018585,#003838)",
                  }}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Devices;

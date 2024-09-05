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
// import useDrivePicker from "react-google-drive-picker";
import UploadDrive from "./UploadDrive";
// import { gapi } from "gapi-script";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { data } from "autoprefixer";

const Devices = ({ uploadedFile, setUploadedFile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  console.log(currentUser);

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

  // const handleOpenPicker = () => {
  //   openPicker({
  //     clientId:
  //       "238978741277-ekmelih48qrpk1pk1viqes3lil02pgbt.apps.googleusercontent.com",
  //     developerKey: "AIzaSyAOKT3s8Mk_WK-ckgxDgvHODHmZC-wctHk",
  //     viewId: "DOCS",
  //     // token:
  //     //   "ya29.a0AcM612zhfqoZlQzCRgmqgrFmkjXC4lNOrkMe_D50c7Kmu2nPaT_XMXFMlUCXpaCbmtFapk_z27SQhXUrUbf1ZOBuAbjFDzbVKFwKsPZsV5NivY8Yl-Aaq8aBofArWp-_aTDi-9nFN_RjU0Lk26PJTAN0qbkFh-5sSnizMsD9aCgYKAS4SARESFQHGX2MiOBtm_SHQFiY6jyTHqHjVBQ0175",
  //     //   "ya29.a0AcM612zjuDRqG7wQkCyDG8mSj2GNwBZLwU2UinKEcdr-mHD7qK5z__z0PeYJw9kFQ8m2q2uct2rsiT2_Oe-wSLEp-l1ttFucylhgJTISGSunawREflu4ZqILnfIhjYr6nUBFtj9ZAYkRQHwYB8_cgkRNlXYEWZOBHKJJ_wvhaCgYKAWcSAQ8SFQHGX2MiXmL5f9N3qNIEHRQA4VRkzw0175", // pass oauth token in case you already have one
  //     showUploadView: true,
  //     showUploadFolders: true,
  //     supportDrives: true,
  //     multiselect: true,

  //     // customViews: customViewsArray, // custom view
  //     callbackFunction: async (data) => {
  //       if (data.action === "cancel") {
  //         console.log("User clicked cancel/close button");
  //       }

  //       if (data.docs !== undefined) {
  //         console.log("hi");

  //         console.log(data);
  //         // gapi.load("client:auth2", initClient);
  //         // gapi.client.init({
  //         //   apiKey: "AIzaSyAOKT3s8Mk_WK-ckgxDgvHODHmZC-wctHk",
  //         //   // Your API key will be automatically added to the Discovery Document URLs.
  //         //   discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
  //         //   // clientId and scope are optional if auth is not required.
  //         //   clientId:
  //         //     "238978741277-ekmelih48qrpk1pk1viqes3lil02pgbt.apps.googleusercontent.com",
  //         //   scope: "drive",
  //         // });
  //       }
  //     },
  //   });
  // };

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

  const handleUploadFromDrive = () => {
    setuploaddrivedialog(true);
    // handleOpenPicker();

    // setUploading(true);
    // setTimeout(() => {
    //   setUploading(false);
    //   setAnalyzing(true);
    //   setTimeout(() => {
    //     setAnalyzing(false);
    //     setUploadComplete(true);
    //     setPreviewContent(
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, est non blandit luctus, orci justo bibendum urna, at gravida ligula eros eget lectus."
    //     ); // Set preview content

    //     //dispatch function
    //     // dispatch(setOverview())
    //   }, 3000); // Simulate analyzing
    // }, 3000); // Simulate upload
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
          {uploaddrivedialog && <UploadDrive></UploadDrive>}
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

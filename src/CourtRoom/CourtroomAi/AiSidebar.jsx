import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/claw-login.png";
import clawLogo from "../../assets/icons/clawlogo1.png";
import Styles from "./AiSidebar.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Menu } from "@mui/material";
import { ArrowRight, Close, Download, Send } from "@mui/icons-material";
import { ArrowLeft } from "@mui/icons-material";
import { MenuItem, IconButton } from "@mui/material";
import { IoReload } from "react-icons/io5";
import { Popover } from "@mui/material";
import {
  logout,
  setFirstDraftAction,
  setFirstDraftLoading,
  setOverview,
} from "../../features/bookCourtRoom/LoginReducreSlice";
import aiAssistant from "../../assets/images/aiAssistant.png";
import assistantLogo from "../../assets/images/virtualAssistant.gif";
import aiAssistantLoader from "../../assets/images/aiAssistantLoading.gif";
import assistantIcon2 from "../../assets/images/assistantIcon2.png";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import countDown from "../../assets/images/countdown.gif";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import loader from "../../assets/images/aiAssistantLoading.gif";
import { MoreVert } from "@mui/icons-material";
import EvidenceDialog from "../../components/Dialogs/EvidenceDialog";
import PDFDownloadButton from "./PdfDownloader/PdfDoc";
import TestimonyDialog from "../../components/Dialogs/TestimonyDialog";
import aiDrafter from "../../assets/sideMenubar/Ai.png";
import firstDraftLogo from "../../assets/sideMenubar/firstDraftImg.png";
import oldCaseLogo from "../../assets/sideMenubar/oldCase.png";
import newCaseLogo from "../../assets/sideMenubar/newCase.png";
import homeLogo from "../../assets/sideMenubar/homeLogo.png";
import exitLogo from "../../assets/sideMenubar/exitLogo.png";
import evidenceLoad from "../../assets/images/evidenceLoad.gif";
import {
  removeDrafter,
  retrieveDrafterQuestions,
} from "../../features/laws/drafterSlice";
import {
  removeCaseLaws,
  retrieveCaseLaws,
  setCaseLaws,
} from "../../features/laws/lawSlice";
import { setTutorial } from "../../features/popup/popupSlice";
import Rating from "@mui/material/Rating";
import sendIcon from "../../assets/icons/Send.png";

const drafterQuestions = [
  { name: "Bail Application", value: "bail_application" },
  { name: "Civil Appeal", value: "civil_appeal" },
  { name: "Civil Petition", value: "civil_petition" },
  { name: "Criminal Appeal", value: "criminal_appeal" },
  { name: "Criminal Petition", value: "criminal_petition" },
];

const TimerComponent = React.memo(({ EndSessionToCourtroom }) => {
  const slotTimeInterval = useSelector((state) => state.user.user.slotTime);
  const currentUser = useSelector((state) => state.user.user);

  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const [countdownOver, setCountDownOver] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [rateValue, setRateValue] = React.useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sidebarTut = useSelector((state) => state.sidebar.sidebarTut);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hi");
  }, [dispatch]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const minutesLeft = 60 - now.getMinutes() - 1;
      const secondsLeft = 60 - now.getSeconds();
      setTimeLeft({ minutes: minutesLeft, seconds: secondsLeft });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (slotTimeInterval < new Date().getHours()) {
      setCountDownOver(true);
    }
  });

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            rating: rateValue.toString(),
            feedback: feedbackMessage,
            userId: "65589uh3nwsnm,os",
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Thankyou for the feedback!");
      EndSessionToCourtroom();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit feedback!");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-between items-center px-2 py-1 bg-[#C5C5C5] text-[#008080] border-2 rounded"
        style={{ borderColor: timeLeft.minutes < 5 ? "red" : "white" }}
      >
        <h1 id="time-left" className="text-xs m-0 font-bold text-teal-800">
          Time Remaining:
        </h1>
        <h1
          className="text-xs m-0 font-semibold"
          style={{ color: timeLeft.minutes < 5 ? "red" : "#008080" }}
        >
          {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes} :{" "}
          {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        </h1>
      </div>
      {countdownOver ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          {!feedbackForm ? (
            <div
              className="flex flex-col justify-center gap-20 p-5"
              style={{
                background: "linear-gradient(to right,#0e1118,#008080)",
                height: "450px",
                width: "900px",
                border: "4px solid red",
                borderRadius: "10px",
              }}
            >
              <div className="flex flex-col justify-center items-center gap-10">
                <img className="w-28 h-28" alt="clock" src={countDown} />
                <h1 className="text-3xl">Your Courtroom Time is Over</h1>
              </div>
              <div className="flex justify-center gap-5">
                <motion.button
                  whileHover={{ scale: "1.01" }}
                  onClick={() => EndSessionToCourtroom()}
                  whileTap={{ scale: "0.95" }}
                  className="border border-white rounded-lg py-2 px-8"
                >
                  Skip & Exit To Homepage
                </motion.button>
                <motion.button
                  whileHover={{ scale: "1.01" }}
                  onClick={() => setFeedbackForm(true)}
                  whileTap={{ scale: "0.95" }}
                  className="border border-white rounded-lg py-2 px-8 text-white"
                >
                  Provide Feedback
                </motion.button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col justify-center gap-20 p-5"
              style={{
                background: "linear-gradient(to right,#0e1118,#008080)",
                border: "4px solid white",
                borderRadius: "10px",
              }}
            >
              <div className="flex flex-col gap-5">
                <h1 className="text-3xl">Provide your valuable feedback</h1>
                <form
                  onSubmit={handleFeedbackSubmit}
                  className="flex flex-col gap-2"
                >
                  <div className="flex">
                    <p>Rate your Experience :</p>
                    <Rating
                      required
                      sx={{ color: "white" }}
                      name="simple-controlled"
                      value={rateValue}
                      onChange={(event, newValue) => {
                        setRateValue(newValue);
                      }}
                    />
                  </div>
                  <textarea
                    required
                    className="p-2 rounded text-black min-h-20 max-h-40"
                    placeholder="Provide a detailed description...."
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => EndSessionToCourtroom()}
                      className="border rounded px-4 py-2"
                    >
                      Skip & Exit
                    </button>
                    <button type="submit" className="border rounded px-4 py-2">
                      {loading ? (
                        <CircularProgress color="inherit" size={15} />
                      ) : (
                        "Submit Feedback"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
});

const AiSidebar = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [firstDraft, setFirstDraft] = useState("");
  const [inputText, setInputText] = useState(
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
  );

  const [showAskLegalGPT, setShowAskLegalGPT] = useState(false);
  const [promptArr, setPromptArr] = useState([]);
  const [askLegalGptPrompt, setAskLegalGptPrompt] = useState("");
  const [searchQuery, setSearchQuery] = useState(false);
  const [evidenceAnchorEl, setEvidenceAnchorEl] = useState(null);
  const [testimonyAnchorEl, setTestimonyAnchorEl] = useState(null);
  const [showDrafterQuestions, setShowDrafterQuestions] = useState(false);

  useEffect(() => {
    setInputText(pages.join(""));
  }, [pages]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isApi, setisApi] = useState(false);
  const overViewDetails = useSelector((state) => state.user.caseOverview);
  // console.log(overViewDetails);

  const firstDraftDetails = useSelector((state) => state.user.firstDraft);
  console.log(firstDraftDetails);
  const firstDraftLoading = useSelector(
    (state) => state.user.firstDraftLoading
  );
  const currentUser = useSelector((state) => state.user.user);
  const slotTimeInterval = useSelector((state) => state.user.user.slotTime);

  const [editDialog, setEditDialog] = useState(false);
  const [firstDraftDialog, setFirstDraftDialog] = useState(false);
  // const [firstDraftLoading, setFirsDraftLoading] = useState(false);
  const [text, setText] = useState("");
  const [aiIconHover, setAiIconHover] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [AiQuestions, setAiQuestions] = useState(null);
  const [aiAssistantLoading, setAiAssistantLoading] = useState(true);
  const [downloadCaseLoading, setDownloadCaseLoading] = useState(false);
  const [downloadSessionLoading, setDownloadSessionLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEvidenceDialogOpen, setEvidenceDialogOpen] = useState(false);
  const [sessionHistoryText, setSessionHistoryText] = useState(null);
  const [downloadHistoryPrompt, setDownloadHistoryPrompt] = useState(false);

  const [showRelevantLaws, setShowRelevantLaws] = useState(false);
  const [relevantCaseLoading, setRelevantCaseLoading] = useState(false);
  const [relevantLawsArr, setRelevantLawsArr] = useState(null);
  const [relevantLawData, setRelevantLawData] = useState("");
  const [caseSearchDialog, setCaseSearchDialog] = useState(false);
  const [caseSearchPrompt, setCaseSearchPrompt] = useState("");
  const [caseSearchLoading, setCaseSearchLoading] = useState(false);
  const [nextAppealLoading, setNextAppealLoading] = useState(false);
  const [appealDialog, setAppealDialog] = useState(false);
  const [appealData, setAppealData] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on component mount and whenever the content changes
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [promptArr]);

  useEffect(() => {
    setText(overViewDetails);
  }, [overViewDetails]);

  const handleExit = () => {
    navigate("/court-room");
  };

  const ExitToCourtroom = async () => {
    localStorage.removeItem("hasSeenSplash");
    localStorage.setItem("FileUploaded", false);

    // await saveHistory();

    dispatch(logout());

    navigate("/");
  };

  const EndSessionToCourtroom = async () => {
    localStorage.removeItem("hasSeenSplash");
    localStorage.setItem("FileUploaded", false);

    // await saveHistory();
    if (overViewDetails !== "") {
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/end`,
        {
          userId: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
    }

    dispatch(logout());

    navigate("/");
  };

  const saveHistory = async () => {
    setRelevantLawsArr(null);
    setShowRelevantLaws(false);
    try {
      if (overViewDetails !== "NA") {
        await axios.post(
          `${NODE_API_ENDPOINT}/courtroom/api/history`,
          {
            // user_id: currentUser.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
      }
    } catch (error) {
      toast.error("Error in saving history");
      console.error("Error in saving history", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/edit_case`,
        {
          // user_id: currentUser.userId,
          case_overview: text,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      dispatch(setOverview(text));
      setEditDialog(false);
      await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/case_summary`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      dispatch(setFirstDraftAction({ draft: "" }));
    } catch (error) {
      toast.error("Error in saving case");
      console.error("Error in saving case", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleFirstDraft = async () => {
    // if (isApi) {
    //   setFirsDraftLoading(true);
    // }

    setFirstDraftDialog(true);
  };

  const handleEvidenceClick = (event) => {
    setEvidenceAnchorEl(event.currentTarget);
    handleMenuClose();
  };

  const handleEvidenceClose = () => {
    setEvidenceAnchorEl(null);
  };

  const handleTestimonyClick = (event) => {
    setTestimonyAnchorEl(event.currentTarget);
    handleMenuClose();
  };

  const handleTestimonyClose = () => {
    setTestimonyAnchorEl(null);
  };

  const firstDraftApi = async () => {
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/draft`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      // console.log("response is ", response.data.data.draft.detailed_draft);
      // setFirstDraft(response.data.data.draft.detailed_draft);

      dispatch(setFirstDraftAction({ draft: "" }));
      dispatch(
        setFirstDraftAction({
          draft: response?.data?.data?.draft?.detailed_draft,
        })
      );

      // dispatch(setFirstDraftLoading());
      // console.log("response is ", response.data.data.draft.detailed_draft);
      // setFirstDraft(response.data.data.draft.detailed_draft);
      // console.log(response.data.data.draft);
    } catch (error) {
      console.log(error);
      // toast.error("Error in getting first draft");
      // dispatch(setFirstDraftLoading());
    }
  };

  useEffect(() => {
    if (overViewDetails !== "" || overViewDetails !== "NA") {
      // console.log(overViewDetails);
      firstDraftApi();
    }
  }, [overViewDetails]);

  useEffect(() => {
    setFirstDraft(firstDraftDetails);
  }, [firstDraftDetails]);

  const getAiQuestions = async () => {
    setAiAssistantLoading(true);
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/hallucination_questions`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // console.log(
      //   response.data.data.hallucinationQuestions.assistant_questions
      // );
      setAiQuestions(
        response.data.data.hallucinationQuestions.assistant_questions
      );
      setAiAssistantLoading(false);
    } catch (error) {
      console.error("Error fetching AI questions:", error);
      setAiAssistantLoading(false);
    }
  };

  const formatText = (text) => {
    return text
      .replace(/\\n\\n/g, "<br/><br/>")
      .replace(/\\n/g, "  <br/>")
      .replace(/\\/g, " ");
  };

  const getReventCaseLaw = async () => {
    setRelevantCaseLoading(true);

    try {
      const fetchedData = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/relevant_case_law`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (!fetchedData.ok) {
        toast.error("Failed to fetch relevant case laws");
        return;
      }

      const data = await fetchedData.json();
      const formattedData = formatText(
        data.data.relevantCases.relevant_case_law
      );
      setRelevantLawData(data.data.relevantCases.relevant_case_law);
      // console.log(data.data.relevantCases.relevant_case_law);
      setRelevantCaseLoading(false);
      setRelevantLawsArr(formattedData);
    } catch (error) {
      toast.error("Failed to fetch relevant case laws");
      console.error(error);
    }
  };

  useEffect(() => {
    const getOverview = async () => {
      try {
        const overView = await axios.post(
          `${NODE_API_ENDPOINT}/courtroom/getCaseOverview`,
          {
            // user_id: currentUser.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        console.log(overView.data.data.case_overview);
        if (overView.data.data.case_overview === "NA") {
          dispatch(setOverview(""));
        } else {
          dispatch(setOverview(overView.data.data.case_overview));
        }
      } catch (error) {
        toast.error("Error in fetching case overview");
        console.error("Error fetching case overview", error);
      }
    };
    if (currentUser.userId) {
      getOverview();

      // console.log(currentUser.userId);
    }
  }, [currentUser.userId]);

  const downloadCaseHistory = async () => {
    setDownloadCaseLoading(true);
    try {
      await saveHistory();
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/downloadCaseHistory`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          responseType: "blob", // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `case_history_claw.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading case history:", error);
      toast.error("Error downloading case history");
    } finally {
      setDownloadCaseLoading(false);
    }
  };

  const downloadSessionCaseHistory = async () => {
    setDownloadSessionLoading(true);
    try {
      await saveHistory();

      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/downloadSessionCaseHistory`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          responseType: "blob", // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `case_session_history_claw.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading case history:", error);
      toast.error("Error downloading case history");
    } finally {
      setDownloadSessionLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dowloadFirstDraft = async () => {
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroom/api/downloadFirtDraft`,
        {
          // user_id: currentUser.userId,
          // data: firstDraft,
          // type: "First Draft",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          responseType: "blob", // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `first_draft_claw.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading First Draft:", error);
      toast.error("Error downloading First Draft");
    }
  };

  const getLegalGptResponse = async () => {
    try {
      setSearchQuery(true);
      const getResponse = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/ask_query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            action: "Generate",
            query: askLegalGptPrompt,
          }),
        }
      );

      if (!getResponse.ok) {
        throw new Error(`Error: ${getResponse.statusText}`);
      }

      const responseData = await getResponse.json();

      const data = responseData.data.fetchedAskQuery.answer;
      // console.log(data);

      setPromptArr([
        ...promptArr,
        {
          prompt: askLegalGptPrompt,
          promptResponse: data,
        },
      ]);
    } catch (error) {
      console.error("Error in getting response:", error);
      toast.error("Error in getting response");
      setSearchQuery(false);
      let newArr = promptArr;
      newArr.pop();
      setPromptArr(newArr);
    }
    // setAskLegalGptPrompt(null);
  };

  const handleDrafterQuestions = (action) => {
    dispatch(removeDrafter());
    setShowDrafterQuestions(false);
    dispatch(
      retrieveDrafterQuestions({ query: action, token: currentUser.token })
    );
  };

  const handleCaseSearchPrompt = async () => {
    setCaseSearchLoading(true);
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/sidebar-casesearch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ context: caseSearchPrompt }),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(removeCaseLaws());
      dispatch(setCaseLaws(data.data.FetchedSidebarCasesearch.relatedCases));
      setCaseSearchLoading(false);
      setCaseSearchDialog(false);
      setCaseSearchPrompt("");
      navigate("/courtroom-ai/caseLaws");
    } catch (error) {
      console.log(error);
      setCaseSearchLoading(false);
    }
  };

  const handleNextAppeal = async () => {
    setNextAppealLoading(true);
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/draft_next_appeal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setNextAppealLoading(false);
      toast.success("Next appeal successfull");
      setAppealDialog(true);
      setAppealData(data.data.fetchedDraftNextAppeal.detailed_draft);
    } catch (error) {
      console.log(error);
      setNextAppealLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 h-screen py-3 pl-3">
        {/* top container */}
        <div className="bg-[#008080] h-[25vh] pt-1 px-4 pb-3 border-2 border-black rounded gap-2 flex flex-col">
          <motion.div
            className="max-w-fit rounded-lg flex gap-1 items-center pt-2 cursor-pointer"
            whileTap={{ scale: "0.95" }}
            onClick={handleGoBack}
          >
            <svg
              className="h-5 w-5"
              fill="#C5C5C5"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
                fill-rule="nonzero"
              />
            </svg>
            <p className="m-0 text-xs">Go Back</p>
          </motion.div>
          <div className="flex-1  overflow-auto">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center ">
                <p className="text-[#00FFA3] text-sm m-0">Case Details : </p>

                {/* <motion.button
                  whileTap={{ scale: "0.95" }}
                  onClick={() => setEditDialog(true)}
                  className="border-2 border-[#00FFA3] rounded-lg p-1 px-2"
                >
                  Edit
                </motion.button> */}
                <IconButton
                  id="evidence-menu"
                  sx={{ color: "white" }}
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    id="edit_doc"
                    onClick={() => {
                      handleMenuClose();
                      setEditDialog(true);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem id="evidence-button" onClick={handleEvidenceClick}>
                    Add Evidences
                  </MenuItem>
                  <MenuItem
                    id="evidence-testimony"
                    onClick={handleTestimonyClick}
                  >
                    Add Testimony
                  </MenuItem>
                </Menu>

                <Popover
                  open={Boolean(evidenceAnchorEl)}
                  anchorEl={evidenceAnchorEl}
                  onClose={handleEvidenceClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      width: "600px", // Adjust the width as needed
                      padding: "16px", // Adjust the padding as needed
                    },
                  }}
                >
                  <EvidenceDialog handleEvidenceClose={handleEvidenceClose} />
                </Popover>
                <Popover
                  open={Boolean(testimonyAnchorEl)}
                  anchorEl={testimonyAnchorEl}
                  onClose={handleTestimonyClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      width: "600px", // Adjust the width as needed
                      padding: "16px", // Adjust the padding as needed
                    },
                  }}
                >
                  <TestimonyDialog
                    handleTestimonyClose={handleTestimonyClose}
                  />
                </Popover>
              </div>
              <div className="h-[50px] overflow-auto">
                <h1 className="text-xs m-0 py-2">
                  <Markdown>{overViewDetails}</Markdown>
                </h1>
              </div>
            </div>
          </div>
          <TimerComponent EndSessionToCourtroom={EndSessionToCourtroom} />
        </div>
        {/* bottom container */}
        <div
          id="normal-div"
          className="flex-1 overflow-auto border-2 border-black rounded flex flex-col relative px-4 py-4 gap-2 justify-between"
        >
          <div className="flex flex-col gap-1">
            <motion.div
              onClick={handleFirstDraft}
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
              className={`${
                overViewDetails === "NA" || overViewDetails === ""
                  ? "opacity-75 pointer-events-none cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
                background: "#C5C5C5",
                color: "#008080",
                border: "2px solid white",
                borderRadius: "5px",
              }}
            >
              <div id="first-draft">
                <p className="text-xs m-0 font-bold text-teal-800">
                  View First Draft
                </p>
              </div>
              <div style={{ width: "15px", margin: "0" }}>
                <svg
                  width="24"
                  height="24"
                  style={{ fill: "#008080", cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
              </div>
            </motion.div>
            <motion.div
              onClick={() => setShowDrafterQuestions(true)}
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
                background: "#C5C5C5",
                color: "#008080",
                border: "2px solid white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <div id="Ai-Drafter">
                <p className="text-xs m-0 font-bold text-teal-800">
                  Ai Drafter
                </p>
              </div>
              <div style={{ width: "15px", margin: "0" }}>
                <svg
                  width="24"
                  height="24"
                  style={{ fill: "#008080", cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
              </div>
            </motion.div>
            <motion.div
              onClick={() => setShowAskLegalGPT(true)}
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
                background: "#C5C5C5",
                color: "#008080",
                border: "2px solid white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <div id="legalGpt">
                <p className="text-xs m-0 font-bold text-teal-800">
                  Ask LegalGPT
                </p>
              </div>
              <div style={{ width: "15px", margin: "0" }}>
                <svg
                  width="24"
                  height="24"
                  style={{ fill: "#008080", cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
              </div>
            </motion.div>
            <motion.div
              onClick={() => setCaseSearchDialog(true)}
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
                background: "#C5C5C5",
                color: "#008080",
                border: "2px solid white",
                borderRadius: "5px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              <div id="case-search">
                <p className="text-xs m-0 font-bold text-teal-800">
                  Case Search
                </p>
              </div>
              <div style={{ width: "15px", margin: "0" }}>
                <svg
                  width="24"
                  height="24"
                  style={{ fill: "#008080", cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
              </div>
            </motion.div>
          </div>
          <div
            id="claw-ai-ass"
            className="flex justify-end cursor-pointer relative"
          >
            <motion.img
              className={`${
                overViewDetails === "NA" || overViewDetails === ""
                  ? "opacity-75 pointer-events-none cursor-not-allowed h-9 w-9"
                  : "h-9 w-9"
              }`}
              // className="h-9 w-9"
              whileTap={{ scale: "0.95" }}
              alt="assistant"
              src={showAssistant ? assistantIcon2 : aiAssistant}
              onHoverStart={() => setAiIconHover(true)}
              onHoverEnd={() => setAiIconHover(false)}
              onClick={() => {
                setShowAssistant(true);
                getAiQuestions();
              }}
            />
            {aiIconHover ? (
              <h1 className="absolute text-xs right-16 top-0 bg-[#033E40] p-2 rounded-lg border-2 border-[#00ffa3]">
                CLAW AI Assistant
              </h1>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col w-full h-full justify-start items-center gap-2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // margin: "40px 0px",
              }}
            >
              <img className="w-24" src={logo} alt="logo" />
            </div>
            <div className="h-full flex flex-col justify-evenly">
              <motion.div
                id="download-session"
                className={`${
                  overViewDetails === "NA" || overViewDetails === ""
                    ? "opacity-75 pointer-events-none cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => downloadSessionCaseHistory()}
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                  cursor: `${downloadSessionLoading ? "wait" : "pointer"}`,
                }}
              >
                <img
                  className="w-5 h-5"
                  src={firstDraftLogo}
                  alt="firstdraft"
                />
                <p className="m-0 text-xs text-white">
                  Download Session History
                </p>
              </motion.div>
              <motion.div
                id="download-case"
                className={`${
                  overViewDetails === "NA" || overViewDetails === ""
                    ? "opacity-75 pointer-events-none cursor-not-allowed flex items-center gap-[12px] relative"
                    : " flex items-center gap-[12px] cursor-pointer relative"
                }`}
                onClick={() => downloadCaseHistory()}
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
              >
                <img className="w-4" src={aiDrafter} alt="aiDrafter" />
                <p className="m-0 text-xs text-white">Download Case History</p>
              </motion.div>
              {/* <motion.div
                className={`${
                  overViewDetails === "NA" || overViewDetails === ""
                    ? "opacity-75 pointer-events-none cursor-not-allowed"
                    : ""
                }`}
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <img src={oldCaseLogo} />
                <p className="m-0 text-xs text-white">Old Case Search</p>
              </motion.div> */}
              <Link to={"/courtroom-ai"}>
                <motion.div
                  whileTap={{ scale: "0.95" }}
                  whileHover={{ scale: "1.01" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    cursor: "pointer",
                  }}
                >
                  <img src={newCaseLogo} />
                  <p
                    id="NewCaseInput"
                    className="m-0 text-xs text-white"
                    onClick={() => {
                      saveHistory();

                      dispatch(setOverview(""));
                      dispatch(setFirstDraftAction({ draft: "" }));
                    }}
                  >
                    New Case Input
                  </p>
                </motion.div>
              </Link>
              <motion.div
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <img className="h-4 w-4" src={homeLogo} alt="" />
                <p className="m-0 text-xs">Claw Home</p>
              </motion.div>
              <motion.div
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <img className="h-4 w-4" src={exitLogo} />

                <p className="m-0 text-xs" onClick={() => ExitToCourtroom()}>
                  Exit Courtroom
                </p>
              </motion.div>
              <motion.div
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
                className={`${
                  overViewDetails === "NA" || overViewDetails === ""
                    ? "opacity-75 pointer-events-none cursor-not-allowed flex items-center gap-[12px] relative"
                    : " flex items-center gap-[12px] cursor-pointer relative"
                }`}
              >
                {/* <img className="h-4 w-4" src={exitLogo} /> */}
                <IoReload />
                <p
                  className="m-0 text-xs"
                  onClick={() => dispatch(setTutorial())}
                >
                  Restart Tutorial
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {firstDraftDialog ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "3",
            overflow: "auto",
          }}
        >
          {/* {firstDraftLoading ? (
            <div
              className="border-2 border-white rounded-lg w-1/6 h-fit p-2 flex flex-row justify-center items-center"
              style={{
                background: "linear-gradient(to right,#0e1118,#008080)",
              }}
            >
              <img className="h-40 w-40 my-10" src={loader} alt="loader" />
            </div>
          ) : ( */}
          <div
            className="h-[95%] w-2/3 flex flex-col rounded-md border-2 border-white"
            style={{
              background: "linear-gradient(to right,#0e1118,#008080)",
            }}
          >
            <div className="flex justify-end p-2">
              {/* <svg
                onClick={() => {
                  setFirstDraftDialog(false);
                }}
                style={{ margin: "20px", cursor: "pointer" }}
                width="30"
                height="30"
                fill="white"
                stroke="white"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  fill-rule="nonzero"
                />
              </svg> */}
              <Close
                className="cursor-pointer"
                onClick={() => {
                  setFirstDraftDialog(false);
                }}
              />
            </div>
            <div className="flex-1 m-0 h-[90%] flex flex-column justify-center items-center">
              <div className="flex h-full px-4 pb-3 flex-row justify-between items-center w-full gap-5">
                <div className="flex h-full  flex-col gap-2 justify-center w-full items-center">
                  {firstDraft !== "" ? (
                    <div className="flex flex-col w-full h-full rounded-md bg-white text-black overflow-y-auto">
                      <div className="w-full px-2 h-fit my-2 items-center flex flex-row ">
                        <p className="uppercase font-bold my-2 w-full ">
                          First Draft Preview
                        </p>
                        <div className="flex flex-row w-full items-center">
                          <div className="h-1 bg-neutral-900 w-2/3" />
                          <div className="bg-neutral-900 rounded-md">
                            <img
                              className="w-[5vw] h-[29px]"
                              src={logo}
                              alt="logo"
                            />
                          </div>
                        </div>
                      </div>
                      <textarea
                        className="w-full h-full p-2.5 mb-4 text-black resize-none outline-none"
                        value={firstDraft}
                        onChange={(e) => setFirstDraft(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col w-full justify-center items-center rounded-md bg-white text-black h-full overflow-y-auto">
                      <img
                        className="h-40 w-40 my-10"
                        src={loader}
                        alt="loader"
                      />
                    </div>
                  )}
                  <div className="w-full flex justify-end">
                    <button
                      onClick={handleNextAppeal}
                      className="px-4 py-1 rounded border"
                    >
                      {nextAppealLoading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Next Appeal"
                      )}
                    </button>
                  </div>
                </div>
                <div className="h-full w-1 bg-neutral-200/40" />
                <div className="flex flex-col justify-center h-full w-full gap-4 ">
                  {showRelevantLaws ? (
                    <div className="h-full overflow-auto border-2 border-white rounded bg-white text-black p-2">
                      {relevantCaseLoading ? (
                        <div className="flex justify-center h-full items-center">
                          <img
                            className="h-40 w-40 my-10"
                            src={loader}
                            alt="loader"
                          />
                        </div>
                      ) : (
                        <p
                          className="h-[60vh]"
                          dangerouslySetInnerHTML={{
                            __html: relevantLawsArr,
                          }}
                        />
                        // {relevantLawsArr}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col w-full gap-2">
                      <img className="" src={clawLogo} alt="logo" />
                      <h3 className=" text-center">Draft Preview</h3>
                    </div>
                  )}
                  {showRelevantLaws && !relevantCaseLoading && (
                    <div className="w-full flex justify-end">
                      <Link to={"/courtroom-ai/caseLaws"}>
                        <button
                          onClick={() => {
                            dispatch(removeCaseLaws());
                            dispatch(
                              retrieveCaseLaws({
                                query: relevantLawData,
                                token: currentUser.token,
                              })
                            );
                            setFirstDraftDialog(false);
                          }}
                          className="bg-[#003131] px-4 py-1 text-sm rounded text-white"
                        >
                          View Case Laws
                        </button>
                      </Link>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 relative">
                    {showRelevantLaws ? (
                      <motion.button
                        disabled={!relevantLawsArr}
                        className="border border-white rounded-md py-1"
                        onClick={() => setShowRelevantLaws(false)}
                      >
                        Go Back
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => {
                          setShowRelevantLaws(true);
                          getReventCaseLaw();
                        }}
                        className="border border-white rounded-md py-1"
                      >
                        Relevant Case Laws
                      </motion.button>
                    )}
                    <button
                      onClick={() => dowloadFirstDraft()}
                      className="border border-white rounded-md py-1"
                    >
                      <Download /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      ) : null}
      {editDialog ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "3",
            overflow: "auto",
          }}
        >
          <div
            className="h-[90%] w-2/3 rounded-md border-2 border-white relative"
            style={{
              background: "linear-gradient(to right,#0e1118,#008080)",
            }}
          >
            <div className="flex justify-end absolute right-0">
              <svg
                onClick={() => setEditDialog(false)}
                style={{ margin: "20px", cursor: "pointer" }}
                width="30"
                height="30"
                fill="white"
                stroke="white"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
            {/* <div className="m-0 flex flex-column justify-center items-center"> */}
            <div className="grid grid-cols-2  px-4 py-3 justify-between items-center w-full h-full gap-5">
              <div className="flex flex-row justify-center w-full h-full items-center">
                <div
                  className={`${
                    isEditing ? "border-4  border-teal-400" : "border-none"
                  } rounded-md delay-150 flex flex-col w-[30rem] bg-white text-black h-full overflow-y-auto`}
                >
                  <div className="w-full px-2 h-fit my-2 items-center flex flex-row ">
                    <p className="uppercase font-bold my-2 w-full ">
                      Edit Your Document
                    </p>
                    <div className="flex flex-row w-full items-center">
                      <div className="h-1 bg-neutral-900 w-2/3" />
                      <div className="bg-neutral-900 rounded-md">
                        <img
                          className="w-[5vw] h-[29px]"
                          src={logo}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="w-full h-full p-2.5 mb-4 text-black resize-none outline-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              {/* <div className="h-5/6 w-1 bg-neutral-200/40" /> */}
              <div className="flex flex-col justify-between py-20  w-full gap-4 ">
                <div className="flex flex-col w-full gap-4">
                  <img className="" src={clawLogo} alt="logo" />
                  <h1 className="uppercase text-center font-bold text-4xl">
                    {" "}
                    Edit Your Document
                  </h1>
                </div>
                <div className="flex flex-col w-full  justify-between">
                  <div className="flex flex-col w-full justify-center items-center gap-4">
                    <div className="flex flex-row justify-center gap-2 w-full">
                      {isEditing ? (
                        <Button
                          className="lowercase border-2 text-sm border-white text-white"
                          variant="outlined"
                          onClick={handleSave} // Modify if needed
                        >
                          Save Changes
                        </Button>
                      ) : (
                        <Button
                          className="text-white text-sm border-2 border-white"
                          variant="outlined"
                          onClick={handleEditToggle}
                        >
                          Edit current document
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : null}
      {showAssistant ? (
        <div
          // md:left-[28rem] md:top-32
          // bg-[#eeeeee]

          className="absolute flex  h-screen items-center left-1/4 overflow-auto z-10
              "
        >
          <div className="bg-[#eeeeee] border-8 border-white rounded-xl shadow-inner">
            <div className="flex justify-between gap-14 items-center shadow-md">
              <div className="flex items-center">
                <img alt="logo" className="h-20 w-20" src={assistantLogo} />
                <h1 className="m-0 text-2xl font-semibold text-[#008080]">
                  CLAW AI Assistant
                </h1>
              </div>
              <div className="pr-5">
                <svg
                  onClick={() => setShowAssistant(false)}
                  width="35"
                  height="35"
                  fill="#008080"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z"
                    fill-rule="nonzero"
                  />
                </svg>
              </div>
            </div>
            {aiAssistantLoading ? (
              <div className="flex justify-center items-center p-[5em]">
                <img
                  className="h-32 w-32"
                  alt="loader"
                  src={aiAssistantLoader}
                />
              </div>
            ) : (
              <div className="m-4">
                <textarea
                  readOnly
                  className="w-full h-[350px] p-2 bg-transparent text-black focus:outline-none cursor-default"
                  value={AiQuestions}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {showAskLegalGPT ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "3",
            overflow: "auto",
          }}
        >
          {promptArr.length === 0 ? (
            <div className="h-screen flex flex-col justify-between border-2 border-white rounded w-2/4 bg-[#222222]">
              <div
                className="flex justify-end p-3 cursor-pointer"
                onClick={() => {
                  setShowAskLegalGPT(false);
                  setPromptArr([]);
                }}
              >
                <svg
                  className="w-7 h-7"
                  fill="white"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                    fill-rule="nonzero"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <h4>Have A Query?</h4>
                <h1 className="font-bold">
                  Ask {"  "}
                  <span
                    style={{
                      padding: 3,
                      borderLeft: `4px solid #00FFA3`,
                      background: `linear-gradient(to right, rgba(0,128,128,0.75), rgba(0,128,128,0) 100%)`,
                    }}
                  >
                    LegalGPT
                  </span>
                </h1>
                <p className="px-[70px] text-center">
                  Drop your queries here and let LegalGPT assist you with all
                  your questions and queries
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchQuery(true);
                  getLegalGptResponse();
                  setPromptArr([
                    ...promptArr,
                    {
                      prompt: askLegalGptPrompt,
                      promptResponse: null,
                    },
                  ]);
                  setAskLegalGptPrompt("");
                }}
                className="flex gap-2 p-3"
              >
                <input
                  className="flex-1 p-2 rounded text-black"
                  placeholder="Enter Your Query Here..."
                  value={askLegalGptPrompt}
                  onChange={(e) => setAskLegalGptPrompt(e.target.value)}
                />
                <motion.button
                  type="submit"
                  disabled={askLegalGptPrompt === ""}
                  whileTap={{ scale: "0.95" }}
                >
                  {/* <img className="w-9 h-9" src={sendIcon} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M22 12l-20 12 5-12-5-12z" />
                  </svg>
                </motion.button>
              </form>
            </div>
          ) : (
            <div className="h-screen flex flex-col border-2 border-white rounded w-2/4 bg-[#222222] justify-between">
              <div className="flex justify-between">
                <div className="flex gap-2 py-3 px-4">
                  <h3 className="text-xl text-[#00FFA3]">LegalGPT</h3>
                  <p className="text-xs">by Claw</p>
                </div>

                <div
                  className="flex justify-end p-3 cursor-pointer"
                  onClick={() => {
                    setShowAskLegalGPT(false);
                    setPromptArr([]);
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="white"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex-1 px-4 h-full flex flex-col overflow-auto"
              >
                <div className="">
                  {promptArr.length > 0 &&
                    promptArr.map((x, index) => (
                      <div
                        className="flex flex-col"
                        style={{
                          alignSelf: x.prompt ? "flex-start" : "flex-end",
                        }}
                        key={index}
                      >
                        <div className="flex gap-3">
                          {/* <svg
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                            </svg> */}
                          {/* <p className="bg-[#D9D9D9]  text-black p-2 text-sm rounded-t-xl rounded-r-xl max-w-[75%]"> */}
                          <div className="w-full flex justify-end">
                            <div className="w-5/6 flex justify-end">
                              <p className=" bg-[#D9D9D9] p-2 text-sm text-black rounded-t-xl rounded-l-xl">
                                {x.prompt}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-start">
                          <div className="w-5/6 flex justify-start">
                            {x.promptResponse ? (
                              <p className=" bg-[#00C37B] p-2 text-sm text-black rounded-t-xl rounded-r-xl">
                                <Markdown>{x.promptResponse}</Markdown>
                              </p>
                            ) : (
                              <div className="bg-[#00C37B] p-2 text-sm text-black rounded-t-xl rounded-r-xl flex flex-col justify-end gap-1 w-14 mb-2">
                                <div className="w-full h-1 bg-slate-600 animate-pulse  rounded-full"></div>
                                <div className="w-[60%] h-1 bg-slate-600 animate-pulse  rounded-full"></div>
                                <div className="w-[40%] h-1 bg-slate-600 animate-pulse  rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchQuery(true);
                  getLegalGptResponse();
                  setPromptArr([
                    ...promptArr,
                    {
                      prompt: askLegalGptPrompt,
                      promptResponse: null,
                    },
                  ]);
                  setAskLegalGptPrompt("");
                }}
                className="px-4 flex gap-2 py-3 items-center"
              >
                <input
                  required
                  className="flex-1 p-2 rounded text-black"
                  placeholder="Enter Your Query Here..."
                  value={askLegalGptPrompt}
                  onChange={(e) => setAskLegalGptPrompt(e.target.value)}
                />
                <motion.button
                  type="submit"
                  disabled={askLegalGptPrompt === ""}
                  whileTap={{ scale: "0.95" }}
                >
                  {/* <img className="w-9 h-9" src={sendIcon} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M22 12l-20 12 5-12-5-12z" />
                  </svg>
                </motion.button>
              </form>
            </div>
          )}
        </div>
      ) : null}
      {downloadHistoryPrompt ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          <div
            className="flex flex-col justify-center gap-20 p-5"
            style={{
              background: "linear-gradient(to right,#0e1118,#008080)",
              height: "450px",
              width: "900px",
              border: "2px solid white",
              borderRadius: "10px",
            }}
          >
            <div className="flex justify-end">
              <svg
                onClick={() => setDownloadHistoryPrompt(false)}
                className="w-7 h-7 cursor-pointer"
                clip-rule="evenodd"
                fill-rule="evenodd"
                fill="white"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M14 10h5l-7 8-7-8h5v-10h4v10zm4.213-8.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z" />
              </svg>
              <h1 className="text-3xl">
                Your Session History is Ready to Download
              </h1>
            </div>
            <div className="flex justify-center">
              <PDFDownloadButton sessionHistoryText={sessionHistoryText} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {showDrafterQuestions ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "50",
          }}
        >
          <div className="w-2/5 h-[90%] bg-[#D9D9D9] rounded p-3">
            <div className="flex  flex-row justify-between items-start w-full">
              <div className="flex  flex-col justify-center items-start">
                <h1 className="px-2 text-xl font-semibold text-teal-700 text-left">
                  AI Drafter
                </h1>
              </div>
              <div
                className="cursor-pointer text-black"
                onClick={() => setShowDrafterQuestions(false)}
              >
                <Close />
              </div>
            </div>
            <div className="h-[90%] flex overflow-auto items-center justify-center py-3 ">
              <div className="h-[90%] w-full">
                {drafterQuestions.map((x, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-3 items-center m-1"
                  >
                    <p className="flex-1 text-black text-sm m-0 bg-[#00808034] px-3 py-2 rounded-md">
                      {x.name}
                    </p>
                    <Link to={"/courtroom-ai/aiDraft"}>
                      <button
                        onClick={() => handleDrafterQuestions(x.value)}
                        className="py-2 px-4 bg-[#008080] rounded-md text-sm text-white"
                      >
                        Create
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {caseSearchDialog && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "10",
          }}
        >
          <main className="w-2/4 p-3 flex flex-col justify-center items-center bg-white rounded">
            <>
              {/* //header */}
              <section className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-lg font-semibold text-teal-700 text-left">
                    Case Search
                  </h1>
                  <h3 className="text-xs font-light text-neutral-600">
                    Enter prompt to search for cases
                  </h3>
                </div>
                <div className="cursor-pointer text-teal-800">
                  <Close
                    onClick={() => {
                      setCaseSearchDialog(false);
                      setCaseSearchPrompt("");
                    }}
                  />
                </div>
              </section>
              {/* header ends */}
              {!caseSearchLoading ? (
                <>
                  <section className="w-full">
                    <textarea
                      required
                      value={caseSearchPrompt}
                      onChange={(e) => setCaseSearchPrompt(e.target.value)}
                      placeholder="Enter your search details here..."
                      rows={12}
                      className="w-full resize-none bg-[#00808030] text-black rounded-md p-2"
                    />
                  </section>

                  <section className="flex space-x-5 flex-row w-full items-center justify-end">
                    <button
                      onClick={() => handleCaseSearchPrompt()}
                      className="bg-teal-800 cursor-pointer py-1 px-3 rounded"
                    >
                      Search
                    </button>
                  </section>
                </>
              ) : (
                <section className="w-full flex items-center justify-center p-20">
                  <img className="w-48 h-48" src={evidenceLoad} alt="loading" />
                </section>
              )}
            </>
          </main>
        </div>
      )}
      {appealDialog && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            left: "0",
            right: "0",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "10",
          }}
        >
          <div className="w-1/2 h-[90%] overflow-auto bg-white text-black p-3 rounded">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Next Appeal</p>
              <Close
                className="cursor-pointer"
                onClick={() => {
                  setAppealDialog(false);
                  setAppealData("");
                }}
              />
            </div>
            <div>
              <p>
                <Markdown>{appealData}</Markdown>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiSidebar;

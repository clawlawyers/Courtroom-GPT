import React, { useEffect, useRef, useState } from "react";
import aiJudge from "../../assets/images/aiJudge.png";
import aiLawyer from "../../assets/images/aiLawyer.png";
import userIcon from "../../assets/images/userArgument.png";
import Styles from "./CourtroomArgument.module.css";
import markdownit from "markdown-it";
import Select, { components } from "react-select";

import { motion } from "framer-motion";
import { Close, Co2Sharp, ResetTvSharp, Send } from "@mui/icons-material";
import {
  Button,
  Menu,
  Modal,
  StyledEngineProvider,
  Tooltip,
} from "@mui/material";
import { MenuItem, IconButton } from "@mui/material";
import loader from "../../assets/images/argumentLoading.gif";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import EvidenceDialog from "../../components/Dialogs/EvidenceDialog";
import { MoreVert } from "@mui/icons-material";
import voiceIcon from "../../assets/images/voice.png";
import VoiceSearch from "./VoiceSearch/VoiceSearch";
import expand from "../../assets/images/expand.png";
import collapse from "../../assets/images/collapse.png";
import {
  removeCaseLaws,
  removeRelevantCaseLaws,
  retrieveCaseLaws,
  setRelevantCaseLaws,
} from "../../features/laws/lawSlice";
import {
  setFightingSideModal,
  setFirstDraftAction,
  setFirstDraftLoading,
} from "../../features/bookCourtRoom/LoginReducreSlice";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { setTutorialFalse } from "../../features/popup/popupSlice";
import { setmaintut, setTutorial } from "../../features/sidebar/sidebarSlice";
import TipsComponent from "../../components/UploadDoc/TipsComponent";
const CourtroomArgument = () => {
  //
  useEffect(() => {
    console.log("hiasd");
    // driverObj.drive()
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fightingModal = useSelector((state) => state.user.fightingSideModal);
  const tutorial = useSelector((state) => state.popup.tutorial);
  const mainTut = useSelector((state) => state.sidebar.mainTut);
  const driveUpload = useSelector((state) => state.sidebar.driveUpload);
  const { Verdict, RelevantCaseLaws, caseSearch } = useSelector(
    (state) => state.user.user.plan.plan.features
  );

  const options = [
    { value: "english", label: "English" },
    // { value: 'hindi', label: 'Hindi' },
    // { value: 'gujrati', label: 'Gujrati' },
  ];

  useEffect(() => {
    console.log("hiasasdd");
    if (tutorial) {
      console.log("adsd");
      var driverObj = driver({
        showProgress: true,
        steps: [
          // {
          //   element: "#side-selection",
          //   popover: {
          //     title: "Ai judgde",
          //     description:
          //       "This will show ai judge response to an argument  ",
          //     side: "left",
          //     align: "start",
          //   },
          // },
          {
            element: "#aijudge",
            popover: {
              title: "AI Judge",
              description:
                "This will show AI Judge response to an argument from both sides  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#ailawyer",
            popover: {
              title: "AI Lawyer",
              description:
                "This will show the response of the AI Lawyer of the opposing counsel",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#expand",
            popover: {
              title: "Expand",
              description:
                "Click this button to Expand response for better view   ",
              side: "left",

              align: "start",
              onNextClick: () => {
                console.log(myDivRef.current);
                setAnchorElmenu(myDivRef.current);
                driverObj.moveNext();
              },
            },
          },
          {
            element: "#swaplawyer",
            popover: {
              title: "Change Side",
              description:
                "Click this button to change the side you are representing",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#time-left",
            popover: {
              title: "Time Remaning ",
              description: "It shows amount of Time Remaining for the Session ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#relevant-case-menu",
            popover: {
              title: "Additional Features",
              description: "Click this button to open Menu  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#relevantcase-button",
            popover: {
              title: "Relevant Case Laws",
              description: "Click this button to show Relevant Cases  ",
              side: "left",
              align: "start",
              onNextClick: () => {
                setAnchorElmenu(null);
                driverObj.moveNext();
              },
            },
          },
          {
            element: "#evidence-menu",
            popover: {
              title: "Menu",
              description: "Click this button to open Document Menu  ",
              side: "left",
              align: "start",
              onNextClick: () => {
                document.getElementById("evidence-menu").click();
                driverObj.moveNext();
              },
            },
          },
          {
            element: "#edit_doc",
            popover: {
              title: "Edit Documnet",
              description: "Click this button to edit the Case File",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#evidence-button",
            popover: {
              title: "Add Evidence",
              description:
                "Add details about your evidence or upload our evidence to see if it will be appreciated by the court and to what extent.  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#evidence-testimony",
            popover: {
              title: "Add Testimony",
              description:
                "Add details about the situation your testimony was in or how it is supposed to be related to your case and get relevant cross examination questions for your testimony.",
              side: "left",
              align: "start",
              onNextClick: () => {
                document.getElementById("long-menu").click();
                driverObj.moveNext();
              },
            },
          },

          {
            element: "#first-draft",
            popover: {
              title: "First Draft",
              description:
                "Get a list of arguments for your case to begin with ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#Ai-Drafter",
            popover: {
              title: "Document Drafter",
              description:
                " Directly draft and edit agreements and applications ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#legalGpt",
            popover: {
              title: "Legal Gpt",
              description:
                "Click this button to open Legal GPT popup to ask law releated queries ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#case-search",
            popover: {
              title: "Case Search",
              description:
                "Click this button to open a popup to search older case files related to your use case  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#claw-ai-ass",
            popover: {
              title: "Case AI Assistant",
              description:
                " Details on judge questions for your case and the things that you missed in your case while doing your research ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#download-session",
            popover: {
              title: "Download Session",
              description:
                "Click this button to download the entire Session Histroy in pdf form ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#download-case",
            popover: {
              title: "Download Case",
              description:
                "Click this button to download the Entire Case Histroy in pdf form ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#NewCaseInput",
            popover: {
              title: "New Case",
              description: "Click this button to open a New Case File ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#userinput",
            popover: {
              title: "Enter Argument",
              description:
                "Enter your Arguments here. You can use both text and voice input  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#rest-your-case",
            popover: {
              title: "Rest Your Casr",
              description:
                "Rest your case for the final veridct form the AI Judge   ",
              side: "left",
              align: "start",
            },
          },
        ],
      });
      driverObj.drive();
      dispatch(setTutorialFalse());
    }
  }, [tutorial]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [relevantCases, setRelevantCases] = useState("");
  const [relevantLawData, setRelevantLawData] = useState([]);
  const [showRelevantCaseJudge, setRelevantCaseJudge] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [lawyerArgument, setLawyerArgument] = useState("");
  const [userArgument, setUserArgument] = useState([]);
  // console.log(userArgument);
  const [judgeArgument, setJudgeArgument] = useState("");
  const [selectedUserArgument, setSelectedUserArgument] = useState(null);
  const [selectedUserArgumentContent, setSelectedUserArgumentContent] =
    useState(null);
  const [aiJudgeLoading, setAiJudgeLoading] = useState(false);
  const [aiLawyerLoading, setAiLawyerLoading] = useState(false);
  const [addArgumentInputText, setAddArgumentInputText] = useState(null);
  const [potentialObjections, setPotentialObjections] = useState("");
  const [objectionIndex, setObjectionIndex] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElmenu, setAnchorElmenu] = useState(null);
  const [loadingRelevantCases, setLoadingRelevantCases] = useState(false);
  const [voiceSearchInitiate, setVoiceSearchInitiate] = useState(false);
  const [judgeViewExpand, setJudgeViewExpand] = useState(false);
  const [lawyerViewExpand, setLawyerViewExpand] = useState(false);
  const [fightType, setFightType] = useState("");
  const [otherFightType, setOtherFightType] = useState("");
  const [language, setLanguage] = useState("");
  const [addArgumentLoader, setAddArgumentLoader] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(addArgumentLoader, " Loading");

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentUser = useSelector((state) => state.user.user);
  const sidebarTut = useSelector((state) => state.sidebar.sidebarTut);
  const lastItemRef = useRef(null);
  const editItemRef = useRef(null);

  const dialogRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      closeDialog();
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  const handleEdit = (e, index) => {
    e.stopPropagation();
    setEditIndex(index);
    setEditValue(userArgument[index]);
  };

  const handleEditArgumentText = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = async (index) => {
    if (userArgument[index] === editValue) {
      console.log("No change in argument");
      setEditIndex(null);
      setEditValue("");
      return;
    }
    const updatedArguments = [...userArgument];
    updatedArguments[index] = editValue;
    setUserArgument(updatedArguments);
    setEditIndex(null);

    const inserUserArgument = await axios.post(
      `${NODE_API_ENDPOINT}/courtroomPricing/user_arguemnt`,
      {
        // user_id: currentUser.userId,
        argument: editValue,
        argument_index: index,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    setEditValue("");

    await GenerateDetails(index);
  };

  const handleSwap = async () => {
    try {
      const swapedData = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/change_states`,
        {
          // user_id: currentUser.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log(swapedData);
      const newUserArgument = swapedData.data.data.changeState.argument; // in array format
      const newLawyerArgument =
        swapedData.data.data.changeState.counter_argument; // in array format
      console.log(newUserArgument, newLawyerArgument);

      if (selectedUserArgument !== null) {
        //swap user arguments a/c to selected index
        const userArguments = [...userArgument];
        userArguments[selectedUserArgument] =
          newUserArgument[selectedUserArgument];

        //swap lawyer argument a/c to selected index
        const swapLawyerArgument = newLawyerArgument[selectedUserArgument];

        setUserArgument(userArguments);
        setLawyerArgument(swapLawyerArgument);
      } else {
        // const swapArgument = newUserArgument[newUserArgument.length - 1];
        // const updatedArguments = [...userArgument];
        // updatedArguments[updatedArguments.length - 1] = swapArgument;
        setUserArgument(newUserArgument);

        const swapLawyerArgument =
          newLawyerArgument[newLawyerArgument.length - 1];
        setLawyerArgument(swapLawyerArgument);
      }
      setSelectedUserArgument(null);
      setSelectedUserArgumentContent(null);
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      console.error(error);
      toast.error("Error in saving the argument");
    }
  };

  const RetieveDetails = async (index) => {
    try {
      setAiLawyerLoading(true);
      const laywerArgument1 = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/lawyer`,
        {
          // user_id: currentUser.userId,
          action: "Retrieve",
          argument_index: index,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const laywerArgument =
        laywerArgument1.data.data.lawyerArguemnt.counter_argument;
      const objection =
        laywerArgument1.data.data.lawyerArguemnt.potential_objection;
      setLawyerArgument(laywerArgument);
      setPotentialObjections(objection);
      setAiLawyerLoading(false);

      setAiJudgeLoading(true);

      let judgeArgument = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/judge`,
        {
          // user_id: currentUser.userId,
          action: "Retrieve",
          argument_index: index,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      judgeArgument = judgeArgument.data.data.judgeArguemnt.judgement;
      setJudgeArgument(judgeArgument);

      setAiJudgeLoading(false);
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      console.log(error);
      toast.error("Error in retrieving the argument");
    }
  };

  const handleArgumentSelect = async (index, x) => {
    if (aiJudgeLoading || aiLawyerLoading || addArgumentLoader) {
      return;
    }
    setSelectedUserArgument(index);
    setSelectedUserArgumentContent(x);
    await RetieveDetails(index);
    // api call here
  };
  // const openDialog = (e) => {
  //   e.stopPropagation();
  //   setIsDialogOpen(true);
  // };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleVerdict = () => {
    //verdict api call

    navigate("/courtroom-ai/verdict");
  };

  const GenerateDetails = async (index) => {
    try {
      setAiLawyerLoading(true);

      const laywerArgument1 = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/lawyer`,
        {
          // user_id: currentUser.userId,
          action: "Generate",
          argument_index: index,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const laywerArgument =
        laywerArgument1.data.data.lawyerArguemnt.counter_argument;
      const objection =
        laywerArgument1.data.data.lawyerArguemnt.potential_objection;
      setLawyerArgument(laywerArgument);
      setPotentialObjections(objection);
      setAiLawyerLoading(false);

      setAiJudgeLoading(true);

      let judgeArgument = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/judge`,
        {
          // user_id: currentUser.userId,
          action: "Generate",
          argument_index: index,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      judgeArgument = judgeArgument.data.data.judgeArguemnt.judgement;
      setJudgeArgument(judgeArgument);
      setAiJudgeLoading(false);
      setAddArgumentInputText(null);

      await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/summary`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setAddArgumentLoader(false);
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      console.error(error);
      toast.error("Error in generating details");
    }
  };
  const myDivRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorElmenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElmenu(null);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAddArgument = async () => {
    if (addArgumentLoader) {
      toast.success("Generating Summary Wait...");
      return;
    }
    try {
      setUserArgument([...userArgument, addArgumentInputText]);
      //api calls here

      setAiJudgeLoading(true);
      setAiLawyerLoading(true);
      setAddArgumentLoader(true);
      // driverObj.destroy()
      // driverObj=null
      console.log(userArgument.length);
      if (userArgument.length == 0) {
        await sleep(2000);
        const driverObj1 = driver({
          showProgress: true,
          steps: [
            {
              element: ".arguments:nth-child(1)",
              popover: {
                title: "Argument",
                description: "Click on the Argument for more option  ",
                side: "left",
                align: "start",
                onNextClick: () => {
                  console.log("asdad");
                  handleArgumentSelect(0, userArgument[0]);

                  driverObj1.moveNext();
                },
              },
            },
            {
              element: ".arguments:nth-child(1)",
              popover: {
                title: "Edit and Objection",
                description:
                  "Click on red button to Show Objections and and the button beside to edit the Argument ",
                side: "left",
                align: "start",

                onNextClick: () => {
                  // .. remove element
                  console.log("asdasdasdasd");
                  dispatch(setTutorial());
                  console.log(sidebarTut);
                  driverObj1.destroy();
                },
              },
            },
          ],
        });
        driverObj1.drive();
      }

      const inserUserArgument = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/user_arguemnt`,
        {
          // user_id: currentUser.userId,
          argument: addArgumentInputText,
          argument_index: "NA",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      // console.log(inserUserArgument.data.data.argumentIndex.argument_index);

      setAiJudgeLoading(true);
      setAiLawyerLoading(true);

      await GenerateDetails(
        inserUserArgument.data.data.argumentIndex.argument_index
      );

      // console.log(laywerArgument, judgeArgument);

      setAiJudgeLoading(false);
      setAiLawyerLoading(false);

      //clear input text
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      console.error(error);
      toast.error("Error in adding argument");
    }
  };

  useEffect(() => {
    const getHistory = async () => {
      try {
        const history = await axios.get(
          `${NODE_API_ENDPOINT}/courtroomPricing/getHistory`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        // console.log(history);

        const bold = "\x1b[1m";
        const reset = "\x1b[0m";

        let textArr = [`${bold}Case Session History${reset} \n\n`];

        const arrays = {
          Arguments: history.data.data.caseHistory.argument,
          "Counter Arguments": history.data.data.caseHistory.counter_argument,
          Judgement: history.data.data.caseHistory.judgement,
          "Potential Objection":
            history.data.data.caseHistory.potential_objection,
        };

        const arrayNames = Object.keys(arrays);

        const maxLength = Math.max(
          ...arrayNames.map((name) => arrays[name].length)
        );

        for (let i = 0; i < maxLength; i++) {
          let elements = arrayNames.map((name) => {
            const arr = arrays[name];
            return arr[i] !== undefined
              ? `\n ${bold}${name}${reset}: \n ${arr[i]}`
              : `${bold}${name}${reset}: \n undefined`;
          });

          textArr.push(
            `${bold}Case ${i + 1}${reset} \n ${elements.join("\n")}`
          );
        }
        console.log(textArr.join(""));

        setUserArgument(history.data.data.caseHistory.argument);
        const lawyerArrLen =
          history.data.data.caseHistory.counter_argument.length;
        setLawyerArgument(
          history.data.data.caseHistory.counter_argument[lawyerArrLen - 1]
        );

        const judgeArrLen = history.data.data.caseHistory.judgement.length;
        setJudgeArgument(
          history.data.data.caseHistory.judgement[judgeArrLen - 1]
        );
      } catch (error) {
        if (error.response.data.error === "Please refresh the page") {
          console.log("working");
          toast.error(error.response.data.error);
          return;
        }
        console.error(error);
        toast.error("Error in fetching case history");
      }
    };

    if (currentUser.userId) {
      getHistory();
    }
  }, [currentUser.userId]);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    } else if (editItemRef.current) {
      editItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [userArgument]);

  useEffect(() => {
    if (editItemRef.current) {
      editItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [userArgument]);

  const handleshowcaseaijudge = async () => {
    setRelevantCaseJudge(true);
    setRelevantCases("");

    var data;
    if (anchorElmenu.id == "judge") {
      data = judgeArgument;
    } else if (anchorElmenu.id == "lawyer") {
      data = lawyerArgument;
    }
    console.log(data);
    setLoadingRelevantCases(true);

    try {
      const res = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/relevant_cases_judge_lawyer_updated`,
        {
          text_input: data,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(res);
      setRelevantLawData(res.data.data.relevantCases.metadata);
      var data = res.data.data.relevantCases.relevant_case_law
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "");
      // data = data.replace(/\\n/g, "<br/>");
      // data = data.replace(/\\n\\n/g, "<br/><br/>");
      // data = data.replace(/\\/g, " ");
      setRelevantCases(data);
      setLoadingRelevantCases(false);
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      console.log(error);
      toast.error("Error in generating");
    }
  };

  const tapAnimations = {
    true: { scale: 0.98 },
    false: {},
  };

  const handleFightingSide = async () => {
    // console.log(fightType);
    // console.log(otherFightType);

    let type;
    if (fightType === "others") {
      type = otherFightType;
    } else {
      type = fightType;
    }
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/setFavor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ favor: type }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error.error);
        if (error.error === "Please refresh the page") {
          throw new Error("Please refresh the page");
        }
        throw new Error("API request failed");
      }
      const data = await response.json();
      console.log(data);
      firstDraftApi();
      dispatch(setFightingSideModal(false));
      // driverObj1.destroy()
      var driverObj2 = driver({
        showProgress: true,
        steps: [
          // {
          //   element: "#side-selection",
          //   popover: {
          //     title: "Ai judgde",
          //     description:
          //       "This will show ai judge response to an argument  ",
          //     side: "left",
          //     align: "start",
          //   },
          // },
          {
            element: "#aijudge",
            popover: {
              title: "AI Judge",
              description:
                "This will show AI Judge response to an argument from both sides  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#ailawyer",
            popover: {
              title: "AI Lawyer",
              description:
                "This will show the response of the AI Lawyer of the opposing counsel",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#expand",
            popover: {
              title: "Expand",
              description:
                "Click this button to Expand response for better view   ",
              side: "left",

              align: "start",
              onNextClick: () => {
                console.log(myDivRef.current);
                setAnchorElmenu(myDivRef.current);
                driverObj2.moveNext();
              },
            },
          },
          {
            element: "#swaplawyer",
            popover: {
              title: "Change Side",
              description:
                "Click this button to change the side you are representing",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#relevant-case-menu",
            popover: {
              title: "Additional Features",
              description: "Click this button to open Menu  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#relevantcase-button",
            popover: {
              title: "Relevant Case Laws",
              description: "Click this button to show Relevant Cases  ",
              side: "left",
              align: "start",
              onNextClick: () => {
                setAnchorElmenu(null);
                driverObj2.moveNext();
              },
            },
          },
          {
            element: "#time-left",
            popover: {
              title: "Time Remaning ",
              description: "It shows amount of Time Remaining for the Session ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#evidence-menu",
            popover: {
              title: "Menu",
              description: "Click this button to open Document Menu  ",
              side: "left",
              align: "start",
              onNextClick: () => {
                document.getElementById("evidence-menu").click();
                driverObj2.moveNext();
              },
            },
          },
          {
            element: "#edit_doc",
            popover: {
              title: "Edit Documnet",
              description: "Click this button to edit the Case File",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#evidence-button",
            popover: {
              title: "Add Evidence",
              description:
                "Add details about your evidence or upload our evidence to see if it will be appreciated by the court and to what extent.  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#evidence-testimony",
            popover: {
              title: "Add Testimony",
              description:
                "Add details about the situation your testimony was in or how it is supposed to be related to your case and get relevant cross examination questions for your testimony.",
              side: "left",
              align: "start",
              onNextClick: () => {
                document.getElementById("long-menu").click();

                driverObj2.moveNext();
              },
            },
          },

          {
            element: "#first-draft",
            popover: {
              title: "First Draft",
              description:
                "Get a list of arguments for your case to begin with ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#Ai-Drafter",
            popover: {
              title: "Document Drafter",
              description:
                " Directly draft and edit agreements and applications ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#legalGpt",
            popover: {
              title: "Legal Gpt",
              description:
                "Click this button to open Legal GPT popup to ask law releated queries ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#case-search",
            popover: {
              title: "Case Search",
              description:
                "Click this button to open a popup to search older case files related to your use case  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#claw-ai-ass",
            popover: {
              title: "Case AI Assistant",
              description:
                " Details on judge questions for your case and the things that you missed in your case while doing your research ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#download-session",
            popover: {
              title: "Download Session",
              description:
                "Click this button to download the entire Session Histroy in pdf form ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#download-case",
            popover: {
              title: "Download Case",
              description:
                "Click this button to download the Entire Case Histroy in pdf form ",
              side: "left",
              align: "start",
            },
          },

          {
            element: "#NewCaseInput",
            popover: {
              title: "New Case",
              description: "Click this button to open a New Case File ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#userinput",
            popover: {
              title: "Enter Argument",
              description:
                "Enter your Arguments here. You can use both text and voice input  ",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#rest-your-case",
            popover: {
              title: "Rest Your Casr",
              description:
                "Rest your case for the final veridct form the AI Judge   ",
              side: "left",
              align: "start",
            },
          },
        ],
      });
      // driverObj2.drive();
      if (!mainTut) {
        driverObj2.drive();
        dispatch(setmaintut());
      }
    } catch (error) {
      dispatch(setFightingSideModal(false));
      if (error.message === "Please refresh the page") {
        toast.error("Please refresh the page");
        return;
      }
      console.log(error);
    }
  };

  const firstDraftApi = async () => {
    // dispatch(setFirstDraftLoading());
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomPricing/api/draft`,
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
      dispatch(
        setFirstDraftAction({
          draft: response?.data?.data?.draft?.detailed_draft,
        })
      );
      // dispatch(setFirstDraftLoading());
    } catch (error) {
      if (error.response.data.error === "Please refresh the page") {
        console.log("working");
        toast.error(error.response.data.error);
        return;
      }
      toast.error("Error in getting first draft");
      // dispatch(setFirstDraftLoading());
    } finally {
      // setFirsDraftLoading(false);
      // setisApi(false);
    }
  };

  return (
    <div className="flex flex-col p-3 h-screen gap-2">
      {/* top container */}
      <div className="grid grid-cols-2 h-[35vh] gap-2">
        {/* top left Cont */}
        {aiJudgeLoading ? (
          <div
            className="bg-[#033E40] overflow-auto border border-black"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}>
            <img alt="laoding" src={loader} className="w-28 h-28" />
          </div>
        ) : (
          <div
            id="aijudge"
            className="flex flex-col bg-[#033E40] overflow-auto border border-black rounded-lg">
            <div className="flex justify-between">
              <div className="h-[5vh] p-[10px] flex gap-[10px] items-center">
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={aiJudge}
                  alt="judge-icon"
                />
                <h1 className="text-sm m-0">AI Judge</h1>
              </div>
              <div id="relevant-case-menu">
                <IconButton
                  sx={{ color: "white" }}
                  disabled={userArgument.length === 0}
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  id="judge"
                  onClick={handleMenuOpen}
                  ref={myDivRef}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorElmenu}
                  keepMounted
                  open={Boolean(anchorElmenu)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      marginRight: "16px", // Adjust this value for the desired gap
                    },
                  }}>
                  <Tooltip
                    title="Upgrade plan to use this feature"
                    disableHoverListener={RelevantCaseLaws}>
                    <div
                      id="relevantcase-button"
                      className="text-xs px-2 hover:cursor-pointer "
                      onClick={() => {
                        if (RelevantCaseLaws) {
                          handleshowcaseaijudge();
                          handleMenuClose();
                        }
                      }}>
                      View Relevant Case Laws
                    </div>
                  </Tooltip>
                </Menu>
              </div>
            </div>
            <div
              className="flex-1 overflow-auto"
              style={{
                margin: "15px",
                overflow: "hidden",
                overflowY: "scroll",
              }}>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "20px",
                  wordSpacing: "4px",
                  padding: "0px 10px",
                }}>
                <Markdown>{judgeArgument}</Markdown>
              </p>
            </div>
            <div
              id="expand"
              onClick={() => setJudgeViewExpand(true)}
              className="h-[5vh] flex  items-center cursor-pointer px-2">
              <img className="h-4 w-4" alt="expand" src={expand} />
              <h1 className="text-xs m-[5px]">Expand</h1>
            </div>
          </div>
        )}
        {/* top right cont */}
        {aiLawyerLoading ? (
          <div
            className="bg-[#033E40] overflow-auto border border-black"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}>
            <img alt="laoding" src={loader} className="w-28 h-28" />
          </div>
        ) : (
          <div
            id="ailawyer"
            className="flex flex-col bg-[#033E40] rounded-lg overflow-auto border border-black">
            <div className="flex justify-between">
              <div className="h-[5vh] p-[10px] flex gap-[10px] items-center">
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={aiLawyer}
                  alt="judge-icon"
                />
                <h1 className="text-sm m-0">AI Lawyer</h1>
              </div>
              <div>
                {" "}
                <IconButton
                  sx={{ color: "white" }}
                  disabled={userArgument.length === 0}
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  id="lawyer"
                  onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>
              </div>
            </div>
            <div
              className="flex-1 overflow-auto"
              style={{
                margin: "15px",
                overflow: "hidden",
                overflowY: "scroll",
              }}>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "20px",
                  wordSpacing: "4px",
                  padding: "0px 10px",
                }}>
                <Markdown>{lawyerArgument}</Markdown>
              </p>
            </div>
            <div className="h-[5vh] flex justify-between items-center cursor-pointer px-2">
              <div
                onClick={() => setLawyerViewExpand(true)}
                className="flex gap-1 items-center">
                <img className="h-4 w-4" alt="expand" src={expand} />
                <h1 className="text-xs m-[5px]">Expand</h1>
              </div>
              <motion.div
                id="swaplawyer"
                onClick={userArgument.length > 0 ? handleSwap : null}
                whileTap={
                  tapAnimations[userArgument.length > 0 ? "true" : "false"]
                }
                className="flex gap-1  rounded-lg items-center">
                <svg
                  width="20"
                  height="20"
                  stroke="white"
                  fill="white"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z"
                    fill-rule="nonzero"
                  />
                </svg>
                <h1 className="text-xs  m-[5px]">Swap with AI Lawyer</h1>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      {/* mid container */}
      <div
        className="flex-1  overflow-auto border border-black relative"
        style={{
          background: "#033E40",
          borderRadius: "10px",
        }}>
        <div className="flex flex-col ">
          <div className="p-3 flex gap-2 items-center">
            <img
              style={{ width: "20px", height: "20px" }}
              src={userIcon}
              alt="user-icon"
            />
            <h1 className="text-sm m-0">User Argument</h1>
          </div>
          <div className="flex-1 overflow-auto ">
            <div className="w-full flex flex-row-reverse pr-3 items-center   ">
              <div
                className=""
                style={{
                  width: "100%",
                  margin: "10px",
                  overflow: "hidden",
                  //overflow: "auto",
                }}>
                {userArgument.map((x, index) => (
                  <div
                    className={`arguments ${
                      addArgumentLoader || aiJudgeLoading || aiLawyerLoading
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => {
                      handleArgumentSelect(index, x);
                    }}
                    key={index}
                    ref={index === userArgument.length - 1 ? lastItemRef : null}
                    style={{
                      width: "99%",
                      display: "flex",

                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "space-between",
                      pointerEvents: "all",
                      border:
                        selectedUserArgument === index
                          ? "1px solid #00ffa3"
                          : "1px solid white",
                      borderRadius: "10px",
                      padding: "5px",
                      margin: "5px",
                      cursor: "pointer",
                    }}>
                    <div className="flex items-center w-full pointer-events-auto">
                      {editIndex === index ? (
                        <textarea
                          ref={index === editIndex ? editItemRef : null}
                          className="text-black"
                          style={{
                            margin: "0",
                            fontSize: "13px",
                            padding: "15px",
                            borderRadius: "10px",
                            width: "100%",
                            lineHeight: "20px",
                            wordSpacing: "4px",
                          }}
                          value={editValue}
                          onClick={(e) => e.stopPropagation()}
                          onChange={handleEditArgumentText}
                        />
                      ) : (
                        <p
                          style={{
                            margin: "0",
                            fontSize: "13px",
                            padding: "15px",
                            lineHeight: "20px",
                            width: "100%",
                            wordSpacing: "4px",
                          }}>
                          {x}
                        </p>
                      )}
                      {editIndex === index ? (
                        <motion.button
                          whileTap={{ scale: "0.95" }}
                          className="border-2 border-[#00ffa3] rounded-lg p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(index);
                          }}
                          style={{ margin: "5px" }}>
                          Save
                        </motion.button>
                      ) : (
                        <div
                          id="asdsads"
                          onClick={(e) =>
                            editIndex !== index && handleEdit(e, index)
                          }>
                          <motion.svg
                            whileTap={{ scale: "0.95" }}
                            style={{
                              cursor: "pointer",
                              width: "24px",
                              height: "24px",
                            }}
                            fill="white"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                              fill-rule="nonzero"
                            />
                          </motion.svg>
                        </div>
                      )}
                    </div>

                    {selectedUserArgument === index && (
                      <div className="flex items-center ">
                        <button
                          className="bg-red-500 text-white w-5 h-5  rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDialogOpen(true);
                            setObjectionIndex(index);
                            setAnchorEl(e.currentTarget);
                          }}
                          // onClick={handleClick}
                        ></button>

                        {isDialogOpen && index === objectionIndex && (
                          // <div
                          //   ref={dialogRef}
                          //   className="absolute flex items-center justify-end top-0 w-72  right-16 h-52 bg-white z-50 p-4 rounded shadow-lg"
                          // >
                          //   <button className="top-0 h-full overscroll-none overflow-y-auto scroll-smooth p-2 right-0 mt-2 mr-2 text-neutral-800 font-semibold text-sm text-left">
                          //     {aiLawyerLoading ? (
                          //       <p>Loading</p>
                          //     ) : (
                          //       <p className="">{potentialObjections}</p>
                          //     )}
                          //   </button>
                          // </div>
                          <Popover
                            sx={
                              {
                                // width: "450px",
                                // height: "250px",
                              }
                            }
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}>
                            {aiLawyerLoading ? (
                              <Typography sx={{ p: 3 }}>Loading</Typography>
                            ) : (
                              <Typography
                                sx={{ p: 3, width: "300px", height: "300px" }}>
                                {potentialObjections}
                              </Typography>
                            )}
                          </Popover>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom container */}
      <div className="w-full grid grid-cols-[65%_35%] items-center">
        <div className="pr-2 relative" id="userinput">
          <input
            value={addArgumentInputText !== null ? addArgumentInputText : ""}
            disabled={aiJudgeLoading || aiLawyerLoading}
            onChange={(e) => setAddArgumentInputText(e.target.value)}
            className="w-full text-black "
            style={{
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              padding: "10px",
              // width: "600px",
              cursor: "pointer",
            }}
            placeholder="Input Your Case Into The Courtroom"
          />
          <motion.img
            whileTap={{ scale: "0.95" }}
            onClick={() => {
              setVoiceSearchInitiate(true);
              setAddArgumentInputText(null);
            }}
            className="absolute right-4 top-2 cursor-pointer"
            src={voiceIcon}
            alt="voice.png"
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: "0.95" }}
            onClick={handleAddArgument}
            disabled={
              addArgumentInputText === null || aiJudgeLoading || aiLawyerLoading
            }
            className="flex-1 my-2 "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              padding: "10px",
              cursor: "pointer",
              color: "white",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#12bebe")} // Hover color
            onMouseLeave={(e) => (e.currentTarget.style.background = "#008080")} // Default color on leave
          >
            <h2 style={{ fontSize: "15px", margin: "0" }}>Add Argument</h2>
          </motion.button>

          <Tooltip
            title="Upgrade plan to use this feature"
            disableHoverListener={Verdict}>
            <motion.button
              id="rest-your-case"
              whileTap={{ scale: "0.95" }}
              onClick={Verdict ? handleVerdict : null}
              className="flex-1 my-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                border: "2px solid #00ffa3",
                borderRadius: "20px",
                background: "#008080",
                padding: "10px",
                cursor: "pointer",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0395a8")
              } // Hover color
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#008080")
              } // Default color on leave
            >
              <h2 style={{ fontSize: "15px", margin: "0" }}>Rest Your Case</h2>
            </motion.button>
          </Tooltip>
        </div>
      </div>
      {voiceSearchInitiate ? (
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
          }}>
          <VoiceSearch
            setVoiceSearchInitiate={setVoiceSearchInitiate}
            setAddArgumentInputText={setAddArgumentInputText}
          />
        </div>
      ) : (
        ""
      )}
      {showRelevantCaseJudge ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            // backgroundColor: "rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "50",
          }}>
          <div className="w-2/5 h-[90%] bg-white rounded p-3 border border-black">
            <div className="flex  flex-row justify-between items-start w-full">
              <div className="flex  flex-col justify-center items-start">
                <h1 className="px-10 text-xl font-semibold text-teal-700 text-left">
                  Relevant Cases Laws
                </h1>
              </div>
              <div
                className="cursor-pointer text-black"
                onClick={() => setRelevantCaseJudge(false)}>
                <Close />
              </div>
            </div>
            <div className="h-[90%] flex overflow-auto items-center justify-center px-10 py-3 ">
              {!loadingRelevantCases ? (
                <p
                  className="text-black text-sm h-[90%]"
                  dangerouslySetInnerHTML={{ __html: relevantCases }}></p>
              ) : (
                <div className="h-full flex flex-col justify-center items-center gap-4">
                  <img alt="loading" src={loader} className="w-28 h-28" />
                  <div className="w-[30rem] text-black h-16 text-center flex items-center justify-center">
                    <TipsComponent />
                  </div>
                </div>
              )}
            </div>
            {!loadingRelevantCases && (
              <div className="flex  justify-end  ">
                <Tooltip
                  title="Upgrade plan to use this feature"
                  disableHoverListener={caseSearch}>
                  <Link to={"/courtroom-ai/relevantCaseLaws"}>
                    <button
                      disabled={!caseSearch}
                      onClick={() => {
                        dispatch(removeRelevantCaseLaws());
                        dispatch(
                          setRelevantCaseLaws({
                            relevantLawData,
                          })
                        );
                      }}
                      className="bg-[#003131] mt-1 px-4 py-1 text-sm rounded text-white">
                      View Case Laws
                    </button>
                  </Link>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <Modal
        className="text-white flex justify-center items-center"
        open={judgeViewExpand}
        onClose={() => setJudgeViewExpand(false)}>
        <div className="w-2/4 h-[75%] flex flex-col bg-[#033E40] overflow-auto border border-white rounded-lg">
          <div className="flex justify-between">
            <div className="h-[5vh] p-[10px] flex gap-[10px] items-center">
              <img
                style={{ width: "20px", height: "20px" }}
                src={aiJudge}
                alt="judge-icon"
              />
              <h1 className="text-sm m-0">AI Judge</h1>
            </div>
            <div>
              <Tooltip
                title="Upgrade plan to use this feature"
                disableHoverListener={RelevantCaseLaws}>
                <IconButton
                  disabled={userArgument.length === 0}
                  sx={{ color: "white" }}
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  id="judge"
                  onClick={RelevantCaseLaws ? handleMenuOpen : null}>
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                id="long-menu"
                anchorEl={anchorElmenu}
                keepMounted
                open={Boolean(anchorElmenu)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                PaperProps={{
                  style: {
                    marginRight: "16px", // Adjust this value for the desired gap
                  },
                }}>
                <div
                  className="text-xs px-2 hover:cursor-pointer "
                  onClick={() => {
                    handleshowcaseaijudge();
                    handleMenuClose();
                    setJudgeViewExpand(false);
                  }}>
                  View Relevant Case Laws
                </div>
              </Menu>
            </div>
          </div>
          <div
            className="flex-1 overflow-auto"
            style={{
              margin: "15px",
              overflow: "hidden",
              overflowY: "scroll",
            }}>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                wordSpacing: "4px",
                padding: "0px 10px",
              }}>
              <Markdown>{judgeArgument}</Markdown>
            </p>
          </div>
          <div
            onClick={() => setJudgeViewExpand(false)}
            className="h-[5vh] flex  items-center cursor-pointer px-2">
            <img className="h-4 w-4" alt="expand" src={collapse} />
            <h1 className="text-xs m-[5px]">Collapse</h1>
          </div>
        </div>
      </Modal>
      <Modal
        className="text-white flex justify-center items-center"
        open={lawyerViewExpand}
        onClose={() => setLawyerViewExpand(false)}>
        <div className="w-2/4 h-[75%] flex flex-col bg-[#033E40] rounded-lg overflow-auto border border-white">
          <div className="flex justify-between">
            <div className="h-[5vh] p-[10px] flex gap-[10px] items-center">
              <img
                style={{ width: "20px", height: "20px" }}
                src={aiLawyer}
                alt="judge-icon"
              />
              <h1 className="text-sm m-0">AI Lawyer</h1>
            </div>
            <div>
              {" "}
              <Tooltip
                title="Upgrade plan to use this feature"
                disableHoverListener={RelevantCaseLaws}>
                <IconButton
                  disabled={userArgument.length === 0}
                  sx={{ color: "white" }}
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  id="lawyer"
                  onClick={RelevantCaseLaws ? handleMenuOpen : null}>
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                id="long-menu"
                anchorEl={anchorElmenu}
                keepMounted
                open={Boolean(anchorElmenu)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                PaperProps={{
                  style: {
                    marginRight: "16px", // Adjust this value for the desired gap
                  },
                }}>
                <div
                  className="text-xs px-2 hover:cursor-pointer "
                  onClick={() => {
                    handleshowcaseaijudge();
                    handleMenuClose();
                    setLawyerViewExpand(false);
                  }}>
                  View Relevant Case Laws
                </div>
              </Menu>
            </div>
          </div>
          <div
            className="flex-1 overflow-auto"
            style={{
              margin: "15px",
              overflow: "hidden",
              overflowY: "scroll",
            }}>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                wordSpacing: "4px",
                padding: "0px 10px",
              }}>
              <Markdown>{lawyerArgument}</Markdown>
            </p>
          </div>
          <div className="h-[5vh] flex justify-between items-center cursor-pointer px-2">
            <div
              onClick={() => setLawyerViewExpand(false)}
              className="flex gap-1 items-center">
              <img className="h-4 w-4" alt="expand" src={collapse} />
              <h1 className="text-xs m-[5px]">Collapse</h1>
            </div>
            <motion.div
              onClick={userArgument.length > 0 ? handleSwap : null}
              whileTap={
                tapAnimations[userArgument.length > 0 ? "true" : "false"]
              }
              className="flex gap-1 items-center">
              <svg
                width="20"
                height="20"
                stroke="white"
                fill="white"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z"
                  fill-rule="nonzero"
                />
              </svg>
              <h1 className="text-xs m-[5px]">Swap with AI Lawyer</h1>
            </motion.div>
          </div>
        </div>
      </Modal>
      {fightingModal && (
        <div
          style={{
            width: "100%",
            height: "100%",
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
          }}>
          <div
            className=" border-2 border-white rounded p-4 relative"
            style={{ background: "linear-gradient(90deg,#003838,#018585)" }}>
            {/* <div className="absolute w-full flex justify-end"> */}
            <Close
              className="cursor-pointer absolute right-2 top-1"
              onClick={() => {
                dispatch(setFightingSideModal(false));
              }}
            />
            {/* </div> */}
            <div id="side-selection" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="m-0 flex justify-center text-3xl font-bold text-[#00FFD1]">
                  Select Fighting Side
                </p>
                <p className="m-0 flex justify-center">
                  Please Specify from which side you're placing arguments
                </p>
              </div>
              <div className="flex justify-center gap-5">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="respondent"
                    checked={fightType === "respondent"}
                    onChange={(e) => setFightType(e.target.value)}
                    className="cursor-pointer"
                  />
                  <p className="m-0 text-white font-semibold text-xl">
                    Respondent
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="petitioner"
                    checked={fightType === "petitioner"}
                    onChange={(e) => setFightType(e.target.value)}
                    className="cursor-pointer"
                  />
                  <p className="m-0 text-white font-semibold text-xl">
                    Petitioner
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="others"
                    checked={fightType === "others"}
                    onChange={(e) => setFightType(e.target.value)}
                    className="cursor-pointer"
                  />
                  <p className="m-0 text-white font-semibold text-xl">Others</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 m-auto">
                {fightType === "others" ? (
                  <input
                    value={otherFightType}
                    onChange={(e) => setOtherFightType(e.target.value)}
                    className="p-2 rounded text-black"
                    placeholder="Enter Your Choice of Side..."
                  />
                ) : null}

                <button
                  // onClick={() => dispatch(setFightingSideModal(false))}
                  disabled={fightType === ""}
                  onClick={() => handleFightingSide()}
                  className="bg-[#003131] p-2 rounded hover:bg-opacity-80 cursor-pointer">
                  Confirm
                </button>
                <div>
                  <hr />
                  <p className="m-0 text-xs flex justify-center">
                    You Can Swap Side While Using Courtroom Using The SWAP WITH
                    AI LAWYER Feature{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtroomArgument;

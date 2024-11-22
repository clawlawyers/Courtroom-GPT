import { Close, Send } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import fileUpload from "../../assets/icons/fileUpload.svg";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useSelector } from "react-redux";
import evidenceLoad from "../../assets/images/evidenceLoad.gif";
import { Popover } from "@mui/material";
import Markdown from "react-markdown";
import axios from "axios";

const EvidenceDialog = ({ handleEvidenceClose }) => {
  const [evidence, setEvidence] = useState("");
  const [evidenceGenerated, setEvidenceGenerated] = useState(false);
  const [evidenceRelevance, setEvidenceRelevance] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  const handleChangeEvidence = (e) => {
    setEvidence(e.target.value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      handleFileSubmit();
    }
  }, [uploadedFiles]);

  const handleFileSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append(`file${index === 0 ? "" : index}`, file);
    });
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/courtroomFree/api/document_evidence`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = response.data;
      const evidenceData = data.data.evidence.Evidence_Relevance.replaceAll(
        "\\\\n\\\\n",
        "\n"
      )
        .replaceAll("\\\\n", "\n")
        .replaceAll("\\n\\n", "\n")
        .replaceAll("\\n", "\n")
        .replaceAll("\n", "\n")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "");
      setEvidenceRelevance(evidenceData);
      setLoading(false);

      toast.success("Evidence submitted successfully");
      setEvidenceGenerated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in submitting evidence", error);
      setUploadedFiles([]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Handle the submission of evidence and uploaded files
    console.log("Evidence:", evidence);
    // console.log("Uploaded Files:", uploadedFiles);
    try {
      const fetchData = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/evidence`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ action: "Generate", evidence_text: evidence }),
        }
      );

      if (!fetchData.ok) {
        throw new Error("API request failed");
      }

      const data = await fetchData.json();
      console.log("API response:", data);
      toast.success("Evidence submitted successfully");
      setEvidenceGenerated(true);
      const evidenceData =
        data.data.fetchedEvidence.Evidence_Relevance.replaceAll(
          "\\\\n\\\\n",
          "\n"
        )
          .replaceAll("\\\\n", "\n")
          .replaceAll("\\n\\n", "\n")
          .replaceAll("\\n", "\n")
          .replaceAll("\n", "\n")
          .replaceAll("\\", "")
          .replaceAll('"', "")
          .replaceAll(":", " :")
          .replaceAll("#", "");
      setEvidenceRelevance(evidenceData);
      setLoading(false);
      // handleEvidenceClose();

      // Clear the evidence and uploaded files
      // setEvidence("");
      // setUploadedFiles([]);

      // Reset the form
      // document.getElementById("evidence-form")?.reset();

      // Update the evidence list with the new evidence

      // Example: updateEvidenceList(data.evidence)
    } catch (error) {
      setLoading(false);
      console.error("Error in submitting evidence", error);
      toast.error("Error in submitting evidence", error);
    }
  };

  return (
    <main className="w-full p-2 flex flex-col justify-center items-center">
      {!evidenceGenerated && !loading ? (
        <>
          {/* //header */}
          <section className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-lg font-semibold text-teal-700 text-left">
                Add your Evidences
              </h1>
              <h3 className="text-xs font-light text-neutral-600">
                Add your evidence in textual form
              </h3>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleEvidenceClose();

                setUploadedFiles([]);
              }}
            >
              <Close />
            </div>
          </section>
          {/* header ends */}
          <section className="w-full">
            <textarea
              required
              value={evidence}
              onChange={handleChangeEvidence}
              placeholder="Add your Evidence"
              rows={12}
              className="w-full resize-none bg-[#00808030] text-black rounded-md p-2"
            />
          </section>

          <section className="flex space-x-5 flex-row w-full items-center justify-end">
            <label htmlFor="file-upload" className="cursor-pointer">
              <img src={fileUpload} alt="fileUploadIcon" />
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".docx, .pdf,.txt"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Send
              className="text-teal-800 cursor-pointer"
              onClick={handleSubmit}
            />
          </section>
        </>
      ) : (
        <>
          {!loading ? (
            <>
              <section className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-lg font-semibold text-teal-700 text-left">
                    Add your Evidences
                  </h1>
                </div>
                <div className="cursor-pointer" onClick={handleEvidenceClose}>
                  <Close />
                </div>
              </section>
              <section className="w-full">
                <textarea
                  required
                  readOnly
                  value={evidenceRelevance}
                  rows={12}
                  className="w-full resize-none bg-[#00808030] text-black rounded-md p-2"
                />
              </section>
            </>
          ) : (
            <>
              <section className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-lg font-semibold text-teal-700 text-left">
                    Evidence Analysis
                  </h1>
                </div>
                <div className="cursor-pointer" onClick={handleEvidenceClose}>
                  <Close />
                </div>
              </section>
              <section className="w-full flex items-center justify-center p-20">
                <img className="w-48 h-48" src={evidenceLoad} alt="loading" />
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default EvidenceDialog;

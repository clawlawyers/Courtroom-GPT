import React, { useState } from "react";
import "./NewFileUploadDialog.css";
import UploadIcon from "../../assets/icons/Upload.png";
import { Close } from "@mui/icons-material";
import { MenuItem, TextField } from "@mui/material";

const NewFileUploadDialog = ({ handleAddNewFileClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fileDialog, setFileDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleClose = () => {
    handleAddNewFileClose();
    setSelectedLanguage("");
    setUploadedFiles([]);
    setFileDialog(false);
  };

  return (
    <div>
      {!fileDialog ? (
        <div className="p-3 bg-[#C2FFFF] w-full border-4 border-[#018081]">
          <div className="flex w-full justify-between items-center gap-28">
            <p className="m-0 text-[#018081] text-lg font-semibold">
              Select Document Language
            </p>
            <Close
              sx={{ color: "#018081" }}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div>
            <TextField
              label="Choose a Language"
              select
              fullWidth
              margin="normal"
              size="small"
              value={selectedLanguage}
              onChange={handleChange}
            >
              {["English", "Hindi", "Marathi", "Gujarati"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="w-full flex justify-end">
            <button
              disabled={selectedLanguage === ""}
              onClick={() => setFileDialog(true)}
              className="rounded-lg px-4 py-2 text-white"
              style={{
                background: "linear-gradient(90deg,#018081,#001B1B)",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 flex flex-col items-center justify-center bg-[#C2FFFF] w-full border-4 border-[#018081]">
          <div className="flex w-full justify-between items-center gap-28 pb-2">
            <p className="m-0 text-[#018081] text-lg font-semibold">
              Upload Document
            </p>
            <Close
              sx={{ color: "#018081" }}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="file-upload-container">
            <input
              type="file"
              id="file-upload"
              className="file-input"
              multiple
              accept=".docx, .pdf,.txt"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <div className="flex w-full justify-center pb-2">
                <img className="rounded-none" src={UploadIcon} />
              </div>
              <span className="text-[#018081]">
                Click Here to Choose a File to Upload
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewFileUploadDialog;

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LanguageSelectionModal = ({ onClose, onSelectLanguage }) => {
  const [language, setLanguage] = React.useState("");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleConfirm = () => {
    onSelectLanguage(language);
  };

  return (
    <Dialog open onClose={onClose}>
      <div style={{ backgroundColor: "#E0F7F7", padding: "16px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DialogTitle style={{ flexGrow: 1, fontWeight: 600, fontSize: "24px", color: "#008080", padding: 0 }}>
            Select Document Language
          </DialogTitle>
          <IconButton onClick={onClose} style={{ color: "#008080" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Typography variant="body2" style={{ color: "#333333", marginBottom: "16px" }}>
            Select Language of the document that you wish to upload.
          </Typography>
          <Select
            fullWidth
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            style={{
              marginTop: "8px",
              backgroundColor: "#FFFFFF",
              border: "2px solid #008080",
              borderRadius: "4px",
            }}
          >
            <MenuItem value="" disabled>
              Select A Language
            </MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Hindi</MenuItem>
            <MenuItem value="French">Gujrati</MenuItem>
            <MenuItem value="German">Marathi</MenuItem>
          </Select>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
            <Button
              onClick={handleConfirm}
              variant="contained"
              style={{
                backgroundColor: "#008080",
                color: "#FFFFFF",
                fontWeight: "bold",
                width: "150px",
              }}
              disabled={!language}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </div>
      <div style={{ backgroundColor: "#E0F7F7", paddingBottom: "8px", textAlign: "center" }}>
        <hr style={{ border: "0.5px solid black", width: "80%", margin: "8px auto 4px" }} />
        <Typography variant="caption" style={{ color: "#666666" }}>
          Upload Documents of same language throughout a case for best results
        </Typography>
      </div>
    </Dialog>
  );
};

export default LanguageSelectionModal;

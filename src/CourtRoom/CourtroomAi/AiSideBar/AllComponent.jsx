import React, { useState } from "react";
import Dialog from "./Dialog";
import FirstDraftPreview from "./FirstDraftPreview";
import EditDialog from "./EditDialog";
import Assistant from "./Assistant";

const AllComponent = () => {
  const [firstDraftDialog, setFirstDraftDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <Dialog
        isVisible={firstDraftDialog}
        onClose={() => setFirstDraftDialog(false)}>
        <FirstDraftPreview
          firstDraft={"" /* Replace with your state */}
          loader={"loader.svg" /* Replace */}
          logo={"logo.svg" /* Replace */}
          reserachArgumentsLoading={false}
          nextAppealLoading={false}
          onResearchArguments={() => {}}
          onNextAppeal={() => {}}
          onDownload={() => {}}
        />
      </Dialog>
      <Dialog isVisible={editDialog} onClose={() => setEditDialog(false)}>
        <EditDialog
          text={text}
          setText={setText}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing((prev) => !prev)}
          onSave={() => console.log("Save changes")}
        />
      </Dialog>
      <Assistant
        isVisible={showAssistant}
        assistantLogo={"assistantLogo.svg"}
        isLoading={false}
        questions={"AI questions here"}
      />
    </div>
  );
};

export default AllComponent;

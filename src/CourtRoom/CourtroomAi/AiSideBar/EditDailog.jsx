const EditDialog = ({ text, setText, isEditing, onToggleEdit, onSave }) => (
  <div className="grid grid-cols-2 gap-5 px-4 py-3 justify-between items-center w-full h-full">
    <div className="flex justify-center w-full h-full">
      <div
        className={`${
          isEditing ? "border-4 border-teal-400" : ""
        } rounded-md flex flex-col w-[30rem] bg-white text-black h-full overflow-y-auto`}>
        <div className="flex items-center justify-between px-2 my-2">
          <p className="uppercase font-bold">Edit Your Document</p>
          <div className="flex items-center w-full">
            <div className="h-1 bg-neutral-900 w-2/3" />
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          readOnly={!isEditing}
          className="w-full h-full p-2.5 mb-4 text-black resize-none outline-none"
        />
      </div>
    </div>
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="uppercase font-bold text-center text-4xl">
        Edit Your Document
      </h1>
      <div>
        {isEditing ? (
          <Button variant="outlined" onClick={onSave} className="text-sm">
            Save Changes
          </Button>
        ) : (
          <Button variant="outlined" onClick={onToggleEdit} className="text-sm">
            Edit Document
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default EditDialog;

import CircularProgress from "@mui/material/CircularProgress";
import { Download } from "@mui/icons-material";

const FirstDraftPreview = ({
  firstDraft,
  loader,
  logo,
  reserachArgumentsLoading,
  nextAppealLoading,
  onResearchArguments,
  onNextAppeal,
  onDownload,
}) => (
  <div className="flex h-full w-full flex-col justify-center items-center gap-5">
    {firstDraft ? (
      <div className="flex flex-col w-full h-full rounded-md bg-white text-black overflow-y-auto">
        <div className="w-full px-2 h-fit my-2 items-center flex flex-row">
          <p className="uppercase font-bold w-full">First Draft Preview</p>
          <div className="flex items-center w-full">
            <div className="h-1 bg-neutral-900 w-2/3" />
            <img src={logo} alt="logo" className="w-[5vw] h-[29px]" />
          </div>
        </div>
        <textarea
          readOnly
          className="w-full h-full p-2.5 mb-4 text-black resize-none outline-none cursor-default"
          value={firstDraft}
        />
      </div>
    ) : (
      <div className="flex flex-col justify-center items-center bg-white text-black h-full rounded-md overflow-y-auto">
        <img src={loader} alt="loader" className="h-40 w-40 my-10" />
      </div>
    )}
    <div className="flex gap-2 justify-end w-full text-sm">
      <button
        onClick={onResearchArguments}
        className="px-4 py-2 rounded-md border hover:bg-teal-600 flex items-center justify-center min-w-[200px]">
        {reserachArgumentsLoading ? (
          <CircularProgress size={22} />
        ) : (
          "Research Arguments"
        )}
      </button>
      <button
        onClick={onNextAppeal}
        className="px-4 py-2 rounded-md border hover:bg-teal-500 flex items-center justify-center min-w-[200px]">
        {nextAppealLoading ? <CircularProgress size={22} /> : "Next Appeal"}
      </button>
    </div>
    <button
      onClick={onDownload}
      className="border border-white hover:bg-teal-500 rounded-md py-1">
      <Download /> Download
    </button>
  </div>
);

export default FirstDraftPreview;

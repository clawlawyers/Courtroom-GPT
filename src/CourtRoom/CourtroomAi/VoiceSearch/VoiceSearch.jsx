import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceSearch = ({ setVoiceSearchInitiate, setAddArgumentInputText }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [transcriptText, setTranscriptText] = useState("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="bg-slate-100 rounded py-4 px-6 text-black w-1/3 flex flex-col gap-4">
      {/* Close Button */}
      <div className="w-full flex justify-end">
        <svg
          onClick={() => setVoiceSearchInitiate(false)}
          className="w-7 cursor-pointer"
          fill="black"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
        </svg>
      </div>

      {/* Listening/Tap to Start Section */}
      <div className="flex items-center gap-3">
        {listening ? (
          <div className="flex items-center gap-3">
            <svg
              className="bg-teal-500 p-2 rounded-full shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300"
              onClick={SpeechRecognition.stopListening}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white">
              <path d="M12 20l-5 4h10l-5-4zm4-9c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7zm4-2v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2z" />
            </svg>
            <span className="text-teal-800 font-semibold text-lg">
              Listening...
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <svg
              className="bg-teal-900 p-2 rounded-full shadow-lg cursor-pointer hover:bg-teal-700 transition duration-300"
              onClick={SpeechRecognition.startListening}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white">
              <path d="M12 20l-5 4h10l-5-4zm0-18c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2m0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2z" />
            </svg>
            <span className="text-teal-900 font-semibold text-lg">
              Tap to Start
            </span>
          </div>
        )}
      </div>

      {/* Transcript Section */}
      <textarea
        readOnly
        className="py-2 px-3 w-full bg-teal-100 h-28 border border-black rounded"
        value={transcript}
        onChange={(e) => setTranscriptText(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        <button
          className="w-full text-teal-900 border-2 hover:bg-teal-900 hover:text-white cursor-pointer rounded border-teal-900 py-1"
          onClick={resetTranscript}>
          Reset Voice Typing
        </button>
        <button
          onClick={() => {
            setAddArgumentInputText(transcript);
            setVoiceSearchInitiate(false);
          }}
          className="w-full border-teal-900 bg-teal-900 hover:bg-teal-500 text-white cursor-pointer rounded border-2 py-1">
          Add To Argument
        </button>
      </div>
    </div>
  );
};

export default VoiceSearch;

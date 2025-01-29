import React, { useEffect, useState } from "react";

const videoArrDetails = [
  {
    type: "Experience the majestic warroom",
    typeArr: [
      {
        name: "AI Judge",
        details:
          "Delivers unbiased, multi-perspective evaluations, generates judgments, and predicts case precedents efficiently.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225853/LegalGPT/MAJESTIC%20WAR%20ROOM/wckffpa22khgslvgtbnf.mp4",
      },
      {
        name: "AI Lawyer",
        details:
          "Crafts compelling counterarguments using case facts, legal precedents and relevant case laws.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225853/LegalGPT/MAJESTIC%20WAR%20ROOM/dwo3kjxa6xadbftqkuip.mp4",
      },
      {
        name: "Objection",
        details:
          "Understand what Objections can be raised for a specific argument in real-time, enhancing your preparation.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733287179/LegalGPT/MAJESTIC%20WAR%20ROOM/naytx5dsjdxbbcln6but.mp4",
      },
      {
        name: "Verdict",
        details:
          "Generates accurate, well-structured verdicts based on arguments, evidence, and case law analysis.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225853/LegalGPT/MAJESTIC%20WAR%20ROOM/npjae4tsf0xixb10bgug.mp4",
      },
    ],
  },
  {
    type: "Unbeatable legal assistance",
    typeArr: [
      {
        name: "Case Search",
        details:
          "Instantly find and access case laws and precedents tailored to your case as well as legal queries in seconds.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225710/LegalGPT/UNBEATABLE%20LEGAL%20ASSISTANCE/o3yqn44wthf3divq7sfh.mp4",
      },
      {
        name: "LegalGPT",
        details:
          "Dive deep in research with our AI-powered tool, offering quick, accurate summaries and insights",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225710/LegalGPT/UNBEATABLE%20LEGAL%20ASSISTANCE/ftklh3imyzksowuz34x8.mp4",
      },
      {
        name: "AI Assistant",
        details:
          "Highlights grey areas, provides strategic insights, and streamlines your legal preparation",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225710/LegalGPT/UNBEATABLE%20LEGAL%20ASSISTANCE/dqz3buafkigzm9zfxof3.mp4",
      },
    ],
  },
  {
    type: "Best-in-class verification & validation",
    typeArr: [
      {
        name: "Evidence",
        details:
          "Evaluate and assess evidence validity to get insights on how it will play in the court.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225758/LegalGPT/VERIFICATION%20and%20VALIDATION/ybbhtqqdggcahobjioxb.mp4",
      },
      {
        name: "Testimony",
        details:
          "Get 3 sets of cross examination questions from the perspective of a petitioner, respondent and the judge",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225758/LegalGPT/VERIFICATION%20and%20VALIDATION/kuw4tlredthoudrtypg3.mp4",
      },
    ],
  },
  {
    type: "Highest efficiency features",
    typeArr: [
      {
        name: "First Draft",
        details:
          "Generate precise initial drafts of legal arguments with relevant case laws working as a foundation for your preparation, saving time and effort.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225962/LegalGPT/EFFICIENCY%20FEATURES/ryg2zqvpk5nzvvycwu8r.mp4",
      },
      {
        name: "Relevant Case Laws",
        details:
          "Quickly access case laws directly relevant to that specific argument with citations and the ability to read the full case document.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225962/LegalGPT/EFFICIENCY%20FEATURES/dqpp10iwjrqwmlbryuun.mp4",
      },
      {
        name: "AI Drafter",
        details:
          "Draft, edit, and customize legal documents needed for your case with AI precision and seamless efficiency with a single click",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733225962/LegalGPT/EFFICIENCY%20FEATURES/ntgolpbyuv4qkydh1n70.mp4",
      },
      {
        name: "Multilingual Support",
        details:
          "Work effortlessly in multiple languages like English, Hindi, Gujarati, Marathi and many more, breaking barriers and expanding accessibility",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733287165/LegalGPT/EFFICIENCY%20FEATURES/bnrcjm6xwfh6xdbkhtvr.mp4",
      },
    ],
  },
];

const VideoBanner = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState([
    videoArrDetails[activeButtonIndex].typeArr[0],
  ]);

  useEffect(() => {
    setActiveVideoIndex([videoArrDetails[activeButtonIndex].typeArr[0]]);
  }, [activeButtonIndex]);

  return (
    <div id="videoBanner" className="pt-20 w-[90%] m-auto flex flex-col gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        {videoArrDetails.map((x, index) => (
          <button
            onClick={() => setActiveButtonIndex(index)}
            className={`w-[26rem] border-2 rounded-lg px-4 py-2 hover:bg-white hover:bg-opacity-25 ${
              activeButtonIndex === index ? "bg-[#018585] border-[#0bc6c6]" : ""
            }`}
            key={index}>
            {x.type.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="border-2 rounded-lg p-2 flex flex-col gap-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videoArrDetails[activeButtonIndex].typeArr.map((x, index) => (
            <div
              onClick={() => setActiveVideoIndex([x])}
              key={index}
              className={`w-full flex justify-center items-center border rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-25 ${
                activeVideoIndex[0].name === x.name
                  ? "bg-white bg-opacity-25"
                  : ""
              }`}>
              <p className="m-0 py-2">{x.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-black bg-opacity-25 rounded-lg p-3 flex flex-col md:flex-row gap-4">
          {activeVideoIndex.map((x, index) => (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-2 md:mb-0">
                {/* Text Content */}
                <p>{x.details}</p>
              </div>
              <div className="bg-black rounded-lg h-80">
                {/* Video Content */}
                <video
                  className="rounded-lg h-80 w-full"
                  src={x.videoSrc}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;

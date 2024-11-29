import React, { useEffect, useState } from "react";
import courtroom from "../../assets/images/Courtroom.png";
import feature1 from "../../assets/images/image 2.png";
import feature2 from "../../assets/images/image 3.png";
import feature3 from "../../assets/images/image 4.png";
import laptop from "../../assets/images/image 1.png";
import submitCase from "../../assets/images/SubmitYourCase.mp4";
import argumentDraft from "../../assets/images/GetArgument.mp4";
import frameCase from "../../assets/images/FrameYourCase.mp4";
import mainIntro from "../../assets/images/mainIntro.mp4";
import plus from "../../assets/images/Group 53.png";
import Styles from "./CourtRoomHome.module.css";
import arrw from "../../assets/images/Vector 1.png";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./Testimonial";
import { useSelector } from "react-redux";

function SampleNextArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function SamplePrevArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function Home() {
  const currentUser = useSelector((state) => state.user.user);
  console.log(currentUser);
  const navigate = useNavigate();

  const [submitHover, setSubmitHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const testimonialSettings = {
    // className: "center",
    // centerMode: true,
    infinite: true,
    // centerPadding: "0px",
    slidesToShow: 3,
    // speed: 500,
  };

  // useEffect(() => {
  //   if (currentUser !== "") {
  //     navigate("/courtroom-ai");
  //   }
  // }, [currentUser]);

  return (
    <motion.div
      // whileHover="hover"
      // onHoverStart={() => setSubmitHover(true)}
      // onHoverEnd={() => setSubmitHover(false)}
      className={Styles.mainContainer}
    >
      {/* top container */}
      <div className="flex flex-col md:grid md:grid-cols-2 items-center px-2 md:px-28 pt-5 gap-5">
        <div className="w-full flex flex-col text-center md:text-start  md:pl-32  gap-14">
          <h1 className="m-0 text-5xl font-bold">What is Courtroom ?</h1>
          <div className="">
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <h3 className="text-[#B7B2B2] text-xl">
                    Experience the trailer of the case you are going to fight
                    tommorow
                  </h3>
                </div>
                <div>
                  <h3 className="text-[#B7B2B2] text-xl">
                    Your mock trial before the real case begins
                  </h3>
                </div>
                <div>
                  <h3 className="text-[#B7B2B2] text-xl">
                    Your case assistant who does everything you want
                  </h3>
                </div>
              </Slider>
            </div>
          </div>

          <div className="flex justify-center gap-5">
            <Link to="/pricing-plans">
              <motion.button
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "2px solid white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  background: "#008080",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                whileHover="hover"
              >
                <motion.div
                  variants={{
                    hover: { x: "100%" },
                  }}
                  initial={{ x: "0%" }}
                  transition={{ type: "tween", duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#0E1118",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Book A Courtroom
                </span>
              </motion.button>
            </Link>
            <Link to="/courtroom-ai">
              <motion.button
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "2px solid white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  background: "#008080",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                whileHover="hover"
              >
                <motion.div
                  variants={{
                    hover: { x: "100%" },
                  }}
                  initial={{ x: "0%" }}
                  transition={{ type: "tween", duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#0E1118",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Enter Your Courtroom
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="">
          <motion.img
            initial={{ x: "100%" }}
            // variants={{
            //   hover: { x: "0%" },
            // }}
            whileInView={{ x: "0%" }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            alt="court-room"
            className="h-full w-full"
            style={{
              backgroundColor: "transparent",
              // height: "75%",
              // width: "75%",
            }}
            src={courtroom}
          />
        </div>
      </div>
      {/* 2nd container */}
      <div className="grid md:grid-cols-3 m-5 md:px-10 py-28">
        <motion.div
          initial={{ x: ["100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature1}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Junior</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            First draft of argument sets compiled for you by AI
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["0%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature2}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Lawyer</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            Counter arguments backed by all Indian law
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["-100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature3}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Judge</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            Validity, Importance and character based scoring and conclusion
          </h3>
        </motion.div>
      </div>

      {/* 3rd container       */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-[345px] md:gap-[700px]">
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
        <div className="flex justify-center items-center">
          <div
            className="relative md:h-[400px] w-max"
            // style={{ height: "400px", width: "max-content" }}
          >
            <img
              alt="courtRoom Preiview"
              src={laptop}
              style={{ borderRadius: 0, width: "100%", height: "100%" }}
            />
            <video
              className="absolute -top-[0.85rem] md:-top-5 w-full h-full flex justify-center items-center p-[1.5rem] md:p-9 rounded-xl"
              src={mainIntro}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <div className="flex justify-center gap-[345px] md:gap-[700px]">
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <img
          alt="arrow"
          src={arrw}
          style={{ borderRadius: 0, width: "40%", height: "100%" }}
        />
      </div>

      <motion.div
        // whileHover="hover"
        // onHoverStart={() => setSubmitHover(true)}
        // onHoverEnd={() => setSubmitHover(false)}
        className="flex flex-col-reverse gap-3 md:flex-row mt-[150px] mx-10 items-center"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            // variants={{
            //   view: { y: 0 },
            // }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            SUBMIT YOUR CASE
          </motion.h1>
          <motion.h5
            className="text-[#B7B2B2]"
            initial={{ opacity: 0 }}
            // variants={{
            //   hover: { opacity: 1 },
            // }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Add case details in the format of courtroom judgement , statement of
            claim, statement of defence, filed application or details from
            client's perspective.
          </motion.h5>
        </div>
        <motion.div
          initial={{ x: "50%" }}
          // variants={{
          //   hover: { x: "0%" },
          // }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div
            className="flex justify-center items-center"
            // style={{ display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            <div className="relative md:h-[400px] md:w-max">
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
              <video
                className="absolute -top-[0.85rem] md:-top-5 w-full h-full flex justify-center items-center p-[1.5rem] md:p-9 rounded-xl"
                src={submitCase}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="flex flex-col gap-3 md:flex-row mt-[150px] mx-10 items-center">
        <motion.div
          initial={{ x: "-50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div className="flex justify-center items-center">
            <div className="relative md:h-[400px] md:w-max">
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
              <video
                className="absolute -top-[0.85rem] md:-top-5 w-full h-full flex justify-center items-center p-[1.5rem] md:p-9 rounded-xl"
                src={argumentDraft}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            GET THE ARGUMENT'S DRAFT
          </motion.h1>
          <motion.h5
            style={{ color: "#B7B2B2" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Get a first draft of arguments, potential counter arguments,
            judgement scores and explanations and verdict from 4 different Point
            of Views
          </motion.h5>
        </div>
      </motion.div>

      <motion.div className="flex flex-col-reverse gap-3 md:flex-row mt-[150px] mx-10 items-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            FRAME YOUR CASE AND WIN
          </motion.h1>
          <motion.h5
            style={{ color: "#B7B2B2" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Frame and finetune your arguments to turn the weights in your favor
            until you are able to crack the verdict of your choice
          </motion.h5>
        </div>
        <motion.div
          initial={{ x: "50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div className="flex justify-center items-center">
            <div className="relative md:h-[400px] md:w-max">
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
              <video
                className="absolute -top-[0.85rem] md:-top-5 w-full h-full flex justify-center items-center p-[1.5rem] md:p-9 rounded-xl"
                src={frameCase}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

     
      {/* <motion.div
  className="flex flex-col md:flex-row items-center mt-[150px] mx-10 gap-10"
> */}
  {/* Left Section: Laptop with Video */}
  {/* <motion.div
    initial={{ x: "-50%" }}
    whileInView={{ x: "0%" }}
    transition={{ type: "spring", stiffness: 120, damping: 10 }}
  >
    <div
      className="relative flex justify-center items-center md:h-[400px] md:w-max"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <img
        alt="Laptop Preview"
        src={laptop}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <video
        className="absolute top-0 left-0 w-full h-full"
        style={{
          objectFit: "contain",
          zIndex: 2,
          borderRadius: "0", // Optional if you don't want rounded edges
        }}
        src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1732869509/LegalGPT/s7rzogng513qwxyop46d.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  </motion.div> */}

  {/* Right Section: Text Content */}
  {/* <div className="flex flex-col gap-6">
    <motion.h1
      initial={{ y: -60 }}
      whileInView={{ y: 0 }}
      transition={{
        y: { type: "tween", duration: 0.8 },
      }}
      style={{
        fontWeight: "bold",
        fontSize: "2rem",
        color: "#FFFFFF",
        textAlign: "left",
      }}
    >
      EXPERIENCE THE MAJESTIC WAR ROOM
    </motion.h1>
    <motion.h5
      style={{ color: "#B7B2B2", lineHeight: "1.8", textAlign: "left" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        x: { type: "slide", duration: 1 },
      }}
    >
      <span>AI Judge:</span>
      Delivers unbiased, multi-perspective evaluations, generates judgments,
      and predicts case precedents efficiently. <br />
      <span>AI Lawyer:</span>
      Crafts compelling counterarguments using case facts, legal precedents,
      and relevant case laws. <br />
      <span>Objection:</span>
      Understand what Objections can be raised for a specific argument in
      real-time, enhancing your preparation. <br />
      <span>Verdict:</span>
      Generates accurate, well-structured verdicts based on arguments,
      evidence, and case law analysis.
    </motion.h5>
  </div>
</motion.div> */}

<motion.div className="flex flex-col gap-3 md:flex-row mt-[150px] mx-10 items-center">
        <motion.div
          initial={{ x: "-50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div className="flex justify-center items-center">
  <div className="relative md:h-[400px] md:w-max">
    <img
      alt="courtRoom Preview"
      src={laptop}
      style={{ borderRadius: 0, width: "100%", height: "100%" }}
    />
    <video
      className=""
      style={{
        position:"absolute",
        height:"90%",
        width:"76%",
        left:"80px",
        top:"0px",
        
      }}
      src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1732869509/LegalGPT/s7rzogng513qwxyop46d.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</div>

        </motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
           EXPERIENCE THE MAJESTIC WAR ROOM
          </motion.h1>
          <motion.h5
      style={{ color: "#B7B2B2", lineHeight: "1.8", textAlign: "left" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        x: { type: "slide", duration: 1 },
      }}
    >
      <span>AI Judge:</span>
      Delivers unbiased, multi-perspective evaluations, generates judgments,
      and predicts case precedents efficiently. <br />
      <span>AI Lawyer:</span>
      Crafts compelling counterarguments using case facts, legal precedents,
      and relevant case laws. <br />
      <span>Objection:</span>
      Understand what Objections can be raised for a specific argument in
      real-time, enhancing your preparation. <br />
      <span>Verdict:</span>
      Generates accurate, well-structured verdicts based on arguments,
      evidence, and case law analysis.
    </motion.h5>
        </div>
      </motion.div>




<motion.div className="flex flex-col-reverse gap-3 md:flex-row mt-[150px] mx-10 items-center">
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <motion.h1
      initial={{ y: -60 }}
      whileInView={{ y: 0 }}
      transition={{
        y: { type: "tween", duration: 0.8 },
      }}
    >
      UNBEATABLE LEGAL ASSISTANCE
    </motion.h1>
    <motion.h5
      style={{ color: "#B7B2B2", lineHeight: "1.8", textAlign: "left" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        x: { type: "slide", duration: 1 },
      }}
    >
      <span>Case Search:</span>
      Instantly find and access case laws and precedents tailored to your case as well as legal queries in seconds. <br />
      <span>LegalGPT:</span>
      Dive Deep in research with our AI-powered tool,
      offering quick, accurate summaries and insights. <br />
      <span>AI Assistant:</span>
      Highlights grey areas, provides strategic insights,
      and streamlines your preparation. <br />
    </motion.h5>
  </div>

  <motion.div
    initial={{ x: "50%" }}
    whileInView={{ x: "0%" }}
    transition={{ type: "spring", stiffness: 120, damping: 10 }}
  >
    <div className="flex justify-center items-center">
      <div className="relative md:h-[400px] md:w-[600px]">
       
        <img
          alt="courtRoom Preview"
          src={laptop}  
          className="w-full h-full object-cover rounded-xl"
          style={{ display: "block" }} 
        />

       
        <video
          className="absolute -top-[0.85rem] md:-top-5 w-[100%] h-full p-[1rem] md:p-8 rounded-xl"
          src={"https://res.cloudinary.com/dyuov6i8c/video/upload/v1732869509/LegalGPT/plxfee8ewzem3optaayl.mp4"}   //1
          autoPlay
          loop
          muted
          playsInline
          style={{ zIndex: 10 }} 
        />
      </div>
    </div>
  </motion.div>
</motion.div>



      <motion.div className="flex flex-col md:flex-row items-center mt-[150px] mx-10 gap-10">
 
  <motion.div
    initial={{ x: "-50%" }}
    whileInView={{ x: "0%" }}
    transition={{ type: "spring", stiffness: 120, damping: 10 }}
  >
    <div className="relative flex justify-center items-center md:h-[400px] md:w-max">
      <img
        alt="courtRoom Preview"
        src={laptop}
        style={{ borderRadius: 0, width: "100%", height: "100%" }}
      />
      <video
        className="absolute -top-[0.85rem] md:-top-5 w-[90%] h-full p-[1rem] md:p-8 rounded-xl"
        src={"https://res.cloudinary.com/dyuov6i8c/video/upload/v1732869509/LegalGPT/eb8tnrjytxoubmz1lsnn.mp4"}  //2
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  </motion.div>

  {/* Right Section: Text Content */}
  <div className="flex flex-col gap-6">
    <motion.h1
      initial={{ y: -60 }}
      whileInView={{ y: 0 }}
      transition={{
        y: { type: "tween", duration: 0.8 },
      }}
      style={{
        fontWeight: "bold",
        fontSize: "2rem",
        color: "#FFFFFF",
        textAlign: "left",
      }}
    >
      BEST-IN-CLASS<br/>
      VERIFICATION AND <br/>
      VALIDATION
    </motion.h1>
    <motion.h5
      style={{ color: "#B7B2B2", lineHeight: "1.8", textAlign: "left" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        x: { type: "slide", duration: 1 },
      }}
    >
      <span>Evidence:</span>
      Evaluate and assess evidence validity to get insights on how it will play in the court. <br />
      <span>Testimony:</span>
      Get 3 sets of cross examination questions from the perspective of a petitioner,respondent and the judge. <br />
    </motion.h5>
  </div>
</motion.div>


<motion.div className="flex flex-col-reverse gap-3 md:flex-row mt-[150px] mx-10 items-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
           HIGHEST EFFICIENCY <br/>
           FEATURES 
           
          </motion.h1>
          <motion.h5
      style={{ color: "#B7B2B2", lineHeight: "1.8", textAlign: "left" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        x: { type: "slide", duration: 1 },
      }}
    >
      <span>First Draft:</span>
        Generate precise initial drafts of legal arguments with relevant case laws working as a foundation for your preparation,saving time and effort. <br />
      <span>Relevant Case Laws:</span>
       Quickly access case laws directly relevant to that pecific argument with citations and the ability to read the full case document. <br />
      <span>AI Drafter:</span>
       Draft,edit,and customize legal documents
       needed for your case with AI precision and seamless 
       efficiency with a single click. <br />
       <span>Multilingual Support:</span>
        Work effortlessly in multiple languages like English,Hindi,Gujarati,Marathi and many more,breaking barriers expanding accessibility.<br/>
    </motion.h5>
        </div>
        <motion.div
          initial={{ x: "50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div className="flex justify-center items-center">
            <div className="relative md:h-[400px] md:w-max">
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
              <video
                className="absolute -top-[0.85rem] md:-top-5 w-full h-full flex justify-center items-center p-[1.5rem] md:p-12 rounded-xl"
                src={"https://res.cloudinary.com/dyuov6i8c/video/upload/v1732869509/LegalGPT/h17qygdkjysfjablnsmn.mp4"} //3
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className={Styles.whyCourtRoom}>
        <div>
          <h1 style={{ fontWeight: "700" }}>Why Claw Courtroom ?</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-[100px]">
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
              }}
            >
              25000+
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Indian Legal Documents
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
              }}
            >
              50+
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
                width: "300px",
              }}
            >
              Trusted by 50+ lawyers from Supreme court and High courts
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
              }}
            >
              1 Cr +
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Indian Judgements
            </h3>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={{
              hover: { x: "100%" },
            }}
            initial={{ x: "0%" }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #00ffa3, #008080)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div style={{ width: "50%" }}>
              <h1
                style={{
                  color: "#008080",
                  fontWeight: 800,
                  textWrap: "wrap",
                }}
              >
                Experience the AI Courtroom
              </h1>
            </div>
            <Link to={"/contact"}>
              <button
                style={{
                  backgroundColor: isHovered ? "white" : "#008080",
                  color: isHovered ? "#008080" : "white",
                  margin: "15px",
                  padding: "12px 40px",
                  borderRadius: 10,
                  border: "none",
                  fontSize: 27,
                }}
              >
                Contact us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="font-bold text-5xl md:text-6xl">Testimonials</h1>
          <p className="text-lg md:text-xl">
            Get to know what the professionals got to say
          </p>
        </div>
        <TestimonialCard />
        <br />
      </div>
    </motion.div>
  );
}

export default Home;

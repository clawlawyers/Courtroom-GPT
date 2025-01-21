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
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./Testimonial";
import { useSelector } from "react-redux";
import VideoBanner from "./VideoBanner";

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
    <motion.div className="bg-transparent pt-[60px]">
      {/* top container */}
      <div className="flex flex-col md:grid md:grid-cols-2 items-center my-5 px-2 md:px-28 pt-5 gap-5">
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

          <div className="flex justify-center flex-col md:flex-row  gap-5">
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
                whileHover="hover">
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
                  }}>
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
                whileHover="hover">
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
                  }}>
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
            className="h-full  w-full"
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
      <div className="grid md:grid-cols-3  md:px-10 py-5">
        <motion.div
          initial={{ x: ["100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}>
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
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}>
            First draft of argument sets compiled for you by AI
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["0%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}>
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
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}>
            Counter arguments backed by all Indian law
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["-100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}>
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
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}>
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
      <VideoBanner />

      <div className={Styles.whyCourtRoom}>
        <div>
          <h1 style={{ fontWeight: "700" }}>Why Claw Courtroom ?</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-[100px]">
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
                minHeight: "120px", // Ensure fixed height for the first container
              }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
                transition={{ duration: 2 }}>
                <CountUp start={10000} end={25000} duration={3} separator="" />+
              </motion.span>
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}>
              Indian Legal Documents
            </h3>
          </div>

          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
                minHeight: "120px", // Ensure fixed height for the second container
              }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
                transition={{ duration: 2 }}>
                <CountUp start={0} end={50} duration={3} separator="," />+
              </motion.span>
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
                width: "300px",
              }}>
              Trusted by 50+ lawyers from Supreme Court and High Courts
            </h3>
          </div>

          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
                minHeight: "120px", // Ensure fixed height for the "1 Cr +" container
              }}>
              <span>1 Cr +</span>{" "}
              {/* Keep the "1 Cr +" fixed and without animation */}
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}>
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
        }}>
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}>
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
                }}>
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
                }}>
                Contact us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          id="Testimonilcard"
          className="flex  flex-col justify-center items-center gap-1">
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

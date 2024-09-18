import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import "./Slide.css";
import { Slide } from "./Slider";

const data = [
  {
    description:
      "What sets AI Courtroom apart is its ability to simulate different courtroom situations. The AI Judge’s verdicts offer diverse perspectives, which is invaluable in preparing for court. It’s an indispensable tool for any lawyer who wants to be thoroughly prepared.",
    person: "Public Prosecutor",
    rating: 5,
  },
  {
    description:
      "AI Courtroom has added so much value to my practice. Being able to test and validate my research with data-driven insights has really boosted my confidence in the courtroom. It’s like having a super-smart assistant by my side.",
    person: "Trial Attorney",
    rating: 5,
  },
  {
    description:
      "This tool has saved me so much time. AI Courtroom quickly analyzes complex scenarios and even drafts initial arguments. Plus, it points out any weaknesses in my case early on, which is a huge advantage.",
    person: "Family Law Attorney",
    rating: 4,
  },
  {
    description:
      "I’ve never seen anything like AI Courtroom before. It’s a revolutionary tool that provides quick, reliable feedback on my case strategies. The detailed analyses it offers are invaluable in helping me build stronger cases.",
    person: "Civil Rights Attorney",
    rating: 4.5,
  },
  {
    description:
      "	What I love about AI Courtroom is that it makes complex legal scenarios much easier to navigate. The AI Assistant feature is like having a super-smart advisor who’s always on hand to help me strategize and spot potential issues early on.",
    person: "Civil Litigator",
    rating: 4,
  },
];

const TestimonialCard = () => {
  const ref = React.useRef();
  return (
    <div
      className="card"
      style={{
        background: "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: "90%" }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(parentWidth, carouselRef) => {
            let currentVisibleSlide = 5;
            if (parentWidth <= 1440) currentVisibleSlide = 5;
            else if (parentWidth <= 500) currentVisibleSlide = 3;
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={350}
                height={450}
                carouselWidth={parentWidth}
                data={data}
                maxVisibleSlide={5}
                // disableSwipe
                currentVisibleSlide={currentVisibleSlide}
                // customScales={[1, 0.85, 0.7, 0.55]}
                // transitionTime={450}
              />
            );
          }}
        />
        <svg
          className="card-button left cursor-pointer"
          onClick={() => ref.current?.goBack()}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        <svg
          className="card-button right cursor-pointer"
          onClick={() => ref.current?.goNext()}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </div>
    </div>
  );
};

export default TestimonialCard;

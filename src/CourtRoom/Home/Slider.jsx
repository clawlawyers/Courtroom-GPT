import React from "react";
import "./Slide.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const Slide = React.memo(function (props) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div
        className="p-5 h-72 w-full   flex flex-col rounded border-2 border-white"
        style={{
          background: "linear-gradient(90deg, #018585, #0e5156 40%)",
        }}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1 p-2">
            <p className="m-0 text-lg text-white">{data[dataIndex].person}</p>
          </div>
          <div className="flex justify-end items-end p-2">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={data[dataIndex].rating}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>
        <hr
          style={{
            margin: "2px",
            height: "0px",
            border: "none",
            borderTop: "2px solid white",
          }}
        />
        <div className="w-full h-full flex justify-center items-center">
          <div className="px-3 text-sm italic font-semibold text-white">
            <p>" {data[dataIndex].description} "</p>
          </div>
        </div>
      </div>
    </div>
  );
});

import React from "react";
import { useDispatch } from "react-redux";
import { addSelectedTime } from "../../features/bookCourtRoom/selectedDatesTimesSlice";
import styled, { css, keyframes } from "styled-components";

const colorChange = keyframes`
  0% {
    background-image: linear-gradient(to right, #00ffa3 0%, transparent 100%);
  }
  100% {
    background-image: linear-gradient(to right, #00ffa3 100%, transparent 0%);
    

  }
`;

const Button = styled.button`
  color: black;
  padding: 10px 40px;
  border-bottom: 2px solid white;

  cursor: pointer;
  margin-bottom: 10px;
  text-align: left;

  ${(props) =>
    props.isSelected &&
    css`
      animation: ${colorChange} 0.25s ease-in-out forwards;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 54vh;
  overflow-y: scroll;
`;

export default function TimePickerValue({ selectedTimes, setSelectedTimes }) {
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : i;
    return `${hour}:00`;
  });

  const dispatch = useDispatch();

  const handleTimeClick = (time) => {
    dispatch(addSelectedTime(time));

    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(time)) {
        return [];
      } else {
        return [time];
      }
    });
  };

  return (
    <Container>
      {times.map((time, index) => (
        <Button
          key={index}
          onClick={() => handleTimeClick(time)}
          isSelected={selectedTimes.includes(time)}
          className={`${
            selectedTimes.includes(time) ? "text-black" : "text-white"
          } font-semibold text-center`}
        >
          {time}
        </Button>
      ))}
    </Container>
  );
}

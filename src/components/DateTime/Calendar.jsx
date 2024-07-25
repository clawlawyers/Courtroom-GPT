import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TimePickerValue from "./Clock"; // Assuming you have a separate TimePickerValue component
import { useDispatch } from "react-redux";
import { addSelectedTime } from "../../features/bookCourtRoom/selectedDatesTimesSlice";
import toast from "react-hot-toast";
import "./DateTime.module.css";

const Container = styled.div`
  background: linear-gradient(100deg, #008080 0%, #15b3b3 100%);
  border-radius: 10px;
  border: 2px solid white;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
  width: 60%;
  max-width: 570px;
  max-height: 60vh;
  font-weight: 900;
  color: white;
  box-shadow: 2px 4px 10px black;

  @media (max-width: 768px) {
    height: 90vw;
    width: 90vw;
  }

  @media (max-width: 480px) {
    height: 100vw;
    width: 100vw;
    padding: 10px;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .custom-calendar {
    transform: scale(1.7);
    transform-origin: center;
    
    @media (max-width: 768px) {
      transform: scale(1.3);
    }

    @media (max-width: 480px) {
      transform: scale(1);
    }
  }
`;

const CalendarComponent = ({ scheduledSlots, setScheduledSlots }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const dispatch = useDispatch();

  const minDate = dayjs().startOf("month");
  const maxDate = dayjs().add(1, "month").endOf("month");

  const handleDateChange = (date) => {
    setSelectedDates([...selectedDates, date]);
    setSelectedTimes([]); // Reset selected times when date changes
    dispatch(addSelectedTime({ date: date.format("YYYY-MM-DD"), time: null }));
  };

  const addSlot = () => {
    if (selectedDates.length === 0 || selectedTimes.length === 0) {
      toast.error("Please Select at least one Date or Time");
      return;
    }

    const newSlot = {
      date: selectedDates[selectedDates.length - 1],
      time: selectedTimes,
    };
    setScheduledSlots([...scheduledSlots, newSlot]);
    setSelectedTimes([]); // Clear selected times after adding
    dispatch(addSelectedTime(newSlot));
  };

  return (
    <main className="flex w-full flex-col justify-center items-center gap-[70px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="flex w-full flex-row justify-center items-center gap-[70px] h-[70vh]">
          <Container>
            <CalendarWrapper>
              <DateCalendar
                className="custom-calendar"
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), "day")}
                views={["day"]}
                sx={{
                  color: "white",
                  marginTop: "50px",
                  fontWeight:"800",
                  '& .MuiPickersDay-root': {
                    color: 'white', // Color for the date numbers
                  },
                  '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: '#00ffa3', // Background color for selected date
                    color: 'black', // Text color for selected date
                  },
                  '& .MuiPickersDay-root:hover': {
                    backgroundColor: '#008080', // Background color for hovered date
                  },
                  '& .MuiPickersDay-today': {
                    borderColor: 'white', // Border color for today's date
                  },
                  '& .MuiTypography-root': {
                    color: 'white', // Color for the month/year text
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white', // Color for the navigation arrows
                  },
                }}
              />
            </CalendarWrapper>
          </Container>
          <div className="border-2 border-white p-1 rounded-md bg-gradient-to-r from-teal-600 to-cyan-500">
            <h3 className="text-[1.2rem] p-1 text-center font-semibold">
              Select Time:
            </h3>
            <TimePickerValue
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            />
          </div>
        </section>
        <div className="flex flex-col gap-5 w-full justify-center items-center">
          <div className="w-full flex flex-row justify-center">
            <button
              className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gradient-to-r from-teal-800 to-teal-400 p-2 rounded-md font-semibold"
              variant="contained"
              color="primary"
              onClick={addSlot}
            >
              Add to Slot
            </button>
          </div>

          <div
            style={{
              backgroundColor: "#000000a6",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px",
            }}
          >
            <h3>Scheduled Slots:</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                border: "3px solid teal",
                backgroundColor: "white",
                width: "70%",
                height: "80px",
                padding: "10px",
                borderRadius: "5px",
                gap: "20px",
              }}
            >
              {scheduledSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-row p-2 w-fit h-max rounded-lg font-semibold bg-gradient-to-r from-teal-800 to-teal-400 text-white gap-5 my-2"
                >
                  {new Date(slot.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
                  {","}
                  {slot.time}
                </div>
              ))}
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </main>
  );
};

export default CalendarComponent;

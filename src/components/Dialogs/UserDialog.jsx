import { Add, PersonAdd, Close, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const UserDialog = ({ onClose }) => {
  const [addedSlots, setAddedSlots] = useState([]);
  const slotsContainerRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleAddSlots = () => {
    const date = getValues("date");
    const time = getValues("time");

    if (date && time) {
      const newSlot = { date, time };
      setAddedSlots((prevSlots) => [...prevSlots, newSlot]);
    }
  };

  const handleRemoveSlot = (indexToRemove) => {
    setAddedSlots((prevSlots) =>
      prevSlots.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleScrollLeft = () => {
    slotsContainerRef.current.scrollBy({
      left: -150, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    slotsContainerRef.current.scrollBy({
      left: 150, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      slots: addedSlots.map(slot => ({
        date: dayjs(slot.date).format("D MMMM YYYY"),
        time: slot.time
      }))
    };

    console.log("User Data with Slots:", formData);
  };

  return (
    <div
      className="w-2/3 h-max"
      style={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        zIndex: "3",
        overflow: "auto",
        padding: "5px",
      }}
    >
      <div
        className="h-fit scale-75 w-2/3 rounded-xl border-2 border-white relative"
        style={{
          background: "linear-gradient(to right,#0e1118,#008080)",
        }}
      >
        <div className="flex flex-row justify-between items-center border-b-2 border-white">
          <h4 className="text-center mx-10">New User Details</h4>
          <div className="flex justify-end">
            <svg
              onClick={onClose}
              style={{ margin: "20px", cursor: "pointer" }}
              width="30"
              height="30"
              fill="white"
              stroke="white"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                fillRule="nonzero"
              />
            </svg>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-full py-5 px-5 h-fit"
        >
          <label
            htmlFor="username"
            className="text-left self-start font-semibold"
          >
            Username
          </label>
          <input
            {...register("username", { required: true })}
            id="username"
            type="text"
            className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
          />

          <label htmlFor="email" className="text-left self-start font-semibold">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
          />
          {errors.email && <p>This field is required</p>}

          <label
            htmlFor="phoneNumber"
            className="text-left self-start font-semibold"
          >
            Phone Number
          </label>
          <input
            {...register("phoneNumber", {
              required: true,
              pattern: /^[0-9]{10}$/,
            })}
            id="phoneNumber"
            type="tel"
            className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
          />
          {errors.phoneNumber && (
            <p>
              {errors.phoneNumber.type === "pattern"
                ? "Invalid phone number"
                : "This field is required"}
            </p>
          )}

          <div className="flex flex-wrap w-full items-center justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="Date"
                className="text-left self-start font-semibold"
              >
                Date
              </label>
              <input
                {...register("date", { required: true })}
                id="date"
                type="date"
                className="mb-4 w-full rounded-md py-2 px-1 text-neutral-800 outline-none"
              />
              {errors.date && <p>This field is required</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="Time"
                className="text-left self-start font-semibold"
              >
                Time
              </label>
              <input
                {...register("time", { required: true })}
                id="time"
                type="time"
                className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
              />
              {errors.time && <p>This field is required</p>}
            </div>
            <button
              type="button"
              onClick={handleAddSlots}
              className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
            >
              <div>
                <Add />
              </div>
              <div className="font-semibold">Add Slot</div>
            </button>
          </div>

          <label htmlFor="Time" className="text-left self-start font-semibold">
            Selected Slots
          </label>
          <div className="relative w-full flex items-center pt-1 mr-11">
            <ArrowBackIos
              onClick={handleScrollLeft}
              className="cursor-pointer text-white z-10 absolute left-0"
            />
            <div
              className="bg-white w-full items-center rounded-md border border-neutral-800   h-20 flex flex-nowrap overflow-x-auto scrollbar-hide mx-4"
              ref={slotsContainerRef}
            >
              {addedSlots.map((slot, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-black h-max px-3 py-2 m-1 rounded-md flex items-center"
                  style={{ minWidth: "max-content" }}
                >
                  {dayjs(slot.date).format("D MMMM YYYY")}, {slot.time}
                  <Close
                    onClick={() => handleRemoveSlot(index)}
                    className="ml-2 cursor-pointer text-red-600"
                  />
                </div>
              ))}
            </div>
            <ArrowForwardIos
              onClick={handleScrollRight}
              className="cursor-pointer text-white z-10 absolute right-0"
            />
          </div>

          <div className="flex flex-row justify-end pt-6 w-full">
            <button
              type="submit"
              className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
            >
              <div>
                <PersonAdd />
              </div>
              <div className="font-semibold">Add User</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog;

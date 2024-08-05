import React from "react";
import { useForm } from "react-hook-form";
import { PersonAdd, Close } from "@mui/icons-material";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
const AllowedDialog = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
        ...data,
        bookedSlots: 0,
        totalSlots: 0,
      };
      console.log(formData);

      
      formData.startHour = parseInt(formData.startHour.split(':')[0], 10);
      formData.EndHour = parseInt(formData.EndHour.split(':')[0], 10);
      
      console.log(formData);

    try {
      const res = await axios.post(
        `${NODE_API_ENDPOINT}/admin/api/trail-bookings`,
        {
          date: formData.date,
          StartHour: formData.startHour,
          EndHour: formData.EndHour,
          email: formData.Email,
          phoneNumber: formData.phoneNumber,
          bookedSlots: formData.bookedSlots,
          totalSlots: formData.totalSlots,
        }
      );
      if (res.status === 201) {
        console.log("User added successfully:", res.data);

        // Optionally, show a success message or close the dialog
        onClose();
      } else {
        console.error("Failed to add user:", res.data);
      }
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <div
      className="w-full h-full"
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
        className="scale-75 w-2/3 rounded-xl border-2 border-white"
        style={{
          background: "linear-gradient(to right,#0e1118,#008080)",
        }}
      >
        <div className="flex flex-row justify-between items-center border-b-2 border-white">
          <h4 className="text-center mx-10">New User Details</h4>
          <div className="flex justify-end">
            <Close
              onClick={onClose}
              style={{ margin: "20px", cursor: "pointer" }}
              width="30"
              height="30"
              fill="white"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-full py-5 px-5 h-full"
        >
          <label htmlFor="Email" className="text-left self-start font-semibold">
            Email
          </label>
          <input
            {...register("Email", { required: true })}
            id="Email"
            type="email"
            className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
          />
          <label htmlFor="date" className="text-left self-start font-semibold">
            Date
          </label>
          <input
            {...register("date", { required: true })}
            id="date"
            type="date"
            className="mb-4 w-full rounded-md p-2 text-neutral-800 outline-none"
          />

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
                htmlFor="StartHour"
                className="text-left self-start font-semibold"
              >
                StartHour
              </label>
              <input
                {...register("startHour", { required: true })}
                id="startHour"
                type="time"
                className="mb-4 w-full rounded-md py-2 px-1 text-neutral-800 outline-none"
              />
              {errors.startHour && <p>This field is required</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="EndHour"
                className="text-left self-start font-semibold"
              >
                EndHour
              </label>
              <input
                {...register("EndHour", { required: true })}
                id="EndHour"
                type="time"
                className="mb-4 w-full rounded-md py-2 px-1 text-neutral-800 outline-none"
              />
              {errors.EndHour && <p>This field is required</p>}
            </div>
          </div>

          <div className="flex flex-row justify-end pt-6 w-full">
            <button
              type="submit"
              className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
            >
              <PersonAdd />
              <div className="font-semibold">Add User</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllowedDialog;

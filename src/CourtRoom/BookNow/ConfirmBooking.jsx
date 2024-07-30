import React, { useState } from "react";
import { useSelector } from 'react-redux';
const ConfirmBooking = () => {
 
  const bookingData = useSelector(state => state.booking.bookingData);
  const slots = bookingData.slots
  console.log(bookingData);
  return (
    <div className="h-screen flex flex-col justify-start pt-44 w-full items-center align-middle">
      {/* Card Section */}
      <section className="w-full h-max flex flex-row justify-start  items-center gap-20 px-40">
        {/* Card 1 */}
        <div className="p-4 border border-white w-2/3 h-max rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Confirm your booking</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2">
            <h3 className="font-semibold">CLAW courtroom</h3>
            <p className="text-neutral-200 text-sm">
              Access to AI Powered CLAW courtroom
            </p>
            <br />
            <p className="mx-2 font-bold">UserId: {bookingData.name}</p>
          </div>
          <div className="h-0.5 bg-white w-full" />
          {/* Time Slot */}
          <div className="flex flex-col w-full px-2">
            <p>Timer Slot: </p>
            <div className="flex flex-row justify-between items-center w-full">
              {slots?.map((idx)=> (
                <div key={idx} className="bg-slot-gradient flex flex-row flex-wrap gap-3 items-center align-baseline rounded-lg justify-center px-3  text-black font-bold text-base w-fit h-fit ">
                  <p>{idx.date}</p>
                  <p>{idx.hour}:00</p>
                </div>
              ))}
              <button className="border-2 font-semibold border-white rounded-md p-2">
                Reschedule
              </button>
            </div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="p-4 border border-white w-1/2 rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Payment Details</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2 gap-2">
            <h3 className="font-bold text-lg">Price per slot: <span className="text-lg">Rs. 100</span> /-</h3>
            <h3 className="font-bold text-lg">No. of slots booked: {slots.length}</h3>
          </div>
          <div className="h-0.5 bg-white w-full" />
          <br />
          {/* Amount to Pay */}
          <div className="flex flex-col w-full px-2">
            <p className="text-xl font-bold">Amount to Pay: {100 * slots.length}</p>
            <div className="flex flex-row w-full justify-end">
              <button className="border-2 font-semibold border-white rounded-md p-2">
                Proceed to Payment
              </button>
            </div>
            <br />
            <div className="h-0.5 bg-white w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmBooking;

import React from "react";

const ConfirmBooking = () => {
  return (
    <div className="h-screen flex flex-col justify-center w-full items-center align-middle ">
      {/* //card section */}
      <section className="w-full flex flex-row justify-center items-center gap-10 px-10">
        {/* card1 */}
        <div className="p-4 border border-white w-1/2 rounded-md bg-card-gradient flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Confirm your booking</h3>
            <div className="h-0.5 bg-white w-full" />
          </div>
          <div className="mx-2 ">
            <h3 className="font-semibold">CLAW courtroom</h3>
            <p className="text-neutral-200 text-sm">
              Access to AI Powered CLAW courtroom{" "}
            </p>
            <br />
            <p>UserId:</p>
          </div>
          <div className="h-0.5 bg-white w-full" />

        </div>
      </section>
    </div>
  );
};

export default ConfirmBooking;

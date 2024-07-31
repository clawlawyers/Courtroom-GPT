import React from "react";

const NewLayout = () => {
  return (
    <div class="h-screen m-0 overflow-hidden">
      <div class="flex flex-col h-screen">
        <div class="h-[20vh] overflow-auto bg-red-300">
          <p>Top Content</p>
        </div>
        <div class="flex-1 overflow-auto bg-blue-300">
          <p>Middle Content</p>
        </div>
        <div class="h-[10vh] overflow-auto bg-green-300">
          <p>Bottom Content</p>
        </div>
      </div>
    </div>
  );
};

export default NewLayout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import navbarMenus from "../../utils/utils";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <main className="h-screen w-full flex flex-col md:flex-row justify-start items-start gap-5 p-5">
      <div className="w-full md:w-[20%] flex flex-col h-full max-h-full overflow-y-auto gap-2">
        {navbarMenus.map((menu) => {
          console.log(location.pathname);
          const isActive = location.pathname === menu.link;
          return (
            <a className="text-white no-underline" href={menu.link}>
              <h1
                key={menu.id}
                className={`text-left p-2 text-2xl rounded-md cursor-pointer ${
                  isActive ? "bg-teal-500 text-white" : ""
                }`}
              >
                {menu.name}
              </h1>
            </a>
          );
        })}
      </div>
      <div className="w-[1px] bg-neutral-400 h-full rounded-md" />
      <div className="flex flex-col justify-center h-full w-full items-center px-20 overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;

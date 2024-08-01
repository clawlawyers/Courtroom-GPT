import { Add, Delete, Edit, Share } from "@mui/icons-material";
import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
const Admin = () => {
    const handleExport = () => {
        const csv = Papa.unparse(userData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'userData.csv');
      };
  // dummy data
  const userData = [
    {
      date: "2022-01-01",
      time: "12:00",
      name: "John Doe",
      email: "musharafz2k3@gmail.com",
      phoneNo: "123-456-7890",
      rec: "No",
      userId: "user1",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    {
      date: "2022-01-02",
      time: "13:00",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNo: "098-765-4321",
      rec: "yes",
      userId: "user2",
    },
    // Add more users as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5 ">
      <div className="w-fit flex flex-col gap-4  ">
        <h1 className="w-full text-center bg-teal-500 p-2 rounded-md shadow-md shadow-neutral-900">Courtroom Users</h1>
        <h1 className="w-full text-center  p-2 rounded-md ">Time Slots</h1>

      </div>
      <div className="w-0.5 bg-neutral-400 h-2/3 rounded-md my-5" />
      {/* user panel */}
      <div className="flex flex-col  rounded-lg h-2/3 bg-black/30 w-2/3 gap-3 p-3 shadow-md">
        <div className="flex flex-row w-full justify-between gap-3 items-start">
          {/* Export */}
          <div className="flex  flex-row items-center gap-5">
            <button onClick={handleExport} className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center">
              <div>
                <Share />
              </div>
              <div className="font-semibold">Export</div>
            </button>

            <button className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center">
              <div>
                <Add />
              </div>
              <div className="font-semibold">Add User</div>
            </button>

            <button className="bg-transparent border-2 border-teal-500  shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center">
              <div>
                <FilterAltIcon />
              </div>
              <div className="font-semibold">Filter</div>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            className="border-2 w-2/6 border-gray-300 bg-white h-10 text-neutral-900 px-2 font-semibold rounded-lg text-sm focus:outline-none"
          />
        </div>

        {/* user lists */}

        <div className="border-2 border-white rounded-md overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-500">
                <th className="p-2"></th>

                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone No</th>
                <th className="p-2">Record</th>
                <th className="p-2">User ID</th>
                <th className="p-2"></th>

                <th className="p-2"></th>

              </tr>
            </thead>
            <tbody>
              {userData
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.email
                      .toLowerCase()
                      .includes(
                        searchTerm.toLowerCase() ||
                          val.phoneNo.toString().includes(searchTerm.toString())
                      )
                  ) {
                    return val;
                  }
                })
                .map((user, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-black/50 transition-all duration-300 border-b border-white"
                  >
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>

                    <td className="p-2">{user.date}</td>
                    <td className="p-2">{user.time}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.phoneNo}</td>
                    <td className="p-2">{user.rec}</td>
                    <td className="p-2">{user.userId}</td>
                    <td className="p-2"><Edit /></td>
                    <td className="p-2"><Delete /></td>


                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;

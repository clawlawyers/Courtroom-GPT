import { Add, Delete, Edit, Share } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import UserDialog from "../../components/Dialogs/UserDialog";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";
import AllowedLoginDialog from "../../components/Dialogs/AllowedLoginDialog";

const AllowedLogin = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [flag,setFlag] = useState(false);
  const handleClose = () => {
    setUserDialog(false);
  }

  useEffect(() => {
  

    const FetchUserData = async () => {
      setFlag(true);
      try {
        const response = await axios.get(`${NODE_API_ENDPOINT}/admin/getAllallowedLogin`);
        const userDataObject = response.data.data;

        const flattenedData = Object.values(userDataObject).flatMap(user =>
          user.courtroomBookings.map(booking => ({
            ...user,
            name: booking.name,
            email: booking.email,
            phoneNumber: booking.phoneNumber,
            recording: booking.recording ? "true" : "false",
            userId: booking._id,
          }))
        );
        console.log(flattenedData);

        setUserData(flattenedData);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Error fetching user data");
      }
      setFlag(false);
    };

    FetchUserData();
  }, [flag]);

  const handleDelete = async (bookingId,userId) => {
    
    try {
      await axios.delete(`${NODE_API_ENDPOINT}/admin/allowedLogin/${bookingId}/users/${userId}`);
      setUserData((prevUserData) => prevUserData.filter((user) => user.userId !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error deleting user");
    } finally {
      
      setDeleteDialog(false);
      setUserToDelete(null);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialog(true);
  };

  const cancelDelete = () => {
    setDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleExport = () => {
    const csv = Papa.unparse(userData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "userData.csv");
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = () => {
    // Implement filtering logic here
  };

  const handleCheckboxChange = (userId, isChecked) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (isChecked) {
        return [...prevSelectedUserIds, userId];
      } else {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
    });
  };

  const handleDeleteSelected = () => {
    setUserData((prevUserData) => prevUserData.filter((user) => !selectedUserIds.includes(user.userId)));
    setSelectedUserIds([]); // Clear selected user IDs after deletion
  };

  return (
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
      {/* user panel */}
      <div className="flex flex-col justify-center h-full w-full items-center ">
        <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
          {userAddDialog && <AllowedLoginDialog onClose={handleClose} />}
          <div className="flex flex-col lg:flex-row w-full justify-between gap-2 items-start">
            {/* Export */}
            <div className="flex flex-row items-center gap-3 mb-4 lg:mb-0">
              <button
                onClick={handleExport}
                className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div><Share /></div>
                <div className="font-semibold">Export</div>
              </button>

              <button
                onClick={() => setUserDialog(true)}
                className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div><Add /></div>
                <div className="font-semibold">Add User</div>
              </button>

              <button
                onClick={handleFilter}
                className="bg-transparent border-2 border-teal-500 shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div><FilterAltIcon /></div>
                <div className="font-semibold">Filter</div>
              </button>

              <button
                onClick={handleDeleteSelected}
                className={`bg-card-gradient shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center ${
                  selectedUserIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={selectedUserIds.length === 0}
              >
                <div><Delete /></div>
                <div className="font-semibold">Delete ({selectedUserIds.length})</div>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="border-2 w-full lg:w-2/6 border-gray-300 bg-white h-10 text-neutral-900 px-2 font-semibold rounded-lg text-sm focus:outline-none"
            />
          </div>

          {/* user lists */}
          <div className="border-2 overflow-y-auto overflow-x-auto border-white w-full rounded-md">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-teal-500">
                  <th className="p-2">Select</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone No</th>
                  <th className="p-2">Record</th>
                  <th className="p-2">User ID</th>
                  <th className="p-2">Edit</th>
                  <th className="p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {userData
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      val.phoneNumber.includes(searchTerm) ||
                      val.date.includes(searchTerm)
                    ) {
                      return val;
                    }
                    return null;
                  })
                  .map((user) => (
                    <tr
                      key={user.userId}
                      className="hover:bg-black/50 transition-all duration-300 border-b border-white"
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(user.userId, e.target.checked)
                          }
                        />
                      </td>
                      <td className="p-2">{user.date}</td>
                      <td className="p-2">{user.hour}</td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.phoneNumber}</td>
                      <td className="p-2">{user.recording}</td>
                      <td className="p-2">{user.userId}</td>
                      <td className="p-2">
                        <Edit />
                      </td>
                      <td
                        onClick={() => confirmDelete(user)}
                        className="p-2 cursor-pointer"
                      >
                        <Delete />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {deleteDialog && userToDelete && (
            <div
            className="py-3"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: "0",
              right: "0",
              backdropFilter: "blur(3px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "10",
            }}
          >
            <div className="m-32 w-2/3 flex flex-col border-4 border-red-600 rounded bg-gradient-to-r from-[#008080] to-[#003131]">
              <div className="p-3 flex w-full justify-between items-center">
                <h5 className="m-0 px-1 font-bold">
                  Proceed with Deleting User?
                </h5>
                <svg
                  className="h-10 w-10 cursor-pointer"
                  fill="white"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={cancelDelete}
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm4.292 6.707c-.391-.391-1.024-.391-1.415 0l-2.877 2.877-2.877-2.877c-.391-.391-1.024-.391-1.415 0-.391.391-.391 1.024 0 1.415l2.878 2.878-2.878 2.878c-.391.391-.391 1.024 0 1.415.391.391 1.024.391 1.415 0l2.877-2.878 2.877 2.878c.391.391 1.024.391 1.415 0 .391-.391.391-1.024 0-1.415l-2.878-2.878 2.878-2.878c.391-.391.391-1.024 0-1.415z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>

              <div className="flex flex-col px-10">
                <div>
                  
                  <p>
                    <span className="font-bold">Username:</span>{" "}
                    {userToDelete.name}
                  </p>
                </div>
                <div>
                  
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {userToDelete.email}
                  </p>
                </div>
                <div>
                 
                  <p>
                    <span className="font-bold">Phone Number:</span>{" "}
                    {userToDelete.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="w-full p-3 px-10 flex justify-end items-center">
                <button
                  className="flex justify-center items-center px-4 p-2 text-center bg-white text-teal-700 border-2 border-white rounded font-bold"
                  onClick={() => handleDelete(userToDelete._id ,userToDelete.userId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllowedLogin;

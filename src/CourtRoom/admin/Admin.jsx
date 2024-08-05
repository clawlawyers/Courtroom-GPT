import { Add, Delete, Edit, Share } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import UserDialog from "../../components/Dialogs/UserDialog";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";

const CourtRoomUsers = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteUserIds, setDeleteUserIds] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get(
          `${NODE_API_ENDPOINT}/admin/allCourtRoomData`
        );
        const fetchedData = res.data.data;

        // Filter the data to include only users with courtroomBookings[0]._id
        const filteredData = fetchedData.filter((user) =>
          user?.courtroomBookings.some((booking) => booking?._id)
        );

        console.log(filteredData);
        setUserData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllData();
  }, []);

  const handleExport = () => {
    const csv = Papa.unparse(userData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "userData.csv");
  };

  const handleFilter = () => {
    // Toggle sort order between ascending and descending
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Sort userData based on the selected order
    const sortedData = [...userData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (newSortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    // Update the user data with the sorted data
    setUserData(sortedData);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setUserDialog(false);
  };

  const handleOpen = () => {
    setUserDialog(true);
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

  const handleDeleteUser = async (userId, bookingId) => {
    setDeleteUserIds(userId);
    try {
      const res = await axios.delete(
        `${NODE_API_ENDPOINT}/admin/bookings/${bookingId}/users/${userId}`
      );
      console.log("User Deleted", res);

      // Remove the deleted user from the state
      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          courtroomBookings: user.courtroomBookings.filter(
            (booking) => booking._id !== userId
          ),
        }))
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteSelected = async () => {
    try {
      // Assuming you have a way to get bookingId from user data or selectedUserIds
      const deletePromises = selectedUserIds.map((userId) => {
        const user = userData
          .flatMap((user) => user.courtroomBookings)
          .find((booking) => booking._id === userId);
        const bookingId = user?.bookingId; // Modify if needed based on your data structure

        return axios.delete(
          `${NODE_API_ENDPOINT}/admin/bookings/${bookingId}/users/${userId}`
        );
      });

      await Promise.all(deletePromises);

      console.log("Selected Users Deleted");

      // Update the state to remove deleted users
      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          courtroomBookings: user.courtroomBookings.filter(
            (booking) => !selectedUserIds.includes(booking._id)
          ),
        }))
      );

      // Clear the selected user IDs after deletion
      setSelectedUserIds([]);
    } catch (e) {
      console.log("Error deleting selected users:", e);
    }
  };

  return (
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
      <div className="flex flex-col justify-center h-full w-full items-center px-20">
        <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
          {userAddDialog && (
            <UserDialog onClose={handleClose} isOpen={userAddDialog} />
          )}
          <div className="flex flex-col lg:flex-row w-full justify-between gap-2 items-start">
            <div className="flex flex-row items-center gap-3 mb-4 lg:mb-0">
              <button
                onClick={handleExport}
                className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div>
                  <Share />
                </div>
                <div className="font-semibold">Export</div>
              </button>

              <button
                onClick={handleOpen}
                className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div>
                  <Add />
                </div>
                <div className="font-semibold">Add User</div>
              </button>

              <button
                onClick={handleFilter}
                className="bg-transparent border-2 border-teal-500 shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center"
              >
                <div>
                  <FilterAltIcon />
                </div>
                <div className="font-semibold">Filter</div>
              </button>

              <button
                // onClick={handleDeleteSelected}
                className={`bg-card-gradient shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center ${
                  selectedUserIds.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedUserIds.length === 0}
              >
                <div>
                  <Delete />
                </div>
                <div className="font-semibold">
                  Delete ({selectedUserIds.length})
                </div>
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
                  .filter((user) => {
                    if (searchTerm === "" && filterDate === "") {
                      return true;
                    } else if (
                      (searchTerm === "" ||
                        user.courtroomBookings.some(
                          (booking) =>
                            booking.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            booking.email
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            booking.phoneNumber.includes(searchTerm)
                        )) &&
                      (filterDate === "" || user.date === filterDate)
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .flatMap((user) =>
                    user.courtroomBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-black/50 transition-all duration-300 border-b border-white"
                      >
                        <td className="p-2">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(
                                booking._id,
                                e.target.checked
                              )
                            }
                          />
                        </td>

                        <td className="p-2">{user.date}</td>
                        <td className="p-2">{user.hour}</td>
                        <td className="p-2">{booking.name}</td>
                        <td className="p-2">{booking.email}</td>
                        <td className="p-2">{booking.phoneNumber}</td>
                        <td className="p-2">
                          {booking.recording ? "true" : "false"}
                        </td>
                        <td className="p-2">{booking._id}</td>
                        <td className="p-2">
                          <Edit />
                        </td>
                        <td
                          className="p-2 cursor-pointer"
                          onClick={() =>
                            handleDeleteUser(booking?._id, user?._id)
                          }
                        >
                          <Delete />
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
        {deleteDialog ? (
          <div
            className="py-3"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: "0",
              right: "0",
              // backgroundColor: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "10",
            }}
          >
            <div className="m-32 w-full flex flex-col border-4 border-red-600 rounded bg-gradient-to-r from-[#008080] to-[#003131]">
              <div className="p-3 flex w-full justify-between items-center">
                <h5 className="m-0 px-1 font-bold">
                  Proceed with Deleting User ?
                </h5>
                <svg
                  className="h-10 w-10"
                  fill="white"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                    fill-rule="nonzero"
                  />
                </svg>
              </div>
              <div className="px-4 flex flex-col gap-1">
                <p className="text-white m-0">
                  User Name:{" "}
                  <span className="text-gray-400">{deleteUserIds?.name}</span>
                </p>
                <p className="text-white m-0">
                  Email: <span className="text-gray-400">john@gmail.com</span>
                </p>
                <p className="text-white m-0">
                  Date: <span className="text-gray-400">12 August</span>
                </p>
                <p className="text-white m-0">
                  Time: <span className="text-gray-400">13:00</span>
                </p>
              </div>
              <div className="flex justify-end p-2 ">
                <button
                  onClick={() => setDeleteFlag(true)}
                  className="bg-gradient-to-r from-[#008080] to-[#003131] border-2 border-white rounded py-2 px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default CourtRoomUsers;

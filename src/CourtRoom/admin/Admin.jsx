import { Add, Delete, Edit, Share, Check } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import UserDialog from "../../components/Dialogs/UserDialog";
import axios from "axios";

const CourtRoomUsers = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteUserIds, setDeleteUserIds] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    phoneNumber: "",
    recording: false,
  });

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/allCourtRoomData"
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

  const handleDeleteUser = (userId, bookingId) => {
    const user = userData
      .flatMap((user) => user.courtroomBookings)
      .find((booking) => booking._id === userId);
    setDeleteUserIds({ userId, bookingId });
    setUserToDelete(user);
    setDeleteDialog(true);
  };

  const confirmDeleteUser = async (user) => {
    setUserToDelete(user);
    const { userId, bookingId } = deleteUserIds;
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/bookings/${bookingId}/users/${userId}`
      );
      console.log("User Deleted", res);

      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          courtroomBookings: user.courtroomBookings.filter(
            (booking) => booking._id !== userId
          ),
        }))
      );

      setDeleteDialog(false);
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
          `http://localhost:8000/api/v1/admin/bookings/${bookingId}/users/${userId}`
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

  const handleEdit = (booking, user) => {
    setEditingUserId(booking._id);
    setEditFormData({
      date: user.date,
      time: user.hour,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      recording: booking.recording,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setEditFormData({ ...editFormData, [name]: fieldValue });
  };

  const handleEditConfirm = async (bookingId, userId) => {
    try {
      // Make a request to update the user data
      const res = await axios.put(
        `http://localhost:8000/api/v1/admin/bookings/${bookingId}/users/${userId}`,
        editFormData
      );
      console.log("User updated", res.data);

      // Update the state with the new data
      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          date: user._id === userId ? editFormData.date : user.date,
          hour: user._id === userId ? editFormData.time : user.hour,
          courtroomBookings: user.courtroomBookings.map((booking) =>
            booking._id === userId
              ? { ...booking, ...editFormData }
              : booking
          ),
        }))
      );

      setEditingUserId(null);
    } catch (e) {
      console.error("Error updating user data:", e);
    }
  };

  return (
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
      <div className="flex flex-col justify-center h-full w-full items-center ">
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
                onClick={handleDeleteSelected}
                className={`bg-card-gradient shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center ${
                  selectedUserIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={selectedUserIds.length === 0}
              >
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

                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="date"
                              name="date"
                              value={editFormData.date}
                              onChange={handleEditFormChange}
                              className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                            />
                          ) : (
                            user.date
                          )}
                        </td>
                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="time"
                              name="time"
                              value={editFormData.time}
                              onChange={handleEditFormChange}
                              className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                            />
                          ) : (
                            user.hour
                          )}
                        </td>
                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditFormChange}
                              className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                            />
                          ) : (
                            booking.name
                          )}
                        </td>
                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="email"
                              name="email"
                              value={editFormData.email}
                              onChange={handleEditFormChange}
                              className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                            />
                          ) : (
                            booking.email
                          )}
                        </td>
                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="text"
                              name="phoneNumber"
                              value={editFormData.phoneNumber}
                              onChange={handleEditFormChange}
                              className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                            />
                          ) : (
                            booking.phoneNumber
                          )}
                        </td>
                        <td className="p-2">
                          {editingUserId === booking._id ? (
                            <input
                              type="checkbox"
                              name="recording"
                              checked={editFormData.recording}
                              onChange={handleEditFormChange}
                              className="focus:outline-none"
                            />
                          ) : (
                            booking.recording ? "true" : "false"
                          )}
                        </td>
                        <td className="p-2">{booking._id}</td>
                        <td className="p-2 cursor-pointer">
                          {editingUserId === booking._id ? (
                            <Check
                              onClick={() =>
                                handleEditConfirm(booking.bookingId, booking._id)
                              }
                            />
                          ) : (
                            <Edit onClick={() => handleEdit(booking, user)} />
                          )}
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
                  onClick={() => setDeleteDialog(false)}
                >
                  <path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm4.292 6.707c-.391-.391-1.024-.391-1.415 0l-2.877 2.877-2.877-2.877c-.391-.391-1.024-.391-1.415 0-.391.391-.391 1.024 0 1.415l2.878 2.878-2.878 2.878c-.391.391-.391 1.024 0 1.415.391.391 1.024.391 1.415 0l2.877-2.878 2.877 2.878c.391.391 1.024.391 1.415 0 .391-.391.391-1.024 0-1.415l-2.878-2.878 2.878-2.878c.391-.391.391-1.024 0-1.415z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>

              <div className="px-4 mb-4">
                <p>
                  <strong>Name:</strong> {userToDelete.name}
                </p>
                <p>
                  <strong>Email:</strong> {userToDelete.email}
                </p>
                <p>
                  <strong>Phone No:</strong> {userToDelete.phoneNumber}
                </p>
                <p>
                  <strong>Record:</strong>{" "}
                  {userToDelete.recording ? "true" : "false"}
                </p>
              </div>
              <div className="w-full p-3 px-10 flex justify-end items-center">
                <button
                  className="flex justify-center items-center px-4 p-2 text-center bg-white text-teal-700 border-2 border-white rounded font-bold"
                  onClick={() => confirmDeleteUser(userToDelete)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourtRoomUsers;

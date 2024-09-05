import { React, useEffect, useState } from "react";
import UserDialog from "../../components/Dialogs/UserDialog";
import {
  Add,
  Check,
  CheckCircle,
  CheckCircleOutline,
  Delete,
  Edit,
} from "@mui/icons-material";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import toast from "react-hot-toast";
import AllowedDialog from "../../components/Dialogs/AllowedDialog";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const ClientCourtroom = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [userData, setUserData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
  const FetchUserData = async () => {
    try {
      const response = await axios.get(
        `${NODE_API_ENDPOINT}/admin/client/book-courtroom`
      );
      console.log(response);

      const userDataObject = response.data.data;

      // Assuming userDataObject is an object where each key represents a user or booking
      // Convert it to an array
      const userDataArray = Object.values(userDataObject);

      setUserData(userDataArray);
    } catch (error) {
      console.error("Error fetching user data", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `${NODE_API_ENDPOINT}/admin/client/book-courtroom/${userId}`
      );
      console.log("Booking deleted successfully");

      setUserData((prevUserData) =>
        prevUserData.filter((user) => user._id !== userId)
      );
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking", error);
      toast.error("Error deleting booking");
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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedUserIds.map((userId) =>
          axios.delete(
            `${NODE_API_ENDPOINT}//admin/client/book-courtroom/${userId}`
          )
        )
      );

      setUserData((prevUserData) =>
        prevUserData.filter((user) => !selectedUserIds.includes(user._id))
      );

      toast.success("Selected bookings deleted successfully");
    } catch (error) {
      console.error("Error deleting selected bookings", error);
      toast.error("Error deleting selected bookings");
    } finally {
      setSelectedUserIds([]); // Clear selected user IDs after deletion
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedUserData(user);
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${NODE_API_ENDPOINT}/admin/client/book-courtroom/${editingUserId}`,
        editedUserData
      );

      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === editingUserId ? editedUserData : user
        )
      );
      toast.success("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking", error);
      toast.error("Error updating booking");
    } finally {
      setEditingUserId(null);
      setEditedUserData({});
    }
  };

  const handleInputChange = (e, field) => {
    setEditedUserData({
      ...editedUserData,
      [field]: e.target.value,
    });
  };

  const handleClose = () => {
    setUserDialog(false);
    FetchUserData();
  };

  return (
    <>
      <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
        {/* user panel */}
        <div className="flex flex-col justify-center h-full w-full items-center relative">
          <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
            {/* user lists */}
            <div className="border-2 overflow-y-auto overflow-x-auto border-white w-full rounded-md">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-teal-500">
                    <th className="p-2 ">Select</th>
                    <th className="p-2 text-center">User ID</th>
                    <th className="p-2 text-center">Name</th>

                    <th className="p-2 text-center">Phone No.</th>
                    <th className="p-2 text-center">Email</th>
                    <th className="p-2 text-center">Domain</th>
                    <th className="p-2 text-center">Start Date</th>
                    <th className="p-2 text-center">End Date </th>
                    <th className="p-2 text-center">Recording</th>
                    <th className="p-2 text-center">Total HOurs</th>
                    <th className="p-2 text-center">Used Time</th>

                    <th className="p-2"></th>
                    <th className="p-2"></th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {userData
                    ?.filter((val) => {
                      if (searchTerm === "" && filterDate === "") {
                        return val;
                      } else if (
                        (searchTerm === "" ||
                          val.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          val.phoneNumber.includes(searchTerm)) &&
                        (filterDate === "" || val.date === filterDate)
                      ) {
                        return val;
                      }
                    })
                    .map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-black/50 transition-all duration-300 border-b border-white"
                      >
                        <td className="p-2">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(user._id, e.target.checked)
                            }
                          />
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedUserData.userId || ""}
                              onChange={(e) => handleInputChange(e, "userId")}
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.userId
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="date"
                              value={editedUserData.name || ""}
                              onChange={(e) => handleInputChange(e, "name")}
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.name
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedUserData.phoneNumber || ""}
                              onChange={(e) =>
                                handleInputChange(e, "phoneNumber")
                              }
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.phoneNumber
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedUserData.email || ""}
                              onChange={(e) => handleInputChange(e, "email")}
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.email
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedUserData.Domain || ""}
                              onChange={(e) => handleInputChange(e, "Domain")}
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.Domain
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="date"
                              value={editedUserData.StartDate || ""}
                              onChange={(e) =>
                                handleInputChange(e, "StartDate")
                              }
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            dayjs(user?.StartDate).format("YYYY-MM-DD")
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="date"
                              value={editedUserData.EndDate || ""}
                              onChange={(e) => handleInputChange(e, "EndDate")}
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            dayjs(user?.EndDate).format("YYYY-MM-DD")
                          )}
                        </td>
                        <td className="p-2 ">
                          {editingUserId === user.userId ? (
                            <select
                              value={user.recording}
                              onChange={(e) =>
                                handleInputChange(
                                  user.userId,
                                  "recording",
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-b-2 border-teal-500 outline-none"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          ) : (
                            user.recording
                          )}
                        </td>

                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedUserData.totalHours}
                              onChange={(e) =>
                                handleInputChange(e, "totalHours")
                              }
                              className="w-full bg-transparent border-2 border-gray-300 rounded p-1 text-white"
                            />
                          ) : (
                            user?.totalHours
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {user?.totalUsedHours}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => setOpen(true)}
                            className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center text-xs"
                          >
                            <div className="">User Custom Features</div>
                          </button>
                        </td>
                        <td className="p-2 text-center">
                          {editingUserId === user._id ? (
                            <button
                              onClick={handleSave}
                              className=" text-white font-semibold px-2 py-1 rounded"
                            >
                              <CheckCircleOutline />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(user)}
                              className=" text-white font-semibold px-2 py-1 rounded"
                            >
                              <Edit className="text-yellow-500 cursor-pointer" />
                            </button>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => confirmDelete(user)}
                            className=" text-white font-semibold px-2 py-1 rounded"
                          >
                            <Delete className="text-red-500 cursor-pointer" />
                          </button>
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
                      onClick={() => handleDelete(userToDelete._id)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div className="flex flex-row">new</div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="">new</div>
              </div>
            </div>
          </Box>
        </Modal>
      </section>
    </>
  );
};

export default ClientCourtroom;

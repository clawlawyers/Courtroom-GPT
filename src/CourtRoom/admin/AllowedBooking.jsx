import { React, useEffect, useState } from "react";
import UserDialog from "../../components/Dialogs/UserDialog";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import toast from "react-hot-toast";

const AllowedBooking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [userData, setUserData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setUserDialog(false);
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

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const userData = await axios.get(
          `${NODE_API_ENDPOINT}/admin/allAllowedBooking`
        );
        console.log(userData);
        // setUserData(userData.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Error fetching user data");
      }
    };
    FetchUserData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${NODE_API_ENDPOINT}/admin/AllowedBooking/${userId}`);
      console.log("Booking deleted successfully");
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  const handleEdit = async (userId, updatedData) => {
    // Implement your logic for editing user here
    try {
      // Implement your logic for editing user here
      await axios.patch(`${NODE_API_ENDPOINT}/admin/AllowedBooking/${userId}`, {
        ...updatedData,
      });
      console.log("Booking deleted successfully");
      console.log("User edited successfully");
      // Update the user data in the state after editing
      // const updatedUserData = userData.map((user) =>
      //   user.userId === userId? {...user, /* update user properties here */ } : user
      // );
      // setUserData(updatedUserData);
    } catch (error) {
      console.error("Error editing user", error);
      toast.error("Error editing user");
    }
  };

  const handleDeleteSelected = () => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => !selectedUserIds.includes(user.userId))
    );
    setSelectedUserIds([]); // Clear selected user IDs after deletion
  };
  return (
    <>
      <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
        {/* user panel */}
        <div className="flex flex-col justify-center h-full w-full items-center px-20 relative">
          <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
            {userAddDialog && <UserDialog onClose={handleClose} />}
            <div className="flex flex-col lg:flex-row w-full justify-between gap-2 items-start">
              {/* Export */}
              <div className="flex flex-row items-center gap-3 mb-4 lg:mb-0">
                <button
                  onClick={() => setUserDialog(true)}
                  className="bg-card-gradient shadow-lg space-x-1 p-2 px-2 rounded-md shadow-black text-white flex items-center"
                >
                  <div>
                    <Add />
                  </div>
                  <div className="font-semibold">Add booking Slot</div>
                </button>

                <button
                  onClick={handleDeleteSelected}
                  className={`bg-card-gradient  shadow-lg space-x-3 p-2 px-2 rounded-md shadow-black text-white flex items-center ${
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

            {/* user lists */}
            <div className="border-2 overflow-y-auto overflow-x-auto border-white w-full rounded-md">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-teal-500">
                    <th className="p-2">Select</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Start Hour</th>
                    <th className="p-2">End Hour</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone No</th>
                  </tr>
                </thead>
                <tbody>
                  {userData
                    .filter((val) => {
                      if (searchTerm === "" && filterDate === "") {
                        return val;
                      } else if (
                        (searchTerm === "" ||
                          val.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          val.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          val.phoneNo.includes(searchTerm)) &&
                        (filterDate === "" || val.date === filterDate)
                      ) {
                        return val;
                      }
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
                              handleCheckboxChange(
                                user.userId,
                                e.target.checked
                              )
                            }
                          />
                        </td>

                        <td className="p-2">{user.date}</td>
                        <td className="p-2">{user.time}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.phoneNo}</td>
                      </tr>
                    ))}
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
                    User Name: <span className="text-gray-400">John</span>
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
                  <button className="bg-gradient-to-r from-[#008080] to-[#003131] border-2 border-white rounded py-2 px-3">
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
    </>
  );
};

export default AllowedBooking;

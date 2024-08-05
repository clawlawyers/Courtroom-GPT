import { Add, Delete, Edit, Share } from "@mui/icons-material";
import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import UserDialog from "../../components/Dialogs/UserDialog";
import { useEffect } from "react";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";

const AllowedLogin = () => {
  const handleExport = () => {
    const csv = Papa.unparse(userData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "userData.csv");
  };
  // dummy data
  const [userData, setUserData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const response = await axios.get(
          `${NODE_API_ENDPOINT}/admin/getAllallowedLogin`
        );
    
        const userDataObject = response.data.data;
        console.log(userDataObject);
        
        // Flatten the data: each booking will become an individual item in the array
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
    };
  
    FetchUserData();
  }, []);
  


  const handleFilter = () => {
    // Set the filterDate state based on the selected date input
    // This will trigger the filtering of user data based on the date
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
    };
  };

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

  const handleDeleteSelected = () => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => !selectedUserIds.includes(user.userId))
    );
    setSelectedUserIds([]); // Clear selected user IDs after deletion
  };

  return (
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 p-5">
      {/* user panel */}
      <div className="flex flex-col justify-center h-full w-full items-center px-20">
        <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
          {userAddDialog && <UserDialog onClose={handleClose} />}
          <div className="flex flex-col lg:flex-row w-full justify-between gap-2 items-start">
            {/* Export */}
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
                onClick={() => setUserDialog(true)}
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
                      <td className="p-2">
                        <Delete />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllowedLogin;

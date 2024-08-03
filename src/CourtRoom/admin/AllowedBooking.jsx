import {React,useState} from 'react'
import UserDialog from '../../components/Dialogs/UserDialog';
import { Add, Delete, Edit } from "@mui/icons-material";

const AllowedBooking = () => {
    const [searchTerm, setSearchTerm] = useState("");
  const [userAddDialog, setUserDialog] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder,setSortOrder] = useState("asc");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [userData , setUserData] = useState([]);
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
    <section className="h-screen w-full flex flex-row justify-center items-center gap-5 py-5">
    
    {/* user panel */}
    <div className="flex flex-col justify-center h-full w-full items-center">
      <div className="flex relative flex-col rounded-lg h-full bg-black/30 w-full gap-3 p-3 shadow-md">
        {userAddDialog && 
          <UserDialog onClose={handleClose} />}
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
                selectedUserIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
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
                      val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    </div>
  </section>

  )
}

export default AllowedBooking
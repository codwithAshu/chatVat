import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import Input  from "./ui/input";
import button  from "./ui/button";
import { Card, CardContent } from "./ui/card";
import axios from "axios";
import "../styles/admin.css"
import { Search } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("firstname");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token");

      const res = await axios.post("https://chatbackend-ph5y.onrender.com/get-all-data/", null,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
const usersArray = res.data?.data || [];
      setUsers(usersArray);
      setFilteredUsers(usersArray);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };


const handleEdit = async (user) => {
  const newAccess = user.app_id === 1 ? 2 : 1;

  try {
    await axios.put(`https://chatbackend-ph5y.onrender.com/edit/${user.id}`, {
      app_id: newAccess,
    });

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, app_id: newAccess } : u
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    alert(`Access updated to ${newAccess === 1 ? "User" : "Admin"}`);
  } catch (error) {
    console.error("Error updating access:", error);
    alert("Failed to update access");
  }
};





  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://chatbackend-ph5y.onrender.com/delete-data/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(field);
    const sorted = [...filteredUsers].sort((a, b) => {
      const aValue = a[field].toString().toLowerCase();
      const bValue = b[field].toString().toLowerCase();
      if (order === "asc") return aValue.localeCompare(bValue);
      else return bValue.localeCompare(aValue);
    });
    setFilteredUsers(sorted);
  };

  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardContent className="flex items-center gap-4 p-4">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      <Table className="shadow-md rounded-xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead onClick={() => handleSort("firstname")} className="cursor-pointer">Name</TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer">Email</TableHead>
            <TableHead>Phone</TableHead>
             <TableHead>username</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phonenumber}</TableCell>
               <TableCell>{user.username}</TableCell>
              <TableCell>{user.app_id}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                   
                  <button
                    className="editbtn hover:bg-blue-600 text-green"
                   onClick={() => handleEdit(user)}

                  >
                    {user.app_id === 1 ? "Make Admin" : "Make User"}
                  </button>
                  <button
                    className="dltbtn "
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDashboard;

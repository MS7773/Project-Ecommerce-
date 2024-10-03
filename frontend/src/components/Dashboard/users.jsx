import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');  // Correct port: 3000
        // Filter to only include users with the role of 'user'
        const filteredUsers = response.data.data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600">Email</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600">Role</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 border-b border-gray-300">{user.name}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{user.role}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
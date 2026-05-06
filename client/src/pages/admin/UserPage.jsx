import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../redux/usersSlice'

const USERS_PER_PAGE = 5

const UserPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.data)
  const loading = useSelector(state => state.users.loading)
  const error = useSelector(state => state.users.error)
  const [filter, setFilter] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch, users])

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
    setCurrentPage(1)
  }

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete user: ${user.name}?`)) {
      try {
        // Make API call to delete user - point to backend server
        const response = await fetch(`https://cloth2cash.onrender.com/api/users/${user._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if you have auth
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to delete user')
        }

        // Refresh the users list after successful deletion
        dispatch(fetchUsers())
        alert('User deleted successfully')
      } catch (error) {
        alert('Failed to delete user: ' + (error.message || error))
        console.error('Delete error:', error)
      }
    }
  }

  const filteredUsers = users
    ? users.filter(user =>
        (user.name || '').toLowerCase().includes(filter.name.toLowerCase()) &&
        (user.email || '').toLowerCase().includes(filter.email.toLowerCase()) &&
        (user.phone || '').toLowerCase().includes(filter.phone.toLowerCase()) &&
        (user.address || '').toLowerCase().includes(filter.address.toLowerCase())
      )
    : []

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  )

  if (loading) return <div className="text-center py-8 text-gray-500">Loading users...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 ">
      <h2 className="text-2xl font-bold mb-8 text-green-700 text-center tracking-tight">User Management</h2>
      {/* Filter Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8 bg-white p-6 rounded-xl shadow border border-gray-200">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filter.email}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by Phone"
          value={filter.phone}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        />
        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          value={filter.address}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        />
      </div>

      {/* Table Section for desktop, Cards for mobile */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200 min-h-[400px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-600 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Created At</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">No users found</td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user._id || user.id || index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-green-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.address || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs transition"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card Section for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-white rounded-xl shadow">No users found</div>
        ) : (
          paginatedUsers.map((user, index) => (
            <div
              key={user._id || user.id || index}
              className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-green-700">{user.name || 'N/A'}</div>
                <div className="text-xs text-gray-400">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</div>
              </div>
              <div className="text-sm text-gray-700">Email: {user.email || 'N/A'}</div>
              <div className="text-sm text-gray-700">Phone: {user.phone || 'N/A'}</div>
              <div className="text-sm text-gray-700">Address: {user.address || 'N/A'}</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs transition"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {filteredUsers.length > USERS_PER_PAGE && (
        <div className="flex justify-center items-center gap-2 py-6 border-t border-gray-100 bg-gray-50 mt-4">
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          
          <span className="text-sm text-gray-600 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                currentPage === idx + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default UserPage
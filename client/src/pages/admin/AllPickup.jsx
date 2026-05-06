import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPickups, updatePickupStatus } from '../../redux/pickupsSlice';

const PICKUPS_PER_PAGE = 5;

const AllPickup = () => {
  const dispatch = useDispatch();
  const pickups = useSelector(state => state.pickups?.data || []);
  const loading = useSelector(state => state.pickups?.loading || false);
  const error = useSelector(state => state.pickups?.error);

  const [filter, setFilter] = useState({
    fullName: '',
    phone: '',
    city: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!pickups || pickups.length === 0) {
      dispatch(fetchPickups());
    }
  }, [dispatch, pickups]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (pickupId, newStatus) => {
    try {
      await dispatch(updatePickupStatus({ pickupId, status: newStatus })).unwrap();
      alert('Status updated successfully');
    } catch (error) {
      alert('Failed to update status: ' + error);
    }
  };

  const handleRowClick = (pickup) => {
    setSelectedPickup(pickup);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedPickup) {
      try {
        // Make API call to delete pickup - point to backend server
        const response = await fetch(`https://cloth2cash.onrender.com/api/pickups/${selectedPickup._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if you have auth
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to delete pickup')
        }

        // Refresh the pickups list after successful deletion
        dispatch(fetchPickups())
        alert('Pickup deleted successfully')
        setShowDeleteModal(false)
        setSelectedPickup(null)
      } catch (error) {
        alert('Failed to delete pickup: ' + (error.message || error))
        console.error('Delete error:', error)
        setShowDeleteModal(false)
        setSelectedPickup(null)
      }
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setSelectedPickup(null);
  };

  const filteredPickups = pickups.filter(pickup =>
    (pickup.fullName || '').toLowerCase().includes(filter.fullName.toLowerCase()) &&
    (pickup.phone || '').toLowerCase().includes(filter.phone.toLowerCase()) &&
    (pickup.city || '').toLowerCase().includes(filter.city.toLowerCase()) &&
    (pickup.status || 'scheduled').toLowerCase().includes(filter.status.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPickups.length / PICKUPS_PER_PAGE);
  const paginatedPickups = filteredPickups.slice(
    (currentPage - 1) * PICKUPS_PER_PAGE,
    currentPage * PICKUPS_PER_PAGE
  );

  if (loading) return <div className="text-center py-8 text-gray-500">Loading pickups...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 min-h-screen py-8">
      <h2 className="text-2xl font-bold mb-8 text-green-700 text-center tracking-tight">Pickup Orders Management</h2>
      {/* Filter Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8 bg-white p-6 rounded-xl shadow border border-gray-200">
        <input
          type="text"
          name="fullName"
          placeholder="Filter by Name"
          value={filter.fullName}
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
          name="city"
          placeholder="Filter by City"
          value={filter.city}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        />
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none min-w-[150px] bg-gray-50 focus:ring-2 focus:ring-green-200 transition"
        >
          <option value="">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table Section for desktop, Cards for mobile */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200 min-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-600 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedPickups.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">No pickup orders found</td>
              </tr>
            ) : (
              paginatedPickups.map((pickup, index) => (
                <tr
                  key={pickup._id}
                  onClick={() => handleRowClick(pickup)}
                  className={`transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-red-50 hover:shadow-md`}
                  title="Click to delete this pickup"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{pickup.fullName || 'N/A'}</div>
                      <div className="text-xs text-gray-500">ID: {pickup._id?.slice(-6) || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{pickup.phone || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{pickup.email || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm text-gray-900">{pickup.address || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{pickup.city || 'N/A'}, {pickup.pincode || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{pickup.date || 'N/A'}</div>
                      <div className="text-xs text-gray-500">
                        TimeSlot: {pickup.timeSlot || pickup.time_slot || pickup.time || pickup.slot || pickup.preferredTime || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {pickup.createdAt ? new Date(pickup.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900">
                        Qty: {pickup.estimatedQuantity || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        Types: {Array.isArray(pickup.clothTypes) ? pickup.clothTypes.join(', ') : 'N/A'}
                      </div>
                      {pickup.specialInstructions && (
                        <div className="text-xs text-gray-400 italic">
                          Note: {pickup.specialInstructions}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={pickup.status || 'scheduled'}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(pickup._id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`border rounded-lg px-3 py-1 text-sm font-medium ${
                        pickup.status === 'completed' 
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : pickup.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : pickup.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card Section for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedPickups.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-white rounded-xl shadow">No pickup orders found</div>
        ) : (
          paginatedPickups.map((pickup) => (
            <div
              key={pickup._id}
              onClick={() => handleRowClick(pickup)}
              className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col gap-2 cursor-pointer hover:bg-red-50 hover:shadow-md transition-colors"
              title="Tap to delete this pickup"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-green-700">{pickup.fullName || 'N/A'}</div>
                <div className="text-xs text-gray-400">ID: {pickup._id?.slice(-6) || 'N/A'}</div>
              </div>
              <div className="text-sm text-gray-700">Phone: {pickup.phone || 'N/A'}</div>
              <div className="text-sm text-gray-700">Email: {pickup.email || 'N/A'}</div>
              <div className="text-sm text-gray-700">Address: {pickup.address || 'N/A'}</div>
              <div className="text-sm text-gray-700">City: {pickup.city || 'N/A'} | Pincode: {pickup.pincode || 'N/A'}</div>
              <div className="text-sm text-gray-700">Date: {pickup.date || 'N/A'}</div>
              <div className="text-sm text-gray-700">
                TimeSlot: {pickup.timeSlot || pickup.time_slot || pickup.time || pickup.slot || pickup.preferredTime || 'N/A'}
              </div>
              <div className="text-sm text-gray-700">Qty: {pickup.estimatedQuantity || 'N/A'}</div>
              <div className="text-sm text-gray-700">
                Types: {Array.isArray(pickup.clothTypes) ? pickup.clothTypes.join(', ') : 'N/A'}
              </div>
              {pickup.specialInstructions && (
                <div className="text-xs text-gray-400 italic">
                  Note: {pickup.specialInstructions}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={pickup.status || 'scheduled'}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(pickup._id, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={`border rounded-lg px-3 py-1 text-xs font-medium ${
                    pickup.status === 'completed' 
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : pickup.status === 'cancelled'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : pickup.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      : 'bg-blue-100 text-blue-800 border-blue-300'
                  }`}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Created: {pickup.createdAt ? new Date(pickup.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Pickup Order</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete pickup order for <strong>{selectedPickup?.fullName}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredPickups.length > PICKUPS_PER_PAGE && (
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
  );
};

export default AllPickup;
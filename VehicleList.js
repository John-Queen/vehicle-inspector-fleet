import React, { useState } from 'react';

const VehicleList = () => {
  // Mock data for vehicles
  const initialVehicles = [
    { id: 1, registration: 'HK71 WPM', type: 'Truck', make: 'DAF', model: 'XF 106.460', status: 'Operational', lastInspection: '2025-03-24', driver: 'John Smith' },
    { id: 2, registration: 'LO70 KJH', type: 'Truck', make: 'Volvo', model: 'FH16 750', status: 'Maintenance', lastInspection: '2025-03-23', driver: 'Emma Johnson' },
    { id: 3, registration: 'BN69 TYU', type: 'Rigid', make: 'Mercedes-Benz', model: 'Actros 2545', status: 'Operational', lastInspection: '2025-03-22', driver: 'Robert Davis' },
    { id: 4, registration: 'PL19 RTE', type: 'Truck', make: 'Scania', model: 'R450', status: 'Out of Service', lastInspection: '2025-03-21', driver: 'Sarah Wilson' },
    { id: 5, registration: 'T-45982', type: 'Trailer', make: 'Schmitz', model: 'Curtainsider', status: 'Operational', lastInspection: '2025-03-20', driver: 'N/A' },
    { id: 6, registration: 'KL68 HJK', type: 'Truck', make: 'MAN', model: 'TGX 26.460', status: 'Operational', lastInspection: '2025-03-19', driver: 'Michael Brown' },
    { id: 7, registration: 'T-78945', type: 'Trailer', make: 'Krone', model: 'Flatbed', status: 'Maintenance', lastInspection: '2025-03-18', driver: 'N/A' },
    { id: 8, registration: 'VB67 TRE', type: 'Rigid', make: 'Renault', model: 'T480', status: 'Operational', lastInspection: '2025-03-17', driver: 'David Wilson' },
    { id: 9, registration: 'T-36925', type: 'Trailer', make: 'Schmitz', model: 'Refrigerated', status: 'Operational', lastInspection: '2025-03-16', driver: 'N/A' },
    { id: 10, registration: 'HJ66 KLO', type: 'Truck', make: 'DAF', model: 'CF 370', status: 'Operational', lastInspection: '2025-03-15', driver: 'Jennifer Lee' },
    { id: 11, registration: 'T-14785', type: 'Trailer', make: 'Krone', model: 'Tanker', status: 'Out of Service', lastInspection: '2025-03-14', driver: 'N/A' },
    { id: 12, registration: 'PO65 IUY', type: 'Rigid', make: 'Volvo', model: 'FM 380', status: 'Operational', lastInspection: '2025-03-13', driver: 'Thomas Brown' },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle type filter
  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting
  const filteredVehicles = vehicles
    .filter(vehicle => {
      // Apply type filter
      if (typeFilter !== 'All' && vehicle.type !== typeFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          vehicle.registration.toLowerCase().includes(searchLower) ||
          vehicle.make.toLowerCase().includes(searchLower) ||
          vehicle.model.toLowerCase().includes(searchLower) ||
          vehicle.status.toLowerCase().includes(searchLower) ||
          vehicle.driver.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (!sortConfig.key) return 0;
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle List</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="typeFilter"
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-40"
              value={typeFilter}
              onChange={handleTypeFilter}
            >
              <option value="All">All Types</option>
              <option value="Truck">Truck</option>
              <option value="Trailer">Trailer</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
              placeholder="Search registration, make, model..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div>
          <label className="invisible block text-sm font-medium text-gray-700 mb-1">Actions</label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Vehicle
          </button>
        </div>
      </div>
      
      {/* Vehicle Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('registration')}
              >
                Registration
                {sortConfig.key === 'registration' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('type')}
              >
                Type
                {sortConfig.key === 'type' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('make')}
              >
                Make & Model
                {sortConfig.key === 'make' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('status')}
              >
                Status
                {sortConfig.key === 'status' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('lastInspection')}
              >
                Last Inspection
                {sortConfig.key === 'lastInspection' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('driver')}
              >
                Driver
                {sortConfig.key === 'driver' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left font-medium">{vehicle.registration}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`
                      py-1 px-2 rounded-full text-xs
                      ${vehicle.type === 'Truck' ? 'bg-blue-200 text-blue-800' : ''}
                      ${vehicle.type === 'Trailer' ? 'bg-purple-200 text-purple-800' : ''}
                      ${vehicle.type === 'Rigid' ? 'bg-green-200 text-green-800' : ''}
                    `}>
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{vehicle.make} {vehicle.model}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`
                      py-1 px-2 rounded-full text-xs
                      ${vehicle.status === 'Operational' ? 'bg-green-200 text-green-800' : ''}
                      ${vehicle.status === 'Maintenance' ? 'bg-yellow-200 text-yellow-800' : ''}
                      ${vehicle.status === 'Out of Service' ? 'bg-red-200 text-red-800' : ''}
                    `}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{vehicle.lastInspection}</td>
                  <td className="py-3 px-6 text-left">{vehicle.driver}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
                        Inspect
                      </button>
                      <button className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No vehicles found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;
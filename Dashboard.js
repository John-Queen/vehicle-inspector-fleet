import React from 'react';

const Dashboard = () => {
  // Mock data for fleet overview
  const fleetData = {
    total: 87,
    trucks: 32,
    trailers: 41,
    rigids: 14,
    operational: 72,
    maintenance: 10,
    outOfService: 5,
    pendingInspections: 8,
    completedInspections: 79,
  };

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, vehicle: 'DAF XF 106.460', reg: 'HK71 WPM', action: 'Inspection Completed', status: 'Passed', date: '2025-03-24', user: 'John Smith' },
    { id: 2, vehicle: 'Volvo FH16 750', reg: 'LO70 KJH', action: 'Damage Reported', status: 'Critical', date: '2025-03-23', user: 'Emma Johnson' },
    { id: 3, vehicle: 'Mercedes-Benz Actros 2545', reg: 'BN69 TYU', action: 'Maintenance Scheduled', status: 'Pending', date: '2025-03-22', user: 'Robert Davis' },
    { id: 4, vehicle: 'Scania R450', reg: 'PL19 RTE', action: 'Inspection Completed', status: 'Failed', date: '2025-03-21', user: 'Sarah Wilson' },
    { id: 5, vehicle: 'Curtainsider Trailer', reg: 'T-45982', action: 'Assigned to Vehicle', status: 'Operational', date: '2025-03-20', user: 'Michael Brown' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fleet Dashboard</h1>
      
      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Fleet Overview</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Total Vehicles:</div>
            <div className="font-bold">{fleetData.total}</div>
            <div className="text-gray-600">Trucks:</div>
            <div className="font-bold">{fleetData.trucks}</div>
            <div className="text-gray-600">Trailers:</div>
            <div className="font-bold">{fleetData.trailers}</div>
            <div className="text-gray-600">Rigids:</div>
            <div className="font-bold">{fleetData.rigids}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Operational Status</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Operational:</div>
            <div className="font-bold text-green-600">{fleetData.operational}</div>
            <div className="text-gray-600">In Maintenance:</div>
            <div className="font-bold text-yellow-600">{fleetData.maintenance}</div>
            <div className="text-gray-600">Out of Service:</div>
            <div className="font-bold text-red-600">{fleetData.outOfService}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Inspection Status</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Pending:</div>
            <div className="font-bold text-yellow-600">{fleetData.pendingInspections}</div>
            <div className="text-gray-600">Completed:</div>
            <div className="font-bold text-green-600">{fleetData.completedInspections}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="flex flex-col space-y-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">New Inspection</button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Add Vehicle</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Generate Report</button>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Vehicle</th>
                <th className="py-3 px-6 text-left">Registration</th>
                <th className="py-3 px-6 text-left">Action</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">User</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{activity.vehicle}</td>
                  <td className="py-3 px-6 text-left">{activity.reg}</td>
                  <td className="py-3 px-6 text-left">{activity.action}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`
                      py-1 px-3 rounded-full text-xs
                      ${activity.status === 'Passed' ? 'bg-green-200 text-green-800' : ''}
                      ${activity.status === 'Failed' ? 'bg-red-200 text-red-800' : ''}
                      ${activity.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : ''}
                      ${activity.status === 'Critical' ? 'bg-red-200 text-red-800' : ''}
                      ${activity.status === 'Operational' ? 'bg-blue-200 text-blue-800' : ''}
                    `}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{activity.date}</td>
                  <td className="py-3 px-6 text-left">{activity.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
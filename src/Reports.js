import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('inspection');
  const [dateRange, setDateRange] = useState({ start: '2025-03-01', end: '2025-03-24' });
  
  // Mock report data
  const reportData = {
    inspection: {
      total: 42,
      passed: 35,
      failed: 7,
      byVehicleType: {
        trucks: 18,
        trailers: 16,
        rigids: 8
      },
      criticalIssues: 3,
      topIssues: [
        { issue: 'Brake system faults', count: 5 },
        { issue: 'Tire wear beyond limits', count: 4 },
        { issue: 'Lighting defects', count: 3 },
        { issue: 'Fluid leaks', count: 2 },
        { issue: 'Suspension problems', count: 2 }
      ]
    },
    maintenance: {
      scheduled: 12,
      completed: 9,
      pending: 3,
      averageDowntime: '2.3 days',
      costTotal: '£14,580',
      costByType: {
        preventive: '£5,240',
        corrective: '£9,340'
      }
    },
    compliance: {
      compliant: 82,
      nonCompliant: 5,
      expiringNext30Days: 7,
      byDocumentType: {
        registration: 0,
        insurance: 2,
        operatorLicense: 1,
        mot: 2
      }
    }
  };

  // Handle date range change
  const handleDateChange = (e, field) => {
    setDateRange({
      ...dateRange,
      [field]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fleet Reports</h1>
      
      {/* Report Controls */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <label className="block text-gray-700 mb-2">Report Type</label>
            <select
              className="border rounded p-2 w-full md:w-48"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="inspection">Inspection Summary</option>
              <option value="maintenance">Maintenance Report</option>
              <option value="compliance">Compliance Status</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="border rounded p-2"
              value={dateRange.start}
              onChange={(e) => handleDateChange(e, 'start')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="border rounded p-2"
              value={dateRange.end}
              onChange={(e) => handleDateChange(e, 'end')}
            />
          </div>
          
          <div className="md:ml-auto">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Inspection Summary Report */}
      {reportType === 'inspection' && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Inspection Summary Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-blue-600">{reportData.inspection.total}</div>
              <div className="text-gray-600">Total Inspections</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-green-600">{reportData.inspection.passed}</div>
              <div className="text-gray-600">Passed</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-red-600">{reportData.inspection.failed}</div>
              <div className="text-gray-600">Failed</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Inspections by Vehicle Type</h3>
              <div className="border rounded p-4">
                <div className="flex justify-between mb-2">
                  <span>Trucks</span>
                  <span className="font-semibold">{reportData.inspection.byVehicleType.trucks}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Trailers</span>
                  <span className="font-semibold">{reportData.inspection.byVehicleType.trailers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rigids</span>
                  <span className="font-semibold">{reportData.inspection.byVehicleType.rigids}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Top Issues Identified</h3>
              <div className="border rounded p-4">
                {reportData.inspection.topIssues.map((issue, index) => (
                  <div key={index} className="flex justify-between mb-2 last:mb-0">
                    <span>{issue.issue}</span>
                    <span className="font-semibold">{issue.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Print Report
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export PDF
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export CSV
            </button>
          </div>
        </div>
      )}
      
      {/* Maintenance Report */}
      {reportType === 'maintenance' && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Maintenance Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-blue-600">{reportData.maintenance.scheduled}</div>
              <div className="text-gray-600">Scheduled Maintenance</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-green-600">{reportData.maintenance.completed}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-yellow-600">{reportData.maintenance.pending}</div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Maintenance Costs</h3>
              <div className="border rounded p-4">
                <div className="flex justify-between mb-2">
                  <span>Total Cost</span>
                  <span className="font-semibold">{reportData.maintenance.costTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Preventive Maintenance</span>
                  <span className="font-semibold">{reportData.maintenance.costByType.preventive}</span>
                </div>
                <div className="flex justify-between">
                  <span>Corrective Maintenance</span>
                  <span className="font-semibold">{reportData.maintenance.costByType.corrective}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Performance Metrics</h3>
              <div className="border rounded p-4">
                <div className="flex justify-between mb-2">
                  <span>Average Downtime</span>
                  <span className="font-semibold">{reportData.maintenance.averageDowntime}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Completion Rate</span>
                  <span className="font-semibold">{Math.round((reportData.maintenance.completed / reportData.maintenance.scheduled) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Print Report
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export PDF
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export CSV
            </button>
          </div>
        </div>
      )}
      
      {/* Compliance Report */}
      {reportType === 'compliance' && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Compliance Status Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-green-600">{reportData.compliance.compliant}</div>
              <div className="text-gray-600">Compliant Vehicles</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-red-600">{reportData.compliance.nonCompliant}</div>
              <div className="text-gray-600">Non-Compliant</div>
            </div>
            
            <div className="border rounded p-4 text-center">
              <div className="text-4xl font-bold text-yellow-600">{reportData.compliance.expiringNext30Days}</div>
              <div className="text-gray-600">Expiring in 30 Days</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Non-Compliance by Document Type</h3>
            <div className="border rounded p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{reportData.compliance.byDocumentType.registration}</div>
                  <div className="text-gray-600">Registration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{reportData.compliance.byDocumentType.insurance}</div>
                  <div className="text-gray-600">Insurance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{reportData.compliance.byDocumentType.operatorLicense}</div>
                  <div className="text-gray-600">Operator License</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{reportData.compliance.byDocumentType.mot}</div>
                  <div className="text-gray-600">MOT Certificate</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Print Report
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export PDF
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
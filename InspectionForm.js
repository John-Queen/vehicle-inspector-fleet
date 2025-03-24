import React, { useState } from 'react';

const InspectionForm = ({ vehicleId }) => {
  // Mock vehicle data - in a real app, this would be fetched based on vehicleId
  const vehicle = {
    id: 1,
    registration: 'AB12 CDE',
    make: 'Volvo',
    model: 'FH16 750',
    year: '2023',
    type: 'Truck',
    fleetId: 'VT-7842',
    vin: 'YV4CZ982XMZ123456',
    driver: 'M. Johnson',
    mileage: '45,280 km',
    lastInspection: '2025-02-15',
    color: 'White'
  };

  const [activeTab, setActiveTab] = useState('3D');
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [damageMarkers, setDamageMarkers] = useState([]);
  
  // Tabs for different inspection categories
  const tabs = ['3D', 'Exterior', 'Interior', 'Mechanical', 'Compliance'];
  
  // Mock checklist items
  const checklistItems = {
    Exterior: [
      { id: 'ext1', label: 'Body Condition', checked: false },
      { id: 'ext2', label: 'Paint Condition', checked: false },
      { id: 'ext3', label: 'Windscreen & Windows', checked: false },
      { id: 'ext4', label: 'Lights & Indicators', checked: false },
      { id: 'ext5', label: 'Mirrors', checked: false },
      { id: 'ext6', label: 'Wheels & Tires', checked: false },
      { id: 'ext7', label: 'Trailer Coupling', checked: false },
    ],
    Interior: [
      { id: 'int1', label: 'Seat Condition', checked: false },
      { id: 'int2', label: 'Seatbelts', checked: false },
      { id: 'int3', label: 'Dashboard & Controls', checked: false },
      { id: 'int4', label: 'Warning Lights', checked: false },
      { id: 'int5', label: 'Horn', checked: false },
      { id: 'int6', label: 'Wipers & Washers', checked: false },
      { id: 'int7', label: 'Heating & Air Conditioning', checked: false },
    ],
    Mechanical: [
      { id: 'mech1', label: 'Engine Operation', checked: false },
      { id: 'mech2', label: 'Oil Level & Condition', checked: false },
      { id: 'mech3', label: 'Coolant Level', checked: false },
      { id: 'mech4', label: 'Brake System', checked: false },
      { id: 'mech5', label: 'Steering System', checked: false },
      { id: 'mech6', label: 'Transmission', checked: false },
      { id: 'mech7', label: 'Exhaust System', checked: false },
      { id: 'mech8', label: 'Suspension', checked: false },
    ],
    Compliance: [
      { id: 'comp1', label: 'Registration Current Present', checked: false },
      { id: 'comp2', label: 'Insurance Documentation', checked: false },
      { id: 'comp3', label: 'Operator License', checked: false },
      { id: 'comp4', label: 'Tachograph Calibration', checked: false },
      { id: 'comp5', label: 'MOT Certificate', checked: false },
      { id: 'comp6', label: 'Service History', checked: false },
    ],
  };

  // Handle checklist item toggle
  const handleChecklistToggle = (category, id) => {
    // In a real app, this would update the state properly
    console.log(`Toggled ${category} item ${id}`);
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Handle speech recognition
  const handleSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsRecording(!isRecording);
      // In a real app, this would start/stop speech recognition
      alert(isRecording ? 'Speech recognition stopped' : 'Speech recognition started');
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  // Handle text-to-speech
  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(notes);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  // Handle 3D model interaction
  const handle3DModelClick = (part, event) => {
    // In a real app, this would mark damage on the 3D model
    const severity = prompt('Select damage severity: minor, moderate, critical');
    if (severity) {
      setDamageMarkers([...damageMarkers, { part, severity, x: event.clientX, y: event.clientY }]);
      alert(`Marked ${severity} damage on ${part}`);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the inspection data to the server
    alert('Inspection submitted successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fleet Vehicle 3D Inspection</h1>
      
      {/* Vehicle Info Card */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-1">{vehicle.type.toUpperCase()}</span>
          </div>
          <div className="text-right">
            <div className="text-gray-600">Inspection Date</div>
            <input type="date" className="border rounded p-1" defaultValue="2025-03-24" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <div className="text-gray-600">Fleet ID</div>
            <div>{vehicle.fleetId}</div>
          </div>
          <div>
            <div className="text-gray-600">VIN</div>
            <div>{vehicle.vin}</div>
          </div>
          <div>
            <div className="text-gray-600">Assigned Driver</div>
            <div>{vehicle.driver}</div>
          </div>
          <div>
            <div className="text-gray-600">Last Recorded Mileage</div>
            <div>{vehicle.mileage}</div>
          </div>
          <div>
            <div className="text-gray-600">Last Inspection</div>
            <div>{vehicle.lastInspection}</div>
          </div>
          <div>
            <div className="text-gray-600">Color</div>
            <div>{vehicle.color}</div>
          </div>
          <div>
            <div className="text-gray-600">Current Mileage (km)</div>
            <input type="number" className="border rounded p-1 w-full" placeholder="Enter current mileage" />
          </div>
          <div>
            <div className="text-gray-600">Inspector Name</div>
            <input type="text" className="border rounded p-1 w-full" placeholder="Enter your name" />
          </div>
        </div>
      </div>
      
      {/* Inspection Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* 3D Model View */}
      {activeTab === '3D' && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">3D Inspection</h2>
          <div className="border rounded p-4 h-96 flex items-center justify-center bg-gray-100">
            {/* This would be a 3D model in a real app */}
            <div className="text-center">
              <div className="text-gray-500 mb-4">Interactive 3D Model would appear here</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Cabin', 'Engine', 'Chassis', 'Wheels', 'Trailer Coupling', 'Fuel Tanks', 'Axles', 'Suspension'].map(part => (
                  <button
                    key={part}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                    onClick={(e) => handle3DModelClick(part, e)}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {damageMarkers.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Damage Report</h3>
              <ul className="mt-2">
                {damageMarkers.map((marker, index) => (
                  <li key={index} className="mb-1">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      marker.severity === 'minor' ? 'bg-yellow-500' :
                      marker.severity === 'moderate' ? 'bg-orange-500' : 'bg-red-500'
                    }`}></span>
                    {marker.part}: {marker.severity} damage
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Checklist Views */}
      {activeTab !== '3D' && checklistItems[activeTab] && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{activeTab} Inspection</h2>
          <div className="space-y-2">
            {checklistItems[activeTab].map(item => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.checked}
                  onChange={() => handleChecklistToggle(activeTab, item.id)}
                  className="mr-2 h-5 w-5"
                />
                <label htmlFor={item.id} className="text-gray-800">{item.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Notes Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Notes</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleSpeechRecognition}
              className={`p-2 rounded ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              title="Speech to text"
            >
              🎤
            </button>
            <button
              onClick={handleTextToSpeech}
              className="p-2 rounded bg-gray-200"
              title="Text to speech"
              disabled={!notes}
            >
              🔊
            </button>
          </div>
        </div>
        <textarea
          className="w-full border rounded p-2 h-32"
          placeholder="Enter inspection notes here..."
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Inspection
        </button>
      </div>
    </div>
  );
};

export default InspectionForm;
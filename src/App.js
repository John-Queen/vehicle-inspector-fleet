import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import VehicleList from './components/VehicleList';
import InspectionForm from './components/InspectionForm';
import Reports from './components/Reports';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const handleNavigate = (page, vehicleId = null) => {
    setActivePage(page);
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'vehicles':
        return <VehicleList onNavigate={handleNavigate} />;
      case 'inspection':
        return <InspectionForm vehicleId={selectedVehicleId} />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activePage={activePage} onNavigate={handleNavigate} />
      <main className="container mx-auto py-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
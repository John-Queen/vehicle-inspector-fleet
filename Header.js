import React from 'react';

const Header = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'inspection', label: 'New Inspection' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          Vehicle Inspector
        </h1>
        
        <nav>
          <ul className="flex space-x-1 md:space-x-4">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`px-3 py-2 rounded ${activePage === item.id ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-2">
          <button className="p-2 rounded hover:bg-blue-500">
            <span role="img" aria-label="notifications">u{1F514}</span>
          </button>
          <button className="p-2 rounded hover:bg-blue-500">
            <span role="img" aria-label="user">u{1F464}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
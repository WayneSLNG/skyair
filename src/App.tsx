import React, { useState } from 'react';
import FlightSummary from './FlightSummary';
import FlightSearch, { FlightSearchData } from './FlightSearch';
import Navbar from './navbar';
import './App.css';


const App: React.FC = () => {
  const [searchData, setSearchData] = useState<FlightSearchData | null>(null);

  const handleSearch = (searchData: FlightSearchData) => {
    setSearchData(searchData);
  };

  const handleBackToSearch = () => {
    setSearchData(null);
  };

  const places: string[] = ['Place 1', 'Place 2', 'Place 3'];

  return (
    <div className='homepage'>
      <Navbar />
      {}
      {searchData !== null ? (
        <FlightSummary searchData={searchData} onBack={handleBackToSearch} onProceed={function (): void {
                  throw new Error('Function not implemented.');
              } } />
      ) : (
        <FlightSearch places={places} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;

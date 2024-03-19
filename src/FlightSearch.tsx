import React, { useState } from "react";
import "./flightsearch.css";

interface FlightSearchProps {
  places: string[];
  onSearch: (searchData: FlightSearchData) => void;
}

export interface FlightSearchData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  tripType: "one-way" | "round-trip";
}

const FlightSearch: React.FC<FlightSearchProps> = ({ places, onSearch }) => {
  const [searchData, setSearchData] = useState<FlightSearchData>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    tripType: "one-way",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleTripTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      tripType: e.target.value as "one-way" | "round-trip",
    });
  };

  const handleSearch = () => {
    console.log("Search data:", searchData);
    const totalPassengers =
      parseInt(searchData.adults.toString()) +
      parseInt(searchData.children.toString()) +
      parseInt(searchData.infants.toString());
    console.log("Total passengers:", totalPassengers);
    if (totalPassengers > 9) {
      alert("Total number of passengers cannot exceed 9.");
      return;
    }
    onSearch(searchData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center mb-3">Search Flight</h2>
        <div className="radio-container">
          <label className="form-check-label me-3">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              className="form-check-input me-1"
              checked={searchData.tripType === "one-way"}
              onChange={handleTripTypeChange}
            />
            One-way
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              className="form-check-input me-1"
              checked={searchData.tripType === "round-trip"}
              onChange={handleTripTypeChange}
            />
            Round-trip
          </label>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="origin" className="form-label">
              From:
            </label>
            <select
              id="origin"
              name="origin"
              className="form-select"
              value={searchData.origin}
              onChange={handleInputChange}
            >
              <option value="">Select Origin</option>
              {places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="destination" className="form-label">
              To:
            </label>
            <select
              id="destination"
              name="destination"
              className="form-select"
              value={searchData.destination}
              onChange={handleInputChange}
            >
              <option value="">Select Destination</option>
              {places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="departureDate" className="form-label">
              Depart:
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={searchData.departureDate}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          {searchData.tripType === "round-trip" && (
            <div className="col">
              <label htmlFor="returnDate" className="form-label">
                Return:
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={searchData.returnDate}
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="adults" className="form-label">
            Adults:
          </label>
          <input
            type="number"
            id="adults"
            name="adults"
            value={searchData.adults}
            min={1}
            max={9}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="children" className="form-label">
            Children:
          </label>
          <input
            type="number"
            id="children"
            name="children"
            value={searchData.children}
            min={0}
            max={9}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="infants" className="form-label">
            Infants:
          </label>
          <input
            type="number"
            id="infants"
            name="infants"
            value={searchData.infants}
            min={0}
            max={9}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="card-body">
          <div className="btn-container">
            <button onClick={handleSearch} className="btn btn-primary">
              Search flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;

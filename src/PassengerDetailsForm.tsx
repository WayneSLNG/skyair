import React, { useState } from "react";

interface PassengerDetailsFormProps {
  onSubmit: (details: PassengerDetails) => void;
  passengerType: string;
}

export interface PassengerDetails {
  firstname: string;
  middlename: string;
  lastname: string;
  birthday: string;
  nationality: string;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  onSubmit,
  passengerType,
}) => {
  const [firstname, setFirstname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: PassengerDetails = {
      firstname,
      middlename,
      lastname,
      birthday,
      nationality,
    };
    onSubmit(details);
    setFirstname("");
    setMiddlename("");
    setLastname("");
    setBirthday("");
    setNationality("");
  };

  return (
      <div className="card-body mb-3">
        <form onSubmit={handleSubmit}>
          <h4 className="card-title text-center mb-4">Passenger ({passengerType})</h4>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstname" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="middlename" className="form-label">
                Middle Name:
              </label>
              <input
                type="text"
                id="middlename"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="lastname" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="birthday" className="form-label">
                Birthday:
              </label>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="nationality" className="form-label">
                Nationality:
              </label>
              <select
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="form-control"
              >
                <option value="">Select Nationality</option>
                <option value="American">American</option>
                <option value="Filipino">Filipino</option>
                <option value="Chinese">Chinese</option>
                {}
              </select>
            </div>
          </div>
          <div className="row"></div>
        </form>
      </div>
  );
};

export default PassengerDetailsForm;

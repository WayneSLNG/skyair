import React, { useState, useEffect } from "react";
import { FlightSearchData } from "./FlightSearch";
import { computeTotalPrice } from "./FlightComputation";
import PassengerDetailsForm, { PassengerDetails } from "./PassengerDetailsForm";

interface FlightSummaryProps {
  searchData: FlightSearchData;
  onBack: () => void;
  onProceed: () => void;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  searchData,
  onBack,
  onProceed,
}) => {
  const [showPassengerForm, setShowPassengerForm] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>(
    []
  );

  useEffect(() => {
    setTotalPrice(computeTotalPrice(searchData));
  }, [searchData]);

  const handleApplyPromoCode = () => {
    if (promoApplied) {
      console.log("Promo code has already been applied");
      return;
    }

    if (promoCode === "SAVE10") {
      const discountedPrice = totalPrice * 0.9;
      setTotalPrice(discountedPrice);
      setPromoApplied(true);
    } else {
      console.log("Invalid promo code");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
    setPromoApplied(false);
  };

  const togglePassengerForm = () => {
    setShowPassengerForm(!showPassengerForm);
  };

  const handleSubmitPassengerDetails = (details: PassengerDetails) => {
    setPassengerDetails([...passengerDetails, details]);
  };

  const renderPassengerDetailsForms = () => {
    const forms: JSX.Element[] = [];

    for (let i = 0; i < searchData.adults; i++) {
      forms.push(
        <PassengerDetailsForm
          key={`adult_${i}`}
          onSubmit={handleSubmitPassengerDetails}
          passengerType="Adult"
        />
      );
    }

    for (let i = 0; i < searchData.children; i++) {
      forms.push(
        <PassengerDetailsForm
          key={`child_${i}`}
          onSubmit={handleSubmitPassengerDetails}
          passengerType="Child"
        />
      );
    }

    for (let i = 0; i < searchData.infants; i++) {
      forms.push(
        <PassengerDetailsForm
          key={`infant_${i}`}
          onSubmit={handleSubmitPassengerDetails}
          passengerType="Infant"
        />
      );
    }

    return forms;
  };

  return (
    <div className="card mb-6" style={{ width: "800px" }}>
      <div className="card-body">
        {showPassengerForm ? (
          <div>
            {renderPassengerDetailsForms()}
            <div className="col">
              <label className="form-check-label" style={{ fontWeight: "bold" }}>Total Price</label>
              <p
                className="mb-3 d-flex"
                style={{
                  border: "1px solid #D3D3D3",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                ${totalPrice}
              </p>
            </div>

            <div className="btn-container mt-4 mb-3">
              <button onClick={onBack} className="btn btn-primary me-2">
                Back
              </button>
              <button onClick={onProceed} className="btn btn-primary">
                Proceed
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flight-summary-container"
              style={{ padding: "20px" }}
            >
              <h2 className="text-center mb-3">Flight Summary</h2>

              <label
                className="form-check-label"
                style={{ fontWeight: "bold" }}
              >
                Flight Type
              </label>
              <p
                style={{
                  border: "1px solid #D3D3D3",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                {searchData.tripType}
              </p>

              <div className="row">
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    From
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.origin}
                  </p>
                </div>
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    To
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.destination}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Departure Date
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.departureDate}
                  </p>
                </div>
                <div className="col">
                  {searchData.tripType === "round-trip" && (
                    <>
                      <label
                        className="form-check-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Return Date
                      </label>
                      <p
                        style={{
                          border: "1px solid #D3D3D3",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      >
                        {searchData.returnDate}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Adult
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.adults}
                  </p>
                </div>
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Children
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.children}
                  </p>
                </div>
                <div className="col">
                  <label
                    className="form-check-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Infants
                  </label>
                  <p
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {searchData.infants}
                  </p>
                </div>
              </div>

              <label
                className="form-check-label"
                style={{ fontWeight: "bold" }}
              >
                Total Price
              </label>
              <p
                className="mb-3 d-flex"
                style={{
                  border: "1px solid #D3D3D3",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                ${totalPrice}
              </p>
            </div>

            <div className="btn-container">
              <div className="col">
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{
                    width: "300px",
                    marginLeft: "323px",
                  }}
                  placeholder="Enter Promo Code"
                />
              </div>

              <div className="col">
                <button
                  onClick={handleApplyPromoCode}
                  className="btn btn-primary apply smaller-button"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="btn-container mt-5 mb-3">
              <button onClick={onBack} className="btn btn-primary me-2">
                Back
              </button>
              <button onClick={togglePassengerForm} className="btn btn-primary">
                Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlightSummary;

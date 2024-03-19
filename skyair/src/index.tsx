import App from './App';
import { BookingDetails } from '.../types'; // Adjust the path as per your file structure and the actual name of the interface file

const mockOnBookingComplete = (bookingDetails: BookingDetails) => {
  console.log('Booking Details:', bookingDetails);
  // Add your desired handling of the booking details here
};

ReactDOM.render(
  <React.StrictMode>
    <App onBookingComplete={mockOnBookingComplete} />
  </React.StrictMode>,
  document.getElementById('root')
);

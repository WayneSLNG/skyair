import { FlightSearchData } from './FlightSearch';

export function computeTotalPrice(searchData: FlightSearchData): number {
  
    let totalPrice = 0;
   
    totalPrice += searchData.adults * 100; 
    totalPrice += searchData.children * 50; 
    totalPrice += searchData.infants * 25;
    return totalPrice;
}

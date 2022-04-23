import { useCallback, useEffect, useState } from "react";

const headers = [
  "FlightNo",
  "Date",
  "Time",
  "PortOfCallA",
  "Status",
  "Airline",
  "Image"
];

const filteredFlights = (flights) => {
  return flights.reduce((list, flight) => {
    // 1 hours in milisecons
    let oneHour = 1 * 60 * 60 * 1000;
    let now = new Date();
    let flightTime = new Date(flight["dateTime"]);
    // ignore flights older than 3 hours and those scheduled 5 hours later
    if (now - flightTime > 3 * oneHour || flightTime - now > 5 * oneHour) {
      return list;
    }
    return list.concat([
      headers.map((header) => {
        return flight[header];
      })
    ]);
  }, []);
};

const useFlights = (type, timeStamp) => {
  const URL = "https://kabrudlev2.edinburghairport.com/api/flights/" + type;
  const [flights, setFlights] = useState(null);

  const fetchArrivals = useCallback(async () => {
    let apiResponse, flights;
    try {
      apiResponse = await fetch(URL);
      if (!apiResponse.ok) {
        throw new Error(apiResponse.statusText);
      }
      flights = await apiResponse.json();
      if (!flights) {
        throw new Error("Arrivals JSON parse was not successfull.");
      }
    } catch (error) {
      console.error(error);
      return;
    }
    setFlights(filteredFlights(flights));
  }, [URL]);

  useEffect(() => fetchArrivals(), [fetchArrivals, timeStamp]);

  return [flights, fetchArrivals];
};

export default useFlights;

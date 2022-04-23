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

const filteredFlights = (flights) => {
  return flights.reduce((list, flight) => {
    // 1 hours in milisecons
    let oneHour = 1 * 60 * 60 * 1000;
    let now = new Date();
    let flightTime = new Date(flight["dateTime"]);
    let isAirborne = (status) => status.startsWith("AIRBORNE");
    // ignore flights older than 5 hours if airborne and those scheduled 5 hours later
    if (
      (now - flightTime > 5 * oneHour && isAirborne(flight["Status"])) ||
      flightTime - now > 5 * oneHour
    ) {
      return list;
    }
    return list.concat([
      headers.map((header) => {
        return flight[header];
      })
    ]);
  }, []);
};

export default useFlights;

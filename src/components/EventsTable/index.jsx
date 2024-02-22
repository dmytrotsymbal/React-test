import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/ApiService";
import CustomLoader from "../ui/CustomLoader";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
} from "@mui/material";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        if (eventsData) {
          setEvents(eventsData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch events data:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CustomLoader />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Event ID</TableCell>
                <TableCell align="center">Employee ID</TableCell>
                <TableCell align="center">Room ID</TableCell>
                <TableCell align="center">Event Type</TableCell>
                <TableCell align="center">Access Denied</TableCell>
                <TableCell align="center">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{event.eventId}</TableCell>
                  <TableCell align="center">{event.employeeId}</TableCell>
                  <TableCell align="center">{event.roomId}</TableCell>
                  <TableCell align="center">{event.eventType}</TableCell>
                  {event.accessDenied ? (
                    <TableCell align="center">Дозволено</TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      Заборонено
                    </TableCell>
                  )}

                  <TableCell align="center">
                    {new Date(event.eventTimestamp).toLocaleString("uk-UA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default EventsTable;

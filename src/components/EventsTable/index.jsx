import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  Pagination,
} from "@mui/material";
import { getEvents, getEventsCount } from "../../services/ApiService";
import CustomLoader from "../ui/CustomLoader";
import EmptyListBlock from "../ui/EmptyListBlock";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const totalCount = await getEventsCount();
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (error) {
        console.error("Error fetching total events count:", error);
      }
    };

    fetchTotalCount();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents(currentPage, pageSize);
        if (eventsData) {
          setEvents(eventsData);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setLoading(true);
  };

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
      ) : events.length > 0 ? (
        <>
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
                {!events ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <EmptyListBlock />
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event, index) => (
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
                        {new Date(event.eventTimestamp).toLocaleString(
                          "uk-UA",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      ) : (
        <EmptyListBlock />
      )}
    </>
  );
};

export default EventsTable;

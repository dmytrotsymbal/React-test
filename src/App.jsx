import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLoader from "./components/ui/CustomLoader";

const EmployeePage = React.lazy(() => import("./pages/EmployeePage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));
const EmployeeEditPage = React.lazy(() => import("./pages/EmployeeEditPage"));
const EmployeeAddPage = React.lazy(() => import("./pages/EmployeeAddPage"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Suspense
          fallback={
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
          }
        >
          <Routes>
            <Route path="/" element={<EmployeePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/create" element={<EmployeeAddPage />} />
            <Route path="/edit/:id" element={<EmployeeEditPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
};

export default App;

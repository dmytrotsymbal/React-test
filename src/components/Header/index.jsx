import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6">
              TEST <i>Service</i>
            </Typography>
            <Box style={{ marginLeft: "auto" }}>
              <Link to="/" sx={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Employees List</Button>
              </Link>

              <Link to="/events" sx={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Events List</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

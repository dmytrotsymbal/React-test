import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { createEmployee, getDepartments } from "../../services/ApiService";
import { Link } from "react-router-dom";
import CustomSnackbar from "../ui/CustomSnackbar";

const EmployeeAddForm = () => {
  //==================FETCH DEPARTMENTS==================
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  //====================================================

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]*$/, "Ім'я має містити лише літери")
      .required("Ім'я є обов'язковим"),
    position: Yup.string()
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]*$/, "Ім'я має містити лише літери")
      .required("Посада є обов'язковою"),
    departmentId: Yup.number()
      .typeError("Номер відділу є обов'язковим")
      .required("Номер відділу є обов'язковим")
      .max(departments.length, "Всього 4 відділи"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      departmentId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newEmployee = await createEmployee(values);
        console.log("New employee created:", newEmployee);
        resetForm({});
      } catch (error) {
        console.error("Failed to create new employee:", error);
      }
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography variant="h5">Create New Employee</Typography>

        <Button
          variant="contained"
          component={Link}
          to="/"
          color="primary"
          size="small"
        >
          Go to List
        </Button>
      </Box>
      <br />
      <hr />
      <form onSubmit={formik.handleSubmit} style={{ width: "400px" }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="position"
          name="position"
          label="Position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="departmentId-label"
            id="departmentId"
            name="departmentId"
            label="Department"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
          >
            {departments.map((department) => (
              <MenuItem
                key={department.departmentId}
                value={department.departmentId}
              >
                {department.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.departmentId && formik.errors.departmentId && (
            <Typography color="error" variant="caption" display="block">
              {formik.errors.departmentId}
            </Typography>
          )}
        </FormControl>

        <Button
          sx={{ marginTop: "20px" }}
          color="success"
          onClick={formik.isValid && formik.dirty ? handleSnackbarOpen : null}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        message="Ви успішно створили нового співробітника"
      />
    </>
  );
};

export default EmployeeAddForm;

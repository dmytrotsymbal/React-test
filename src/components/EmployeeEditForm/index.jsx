import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { getEmployee, putEmployee } from "../../services/ApiService";
import CustomSnackbar from "../ui/CustomSnackbar";

const EmployeeEditForm = () => {
  const { id } = useParams(); // получаем ID из URL

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]*$/, "Ім'я має містити лише літери")
      .required("Ім'я обов'язкове"),
    position: Yup.string()
      .matches(
        /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]*$/,
        "Посада має містити лише літери"
      )
      .required("Посада обов'язкова"),
    departmentId: Yup.number()
      .required("ID відділу обов'язковий")
      .typeError("ID відділу має бути числом")
      .max(4, "Всього 4 відділи"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      departmentId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await putEmployee(id, values);
      } catch (error) {
        console.error("Failed to update employee:", error);
      }
    },
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployee(id);
        formik.setValues(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

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
        <Typography variant="h5">Edit Employee</Typography>
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
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <TextField label="Id" name="id" value={id} margin="normal" disabled />
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          label="Position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          margin="normal"
        />
        {/* <TextField
          label="Department"
          name="departmentId"
          value={formik.values.departmentId}
          onChange={formik.handleChange}
          error={
            formik.touched.departmentId && Boolean(formik.errors.departmentId)
          }
          helperText={formik.touched.departmentId && formik.errors.departmentId}
          margin="normal"
        /> */}

        <FormControl margin="normal">
          <InputLabel id="departmentId-label">Department</InputLabel>
          <Select
            labelId="departmentId-label"
            label="Department"
            name="departmentId"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
          >
            <MenuItem value={1}>1 (IT)</MenuItem>
            <MenuItem value={2}>2 (Маркетинг)</MenuItem>
            <MenuItem value={3}>3 (Фінанси)</MenuItem>
            <MenuItem value={4}>4 (Охорона)</MenuItem>
          </Select>
          {formik.touched.departmentId && formik.errors.departmentId && (
            <Typography color="error" variant="caption">
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
          Save Changes
        </Button>
      </form>

      <CustomSnackbar
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        message="Ви успішно змінили данні співробітника"
      />
    </>
  );
};

export default EmployeeEditForm;

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { string, object } from "yup";

const validationSchema = object({
  name: string()
    .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]*$/, "Ім'я має містити лише літери")
    .required("Ім'я є обов'язковим"),
});

const SearchComponent = ({ onSearch, onReset }) => {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSchema}
      onSubmit={({ name }, { setSubmitting, resetForm }) => {
        onSearch(name);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              mb: 5,
            }}
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Field
                name="name"
                as={TextField}
                label="Пошук за іменем..."
                fullWidth
                size="small"
                sx={{ width: "250px" }}
                error={Boolean(<ErrorMessage name="name" />)}
                helperText={
                  <ErrorMessage
                    style={{ position: "absolute" }}
                    name="name"
                    component="div"
                  />
                }
              />

              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Search
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  resetForm();
                  onReset();
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SearchComponent;


import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

interface TaskDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (values: unknown) => void; // Update the type of handleSave to accept an argument
}

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  priority: Yup.string().required("Priority is required"),
  date: Yup.date().required("Due Date is required"),
  description: Yup.string().required("Description is required"),
});

const TaskDialog = ({ open, handleClose, handleSave }: TaskDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
          padding: "20px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          animation:open
            ? "bounceIn 0.7s ease-out"
            : "none",
          "@keyframes bounceIn": {
            "0%": { transform: "translateY(100%)" },
            "60%": { transform: "translateY(-15px)" },
            "80%": { transform: "translateY(10px)" },
            "100%": { transform: "translateY(0)" },
          },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Add Task
      </DialogTitle>

      <Formik
        initialValues={{ title: "", priority: "", date: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSave(values);
          handleClose();
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <DialogContent sx={{ flex: 1, overflowY: "auto" }}>
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <label>Title</label>
                  <Field
                    as={TextField}
                    fullWidth
                    name="title"
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    sx={{ "& .MuiInputBase-root": { borderRadius: "10px" } }}
                  />
                </Grid>

              
                <Grid item xs={12} sm={6}>
  <label>Priority</label>
  <Field name="priority">
     {({ field, form }: FieldProps) => {
      const priorityColor =
        field.value === "low"
          ? "#388E3C"
          : field.value === "medium"
          ? "#FBC02D"
          : field.value === "high"
          ? "#D32F2F"
          : "black"; 

      return (
        <TextField
          {...field}
          select
          fullWidth
          onChange={(e) => form.setFieldValue("priority", e.target.value)}
          error={touched.priority && Boolean(errors.priority)}
          helperText={touched.priority && errors.priority}
          sx={{
            "& .MuiInputBase-root": { borderRadius: "10px", color: priorityColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: priorityColor },
            },
          }}
        >
          <MenuItem value="low" sx={{ color: "#388E3C" }}>Low</MenuItem>
          <MenuItem value="medium" sx={{ color: "#FBC02D" }}>Medium</MenuItem>
          <MenuItem value="high" sx={{ color: "#D32F2F" }}>High</MenuItem>
        </TextField>
      );
    }}
  </Field>
</Grid>

                <Grid item xs={12} sm={6}>
                  <label>Due Date</label>
                  <Field
                    as={TextField}
                    fullWidth
                    name="date"
                    type="date"
                    onChange={handleChange}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    sx={{ "& .MuiInputBase-root": { borderRadius: "10px" } }}
                  />
                </Grid>

              
                <Grid item xs={12}>
                  <label>Description</label>
                  <Field
                    as={TextField}
                    fullWidth
                    name="description"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ "& .MuiInputBase-root": { borderRadius: "10px" } }}
                  />
                </Grid>
              </Grid>
            </DialogContent>

       
            <DialogActions
              sx={{
                position: "sticky",
       
                background: "white",
                gap: "5px",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "gray",
                  flex: 1,
                  minWidth: "100px",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#6915B4",
                  flex: 1,
                  minWidth: "100px",
                  "&:hover": { background: "#4b0e80" },
                }}
              >
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TaskDialog;

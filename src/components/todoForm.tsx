import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

const statusOptions = ["pending", "cancelled", "completed"];

interface Props {
  handleSubmit: (
    todoData: {
      title: string;
      description: string;
      status: string;
    },
    e: React.FormEvent
  ) => void;
  initialData?: { title: string; description: string; status: string };
  isEdit?: boolean;
  formData: { title: string; description: string; status: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ title: string; description: string; status: string }>
  >;
}

const TodoForm: React.FC<Props> = ({
  handleSubmit,
  initialData,
  isEdit = false,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Edit Todo" : "Create New Todo"}
      </Typography>
      <Box component="form">
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              //   required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              //   required
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <Button
              onClick={(e) => handleSubmit(formData, e)}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {isEdit ? "Update Todo" : "Add Todo"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TodoForm;

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import PaginationComponent from "./paginationComponent";

interface Todo {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface Props {
  todos: Todo[];
  totalPages: number;
  pageNo: number;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string[]) => void;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  totalPages,
  pageNo,
  onPageChange,
  onSearchChange,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
  limit,
  setLimit,
}) => {
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    onPageChange(1); // Reset to first page when limit changes
  };

  const handleCheckboxToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id?: string
  ) => {
    const isChecked = e.target.checked;

    if (id === undefined) {
      // "Select All" checkbox
      setSelectedIds(isChecked ? todos.map((todo) => todo._id) : []);
    } else {
      setSelectedIds((prev) =>
        isChecked ? [...prev, id] : prev.filter((item) => item !== id)
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        mt: 4,
        px: 2,
        pb: 5,
        backgroundColor: "#f4f6f8",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ pt: 4, pb: 2, textAlign: "center", color: "#333" }}
      >
        Todo List
      </Typography>

      <TextField
        label="Search Todos"
        variant="outlined"
        fullWidth
        sx={{ mb: 4, backgroundColor: "#fff", borderRadius: 1 }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {selectedIds.length > 0 && (
        <Box sx={{ mb: 2, textAlign: "right" }}>
          <Button variant="contained" color="error" onClick={() => onDelete(selectedIds)}>
            Delete Selected ({selectedIds.length})
          </Button>
        </Box>
      )}
      {todos.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mt: 6,
            color: "#888",
            fontStyle: "italic",
          }}
        >
          No Todos Found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <Checkbox
                  checked={selectedIds.length === todos.length}
                  onChange={(e) => handleCheckboxToggle(e)}
                />
                <TableCell sx={{ color: "white" }}>Title</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Created At</TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo._id}>
                  <Checkbox
                    checked={selectedIds.includes(todo._id)}
                    onChange={(e) => handleCheckboxToggle(e, todo._id)}
                  />
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>{todo.status}</TableCell>
                  <TableCell>
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => onEdit(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => onDelete([todo._id])}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {todos.length > 0 && (
        <PaginationComponent
          page={pageNo}
          count={totalPages}
          onChange={onPageChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />
      )}
    </Box>
  );
};

export default TodoList;

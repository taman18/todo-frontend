import React from "react";
import { Card, CardContent, Typography, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <div>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {todo.description}
            </Typography>
            <Typography variant="caption">Status: {todo.status}</Typography>
          </div>
          <div>
            <IconButton onClick={() => onEdit(todo)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(todo._id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TodoItem;

import React, { useEffect, useState } from "react";
import TodoForm from "../components/todoForm";
import TodoList from "../components/todoList";
import { Container, Typography } from "@mui/material";
import { useAppDispatch } from "../hooks/useStore";
import toast from "react-hot-toast";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../redux/features/todo/todoSlice";

interface Todo {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getAllTodos = async () => {
    try {
      const payload = {
        search,
        pageNo,
        limit,
      };
      const todos = await dispatch(fetchTodos(payload)).unwrap();
      setTodos(todos.data.todos);
      setTotalPages(todos.data.totalPages);
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllTodos();
  }, [pageNo, search, limit]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "pending",
    });
  };

  const validateForm = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    formData: { title: string; description: string; status: string },
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status.trim(),
    };
    if (editTodo) {
      try {
        await dispatch(updateTodo({ ...payload, _id: editTodo._id })).unwrap();
        getAllTodos();
        toast.success("Todo updated successfully!");
        resetForm();
        setEditTodo(null);
      } catch (err: unknown) {
        if (typeof err === "string") {
          toast.error(err);
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      try {
        await dispatch(createTodo(payload)).unwrap();
        getAllTodos();
        toast.success("Todo created successfully!");
        resetForm();
      } catch (err: unknown) {
        if (typeof err === "string") {
          toast.error(err);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  const handleDelete = async (selectedIds: string[]) => {
    try {
      const payload = {
        ids: selectedIds,
      }
      await dispatch(deleteTodo(payload)).unwrap();
      getAllTodos();
      setSelectedIds([]);
      toast.success("Todo deleted successfully!");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageNo(1); // reset to first page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo Manager
      </Typography>
      <TodoForm
        handleSubmit={handleSubmit}
        initialData={editTodo || undefined}
        isEdit={!!editTodo}
        formData={formData}
        setFormData={setFormData}
      />
      <TodoList
        todos={todos}
        totalPages={totalPages}
        pageNo={pageNo}
        onPageChange={setPageNo}
        onSearchChange={handleSearchChange}
        onEdit={setEditTodo}
        onDelete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </Container>
  );
};

export default Todos;

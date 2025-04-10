import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface Todo {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface TodoState {
  todos: Todo;
  loading: boolean;
  error: string | null;
}

interface CreateTodoPayload {
  title: string;
  description: string;
  status: string;
}

interface UpdateTodoPayload extends CreateTodoPayload {
    _id: string
}

interface FetchTodos {
  search: string;
  pageNo: number;
  limit: number;
}
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (payload: FetchTodos) => {
    const { search: searchText = "", pageNo, limit } = payload;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/todo/get-todos?search=${searchText}&pageNo=${pageNo}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.log(error, "000");
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData: CreateTodoPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/todo/create-todo`,
        todoData
      );
      return response.data.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;

      if (err?.response) {
        return rejectWithValue(err.response.data.message);
      }

      return rejectWithValue("Something went wrong while creating the todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId: { ids: string[] }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/todo/delete-todo`,
        {
          data: todoId,
        });
      return response.data.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;

      if (err?.response) {
        return rejectWithValue(err.response.data.message);
      }

      return rejectWithValue("Something went wrong while creating the todo");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todoData: UpdateTodoPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/todo/update-todo/${todoData._id}`,
        todoData
  );
  return response.data.data;
}
  catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;

    if (err?.response) {
      return rejectWithValue(err.response.data.message);
    }

    return rejectWithValue("Something went wrong while creating the todo");
  }
}
)

const initialState: TodoState = {
  todos: {
    title: "",
    description: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    _id: "",
  },
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos; // adjust based on your response
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(createTodo.pending, (state: TodoState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTodo.fulfilled,
        (state: TodoState, action: PayloadAction<Todo>) => {
          state.todos = action.payload;
          state.loading = false;
        }
      )
      .addCase(createTodo.rejected, (state: TodoState, action) => {
        state.loading = false;
        state.todos = initialState.todos;
        state.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(deleteTodo.pending, (state: TodoState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTodo.fulfilled,
        (state: TodoState, action: PayloadAction<Todo>) => {
          state.todos = action.payload;
          state.loading = false;
        }
      )
      .addCase(deleteTodo.rejected, (state: TodoState, action) => {
        state.loading = false;
        state.todos = initialState.todos;
        state.error = (action.payload as string) ?? "Something went wrong";
      });
  },
});

export default todoSlice.reducer;

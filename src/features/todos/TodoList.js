import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation
} from "../api/apiSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      userId: 11,
      id: 1,
      title: { newTodo },
      completed: false
    });
    setNewTodo("");
  };

  const toggleTodoCheck = (todo) => {
    console.log("loggling todo check");
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const newItemSection = (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "60%" }}
      spacing={2}
    >
      <Typography variant="h6">Enter New ToDo</Typography>
      <Box display="flex" gap={2}>
        <TextField
          size="small"
          variant="outlined"
          label="Enter Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Add Todo
        </Button>
      </Box>
    </Stack>
  );

  let content;
  if (isLoading) {
    content = <Typography variant="h4">Loading...</Typography>;
  } else if (isSuccess) {
    content = todos.map((todo) => (
      <Stack alignItems="center" direction="row" key={todo.id}>
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleTodoCheck(todo)}
        />
        <Typography variant="body1">{todo.title}</Typography>
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    ));
  } else if (isError) {
    content = <Typography variant="h4">{error}</Typography>;
  }

  return (
    <>
      <Stack m={4} spacing={2}>
        <Typography variant="h4">Todo List</Typography>
        {newItemSection}
        {content}
      </Stack>
    </>
  );
};

export default TodoList;

import { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  AppBar,
  Toolbar,
  Switch,
  Container,
  Checkbox,
  Grid,
} from "@mui/material";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Task {
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks =
      localStorage.getItem("tasks")?.trim() === ""
        ? []
        : JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <Grid container spacing={6} sx={{ minHeight: "100vh" }}>
      <CssBaseline />

    
      <Grid item xs={12} md={11} sx={{ mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 50,
            
            alignItems: "center",
            backgroundColor: darkMode ? "#121212" : "#f5f5f5",
            color: darkMode ? "#fff" : "#333",
            maxHeight: 1000,

            py: 4,
          }}
        >
          {/* Header */}
          <AppBar position="static" sx={{ backgroundColor: "pink", width: "100%" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">To-Do App</Typography>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Toolbar>
          </AppBar>

          {/* Task Input Section */}
          <Container maxWidth="sm">
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                boxShadow: darkMode
                  ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
                  : "0px 4px 20px rgba(0, 0, 0, 0.1)",
                width: "100%",
                mt: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  label="Enter a task"
                  variant="outlined"
                  sx={{ backgroundColor: darkMode ? "#2e2e2e" : "#fff" }}
                />
                <Button
                  variant="contained"
                  onClick={addTask}
                  sx={{ backgroundColor: darkMode ? "#bb86fc" : "#1976d2" }}
                >
                  Add
                </Button>
              </Box>

              {/* Filter Options */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 2 }}>
                {["all", "completed", "pending"].map((status) => (
                  <Chip
                    key={status}
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    onClick={() => setFilter(status)}
                    clickable
                    sx={{
                      backgroundColor:
                        filter === status ? (darkMode ? "#bb86fc" : "#1976d2") : "transparent",
                      color: filter === status ? "#fff" : darkMode ? "#bbb" : "#333",
                      border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                    }}
                  />
                ))}
              </Box>

              {/* Task List */}
              <Paper elevation={1} sx={{ p: 2, maxHeight: "50vh", overflowY: "auto" }}>
                <List>
                  {filteredTasks.length === 0 ? (
                    <Typography align="center" variant="body1" sx={{ color: darkMode ? "#bbb" : "#555" }}>
                      No tasks to display
                    </Typography>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          textDecoration: task.completed ? "line-through" : "none",
                          opacity: task.completed ? 0.7 : 1,
                        }}
                      >
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(index)}
                          icon={<FaCircle />}
                          checkedIcon={<MdCheckCircle />}
                          sx={{ color: darkMode ? "#bb86fc" : "#1976d2" }}
                        />
                        <ListItemText primary={task.text} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => deleteTask(index)}
                            sx={{ color: "#f50057" }}
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  )}
                </List>
              </Paper>
            </Paper>
          </Container>
        </Box>
      </Grid>

      {/* Side Button for Navigation */}
      <Grid
        item
        xs={12}
        md={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}
      >
        <Link to="/ParentComponent">
          <Button variant="contained" color="primary" sx={{ width: "100%",height:"100%" }}>
            Go to Card
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default TodoApp;

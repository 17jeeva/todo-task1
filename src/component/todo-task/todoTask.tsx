import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import TaskDialog from "./todoChild";
import emptyImage from "../../assets/Questions-rafiki 1 (2).svg";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";

const taskImages = [image1, image2, image3, image4];

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  date: Date;
  description: string;
  image: string;
}

enum AlertSeverity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

const TodoApp = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as AlertSeverity,
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(
        JSON.parse(storedTasks).map((task: Task) => ({
          ...task,
          date: new Date(task.date),
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClose = () => setOpen(false);

  const handleSave = (task: unknown) => {
    const newTask = {
      ...task as Task,
      id: Date.now(),
      completed: false,
      image: taskImages[Math.floor(Math.random() * taskImages.length)], // Assign random image
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setSnackbar({
      open: true,
      message: "Task created successfully!",
      severity: AlertSeverity.success,
    });
    handleClose();
  };

  const handleToggle = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setSnackbar({
      open: true,
      message: "Task deleted successfully!",
      severity: AlertSeverity.error,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: AlertSeverity.info });
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "complete"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Todo Task</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", paddingRight: "10px", mt: "10px" }}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ backgroundColor: "#6915B4", border: "none", borderRadius: "5px" }}>
            <Button onClick={() => setOpen(true)} sx={{ color: "white" }}>+ Add Task</Button>
          </motion.button>
          <TaskDialog open={open} handleClose={handleClose} handleSave={handleSave} />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} variant="outlined" size="small">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="complete">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </motion.div>
        </Box>
      </Box>

      {filteredTasks.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <img src={emptyImage} alt="No Tasks" width={300} />
          <Typography variant="h6" color="gray">No tasks found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: 5, padding: 2 }}>
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      padding: 2,
                      borderRadius: "12px",
                      position: "relative",
                      backgroundColor: task.completed ? "#E0E0E0" : "#FFF3E0",
                      borderLeft: `5px solid ${
                        task.priority === "low" ? "#388E3C" : task.priority === "medium" ? "#FBC02D" : "#D32F2F"
                      }`,
                      opacity: task.completed ? 0.6 : 1,
                      transition: "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <FormControlLabel
                          control={<Checkbox checked={task.completed} onChange={() => handleToggle(task.id)} />}
                          label={<Typography variant="body1" sx={{ fontWeight: "bold" }}>{task.completed ? "Completed" : "Pending"}</Typography>}
                        />
                        <IconButton sx={{ color: "red" }} onClick={() => handleDelete(task.id)}>
                          <MdDelete />
                        </IconButton>
                      </Box>

                
                      {task.image && (
                        <Box sx={{ textAlign: "center", marginTop: 1 }}>
                          <img src={task.image} alt="Task" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                        </Box>
                      )}

                   
                      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                        <span style={{ color: "#6915B4" }}>Title:</span> {task.title}
                      </Typography>

                  
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        <span style={{ fontWeight: "bold", color: "#1976D2" }}>Description:</span> {task.description}
                      </Typography>

                  
                      <Typography 
  variant="body2" 
  sx={{ marginTop: 1, fontWeight: "bold", color: task.priority === "low" ? "#388E3C" : task.priority === "medium" ? "#FBC02D" : "#D32F2F" }}
>
  Priority: {task.priority}
</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TodoApp;

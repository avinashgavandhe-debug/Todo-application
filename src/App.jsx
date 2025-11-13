import {
  Container,
  Title,
  Group,
  Button,
  MantineProvider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notifications, notifications } from "@mantine/notifications";
import ModalComponent from "./components/ModalComponent";
import Home from "./components/Home";
import CompletedComponent from "./components/CompletedComponent";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  function handleSaveTask() {
    if (!title.trim()) {
      notifications.show({
        title: "Error",
        message: "Task title cannot be empty",
        color: "red",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[0],
            borderColor: theme.colors.red[6],
          },
          title: { color: theme.colors.red[9] },
          description: { color: theme.colors.red[9] },
          closeButton: {
            color: theme.colors.red[9],
            "&:hover": { backgroundColor: theme.colors.red[1] },
          },
        }),
      });
      return;
    }

    if (editingTask !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = {
        ...updatedTasks[editingTask],
        title: title,
        summary: summary,
      };
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setEditingTask(null);
      notifications.show({
        title: "Success",
        message: "Task updated successfully",
        color: "green",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[0],
            borderColor: theme.colors.green[6],
          },
          title: { color: theme.colors.green[9] },
          description: { color: theme.colors.green[9] },
          closeButton: {
            color: theme.colors.green[9],
            "&:hover": { backgroundColor: theme.colors.green[1] },
          },
        }),
      });
    } else {
      // Create new task
      const updatedTasks = [
        ...tasks,
        {
          title: title,
          summary: summary,
          completed: false,
        },
      ];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      notifications.show({
        title: "Success",
        message: "New task created successfully",
        color: "green",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[0],
            borderColor: theme.colors.green[6],
          },
          title: { color: theme.colors.green[9] },
          description: { color: theme.colors.green[9] },
          closeButton: {
            color: theme.colors.green[9],
            "&:hover": { backgroundColor: theme.colors.green[1] },
          },
        }),
      });
    }
    // Reset form
    setTitle("");
    setSummary("");
  }

  function toggleTaskComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    notifications.show({
      title: updatedTasks[index].completed ? "Task Completed" : "Task Reopened",
      message: updatedTasks[index].completed
        ? "Great job! Task marked as complete"
        : "Task marked as incomplete",
      color: updatedTasks[index].completed ? "green" : "blue",
      styles: (theme) => ({
        root: {
          backgroundColor: updatedTasks[index].completed
            ? theme.colors.green[0]
            : theme.colors.blue[0],
          borderColor: updatedTasks[index].completed
            ? theme.colors.green[6]
            : theme.colors.blue[6],
        },
        title: {
          color: updatedTasks[index].completed
            ? theme.colors.green[9]
            : theme.colors.blue[9],
        },
        description: {
          color: updatedTasks[index].completed
            ? theme.colors.green[9]
            : theme.colors.blue[9],
        },
        closeButton: {
          color: updatedTasks[index].completed
            ? theme.colors.green[9]
            : theme.colors.blue[9],
          "&:hover": {
            backgroundColor: updatedTasks[index].completed
              ? theme.colors.green[1]
              : theme.colors.blue[1],
          },
        },
      }),
    });
  }

  function startEditing(index) {
    setEditingTask(index);
    setTitle(tasks[index].title);
    setSummary(tasks[index].summary || "");
    setIsModalOpen(true);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    notifications.show({
      title: "Task Deleted",
      message: "Task has been removed successfully",
      color: "blue",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.blue[0],
          borderColor: theme.colors.blue[6],
        },
        title: { color: theme.colors.blue[9] },
        description: { color: theme.colors.blue[9] },
        closeButton: {
          color: theme.colors.blue[9],
          "&:hover": { backgroundColor: theme.colors.blue[1] },
        },
      }),
    });
  }

  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");
    let tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTasks(tasks);
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications
          position="bottom-right"
          zIndex={2000}
          containerWidth={300}
          autoClose={3000}
          styles={{
            notification: {
              width: "280px",
              padding: "15px",
            },
          }}
        />
        <div className="App">
          <ModalComponent
            opened={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTask(null);
              setTitle("");
              setSummary("");
            }}
            title={title}
            onTitleChange={setTitle}
            summary={summary}
            onSummaryChange={setSummary}
            onSave={() => {
              handleSaveTask();
              setIsModalOpen(false);
            }}
            editingTask={editingTask}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  startEditing={startEditing}
                  deleteTask={deleteTask}
                  toggleTaskComplete={toggleTaskComplete}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route path="/completed" element={<CompletedComponent/>}/>
          </Routes>
        </div>
      </MantineProvider>
    </BrowserRouter>
  );
}

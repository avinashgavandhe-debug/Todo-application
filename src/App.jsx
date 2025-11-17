import {MantineProvider} from "@mantine/core";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notifications, notifications } from "@mantine/notifications";
import ModalComponent from "./components/ModalComponent";
import Home from "./components/Home";
import CompletedComponent from "./components/CompletedComponent";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } =
    useTasks();
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
      updateTask(editingTask, title, summary);
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
      addTask(title, summary);
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

  function handleToggleTaskComplete(index) {
    const taskWillBeCompleted = !tasks[index].completed;
    toggleTaskComplete(index);

    notifications.show({
      title: taskWillBeCompleted ? "Task Completed" : "Task Reopened",
      message: taskWillBeCompleted
        ? "Great job! Task marked as complete"
        : "Task marked as incomplete",
      color: taskWillBeCompleted ? "green" : "blue",
      styles: (theme) => ({
        root: {
          backgroundColor: taskWillBeCompleted
            ? theme.colors.green[0]
            : theme.colors.blue[0],
          borderColor: taskWillBeCompleted
            ? theme.colors.green[6]
            : theme.colors.blue[6],
        },
        title: {
          color: taskWillBeCompleted
            ? theme.colors.green[9]
            : theme.colors.blue[9],
        },
        description: {
          color: taskWillBeCompleted
            ? theme.colors.green[9]
            : theme.colors.blue[9],
        },
        closeButton: {
          color: taskWillBeCompleted
            ? theme.colors.green[9]
            : theme.colors.blue[9],
          "&:hover": {
            backgroundColor: taskWillBeCompleted
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

  function handleDeleteTask(index) {
    deleteTask(index);
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
                  deleteTask={handleDeleteTask}
                  toggleTaskComplete={handleToggleTaskComplete}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route path="/completed" element={<CompletedComponent />} />
          </Routes>
        </div>
      </MantineProvider>
    </BrowserRouter>
  );
}

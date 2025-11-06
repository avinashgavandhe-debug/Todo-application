import {
  Container,
  Title,
  Group,
  Button,
  MantineProvider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import ModalComponent from "./components/ModalComponent";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  function handleSaveTask() {
    if (!title.trim()) return;

    if (editingTask !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = {
        title: title,
        summary: summary,
      };
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Create new task
      const updatedTasks = [
        ...tasks,
        {
          title: title,
          summary: summary,
        },
      ];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
    // Reset form
    setTitle("");
    setSummary("");
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
    <MantineProvider withGlobalStyles withNormalizeCSS>
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

        <Container size={550} my={40}>
          <Group position={"apart"} justify="center" mb={30}>
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              My Tasks
            </Title>
          </Group>

           <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            fullWidth
            mt={"md"}
          >
            New Task
          </Button>

            <TaskList
              tasks={tasks}
              onEdit={startEditing}
              onDelete={deleteTask}
            />
         
        </Container>
      </div>
    </MantineProvider>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Group,
  Text,
  Card,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { Trash, RotateClockwise } from 'tabler-icons-react';
import { notifications } from '@mantine/notifications';

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);

  function loadCompletedTasks() {
    const loadedTasks = localStorage.getItem("tasks");
    const tasks = JSON.parse(loadedTasks) || [];
    const completed = tasks.filter(task => task.completed === true);
    setCompletedTasks(completed);
  }

  function undoComplete(taskTitle) {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map(task => 
      task.title === taskTitle ? { ...task, completed: false } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadCompletedTasks();
    
    notifications.show({
      title: 'Task Reopened',
      message: 'Task moved back to active tasks',
      color: 'blue',
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.blue[0],
          borderColor: theme.colors.blue[6],
        },
        title: { color: theme.colors.blue[9] },
        description: { color: theme.colors.blue[9] },
        closeButton: {
          color: theme.colors.blue[9],
          '&:hover': { backgroundColor: theme.colors.blue[1] },
        },
      }),
    });
  }

  function deleteCompletedTask(taskTitle) {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.filter(task => task.title !== taskTitle);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadCompletedTasks();
    
    notifications.show({
      title: 'Task Deleted',
      message: 'Task has been permanently removed',
      color: 'red',
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.red[0],
          borderColor: theme.colors.red[6],
        },
        title: { color: theme.colors.red[9] },
        description: { color: theme.colors.red[9] },
        closeButton: {
          color: theme.colors.red[9],
          '&:hover': { backgroundColor: theme.colors.red[1] },
        },
      }),
    });
  }

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  return (
    <Container size={550} my={40}>
      <Group position={"apart"} justify="center" mb={30}>
        <Title
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Completed Tasks
        </Title>
      </Group>

      <Badge 
        color="green" 
        size="lg" 
        variant="filled"
        mb="md"
      >
        {completedTasks.length} {completedTasks.length === 1 ? 'Task' : 'Tasks'} Completed
      </Badge>

      {completedTasks.length > 0 ? (
        completedTasks.map((task, index) => (
          <Card withBorder key={index} mt={"sm"}>
            <Group position={"apart"}>
              <Text 
                weight={"bold"}
                style={{ 
                  textDecoration: 'line-through',
                  opacity: 0.7 
                }}
              >
                {task.title}
              </Text>
              <Group spacing={"xs"}>
                <ActionIcon
                  onClick={() => undoComplete(task.title)}
                  color={"blue"}
                  variant={"subtle"}
                  title="Mark as incomplete"
                >
                  <RotateClockwise />
                </ActionIcon>
                <ActionIcon
                  onClick={() => deleteCompletedTask(task.title)}
                  color={"red"}
                  variant={"transparent"}
                  title="Delete task"
                >
                  <Trash />
                </ActionIcon>
              </Group>
            </Group>
            <Text 
              color="dimmed" 
              size={"md"} 
              mt={"sm"}
              style={{ 
                textDecoration: 'line-through',
                opacity: 0.6 
              }}
            >
              {task.summary
                ? task.summary
                : "No summary was provided for this task"}
            </Text>
          </Card>
        ))
      ) : (
        <Text size={"lg"} mt={"md"} color={"dimmed"} align="center">
          No completed tasks yet. Keep working! 🎯
        </Text>
      )}
    </Container>
  );
}
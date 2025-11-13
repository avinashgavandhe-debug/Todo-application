import { Button, Group, Title, Container } from "@mantine/core";

import TaskList from "./TaskList";

const Home = ({tasks, startEditing, deleteTask, toggleTaskComplete, setIsModalOpen}) => {
  return (
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
        toggleTaskComplete={toggleTaskComplete}
      />
    </Container>
  );
};

export default Home;

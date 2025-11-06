import React from 'react';
import { Text, Card, Group, ActionIcon } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task, index) => {
          if (task.title) {
            return (
              <Card withBorder key={index} mt={"sm"}>
                <Group position={"apart"}>
                  <Text weight={"bold"}>{task.title}</Text>
                  <Group spacing={"xs"}>
                    <ActionIcon
                      onClick={() => onEdit(index)}
                      color={"blue"}
                      variant={"subtle"}
                    >
                      <Edit />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => onDelete(index)}
                      color={"red"}
                      variant={"transparent"}
                    >
                      <Trash />
                    </ActionIcon>
                  </Group>
                </Group>
                <Text color="dimmed" size={"md"} mt={"sm"}>
                  {task.summary
                    ? task.summary
                    : "No summary was provided for this task"}
                </Text>
              </Card>
            );
          }
          return null;
        })
      ) : (
        <Text size={"lg"} mt={"md"} color={"dimmed"}>
          You have no tasks
        </Text>
      )}
    </>
  );
};



export default TaskList;

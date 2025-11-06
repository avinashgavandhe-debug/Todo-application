import React from "react";
import { Modal, TextInput, Group, Button } from "@mantine/core";

const ModalComponent = ({
  opened,
  onClose,
  title,
  onTitleChange,
  summary,
  onSummaryChange,
  onSave,
  editingTask,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <Modal
      opened={opened}
      size={"md"}
      title={editingTask !== null ? "Edit Task" : "New Task"}
      withCloseButton={false}
      onClose={handleClose}
      centered
    >
      <TextInput
        mt={"md"}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={"Task Title"}
        required
        label={"Title"}
      />
      <TextInput
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        mt={"md"}
        placeholder={"Task Summary"}
        label={"Summary"}
      />
      <Group justify="flex-end" mt={"md"} position={"apart"}>
        <Button
          onClick={handleClose}
          variant={"subtle"}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
        >
          {editingTask !== null ? "Save Changes" : "Create Task"}
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalComponent;

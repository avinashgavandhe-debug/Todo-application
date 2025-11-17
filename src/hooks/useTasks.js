import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/TaskReducers";
import { ACTIONS, getInitialTasks } from "../reducers/TaskReducers";

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [], getInitialTasks);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title, summary) => {
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { title, summary, completed: false },
    });
  };

  const updateTask = (index, title, summary) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { index, title, summary },
    });
  };

  const deleteTask = (index) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: index });
  };

  const toggleTaskComplete = (index) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: index });
  };
  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
};

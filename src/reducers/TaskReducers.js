// Action types
export const ACTIONS = {
  LOAD_TASKS: 'LOAD_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
};

 export function getInitialTasks() {
    try {
      const loadedTasks = localStorage.getItem("tasks");
      if (loadedTasks) {
        return JSON.parse(loadedTasks);
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
    return [];
  }



// Reducer function
function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_TASKS:
      return action.payload;
    
    case ACTIONS.ADD_TASK:
      return [...state, action.payload];
    
    case ACTIONS.UPDATE_TASK:
      return state.map((task, index) =>
        index === action.payload.index
          ? { ...task, title: action.payload.title, summary: action.payload.summary }
          : task
      );
    
    case ACTIONS.TOGGLE_COMPLETE:
      return state.map((task, index) =>
        index === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    
    case ACTIONS.DELETE_TASK:
      return state.filter((_, index) => index !== action.payload);
    
    default:
      return state;
  }
}



export default tasksReducer;
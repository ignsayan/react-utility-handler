/**
 * Handles the removal of a task from the tasks list in the store by filtering out
 * the task with the ID provided in the payload.
 * 
 * @param {Object} state - The state of the todo reducer containing the tasks list.
 * @param {Object} action - The action containing the payload with the ID of the task to remove.
 * @returns {void}
 */
export const removeTodoHandler = (state, action) => {
    
    state.tasks = state.tasks.filter((task) => task.id !== action.payload)
};

export default removeTodoHandler
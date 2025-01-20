/**
 * Edits an existing task in the tasks list by updating its title and 
 * updated_at timestamp if the task ID is found in the store.
 * 
 * @param {Object} state - The state of the todo reducer containing the tasks list.
 * @param {Object} action - The action containing the payload with the task ID and new title.
 * @returns {void}
 */
export const editTodo = (state, action) => {

    const { id, title } = action.payload;
    const task = state.tasks.find((task) => task.id === id);
    if (task) {
        task.title = title;
        task.updated_at = new Date().toISOString();
    }
};

export default editTodo
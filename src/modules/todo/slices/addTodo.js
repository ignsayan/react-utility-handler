import { nanoid } from "@reduxjs/toolkit";

/**
 * Adds a new task to the tasks list in the state with a unique ID, 
 * capitalized title, and timestamps for creation and last update.
 * 
 * @param {Object} state - The state of the todo reducer containing the tasks list.
 * @param {Object} action - The action containing the payload with the task title.
 * @returns {void}
 */
export const addTodo = (state, action) => {

    const { title } = action.payload;
    const task = {
        id: nanoid(),
        title: title.charAt(0).toUpperCase() + title.slice(1),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    state.tasks.push(task);
};

export default addTodo

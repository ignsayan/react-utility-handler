import { createSlice, nanoid } from "@reduxjs/toolkit"
import addTodoHandler from './slices/addTodo'
import removeTodoHandler from './slices/removeTodo'
import editTodoHandler from './slices/editTodo'

const initialState = {
    tasks: [{
        id: nanoid(),
        title: 'This is the default task for testing purposes',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }]
}

/**
 * The slice for managing the state of the todo list
 * 
 * @module todoSlice
 * @function
 * 
 * @param {Object} initialState - The initial state of the slice.
 * @param {Object} reducers - An object containing the reducer functions
 */
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
        editTodo: editTodoHandler,
    }
})

export const { addTodo, editTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer
import React, { Fragment, useEffect, useState } from 'react'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, editTodo } from '../modules/todo/reducers'

export default function Todo() {

    const tasks = useSelector((state) => state.todo.tasks)
    const dispatch = useDispatch()

    const [todos, setTodos] = useState(tasks)
    const [editTodoId, setEditTodoId] = useState(null)
    const [todoText, setTodoText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    /**
     * Updates the `todos` state with the current tasks from the store when the
     * component mounts or when the tasks in the store change.
     */
    useEffect(() => {
        setTodos(tasks)
    }, [tasks])

    /**
     * Handles form submission. Extracts the title of the task from the form 
     * and dispatches an action to add the task to the store.
     * @param {HTMLFormElement} form The form element that contains the task to add.
     */
    const handleFormSubmit = (form) => {
        const data = {
            title: form.get('title'),
        }
        dispatch(addTodo(data))
    }

    /**
     * Activates editing mode for a specific task by setting the task's ID and title in the state.
     * @param {Object} task - The task object containing the ID and title to be edited.
     */
    const turnOnEditingMode = (task) => {
        setEditTodoId(task.id);
        setTodoText(task.title);
    };

    /**
     * Handles the editing process of a task. If the text input is not empty, it
     * dispatches an action to update the task in the store with the new title.
     * @param {string} id - The ID of the task to be edited.
     */
    const handleEditing = (id) => {
        if (todoText) {
            const data = {
                id: id,
                title: todoText,
            }
            dispatch(editTodo(data))
        }
        setEditTodoId(null);
    }

    /**
     * Handles the search process of the task list. If the search query is not empty,
     * it filters the tasks based on the query and updates the state with the filtered
     * result. Otherwise, it resets the state to the original tasks.
     */
    const handleSearch = () => {
        if (!searchQuery) return setTodos(tasks);
        const search = searchQuery.toLowerCase();
        const filtered = todos.filter((todo) =>
            todo.title.toLowerCase().includes(search)
        );
        setTodos(filtered);
    }

    
    return (
        <>
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h1 className="text-3xl text-center text-yellow-400 mb-3">Task List</h1>
                    <div className="flex items-center justify-center mb-6">
                        <Logo />
                    </div>

                    <div className="flex space-x-3">
                        <div className="relative w-full">
                            <input
                                type="text" name="search"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-4 pr-8 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white"
                                placeholder="Search a task"
                                style={{ textAlign: 'center' }}
                            />
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-400 rounded-full p-3 shadow-lg"
                                onClick={handleSearch}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 22 22"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <form className="relative w-full"
                            action={handleFormSubmit}>
                            <input
                                type="text" name="title"
                                className="w-full p-4 pr-9 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white"
                                placeholder="Add a new task"
                                style={{ textAlign: 'center' }}
                                required
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-400 rounded-full p-3 shadow-lg h-10 w-20 flex items-center justify-center">
                                Create
                            </button>
                        </form>
                    </div>

                    <ul className="space-y-4">
                        {todos.map((todo, index) => (
                            <Fragment key={todo.id}>
                                {editTodoId !== todo.id ? (
                                    <li className="flex items-center justify-between bg-gray-700 border border-gray-700 rounded-full shadow-lg p-2 mt-6 hover:bg-gray-600">
                                        <div className="w-full" onDoubleClick={() => turnOnEditingMode(todo)}>
                                            <span className="bg-amber-500 px-4 py-2 rounded-full font-medium shadow-lg">{index += 1}</span>
                                            <span className="text-white cursor-pointer mx-3">
                                                {todo.title.length > 60
                                                    ? todo.title.slice(0, 60) + "..."
                                                    : todo.title}
                                            </span>
                                        </div>
                                        <button
                                            className="bg-rose-600 font-medium px-4 py-2 rounded-full hover:text-white shadow-lg text-sm"
                                            onClick={() => dispatch(removeTodo(todo.id))}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ) : (
                                    <input
                                        type="text" value={todoText}
                                        onChange={(e) => setTodoText(e.target.value)}
                                        onBlur={() => handleEditing(todo.id)}
                                        className="w-full p-3 mt-6 rounded-full focus:outline-none shadow-lg bg-slate-700 text-white"
                                        style={{ textAlign: 'center' }}
                                        autoFocus required
                                    />
                                )}
                            </Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

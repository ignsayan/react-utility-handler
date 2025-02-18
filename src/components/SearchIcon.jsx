import React from 'react'

export default function SearchIcon(props) {
    return (
        <>
            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-400 rounded-full p-3 shadow-lg cursor-pointer"
                type="button"
                onClick={props.action}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 2a8 8 0 1 0 4.906 14.32l4.897 4.898a1 1 0 0 0 1.414-1.415l-4.897-4.898A8 8 0 0 0 10 2zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
                </svg>
            </button>
        </>
    )
}

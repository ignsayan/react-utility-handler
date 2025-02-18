import React from 'react'

export default function ViewIcon(props) {
    return (
        <>
            <button onClick={props.action}
                className="bg-amber-500 p-2 rounded-full font-medium shadow-lg flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                >
                    <path
                        d="M12 4.5C6.8 4.5 2.4 7.9 1 12c1.4 4.1 5.8 7.5 11 7.5s9.6-3.4 11-7.5c-1.4-4.1-5.8-7.5-11-7.5zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
                    />
                </svg>
            </button>
        </>
    )
}

import React from 'react'

export default function PasswordSkeleton() {
    return (
        <>
            <ul className="space-y-2 mt-6">

                {/* <span className="text-white p-2">Fetching passwords ... </span> */}

                {Array.from({ length: 3 }).map((_, index) => (

                    <li className="flex items-center justify-between bg-gray-700 border border-gray-700 rounded-full shadow-lg p-2 hover:bg-gray-600 animate-pulse"
                        key={index}>
                        <div className="w-full flex items-center space-x-3">
                            <div className="bg-amber-500 h-8 w-8 rounded-full"></div>
                            <div className="bg-gray-600 h-4 w-2/3 rounded-full"></div>
                        </div>
                        <div className="bg-rose-600 h-8 w-20 rounded-full"></div>
                    </li>

                ))}
            </ul>
        </>
    )
}

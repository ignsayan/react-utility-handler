import React from 'react'
import reactLogo from '../assets/icon/react.svg'
import '../assets/css/logo.css'

export default function Logo({ redirect }) {
    return (
        <>
            <div>
                {redirect
                    ? <a href={redirect} target="_blank">
                        <img src={reactLogo} className="logo" alt="Vite logo" />
                    </a>
                    : <img src={reactLogo} className="logo" alt="Vite logo" />
                }
            </div>
        </>
    )
}

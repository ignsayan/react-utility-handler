import React from 'react'

export default function RangeSlider({ range, toggle, selfClass }) {
    return (
        <>
            <input
                type="range" 
                min="8" max="20"
                value={range}
                onChange={toggle}
                className={selfClass}
            />
        </>
    )
}

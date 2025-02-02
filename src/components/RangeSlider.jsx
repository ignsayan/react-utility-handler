import React from 'react'

export default function RangeSlider({ range, toggle, style }) {
    return (
        <>
            <input
                type="range" 
                min="8" max="25"
                value={range}
                onChange={toggle}
                className={style}
            />
        </>
    )
}

import React from 'react'

export default function CheckBox({ selfClass, labelClass, value, toggle, label }) {

    return (
        <>
            <input
                type="checkbox"
                className={selfClass}
                defaultChecked={value}
                onChange={toggle}
            />
            <label className={labelClass}>{label}</label>
        </>
    )
}

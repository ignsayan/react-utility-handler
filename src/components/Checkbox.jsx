import React from 'react'

export default function CheckBox({ style, labelClass, value, toggle, label }) {

    return (
        <>
            <input
                type="checkbox"
                className={style}
                defaultChecked={value}
                onChange={toggle}
            />
            <label className={labelClass}>{label}</label>
        </>
    )
}

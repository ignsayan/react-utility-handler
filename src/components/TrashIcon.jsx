import React from 'react'
import { useDispatch } from 'react-redux'
import {
    deletePassword
} from '../modules/password/slices'

export default function TrashIcon({ data }) {

    const dispatch = useDispatch();

    return (
        <>
            <button
                className="bg-rose-600 font-medium px-4 py-2 rounded-full hover:text-white shadow-lg text-sm"
                onClick={() => {
                    if (confirm(`Are you sure you want to delete the password for ${data.account}?`)) {
                        dispatch(deletePassword(data._id));
                    }
                }}
            >
                Delete
            </button>
        </>
    )
}

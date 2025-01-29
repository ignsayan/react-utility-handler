import React, { Fragment, useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
    Logo,
    PasswordSkeleton,
    RangeSlider,
    CheckBox,
} from '../components/index'
import {
    fetchPasswords,
    savePassword,
    deletePassword,
} from "../modules/password/slices/index"

export default function PasswordManager() {

    const { passwords, loading } = useSelector((state) => state.password);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPasswords());
    }, [dispatch]);


    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [isAllowedCharacter, setIsAllowedCharacter] = useState(true);
    const [isAllowedNumber, setIsAllowedNumber] = useState(false);

    let tempPass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isAllowedCharacter) string += '!@#$%^&*(){}[]';
    if (isAllowedNumber) string += '0123456789';

    const generatePassword = () => {
        for (let i = 1; i <= length; i++) {
            tempPass += string.charAt(Math.floor(Math.random() * string.length));
        }
        setPassword(tempPass);
    }
    useEffect(() => { generatePassword() },
        [length, isAllowedCharacter, isAllowedNumber]
    );

    const handleFormSubmit = (form) => {
        const data = {
            uuid: nanoid(),
            site: form.get('site'),
            pass: password,
        }
        dispatch(savePassword(data));
    }

    return (
        <>
            <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-lg sm:max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl text-center text-yellow-400 mb-3">Password Manager</h1>
                    <div className="flex items-center justify-center mb-6"><Logo /></div>
                    <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-3"
                        action={handleFormSubmit}>
                        <div className="relative w-full">
                            <input
                                type="text" name="site" required
                                placeholder="Enter site name"
                                className="w-full p-3 sm:p-4 pr-8 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white text-center"
                            />
                            <div
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-400 rounded-full p-3 shadow-lg cursor-pointer">
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
                        <div className="relative w-full">
                            <input
                                type="text" name="password"
                                value={password}
                                placeholder="Your password"
                                required readOnly
                                className="w-full p-3 sm:p-4 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-400 rounded-full p-3 shadow-lg h-10 w-20 flex items-center justify-center">
                                Save
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-5 pt-5 pl-6 pr-6">
                        <div className="relative w-full flex items-center">
                            <label htmlFor="priority" className="text-white mr-4">Stength<span className='mx-2'>({length})</span></label>
                            <RangeSlider
                                selfClass="w-80 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none"
                                range={length}
                                toggle={(e) => setLength(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center">
                                <CheckBox
                                    selfClass='w-4 h-4 text-emerald-400 bg-gray-900 rounded focus:ring-emerald-500 border-gray-700'
                                    label='Characters'
                                    labelClass='ml-2 text-white'
                                    value={isAllowedCharacter}
                                    toggle={() => setIsAllowedCharacter((toggle) => !toggle)}
                                />
                            </div>
                            <div className="flex items-center">
                                <CheckBox
                                    selfClass='w-4 h-4 text-emerald-400 bg-gray-900 rounded focus:ring-emerald-500 border-gray-700'
                                    label='Numbers'
                                    labelClass='ml-2 text-white'
                                    value={isAllowedNumber}
                                    toggle={() => setIsAllowedNumber((toggle) => !toggle)}
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="space-y-2 mt-6">
                        {passwords.map((pass) =>
                            <Fragment key={pass.uuid}>
                                <li className="flex items-center justify-between bg-gray-700 border border-gray-700 rounded-full shadow-lg p-2 hover:bg-gray-600">
                                    <div className="w-full">
                                        <span className="bg-amber-500 px-4 py-2 rounded-full font-medium shadow-lg">1</span>
                                        <span className="text-white cursor-pointer mx-3">{pass.site}</span>
                                    </div>
                                    <button className="bg-rose-600 font-medium px-4 py-2 rounded-full hover:text-white shadow-lg text-sm"
                                        onClick={() => {
                                            if (confirm(`Are you sure you want to delete the password for ${pass.site}?`)) {
                                                dispatch(deletePassword(pass.uuid));
                                            }
                                        }}>Delete</button>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                    {loading && <PasswordSkeleton />}
                </div>
            </div>
        </>
    )
}

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuth from '../components/GoogleAuth';
import useEncrypt, { useDecrypt } from '../hooks/useEncrypt';
import {
    fetchPasswords,
    savePassword,
} from '../modules/password/slices/index';
import {
    Logo,
    PasswordSkeleton,
    RangeSlider,
    CheckBox,
    SearchIcon,
    TrashIcon,
    ViewIcon,
} from '../components/index';

export default function PasswordManager() {

    const { user } = useSelector((state) => state.authentication);
    const { passwords, loading } = useSelector((state) => state.password);
    const dispatch = useDispatch();
    const [filteredPasswords, setFilteredPasswords] = useState([]);

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [isAllowedCharacter, setIsAllowedCharacter] = useState(true);
    const [isAllowedNumber, setIsAllowedNumber] = useState(false);

    const [visibility, setVisibility] = useState({});
    const account = useRef(null);

    useEffect(() => {
        if (user) dispatch(fetchPasswords());
    }, [user, dispatch]);

    useEffect(() => {
        if (passwords.length > 0) setFilteredPasswords(passwords);
    }, [passwords]);

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
    )
    const handleFormSubmit = () => {
        const data = {
            account: account.current.value,
            password: useEncrypt(password),
            user_id: user,
        }
        if (data.account !== '') dispatch(savePassword(data));
    }

    const handleSearch = (form) => {
        const key = form.get('account');
        const result = passwords.filter(
            (password) =>
                password.account.toLowerCase().includes(key.toLowerCase())
        );
        setFilteredPasswords(result);
        setVisibility({});
    }

    const toggleVisibility = (id) => {
        setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <>
            <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-lg sm:max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl text-center text-yellow-400 mb-3">Password Manager</h1>
                    <div className="flex items-center justify-center mb-6"><Logo /></div>
                    {!user
                        ? <div className="flex items-center justify-center mb-6">
                            <GoogleAuth prefix="Continue with" />
                        </div>
                        : <Fragment>
                            <div className="flex w-full md:flex-row flex-col md:space-x-3">
                                <div className="relative w-full md:w-1/2">
                                    <form action={handleSearch}>
                                        <input
                                            type="text" name="account"
                                            placeholder="Enter account name"
                                            className="w-full p-4 pr-8 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white text-center md:text-left"
                                            ref={account} required
                                        />
                                        <SearchIcon />
                                    </form>
                                </div>
                                <div className="relative w-full md:w-1/2 mt-4 md:mt-0" >
                                    <form action={handleFormSubmit}>
                                        <input
                                            type="text" name="password"
                                            placeholder="Your password"
                                            className="w-full p-4 rounded-full focus:outline-none shadow-lg bg-gray-900 text-white"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password} required
                                        />
                                        <button
                                            type="submit"
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-emerald-400 rounded-full p-3 shadow-lg h-10 w-20 md:w-auto md:px-6 md:py-2 flex items-center justify-center">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-5 pt-5 pl-6 pr-6">
                                <div className="relative w-full flex items-center">
                                    <label htmlFor="priority" className="text-white mr-4">Stength<span className='mx-2'>({length})</span></label>
                                    <RangeSlider
                                        style="w-80 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none"
                                        range={length}
                                        toggle={(e) => setLength(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <div className="flex items-center">
                                        <CheckBox
                                            style='w-4 h-4 text-emerald-400 bg-gray-900 rounded focus:ring-emerald-500 border-gray-700'
                                            label='Characters'
                                            labelClass='ml-2 text-white'
                                            value={isAllowedCharacter}
                                            toggle={() => setIsAllowedCharacter((toggle) => !toggle)}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <CheckBox
                                            style='w-4 h-4 text-emerald-400 bg-gray-900 rounded focus:ring-emerald-500 border-gray-700'
                                            label='Numbers'
                                            labelClass='ml-2 text-white'
                                            value={isAllowedNumber}
                                            toggle={() => setIsAllowedNumber((toggle) => !toggle)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {loading ? <PasswordSkeleton />
                                : <ul className="space-y-2 mt-6">
                                    {filteredPasswords.map((password) =>
                                        <Fragment key={password._id}>
                                            <li className="flex items-center justify-between bg-gray-700 border border-gray-700 rounded-full shadow-lg p-2 hover:bg-gray-600">
                                                <div className="w-full flex items-center">
                                                    <ViewIcon action={() => toggleVisibility(password._id)} />
                                                    <span className="text-white cursor-pointer mx-3">
                                                        {visibility[password._id]
                                                            ? useDecrypt(password.password)
                                                            : password.account
                                                        }
                                                    </span>
                                                </div>
                                                <TrashIcon data={password} />
                                            </li>
                                        </Fragment>
                                    )}
                                </ul>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </>
    )
}

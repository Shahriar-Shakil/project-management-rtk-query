/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSelectors';
import { useAddTeamMutation } from '../../features/teams/teamApi';

export default function AddTeamForm({ setModalOpen }) {
    const [title, setTitle] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [addTeams, { isSuccess, isLoading, isError }] = useAddTeamMutation();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (isSuccess) {
            setModalOpen(false);
        }
    }, [isSuccess, isError, setModalOpen]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const data = {
            title,
            colorCode,
            description,
            timestamp: new Date().getTime(),
            members: [{ ...user, owner: true }],
        };
        addTeams({ data });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-2">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Team</h3>
                </div>
                <div className="">
                    <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                required
                                autoComplete="given-name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="colorCode"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Color Code (Hex Color code)
                        </label>
                        <div className="mt-1">
                            <input
                                id="colorCode"
                                required
                                autoComplete="given-name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                value={colorCode}
                                onChange={(e) => setColorCode(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <div className="mt-1">
                        <textarea
                            required
                            id="description"
                            name="description"
                            rows={2}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="ml-auto block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={isLoading}
                >
                    Save
                </button>
            </div>
        </form>
    );
}

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSelectors';
import { useAddProjectMutation } from '../../features/projects/projectsApi';
import { useGetTeamsQuery } from '../../features/teams/teamApi';
import { getMyTeam } from '../../utils';

export default function AddProjectForm({ setModalOpen }) {
    const [title, setTitle] = useState('');
    const [teamId, setTeamId] = useState(null);
    const [error, setError] = useState('');
    const [addProject, { isSuccess, isLoading, isError }] = useAddProjectMutation();
    const user = useSelector(selectUser);
    const { data, isLoading: loadTeam } = useGetTeamsQuery();
    const myTeams = getMyTeam(data, user?.id);

    useEffect(() => {
        if (isSuccess) {
            setModalOpen(false);
        }
    }, [isSuccess, isError, setModalOpen]);
    const onChangeTeams = (value) => {
        setTeamId(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (myTeams && myTeams.length > 0 && teamId) {
            const params = {
                title,
                timestamp: new Date().getTime(),
                // eslint-disable-next-line eqeqeq
                team: myTeams.find((team) => team.id == teamId),
                participants: myTeams
                    .find((team) => team.id === teamId)
                    ?.members?.map((team) => team.email),
                author: user,
                stage: 'backlog',
            };
            await addProject({ data: params });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-2">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Project</h3>
                </div>
                <div className="">
                    <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Team
                        </label>
                        <div className="mt-1">
                            <Select
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                onChange={onChangeTeams}
                                loading={loadTeam}
                                placeholder="Assign New Member"
                            >
                                {myTeams?.map(
                                    (item) => (
                                        // item.id !== user.id && (
                                        <Select.Option
                                            // disabled={selectedMembers?.includes(item.name)}
                                            value={item.id}
                                            title={item.title}
                                            key={item.id}
                                        >
                                            {item?.title}
                                        </Select.Option>
                                    )
                                    // )
                                )}
                            </Select>
                        </div>
                    </div>
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

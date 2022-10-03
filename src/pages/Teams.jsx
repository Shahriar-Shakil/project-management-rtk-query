/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTeamForm from '../components/Forms/AddTeamForm';
import Team from '../components/Team';
import Modal from '../components/ui/Modal';
import { selectUser } from '../features/auth/authSelectors';
import { useGetTeamsQuery } from '../features/teams/teamApi';
import { getMyTeam } from '../utils';
import Layout from './Layout';

export default function Teams() {
    const [open, setOpen] = useState(false);
    const user = useSelector(selectUser);
    const { data, isLoading } = useGetTeamsQuery();
    const myTeams = getMyTeam(data, user?.id);

    let teamView = [];
    if (isLoading) teamView = 'leading';

    if (!isLoading && myTeams?.length > 0)
        teamView = myTeams?.map((item) => <Team data={item} key={item.id} />);
    return (
        <Layout page="teams">
            <div className="px-10 mt-6 flex justify-between">
                <h1 className="text-2xl font-bold">Teams</h1>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
                {teamView}
            </div>
            <Modal open={open} setOpen={setOpen}>
                <AddTeamForm setModalOpen={setOpen} />
            </Modal>
        </Layout>
    );
}

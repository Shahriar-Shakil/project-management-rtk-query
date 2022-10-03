/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import Moment from 'react-moment';
import { useRemoveTeamMutation } from '../features/teams/teamApi';
import TeamMembers from './TeamMembers';
import Modal from './ui/Modal';

export default function Team({ data }) {
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const [removeTeam] = useRemoveTeamMutation();
    let teamOwner;
    for (let index = 0; index < data?.members?.length; index += 1) {
        if (data.members[index]?.owner === true) {
            teamOwner = data.members[index];
        }
    }
    const handleRemove = (id) => {
        if (teamOwner.id === id) {
            removeTeam(id);
        } else {
            alert.error('only Team Owner can Perform this action!');
        }
    };
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className=" flex items-center text-sm space-x-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>
                            Assign Member
                        </button>
                    ),
                },
                {
                    key: '2',
                    disabled: true,
                    label: (
                        <button
                            type="button"
                            onClick={() => handleRemove(data?.id)}
                            className="text-red-400 flex items-center text-sm space-x-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                            Remove Team
                        </button>
                    ),
                },
            ]}
        />
    );
    return (
        <>
            <div
                className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                draggable="true"
            >
                <Dropdown
                    overlay={menu}
                    className="absolute top-0 right-0 hover:flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                    placement="bottomRight"
                    autoFocus
                >
                    <a href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                        <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </a>
                </Dropdown>
                {/* <button class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
        
      </button> */}
                <span
                    style={{ background: `${data?.colorCode}` }}
                    className="flex items-center h-6 px-3 text-xs font-semibold  text-white rounded-full"
                >
                    {data?.title}
                </span>
                <h4 className="mt-3 text-sm font-medium">{data?.description}</h4>
                <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
                    <div className="flex items-center ">
                        <svg
                            className="w-4 h-4 text-gray-300 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">
                            <Moment format="Do MMM YY">{data?.timeStamp}</Moment>
                        </span>
                    </div>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                            />
                        </svg>
                        <span className="ml-1 leading-none">Owner: {teamOwner.name}</span>
                    </div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen}>
                <TeamMembers teamId={data?.id} />
            </Modal>
        </>
    );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Transition } from '@headlessui/react';
import { Tooltip } from 'antd';
import React, { Fragment } from 'react';
import { useDrag } from 'react-dnd';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useRemoveProjectMutation } from '../../features/projects/projectsApi';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Project({ project }) {
    const user = useSelector((state) => state.auth.user);
    const [deleteProject] = useRemoveProjectMutation();
    // eslint-disable-next-line no-unused-vars
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'div',
        item: project,
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));
    const handleDelete = () => {
        deleteProject({ id: project.id, email: user.email });
    };
    return (
        <div
            className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            draggable="true"
            ref={drag}
            style={{ display: isDragging ? 'none' : 'flex' }}
        >
            <div className="flex justify-between items-start w-full">
                <span
                    style={{ background: `${project?.team?.colorCode}` }}
                    className="flex items-center h-6 px-3 text-xs font-semibold  text-white rounded-full capitalize"
                >
                    {project?.team?.title}
                </span>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className=" top-0 right-0 hover:flex items-center justify-center hidden w-5 h-5  mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={handleDelete}
                                            // eslint-disable-next-line no-script-url
                                            href={null}
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Remove Project
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            <h4 className="mt-3 text-sm font-medium">{project?.title}</h4>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                <div className="flex items-center">
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
                        <Moment format="DD MMM YY">{project?.timestamp}</Moment>
                    </span>
                </div>

                <Tooltip title={project?.author?.name}>
                    <img
                        alt="img"
                        className="w-6 h-6 ml-auto rounded-full"
                        src="https://randomuser.me/api/portraits/women/26.jpg"
                    />
                </Tooltip>
            </div>
        </div>
    );
}

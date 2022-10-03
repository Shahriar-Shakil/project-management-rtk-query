/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userLoggedOut } from '../features/auth/authSlice';

export default function Layout({ children, page }) {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const user = useSelector((state) => state?.auth?.user);
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };
    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
                <img alt="img" src="./images/logo.png" className="h-10 w-10" />
                {page === 'teams' ? (
                    <></>
                ) : (
                    <input
                        className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                        type="search"
                        placeholder="Search for anything…"
                    />
                )}

                <div className="ml-10">
                    <Link
                        class={`mx-2 text-sm font-semibold ${
                            pathname === '/projects' ? 'text-indigo-700' : 'text-gray-600'
                        } `}
                        to="/projects"
                    >
                        Projects
                    </Link>
                    <Link
                        class={`mx-2 text-sm font-semibold ${
                            pathname === '/teams' ? 'text-indigo-700' : 'text-gray-600'
                        } `}
                        to="/teams"
                    >
                        Team
                    </Link>
                </div>
                <div className="flex items-center space-x-1 ml-auto">
                    <buton className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                        <Tooltip title={user?.name}>
                            <img
                                src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
                                alt=""
                            />
                        </Tooltip>
                    </buton>
                    <ul className="m-0">
                        <li className="text-red-400 ">
                            <span className="cursor-pointer" onClick={logout}>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>

                {/* <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between h-16 items-center">
              <Link to="/">
                <img
                  className="h-10"
                  src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
                  alt=""
                />
              </Link>
              <ul>
                <li className="text-white">
                  <span className="cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
            </div>
            {children}
        </div>
    );
}

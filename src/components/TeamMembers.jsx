/* eslint-disable no-unused-vars */
import { List, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelectors';
// import { userLoggedIn } from "../features/auth/authSlice";
import { useEditTeamMutation, useGetTeamQuery } from '../features/teams/teamApi';
import { useGetUsersQuery } from '../features/users/usersApi';

export default function TeamMembers({ teamId }) {
    const { data: teamData, isLoading, isError } = useGetTeamQuery(teamId);
    const user = useSelector(selectUser);
    const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
    const [editTeam, { isLoading: editLoader }] = useEditTeamMutation();
    const [updateData, setUpdateData] = useState('');
    const selectedMembers = teamData?.members?.map((member) => member.name);
    useEffect(() => {
        if (updateData) {
            editTeam({ data: updateData, id: teamData.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editTeam, updateData]);
    const updateMembers = (value) => {
        const selectedUsers = users
            ?.filter((u) => value.includes(u.name))
            .map((item) => ({ id: item.id, name: item.name, email: item.email }));
        const data = {
            ...teamData,
            members: [...teamData.members, ...selectedUsers],
        };
        setUpdateData(data);
    };
    const removeMember = (member) => {
        const data = {
            ...teamData,
            members: teamData.members.filter((item) => item.id !== member.id),
        };
        setUpdateData(data);
    };
    return (
        <div>
            <List
                size="small"
                dataSource={teamData?.members}
                loading={isLoading}
                renderItem={(item) => (
                    <List.Item
                        actions={
                            item.owner
                                ? [<span>Owner</span>]
                                : [
                                      // eslint-disable-next-line react/button-has-type
                                      <button
                                          onClick={() => removeMember(item)}
                                          className="text-red-500 hover:text-red-800 flex items-center text-sm space-x-1"
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
                                      </button>,
                                  ]
                        }
                    >
                        <List.Item.Meta
                            title={<span className="capitalize">{item.name}</span>}
                            description={<span>{item?.email}</span>}
                        />
                    </List.Item>
                )}
                footer={
                    <div>
                        <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            //   defaultValue={[...selectedMembers]}
                            onChange={updateMembers}
                            loading={loadingUsers}
                            placeholder="Assign New Member"
                        >
                            {users?.map(
                                (item) => (
                                    // item.id !== user.id && (
                                    <Select.Option
                                        disabled={selectedMembers?.includes(item.name)}
                                        value={item.name}
                                        title={item.name}
                                        key={item.id}
                                    >
                                        {item?.name}
                                    </Select.Option>
                                )
                                // )
                            )}
                        </Select>
                        {/* )} */}
                    </div>
                }
            />
        </div>
    );
}

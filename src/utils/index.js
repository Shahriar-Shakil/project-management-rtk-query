// eslint-disable-next-line import/prefer-default-export
export const getMyTeam = (data, userId) =>
    data?.filter((d) => d.members.some((member) => member.id === userId));

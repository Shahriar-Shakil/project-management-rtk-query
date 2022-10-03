import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // eslint-disable-next-line no-unused-vars
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result;
    },
    tagTypes: ['teams', 'team', 'projects', 'project'],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({}),
});

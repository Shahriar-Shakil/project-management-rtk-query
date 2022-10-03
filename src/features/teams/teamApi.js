import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => `/teams`,
            providesTags: ['teams'],
        }),
        getTeam: builder.query({
            query: (id) => `/teams/${id}`,
            providesTags: (r, e, arg) => [{ type: 'team', id: arg }],
        }),
        addTeam: builder.mutation({
            query: ({ data }) => ({
                url: '/teams',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['teams'],
        }),
        editTeam: builder.mutation({
            query: ({ data, id }) => ({
                url: `/teams/${id}`,
                method: 'PUT',
                body: data,
            }),
            // invalidatesTags: (r, e, arg) => [{ type: "team", id: arg.id }],
            async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
                //  pessimistic update
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTeam', id, (draft) => {
                        Object.assign(draft, data);
                    })
                );
                try {
                    await queryFulfilled;
                    dispatch(apiSlice.util.invalidateTags(['teams']));
                } catch {
                    patchResult.undo();
                    dispatch(apiSlice.util.invalidateTags([{ type: 'team', id }]));
                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
        }),
        removeTeam: builder.mutation({
            query: (id) => ({
                url: `/teams/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['teams'],
            // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            //   const patchResult = dispatch(
            //     api.util.updateQueryData("getTeams", id, (draft) => {
            //       Object.assign(draft, patch);
            //     })
            //   );
            //   try {
            //     await queryFulfilled;
            //   } catch {
            //     patchResult.undo();

            //     /**
            //      * Alternatively, on failure you can invalidate the corresponding cache tags
            //      * to trigger a re-fetch:
            //      * dispatch(api.util.invalidateTags(['Post']))
            //      */
            //   }
            // },
        }),
    }),
});
export const {
    useGetTeamsQuery,
    useGetTeamQuery,
    useAddTeamMutation,
    useRemoveTeamMutation,
    useEditTeamMutation,
} = teamsApi;

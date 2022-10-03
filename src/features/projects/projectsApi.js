/* eslint-disable no-unused-vars */
import { apiSlice } from '../api/apiSlice';

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            // eslint-disable-next-line no-unused-vars
            query: (email) => ({
                url: `/projects?_sort=timestamp&_order=desc&participants_like=${email}`,
                method: 'get',
            }),
            providesTags: ['projects'],
        }),
        addProject: builder.mutation({
            query: ({ data }) => ({
                url: '/projects',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['projects'],
        }),
        removeProject: builder.mutation({
            query: ({ id, email }) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ id, email }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getProjects', email, (draft) =>
                        draft.filter((project) => project.id !== id)
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                    dispatch(apiSlice.util.invalidateTags(['projects']));
                }
            },
        }),
        editProject: builder.mutation({
            query: ({ data, id, email }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body: data,
            }),
            // eslint-disable-next-line no-empty-function
            async onQueryStarted({ data, id, email }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getProjects', email, (draft) => {
                        const findObject = draft.find((project) => project.id === id);
                        findObject.stage = data.stage;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                    dispatch(apiSlice.util.invalidateTags(['projects']));
                }
            },
        }),
    }),
});
export const {
    useGetProjectsQuery,
    useAddProjectMutation,
    useEditProjectMutation,
    useRemoveProjectMutation,
} = projectsApi;

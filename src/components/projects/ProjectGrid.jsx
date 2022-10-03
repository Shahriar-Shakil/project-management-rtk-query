import React from 'react';
import { useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import Error from '../ui/Error';
import Loader from '../ui/Loader';
import ProjectList from './ProjectList';

export default function ProjectGrid() {
    const { user } = useSelector((state) => state.auth) || {};
    const { data: projects, isLoading, isError } = useGetProjectsQuery(user?.email);
    // backlog filter
    const filterByBacklog = (project) => project?.stage?.toLowerCase() === 'backlog';

    // ready filter
    const filterByReady = (project) => project?.stage?.toLowerCase() === 'ready';

    // doing filter
    const filterByDoing = (project) => project?.stage?.toLowerCase() === 'doing';

    // review filter
    const filterByReview = (project) => project?.stage?.toLowerCase() === 'review';

    // blocked filter
    const filterByBlocked = (project) => project?.stage?.toLowerCase() === 'blocked';

    // done filter
    const filterByDone = (project) => project?.stage?.toLowerCase() === 'done';
    let content = null;
    if (isLoading) {
        content = (
            <div className="w-full py-4 flex items-center justify-center">
                <Loader />
            </div>
        );
    } else if (!isLoading && isError) {
        content = (
            <div>
                <Error message="Something went wrong" />
            </div>
        );
    } else if (!isLoading && !isError && projects.length === 0) {
        content = (
            <>
                <p className="text-gray-500 px-10 mt-6">
                    No project found! You can add if you are in a team
                </p>
                <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                    <ProjectList title="backlog" />
                    <ProjectList title="ready" />
                    <ProjectList title="doing" />
                    <ProjectList title="review" />
                    <ProjectList title="blocked" />
                    <ProjectList title="done" />
                </div>
            </>
        );
    } else if (!isLoading && !isError && projects.length > 0) {
        content = (
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <ProjectList title="backlog" projects={projects.filter(filterByBacklog)} />
                <ProjectList title="ready" projects={projects.filter(filterByReady)} />
                <ProjectList title="doing" projects={projects.filter(filterByDoing)} />
                <ProjectList title="review" projects={projects.filter(filterByReview)} />
                <ProjectList title="blocked" projects={projects.filter(filterByBlocked)} />
                <ProjectList title="done" projects={projects.filter(filterByDone)} />
            </div>
        );
    }
    return <>{content}</>;
}

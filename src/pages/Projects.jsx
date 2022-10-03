/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProjectGrid from '../components/projects/ProjectGrid';
import Layout from './Layout';

export default function Projects() {
    return (
        <Layout>
            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <DndProvider backend={HTML5Backend}>
                <ProjectGrid />
            </DndProvider>
        </Layout>
    );
}

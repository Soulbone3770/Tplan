import { Routes, Route } from 'react-router-dom';
import TasksPage from '../pages/tasks/TasksPage';
import NoEncontradoPage from '../pages/NoEncontradoPage';

const TasksRouter = () => {
    return (
        <Routes>
            <Route path="/view" element={<TasksPage />} />
            <Route path="*" element={<NoEncontradoPage />} />
        </Routes>
    )
};

export default TasksRouter;
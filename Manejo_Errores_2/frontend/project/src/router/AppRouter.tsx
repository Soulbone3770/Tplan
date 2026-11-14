import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersRouter from "./UsersRouter";

import Index from "../pages/Index";
import NoEncontradoPage from "../pages/NoEncontradoPage";
import TasksRouter from "./TasksRouter";
import { ProtectedRoute } from "../features/auth";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/users/*" element={<UsersRouter />} />
                <Route path="/tasks/*" element={
                    <ProtectedRoute>
                        <TasksRouter />
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<NoEncontradoPage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter;
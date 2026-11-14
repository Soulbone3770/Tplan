import { Route, Routes } from "react-router-dom";

import RegisterUserPage from "../pages/users/RegisterUserPage";
import LoginUserPage from "../pages/users/LoginUserPage";
import NoEncontradoPage from "../pages/NoEncontradoPage";

const UsersRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterUserPage />} />
            <Route path="/login" element={<LoginUserPage />} />
            <Route path="*" element={<NoEncontradoPage />} />
        </Routes>
    )
};

export default UsersRouter;
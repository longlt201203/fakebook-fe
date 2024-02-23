import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import AdminAccountManagement from "../pages/AdminAccountManagement/AdminAccountManagement";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import { RequestApisPage } from "../pages/RequestApisPage/RequestApisPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/accounts',
        element: <AdminAccountManagement/>
    },
    {
        path: '/register',
        element: <RegistrationPage/>
    },
    {
        path: '/profile',
        element: <UserProfilePage/>
    },
    {
        path: '/apis',
        element: <RequestApisPage/>
    }
]);
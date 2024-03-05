import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import { RequestApisPage } from "../pages/RequestApisPage/RequestApisPage";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Newsfeed from "../pages/Newsfeed/Newsfeed";
import UserFeed from "../pages/UserFeed/UserFeed";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
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
        path: '/feed',
        element: <Newsfeed/>
    },
    {
        path: '/apis',
        element: <RequestApisPage/>
    },
    {
        path: "/dashboard",
        element: <AdminDashboard/>
    },
    {
        path: "/user/:accountId",
        element: <UserFeed/>
    }
]);
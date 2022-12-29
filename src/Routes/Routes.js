import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/Home/About/About";
import Home from "../Pages/Home/Home/Home";
import Media from "../Pages/Home/Media/Media";
import MediaCardDetail from "../Pages/Home/Media/MediaCardDetail";
import Message from "../Pages/Home/Message/Message";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/posts/:id',
                loader: async({params}) => await fetch(`https://e-postal-server.vercel.app/posts/${params.id}`),
                element: <PrivateRoute><MediaCardDetail></MediaCardDetail></PrivateRoute>
            },
        ]
    }
])
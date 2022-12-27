import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";

export const routes = [
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
]
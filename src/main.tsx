import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoListPage from "./pages/TodoListPage";
import { Container } from "@mui/material";
// import TodoPage from "./pages/TodoPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TodoListPage/>,
    },
    // {
    //     path: "/todo/:todoId",
    //     element: <TodoPage/>,
    // },
]);

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Container>
                <RouterProvider router={router}/>
            </Container>
        </QueryClientProvider>
    </React.StrictMode>,
)

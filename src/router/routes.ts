import {RouteObject} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import MainLayout from "@/layouts/MainLayout";
import {lazy} from "react";

const UsersPage = lazy(() => import("@/pages/UsersPage"));
const AnimalsPage = lazy(() => import("@/pages/AnimalsPage"));
const NotFound = lazy(() => import("@/pages/NotFoundPage"));

const MainLayoutRoutes: RouteObject[] = [
    {
        index: true,
        Component: HomePage,
    },
    {
        path: "users",
        Component: UsersPage,
    },
    {
        path: "animals",
        Component: AnimalsPage,
    },
]

const routes: RouteObject[] = [
    {
        path: "/",
        Component: MainLayout,
        children: MainLayoutRoutes,
    },
    {
        path: "*",
        Component: NotFound,
    },
]

export default routes;
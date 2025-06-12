import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
    return (
        <div className="flex flex-col gap-16 text-center p-64">
            <h1 className=" text-3xl">Oops...</h1>
            <p className="font-bold text-2xl">404</p>
            <p>Page not found</p>
            <Link to="/" className="routelink text-xl">
                Go to homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
    return (
        <div className="homepage text-center p-12">
            <h1 className="h1 mb-12">Select the data entity:</h1>
            <div className="flex justify-center gap-4 mb-8">
                <Button className="mb-4" variant="outline" size="lg" asChild>
                    <Link to="/users">Users</Link>
                </Button>
                <Button className="mb-4" variant="outline" size="lg" asChild>
                    <Link to="/animals">Animals</Link>
                </Button>
            </div>
        </div>
    );
}

export default HomePage;
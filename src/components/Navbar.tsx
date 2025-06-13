import { Link } from 'react-router-dom';
import { DarkmodeToggle } from '@/components/darkmode-toggle';
import { navbarItems } from '@/components/Providers/navbar-provider';
import { NavbarCombobox } from '@/components/NavbarCombobox';

export default function Navbar() {
    return (
        <aside className="h-16 bg-gray-100 dark:bg-[var(--color-darkbar-background)] p-4 flex justify-between gap-4">
            <Link
                to="/"
                className="text-xl font-extrabold mr-4 text-inqool-primary"
            >
                Home
            </Link>
            
            <div className="flex gap-8">
                <div className="hidden md:flex items-center gap-8">
                    {navbarItems.map(item => (
                        <Link
                            key={item.value}
                            to={item.value}
                            className="block hover:underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="ml-auto md:ml-0">
                <DarkmodeToggle />
            </div>
            <div className="md:hidden">
                <NavbarCombobox/>
            </div>
        </aside>
    );
}
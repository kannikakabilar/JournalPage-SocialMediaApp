import Header from './Header';
import {Outlet} from 'react-router-dom';
export default function Layout() {
    // All pages of the application will display the header then the outlet
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}
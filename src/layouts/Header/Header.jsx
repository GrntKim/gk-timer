import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/">GK-TIMER</Link>
            </div>
            <div className="menus">
                <ul className="list-menus">
                    <li><NavLink to="/">Timer</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </header>
    );
}
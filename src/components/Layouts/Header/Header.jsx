import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/">GK-TIMER <em>BETA</em></Link>
            </div>
            <div className="menus">
                <ul className="list-menus">
                    <li><NavLink to="/menu1">Menu1</NavLink></li>
                    <li><NavLink to="/menu2">Menu2</NavLink></li>
                    <li><NavLink to="/menu3">Menu3</NavLink></li>
                </ul>
            </div>
        </header>
    );
}
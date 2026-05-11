import './Header.css';

export default function Header() {
    return (
        <header>
            <div className="logo">
                <a href="/">GK-TIMER <em>BETA</em></a>
            </div>
            <div className="menus">
                <ul className="list-menus">
                    <li><a href="#">Menu1</a></li>
                    <li><a href="#">Menu2</a></li>
                    <li><a href="#">Menu3</a></li>
                </ul>
            </div>
        </header>
    );
}
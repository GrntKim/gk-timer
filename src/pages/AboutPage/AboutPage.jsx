import { SiReact, SiVite } from 'react-icons/si';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <div className="about-page">
            <h1 className='title'>ABOUT</h1>
            <div className="contents">
                <p>GK-Timer: Yet another simple Twisty puzzle timer</p>
                <p>Developed by: Junmyeong Kim(Grant Kim)</p>
                <span className="powered-by">Powered by:
                    <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">
                        <SiReact size={24} color='#61dafb'/> React
                    </a>
                    <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener noreferrer">
                        <SiVite size={24} color='#646cff'/> Vite
                    </a>
                    <a href="https://github.com/cubing/cubing.js/" target="_blank" rel="noopener noreferrer">
                        cubing.js
                    </a>
                </span>
            </div>
        </div>
    );
}

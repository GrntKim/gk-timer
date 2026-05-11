import { SiReact, SiVite } from 'react-icons/si';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <div className="about-page">
            <h1 className='title'>ABOUT</h1>
            <div className="contents">
                <p>GK-Timer: Yet another simple Twisty puzzle timer</p>
                <p>Developed by: Junmyeong Kim(Grant Kim)</p>
                <span>Powered by:
                    <SiReact size={24} color='#61dafb'/>
                    <SiVite size={24} color='#646cff'/>
                </span>
            </div>
        </div>
    );
}
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Timer from "./components/Pages/Timer/Timer";
import SettingsPage from './components/Pages/SettingsPage/SettingsPage';
import AboutPage from './components/Pages/AboutPage/AboutPage';
import "./App.css";

function App() {

  return (
      <div className="app-container">
        <Header />

        <main className="page">
          <Routes>
            <Route path='/' element={<Timer />}></Route>
            <Route path='/setup' element={<SettingsPage />}></Route>
            <Route path='/about' element={<AboutPage />}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;

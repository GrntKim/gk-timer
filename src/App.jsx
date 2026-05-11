import { Routes, Route } from 'react-router-dom';
import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import Timer from "./pages/Timer/Timer";
import SettingsPage from './pages/SettingsPage/SettingsPage';
import AboutPage from './pages/AboutPage/AboutPage';
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

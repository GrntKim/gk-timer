import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Timer from "./components/Timer/Timer";
import "./App.css";

function Menu1() {
  return <main>Menu1</main>
}

function Menu2() {
  return <main>Menu2</main>
}

function Menu3() {
  return <main>Menu3</main>
}

function App() {

  return (
      <div className="app-container">
        <Header></Header>

        <main className="page">
          <Routes>
            <Route path='/' element={<Timer />}></Route>
            <Route path='/menu1' element={<Menu1 />}></Route>
            <Route path='/menu2' element={<Menu2 />}></Route>
            <Route path='/menu3' element={<Menu3 />}></Route>
          </Routes>
        </main>

        <Footer></Footer>
      </div>
  );
}

export default App;

import Footer from "./components/Layouts/Footer/Footer"
import Header from "./components/Layouts/Header/Header"
import Timer from "./components/Timer/Timer"
import "./App.css"

function App() {

  return (
      <div className="app-container">
        <Header></Header>
        <Timer></Timer>
        <Footer></Footer>
      </div>
  );
}

export default App;

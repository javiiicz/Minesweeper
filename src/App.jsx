import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Field'
import {Test} from "./components/testScript"

function App() {
  return (
    <div className="bg-gray-50">
      <Header />
        <main className="overflow-hidden text-gray-900">
          <h1 className='text-4xl font-extrabold mx-[5%] my-4'>Minesweeper</h1>
          <Game/>
          {//Test/>
          }
        </main>
      <Footer />
    </div>
  );
}

export default App;

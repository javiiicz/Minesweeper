import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Field'
import Instructions from './components/Instructions'
import Scores from './components/Scores';

function App() {
  return (
    <div className="bg-gray-50">
      <Header />
        <main className="overflow-hidden text-gray-900">
          <h1 className='text-4xl font-extrabold mx-[5%] my-6 underline underline-offset-4 decoration-red-400'>Minesweeper</h1>  
          <Game/>
          <Instructions/>
          <Scores/>
        </main>
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Field'
import Instructions from './components/Instructons'

function App() {
  return (
    <div className="bg-gray-50">
      <Header />
        <main className="overflow-hidden text-gray-900">
          <h1 className='text-4xl font-extrabold mx-[5%] my-6'>Minesweeper</h1>  
          <Game/>
          <Instructions/>
        </main>
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Test from './components/test'

function App() {
  return (
    <div className="bg-gray-50">
      <Header />
        <main className="overflow-hidden text-gray-900">
          <Test></Test>
        </main>
      <Footer />
    </div>
  );
}

export default App;

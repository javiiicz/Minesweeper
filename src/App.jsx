import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Field'
import Instructions from './components/Instructions'
import Scores from './components/Scores';
import { useState, useEffect } from 'react';
import { db } from './scripts/firebase';
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';

function App() {
    // Score variables
    const [scores, setScores] = useState({
        top10Beg: [],
        top10Int: [],
        top10Exp: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        function getScores() {
            const qBeg = query(collection(db, "beginner"), orderBy("points", "asc"), limit(10))
            const qInt= query(collection(db, "intermediate"), orderBy("points", "asc"), limit(10))
            const qExp = query(collection(db, "expert"), orderBy("points", "asc"), limit(10))

            return Promise.all([
                getDocs(qBeg),
                getDocs(qInt),
                getDocs(qExp)
            ]).then(([querySnapshotBeg, querySnapshotInt,querySnapshotExp]) => {
                return {
                    top10Beg: querySnapshotBeg.docs.map(doc => doc.data()),
                    top10Int: querySnapshotInt.docs.map(doc => doc.data()),
                    top10Exp: querySnapshotExp.docs.map(doc => doc.data())
                };
            });
        }
        
        getScores().then(fetchedScores => {
            setScores(fetchedScores)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setError('Failed to fetch scores')
            setLoading(false)
        })
    
    }, [])

  return (
    <div className="bg-gray-50">
      <Header />
        <main className="overflow-hidden text-gray-900">
          <h1 className='text-4xl font-extrabold mx-[5%] my-6 underline underline-offset-4 decoration-red-400'>Minesweeper</h1>  
          <Game scoreList={scores}/>
          <Instructions/>
          <Scores loaded={loading} err={error} scoreList={scores}/>
        </main>
      <Footer />
    </div>
  );
}

export default App;

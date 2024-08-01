import {useState, useEffect} from "react"
import {db} from "../scripts/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"

function Scores() {
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
    
    })

    if (loading) return <div className="mx-[10%] my-12">Loading...</div>
    if (error) return <div className="mx-[10%] my-12">{error}</div>

    return (
        <div className="mx-[10%] my-12">
            <h3 className="font-bold text-xl">High Scores</h3>

            <div className="mt-4 scoreGrid grid grid-cols-3 gap-2 rounded overflow-hidden outline outline-1 outline-offset-2 outline-slate-400">
                <div>
                    <h4 className="text-center font-medium bg-slate-300">Beginner Highscores</h4>

                    <div className="flex flex-row justify-between px-12 bg-slate-200">
                            <span>RANK</span>
                            <span>NAME</span>
                            <span>TIME</span>
                        </div>

                    {scores["top10Beg"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span >{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span >{obj.points}</span>
                        </div>
                    ))}

                </div>
                <div>
                    <h4 className="text-center font-medium bg-slate-300">Intermediate Highscores</h4>

                    <div className="flex flex-row justify-between px-12 bg-slate-200">
                            <span>RANK</span>
                            <span>NAME</span>
                            <span>TIME</span>
                        </div>

                    {scores["top10Int"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span>{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span>{obj.points}</span>
                        </div>
                    ))}

                </div>
                <div>
                <h4 className="text-center font-medium bg-slate-300">Expert Highscores</h4>

                <div className="flex flex-row justify-between px-12 bg-gray-200">
                        <span>RANK</span>
                        <span>NAME</span>
                        <span>TIME</span>
                    </div>

                    {scores["top10Exp"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span>{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span>{obj.points}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Scores
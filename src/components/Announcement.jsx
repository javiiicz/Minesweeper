import { useState, useRef } from "react"
import { collection, query, orderBy, limit, addDoc, getDocs, deleteDoc, doc} from "firebase/firestore"
import { db } from "../scripts/firebase"

function Announcement (props) {
    let style = ""
    let content = ""
    const score = props.score
    const scoreList = props.scoreList
    const difficulty = props.diff
    const [initials, setInitials] = useState("")
    const submitted = useRef(false)


    const changeVal = event => {
        const newVal = event.target.value
        setInitials(newVal)
    }

    async function submit() {
        if (submitted.current) { // Avoid double submissions
            return
        }
        
        let top10;
        if (difficulty == "beginner") {
            top10 = scores["top10Beg"].map(doc => doc.points);
        } else if (difficulty == "intermediate") {
            top10 = scores["top10Int"].map(doc => doc.points);
        } else {
            top10 = scores["top10Exp"].map(doc => doc.points);
        }

        
        // If better than top 10, add score
        if (top10.length < 10 || score < top10[top10.length - 1]) { 
            try {
                const ref = collection(db, difficulty)
                const docRef = await addDoc(ref, {
                    name: initials,
                    points: score
                });
                console.log("Added " + initials + " with score " + score + " and difficulty: " + difficulty)
                submitted.current = true

                // Remove score if larger than 10
                if (top10.length === 10) {
                    const newq = query(ref, orderBy("points", "desc"), limit(1))
                    const lowestScoreDoc = await getDocs(newq)

                    if (!lowestScoreDoc.empty) {
                        await deleteDoc(lowestScoreDoc.docs[0].ref)
                        console.log("removed ", lowestScoreDoc)
                    }
                }

            } catch (e) {
                console.log("Error adding document: ", e)
            }
        }
        



        
    }

    switch (props.type) {
        case 0: // None
            style = "hidden pointer-events-none"
            content="test"
            break;
        case 1: // Win
            content = "Congratulations!"
            break;
        case 2: // Lose
            content = "You lost, try again!"
            break
    }

    return (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className={"p-3 flex flex-col gap-2 items-center text-center justify-center text-lg font-medium rounded bg-gray-300/80 w-52 backdrop-blur-[1px] " + style}>
                {content}
                {(props.type == 1) ?
                    <div className="flex flex-col items-center gap-2">
                        <input 
                            className="placeholder:text-gray-300 placeholder:text-left w-20 text-center rounded uppercase font-extrabold" 
                            placeholder=" Initials" 
                            maxLength={3} value={initials} 
                            onChange={changeVal}>
                        </input> 
                        <div 
                            onClick={submit}
                            className="bg-gray-800 text-gray-50 p-1 px-2 rounded font-bold cursor-pointer hover:bg-blue-800 transition-all duration-500">
                                Submit Score
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Announcement;
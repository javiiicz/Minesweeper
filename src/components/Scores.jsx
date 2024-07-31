import {db} from "../scripts/firebase"
import { collection, getDocs } from "firebase/firestore"

function Scores() {

    return (
        <div className="mx-[10%] my-12">
            <h3 className="font-bold text-xl">High Scores</h3>
        </div>
    )
}

export default Scores
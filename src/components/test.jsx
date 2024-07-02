import {Board} from "../scripts/main"

function Test () {
    

    return (
        <div onClick={call} className="h-8 w-8 bg-gray-950">
        </div>
    )
}

function call () {
    let a = new Board(10, 10)
    a.print_board()

}

export default Test;
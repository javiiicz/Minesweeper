const FLAG = "F"
const MINE = -1

function Cell(props) {
    const state = props.state
    let style = "uncovered "
    let content = ""


    if (state == FLAG) {
        content = "🚩"
        style = "covered"
    } else if (state == MINE) {
        content = "💣"
        style += "bg-gray-800"
    } else if (state == 0) {
        style += "bg-gray-400"
    } else if (state in [1,2,3,4,5,6,7,8]){
        content = state
        style += "bg-gray-400 font-extrabold"
    } else {
        style = "covered"
    }

    return (
        <div className={"table w-full h-full " + style}>
            <span className="table-cell align-middle text-sm">{content}</span>
        </div>
    )
}

export default Cell
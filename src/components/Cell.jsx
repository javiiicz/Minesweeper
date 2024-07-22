const FLAG = "F"
const MINE = -1

function Cell(props) {
    const state = props.state
    let style = "uncovered "
    let content = ""
    let color = ""
    const colors = {
        1: "text-blue-800",
        2: "text-green-700",
        3: "text-red-600",
        4: "text-blue-950",
        5: "text-rose-950",
        6: "text-cyan-700",
        7: "text-violet-800",
        8: "text-neutral-900"
    }


    if (state == FLAG) {
        style = "covered bg-[url('/src/images/flag.svg')]"
    } else if (state == MINE) {
        content = "💣"
        style += "bg-red-400"
    } else if (state == 0) {
        style += "bg-gray-400"
    } else if (state in [1,2,3,4,5,6,7,8]){
        content = state
        style += "bg-gray-400 font-extrabold"
        color = colors[state]

    } else {
        style = "covered"
    }

    return (
        <div className={"table w-full h-full " + style}>
            <span className={"table-cell align-middle text-sm " + color}>{content}</span>
        </div>
    )
}

export default Cell
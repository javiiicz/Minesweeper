import { useState } from "react"

function Announcement (props) {
    let style = ""
    let content = ""
    const score = props.score
    const difficulty = props.diff
    const [initials, setInitials] = useState("")

    const changeVal = event => {
        const newVal = event.target.value
        setInitials(newVal)
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
                        <div className="bg-gray-800 text-gray-50 p-1 px-2 rounded font-bold cursor-pointer hover:bg-blue-800 transition-all duration-500">Submit Score</div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Announcement;
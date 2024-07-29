function Announcement (props) {
    let style = ""
    let content = ""

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
        <div className={"p-4 flex content-center items-center text-center justify-center text-lg font-bold rounded bg-gray-200 w-52 opacity-80 " + style}>{content}</div>
    )
}

export default Announcement;
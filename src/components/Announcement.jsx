function Announcement (props) {
    let style = ""
    let content = ""

    switch (props.type) {
        case 0: // None
            style = "hidden pointer-events-none"
            content="test"
            break;
        case 1: // Win
            content = "Congratulations! Submit your score?"
            break;
        case 2: // Lose
            content = "You lost, try again!"
            break
    }

    return (
        <div className={"p-3 flex content-center items-center text-center justify-center text-lg font-medium rounded bg-gray-300/80 w-52 backdrop-blur-[1px] " + style}>{content}</div>
    )
}

export default Announcement;
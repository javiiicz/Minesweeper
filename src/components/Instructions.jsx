function Instructions () {
    return (
        <div className="mx-[10%] pb-12">
            <span className="font-bold">Instructions: </span>
            <div className="pl-8">
                <ul className="list-disc">
                    <li>The objective of the game is to decipher the location of all the mines in the field.</li>
                    <li>Click to reveal a cell or press space to flag it.</li>
                    <li>Cells with numbers hint at the number of mines in the eight cells adjacent to them.</li>
                    <li>You can do a "quick-reveal" by pressing space on a cell that has flags equal to its number of mines in its vicinity.</li>
                    <li>To restart the game, click the face at the top.</li>
                </ul>
            </div>
        </div>
    )
}

export default Instructions
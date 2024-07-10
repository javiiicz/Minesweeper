import { Board } from "../scripts/minesweeper"

export function Test () {
    function debug ( ) {
        let B = new Board(9, 9);
        B.generate_mines(1, 1, 10);
        B.print_board();
    }

    return (
        <div className="h-32 w-32 bg-red-500" onClick={debug}>
            
        </div>
    )
}
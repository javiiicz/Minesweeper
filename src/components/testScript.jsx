import { Board } from "../scripts/minesweeper"

export function Test () {
    function debug ( ) {
        let B = new Board(16, 16, "intermediate");
        B.click(3, 10);
        B.print_board();
        B.click(10,10);
        
    }

    return (
        <div className="h-32 w-32 bg-red-500" onClick={debug}>
            
        </div>
    )
}
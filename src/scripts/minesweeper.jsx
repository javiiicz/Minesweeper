const MINE = "*"
const EMPTY = null;
export class Board {
    constructor(rows, cols, mines) {
        this.rows = rows
        this.cols = cols
        this.mines = mines
        this.hasGenerated = false;
        
        this.matrix = new Array(rows)
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols).fill(0);
        }
    }


    click(i, j){
        // First click generates board
        if (!this.hasGenerated) {
            this.generate_mines(i, j, this.mines);
            this.fill_board_numbers();
            this.hasGenerated = !this.hasGenerated
        }

        if (this.matrix[i][j] == MINE) {
            return(-1)
        }
        else {
            return this.matrix[i][j]
        }
    }


    // i: row | j: column | n: number of mines
    // Does not generate mine at specified coordinates
    generate_mines(i, j, n) {
        let counter = 0

        if (this.rows * this.cols - 1 < n) {
            throw new Error("No space for all the mines") 
        }

        
        while (counter != n) {
            let row = Math.floor(Math.random() * this.rows)
            let col = Math.floor(Math.random() * this.cols)
            
            if ((row != i || col != j) && (this.matrix[row][col] != MINE)) {
                this.matrix[row][col] = MINE
                counter++
            }
        }

    }


    fill_board_numbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.matrix[i][j] != MINE) {
                    this.matrix[i][j] = this.calculate_mines_around(i,j).toString()
                }
            }
        }
    }


    calculate_mines_around(i,j) {

        if (i < 0 || j < 0 || i >= this.rows || j >= this.cols) {
            throw new Error("Coordinates out of range")
        }

        let counter = 0
        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                if (i + a < 0 || j + b < 0 || i + a >= this.rows || j + b >= this.cols) {
                    continue
                }
                
                else if (this.matrix[i + a][j + b] == MINE) {   
                    counter++
                }
            }
        }

        return counter
    }


    print_board() {
        let out = ""

        for (let i = -1; i < this.rows + 1; i++) {
            for (let j = -1; j < this.cols + 1; j++) {

                if (i == -1 || j == -1 || i == this.rows || j == this.cols) {
                    out += "⬜\t"
                }
                else if (this.matrix[i][j] == EMPTY) {
                    out += "0\t"
                }
                else if (this.matrix[i][j] == MINE) {
                    out += "💣\t"
                }
                else {
                    out += this.matrix[i][j] + "\t"
                }
            }
            out += "\n"
        }

        console.log(out)
    }
}
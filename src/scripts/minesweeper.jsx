export class Board {
    constructor(rows, cols, difficulty) {
        this.rows = rows
        this.cols = cols
        this.mines = 0
        this.difficulty = difficulty
        
        this.matrix = new Array(rows)
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols).fill(0);
        }

        this.difficulties = {
            beginner: {rows: 9, cols: 9, mines: 10},
            intermediate: {rows: 16, cols: 16, mines: 40},
            expert: {rows: 16, cols: 30, mines: 99}
        }
    }


    click(i, j){
        // First click generates board
        if (this.mines == 0) {
            this.generate_mines(i, j, this.difficulties[this.difficulty]["mines"]);
            this.fill_board_numbers();
        }

        if (this.matrix[i][j] == "*") {
            throw new Error("Game Over");
            this.gameOver();
        }
        else {
            ;
        }
    }


    // i: row | j: column | n: number of mines
    // Does not generate mine at specified coordinates
    generate_mines(i, j, n) {
        if (this.rows * this.cols - 1 < n) {
            throw new Error("No space for all the mines") 
        }

        while (this.mines != n) {
            let row = Math.floor(Math.random() * this.rows)
            let col = Math.floor(Math.random() * this.cols)
            
            if ((row != i || col != j) && (this.matrix[row][col] != "*")) {
                this.matrix[row][col] = "*"
                this.mines++
            }
        }
    }


    fill_board_numbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.matrix[i][j] != "*") {
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
                
                else if (this.matrix[i + a][j + b] == "*") {   
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
                else if (this.matrix[i][j] == null) {
                    out += "0\t"
                }
                else if (this.matrix[i][j] == "*") {
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
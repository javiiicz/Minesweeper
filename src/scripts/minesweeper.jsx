export class Board {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        
        this.matrix = new Array(rows)
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols)
        }
    }


    // i: row | j: column | n: number of mines
    // Does not generate mine at specified coordinates
    generate_mines(i, j, n) {
        if (this.rows * this.cols - 1 < n) {
            throw new Error("No space for all the mines") 
        }

        let mines = 0
        while (mines != n) {
            let row = Math.floor(Math.random() * this.rows)
            let col = Math.floor(Math.random() * this.cols)
            
            if ((row != i || col != j) && (this.matrix[row][col] != "*")) {
                this.matrix[row][col] = "*"
                mines++
            }
        }
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
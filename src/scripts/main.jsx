export class Board {
    constructor(sizeX, sizeY) {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.matrix = new Array(sizeY)

        for (let i = 0; i < sizeY; i++) {
            this.matrix[i] = new Array(sizeX)
        }
    }


    print_board() {
        let out = ""

        for (let i = -1; i < this.sizeY + 1; i++) {
            for (let j = -1; j < this.sizeX + 1; j++) {

                if (i == -1 || j == -1 || i == this.sizeY || j == this.sizeX) {
                    out += "⬜\t"
                }
                else if (this.matrix[i][j] == null) {
                    out += "0\t"
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
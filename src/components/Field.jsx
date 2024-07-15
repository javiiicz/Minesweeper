import { useState, useEffect, useCallback } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import smileUrl from '../images/ms-smile.webp'
import {Board} from "../scripts/minesweeper.jsx"

const EMPTY = "_"

function Game () {
    const [isVisible, setIsVisible] = useState(false);
    const [difficulty, setDifficulty] = useState("expert");
    const [grid, setGrid] = useState([]);
    const [gridState, setGridState] = useState([]);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [B, setB] = useState(null);
    const [gameStatus, setGameStatus] = useState('ready')

    const difficulties = {
        beginner: {rows: 9, cols: 9, mines: 10},
        intermediate: {rows: 16, cols: 16, mines: 40},
        expert: {rows: 16, cols: 30, mines: 99}
    }

    const resetGame = useCallback(() => {
        setGridState([])
        setHoveredCell(null)
        setGameStatus('ready')
        generateGrid()

    }, [difficulty])

    useEffect(() => {
        resetGame();
    }, [difficulty, resetGame])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space' && hoveredCell) {
                event.preventDefault();
                const { row, col } = hoveredCell;
                cellSpaceClick(row, col);
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }

    }, [hoveredCell]);

    function generateGrid() {
        const {rows, cols, mines} = difficulties[difficulty]
        const newGrid = new Array(rows).fill().map(function() {
            return new Array(cols).fill(0)
        });
        setGrid(newGrid);
        setGridState(Array(rows).fill().map(() => Array(cols).fill(null)));
        setB(new Board(rows, cols, mines));
        setGameStatus('playing')
    }

    const handleCellHover = (row, col) => {
        setHoveredCell({ row, col });
    }

    const handleCellLeave = () => {
        setHoveredCell(null);
    }

    const cellHandleClick = (i, j) => {
        let result = B.click(i,j);
        const newGridState = [...gridState];
        result = handleResult(result)
        newGridState[i][j] = result;
        setGridState(newGridState);

        if (result == EMPTY) {
            revealSurroundingCells(i,j)
        };
    }

    const cellSpaceClick = (i, j) => {
        let result;
        if (gridState[i][j] == null) {
            result = "🚩"
        }
        else if (gridState[i][j] == "🚩") {
            result = null
        }
        
        const newGridState = [...gridState];
        newGridState[i][j] = result;
        setGridState(newGridState);
    }

    const revealSurroundingCells = (i, j) => {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;


                if (newI >= 0 && newI < gridState.length && newJ >= 0 && newJ < gridState[0].length) {
                    if (gridState[newI][newJ] == null) {
                        cellHandleClick(newI,newJ)
                    }
                }
            };
        };
    };

    function handleResult(num) {
        if (num == -1) {
            return "💥"
        }
        else if (num == 0 ) {
            return EMPTY
        }
        else {
            return num
        }
    }

    function resetGane() {
        setDifficulty(difficulty)
    }

    return (
        <div className="px-[20%] my-10">
            <div className="text-lg flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                    <a className="font-bold cursor-pointer" onClick={() => setIsVisible(prevState => !prevState)}>New Game</a>
                    <AnimatePresence>
                        {isVisible && (
                            <motion.div
                                className="flex flex-row gap-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p onClick={() => setDifficulty("beginner")} className="hover:font-medium transition-all cursor-pointer">Beginner</p>
                                <p onClick={() => setDifficulty("intermediate")} className="hover:font-medium transition-all cursor-pointer">Intermediate</p>
                                <p onClick={() => setDifficulty("expert")} className="hover:font-medium transition-all cursor-pointer">Expert</p>
                            </motion.div>
                        )}
            
                    </AnimatePresence>
                </div>
            </div>
            <div className="game-window bg-gray-200 p-10">
                <div className="counters flex flex-row gap-3 justify-between text-xl font-bold">
                    <p>00</p>
                    <div className="button w-8 h-8 border border-gray-300 rounded active:bg-gray-300">
                        <img src = {smileUrl} onClick={resetGame}></img>
                    </div>
                    <p>00</p>
                </div>
                
                <div className="flex justify-center bg-gray-300 m-2 py-12 ">
                    <div className="mines my-auto">
                        {grid.map(function(row, rowIndex) {
                            return (
                                <div key={rowIndex} className="flex flex-row gap-1 m-1">
                                {row.map(function(cell, colIndex) {
                                    return (
                                        <div 
                                            key = {`${rowIndex}-${colIndex}`} 
                                            onClick={() => cellHandleClick(rowIndex, colIndex) } 
                                            onMouseEnter={() => handleCellHover(rowIndex, colIndex )}
                                            onMouseLeave={handleCellLeave}
                                            className="text-center w-5 h-5 bg-gray cursor-pointer bg-slate-400 hover:bg-slate-500 active:bg-slate-600 outline-2 outline outline-slate-500"
                                        >
                                            {gridState[rowIndex][colIndex]}
                                        </div>
                                    );
                                })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;
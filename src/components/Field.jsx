import { useState, useEffect, useCallback } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import smileUrl from '../images/ms-smile.webp'
import {Board} from "../scripts/minesweeper.jsx"
import Cell from "./Cell.jsx"

const FLAG = "F"
const MAX_TIME = 999
const DIFFICULTIES = {
    beginner: {rows: 9, cols: 9, mines: 10},
    intermediate: {rows: 16, cols: 16, mines: 40},
    expert: {rows: 16, cols: 30, mines: 99}
}

function Game () {
    // Game Variables
    const [isVisible, setIsVisible] = useState(false);
    const [difficulty, setDifficulty] = useState("expert");
    const [grid, setGrid] = useState([]);
    const [gridState, setGridState] = useState([]);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [B, setB] = useState(null);
    const [isRunning, setIsRunning] = useState(false)
    const [mineCounter, setMineCounter] = useState(0)
    const [gameTime, setGameTime] = useState(0)

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false)
    const resetTimer = () => {
        setIsRunning(false)
        setGameTime(0)
    }

    const resetGame = useCallback(() => {
        setGridState([])
        setHoveredCell(null)
        generateGrid()
        resetTimer();
    }, [difficulty])

    
    //
    useEffect(() => {
        let intervalId;
        if (isRunning && gameTime < MAX_TIME) {
            intervalId = setInterval(() => {
                setGameTime(prevTime => {
                    if (prevTime >= MAX_TIME) {
                        clearInterval(intervalId);
                        setIsRunning(false);
                        return MAX_TIME
                    }
                    return prevTime + 1
                })
            }, 1000)
        }
        return () => clearInterval(intervalId)
    }, [isRunning])

    useEffect(() => {
        resetGame();
    }, [difficulty, resetGame])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space' && hoveredCell) {
                event.preventDefault();
                const { row, col } = hoveredCell;
                handleCellSpace(row, col);
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }

    }, [hoveredCell]);
    //


    function generateGrid() {
        const {rows, cols, mines} = DIFFICULTIES[difficulty]
        const newGrid = new Array(rows).fill().map(function() {
            return new Array(cols).fill(0)
        });
        setGrid(newGrid);
        setGridState(Array(rows).fill().map(() => Array(cols).fill(null)));
        setB(new Board(rows, cols, mines));
        setMineCounter(mines);
    }

    const handleCellHover = (row, col) => {
        setHoveredCell({ row, col });
    }

    const handleCellLeave = () => {
        setHoveredCell(null);
    }

    const handleCellClick = (i, j) => {
        if (!isRunning) {
            startTimer();
        }

        let result = B.click(i,j);
        const newGridState = [...gridState];
        newGridState[i][j] = result;
        setGridState(newGridState);

        if (result == 0) {
            revealSurroundingCells(i,j)
        };
    }

    const handleCellSpace = (i, j) => {
        let result;

        if (gridState[i][j] == null) {
            result = FLAG
            setMineCounter(mineCounter - 1)
        }
        else if (gridState[i][j] == FLAG) {
            result = null
            setMineCounter(mineCounter + 1)
        }
        else if (gridState[i][j] == flagsAround(i,j)) {
            revealSurroundingCells(i,j)
            return
        }
        else {
            return
        }
        
        const newGridState = [...gridState];
        newGridState[i][j] = result;
        setGridState(newGridState);
    }

    function flagsAround(i,j)  {
        let counter = 0;
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                
                if (k == 0 && l ==0) {
                    continue
                }

                if ((newI >= 0 && newI < gridState.length && newJ >= 0 && newJ < gridState[0].length) && (gridState[newI][newJ] == FLAG)) {
                    counter++
                }
            }
        }

        return counter
    }

    const revealSurroundingCells = (i, j) => {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;


                if (newI >= 0 && newI < gridState.length && newJ >= 0 && newJ < gridState[0].length) {
                    if (gridState[newI][newJ] == null) {
                        handleCellClick(newI,newJ)
                    }
                }
            };
        };
    };


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
                    <p>{gameTime}</p>
                    <div className="button w-8 h-8 border border-gray-300 rounded active:bg-gray-300">
                        <img src = {smileUrl} onClick={resetGame}></img>
                    </div>
                    <p>{mineCounter}</p>
                </div>
                
                <div className="flex justify-center bg-gray-300 py-12 ">
                    <div className="mines my-auto">
                        {grid.map(function(row, rowIndex) {
                            return (
                                <div key={rowIndex} className="flex flex-row">
                                {row.map(function(cell, colIndex) {
                                    return (
                                        <div 
                                            key = {`${rowIndex}-${colIndex}`} 
                                            onClick={() => handleCellClick(rowIndex, colIndex) } 
                                            onMouseEnter={() => handleCellHover(rowIndex, colIndex )}
                                            onMouseLeave={handleCellLeave}
                                            className="text-center w-6 h-6 bg-gray cursor-pointer bg-gray-400 hover:bg-gray-500 active:bg-gray-600 outline-1 outline outline-gray-500"
                                        >
                                            <Cell state={gridState[rowIndex][colIndex]}/>
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
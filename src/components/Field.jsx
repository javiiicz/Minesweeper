import { useState, useEffect, useCallback } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import smileUrl from '../images/ms-smile.webp'
import {Board} from "../scripts/minesweeper.jsx"
import Cell from "./Cell.jsx"
import Announcement from "./Announcement.jsx"

const FLAG = "F"
const MAX_TIME = 999
const DIFFICULTIES = {
    beginner: {rows: 9, cols: 9, mines: 10},
    intermediate: {rows: 16, cols: 16, mines: 40},
    expert: {rows: 16, cols: 30, mines: 99}
}

function Game () {
    // Menu
    const [isVisible, setIsVisible] = useState(false);
    const [difficulty, setDifficulty] = useState("expert");
    const [announcementType, setAnnouncementType] = useState(0);

    // Grid
    const [grid, setGrid] = useState([]);
    const [gridState, setGridState] = useState([]);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [B, setB] = useState(null);
    
    // Game Variables
    const [uncoveredCounter, setUncoveredCounter] = useState(0)
    const [mineCounter, setMineCounter] = useState(0)
    const [gameTime, setGameTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)


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
        setIsPlaying(true);
        setAnnouncementType(0);
        setUncoveredCounter(0)
    }, [difficulty])

    
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
        if (!isPlaying){
            return
        }

        if (!isRunning) {
            startTimer();
        }

        let result = B.click(i,j);
        const newGridState = [...gridState];
        let newCounter = uncoveredCounter
        newCounter += 1
        newGridState[i][j] = result;
        setGridState(newGridState);
        setUncoveredCounter(newCounter)

        if (result == -1) {
            gameOver()
            return
        }

        if (result == 0) {
            revealSurroundingCells(i,j)
        };

        const {rows, cols, mines} = DIFFICULTIES[difficulty]
        const covered = (rows * cols) - newCounter
        console.log(covered, mines)
        if (covered == mines){
            winGame()
            return
        }
            
    }

    const handleCellSpace = (i, j) => {
        if (!isPlaying){
            return
        }

        const newGridState = JSON.parse(JSON.stringify(gridState))
        let newMineCounter = mineCounter;

        if (newGridState[i][j] === null) {
            newGridState[i][j] = FLAG
            newMineCounter -= 1
        } else if (newGridState[i][j] == FLAG) {
            newGridState[i][j] = null
            newMineCounter += 1
        } else if (newGridState[i][j] == flagsAround(i,j)) {
            revealSurroundingCells(i,j)
            return
        } else {
            return
        }
        
        setGridState(newGridState)
        setMineCounter(newMineCounter)

        // Update hovered cell
        setHoveredCell({row: i, col: j})
    };

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

    const gameOver = () => {
        stopTimer()
        setIsPlaying(false)
        setAnnouncementType(2)
    }

    const winGame = () => {
        stopTimer()
        setIsPlaying(false)
        setAnnouncementType(1)
    }


    return (
        <div className="flex justify-center items-center mb-16">
            <div className="inline-block mx-auto">
                
                <div className="text-lg">
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
            
                <div className="game-window bg-gray-200 px-10 py-4 inline-block">
                    <div className="counters flex flex-row gap-3 justify-between text-xl font-bold">
                        <p className="w-12">{gameTime}</p>
                        <div className="button w-8 h-8 border border-gray-300 rounded active:bg-gray-300">
                            <img src = {smileUrl} onClick={resetGame}></img>
                        </div>
                        <p className="w-12 text-right">{mineCounter}</p>
                    </div>
            
                    <div className="game-container flex justify-center bg-gray-300 m-1 py-8 px-8 relative">
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

                        <div className="announcement absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center pointer-events-none">
                            <Announcement type={announcementType}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;
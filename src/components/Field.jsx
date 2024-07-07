import { useState, useEffect } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import smileUrl from '../images/ms-smile.webp'

function Game () {
    const [isVisible, setIsVisible] = useState(false);
    const [difficulty, setDifficulty] = useState("expert");
    const [grid, setGrid] = useState([]);

    const difficulties = {
        beginner: {rows: 9, cols: 9, mines: 10},
        intermediate: {rows: 16, cols: 16, mines: 40},
        expert: {rows: 16, cols: 30, mines: 99}
    }

    useEffect(function() {
        generateGrid();
    }, [difficulty]);

    function generateGrid() {
        const {rows, cols, mines} = difficulties[difficulty]
        const newGrid = new Array(rows).fill().map(function() {
            return new Array(cols).fill(0)
        });
        setGrid(newGrid);
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
                        <img src = {smileUrl}></img>
                    </div>
                    <p>00</p>
                </div>
                <div className="flex justify-center bg-gray-300 m-2 p-12 ">
                    <div className="mines my-auto">
                        {grid.map(function(row, rowIndex) {
                            return (
                                <div key={rowIndex} className="flex flex-row gap-1 mb-1">
                                {row.map(function(cell, colIndex) {
                                    return (
                                        <div key = {`${rowIndex}-${colIndex}`} className="w-5 h-5 bg-gray cursor-pointer bg-slate-400">
                                            
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
import { useState } from "react";
import {motion, AnimatePresence} from 'framer-motion';

function Menu () {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="px-[20%] text-lg flex flex-row justify-between">
            <div className="flex flex-row gap-3">
                <a className="font-bold cursor-pointer" onClick={() => setIsVisible(prevState => !prevState)}>New Game</a>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div 
                            className="flex flex-row gap-3"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            <p>Easy</p>
                            <p>Medium</p>
                            <p>Hard</p>
                            <p>Extreme</p>
                        </motion.div>
                    )}
                    
                </AnimatePresence>
            </div>
            <div>
                <div>Restart</div>
            </div>
        </div>
    )
    
}

export default Menu
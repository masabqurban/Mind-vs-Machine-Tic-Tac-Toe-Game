import React from 'react';
import { motion } from 'framer-motion';

const Cell = ({ value, onClick, isWinning }) => (
  <motion.button
    className={`w-full h-24 md:h-32 border-2 rounded-xl shadow-lg
                ${isWinning 
                  ? 'border-green-500 dark:border-green-400 bg-green-100 dark:bg-green-900' 
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}
                text-4xl md:text-6xl font-bold flex items-center justify-center
                transition-all duration-300
                ${value === 'X' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : value === 'O' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-transparent'}`}
    onClick={onClick}
    whileHover={{ scale: 0.97 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      rotate: value ? [0, 15, -15, 0] : 0
    }}
    transition={{
      duration: 0.3,
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
    {value || '·'}
  </motion.button>
);

const Board = ({ board, onCellClick, winningCombination }) => (
  <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl shadow-xl">
    {board.map((cell, index) => (
      <Cell
        key={index}
        value={cell}
        onClick={() => onCellClick(index)}
        isWinning={winningCombination?.includes(index) ?? false}
      />
    ))}
  </div>
);

export default Board;
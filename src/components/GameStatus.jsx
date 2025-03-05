import React from 'react';
import { motion } from 'framer-motion';

const GameStatus = ({
  currentPlayer,
  winner,
  scores,
  playerNames,
}) => (
  <motion.div
    className="text-center space-y-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="text-2xl md:text-3xl font-bold p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
      animate={{
        scale: winner ? [1, 1.1, 1] : 1,
      }}
      transition={{ duration: 0.5 }}
    >
      {winner
        ? winner === 'draw'
          ? "🤝 It's a Draw! 🤝"
          : `🎉 ${playerNames[winner]} Wins! 🎉`
        : `${playerNames[currentPlayer]}'s Turn (${currentPlayer})`}
    </motion.div>
    
    <div className="flex justify-center gap-8 text-lg">
      <motion.div 
        className={`p-3 rounded-lg ${currentPlayer === 'X' ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-white dark:bg-gray-800'} shadow-md`}
        animate={{ scale: currentPlayer === 'X' ? 1.05 : 1 }}
      >
        <span className="text-blue-600 dark:text-blue-400">{playerNames.X}</span>: {scores.X}
      </motion.div>
      <motion.div 
        className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md"
      >
        Draws: {scores.draws}
      </motion.div>
      <motion.div 
        className={`p-3 rounded-lg ${currentPlayer === 'O' ? 'bg-red-100 dark:bg-red-900/50' : 'bg-white dark:bg-gray-800'} shadow-md`}
        animate={{ scale: currentPlayer === 'O' ? 1.05 : 1 }}
      >
        <span className="text-red-600 dark:text-red-400">{playerNames.O}</span>: {scores.O}
      </motion.div>
    </div>
  </motion.div>
);

export default GameStatus;
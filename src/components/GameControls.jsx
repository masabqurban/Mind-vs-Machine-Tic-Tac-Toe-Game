import React from 'react';
import { Moon, Sun } from 'lucide-react';

const GameControls = ({
  onReset,
  onGameModeChange,
  onDifficultyChange,
  onDarkModeToggle,
  gameMode,
  difficulty,
  isDarkMode
}) => (
  <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
      <button
        onClick={onReset}
        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        New Game
      </button>
      <button
        onClick={onDarkModeToggle}
        className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-inner-lg"
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? 
          <Sun className="w-6 h-6 text-yellow-500 animate-bounce-slow" /> : 
          <Moon className="w-6 h-6 text-gray-600" />
        }
      </button>
    </div>
    
    <div className="flex gap-4">
      <select
        value={gameMode}
        onChange={(e) => onGameModeChange(e.target.value)}
        className="flex-1 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 cursor-pointer"
      >
        <option value="local">Local Multiplayer</option>
        <option value="ai">vs AI</option>
      </select>
      
      {gameMode === 'ai' && (
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="flex-1 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 cursor-pointer"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      )}
    </div>
  </div>
);

export default GameControls;
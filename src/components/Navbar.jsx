import React from 'react';
import { Moon, Sun, Gamepad2, Brain, RotateCcw } from 'lucide-react';

const Navbar = ({
  onReset,
  onGameModeChange,
  onDifficultyChange,
  onDarkModeToggle,
  gameMode,
  difficulty,
  isDarkMode
}) => (
  <nav className="bg-white dark:bg-gray-800 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </button>
          
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onGameModeChange('local')}
              className={`inline-flex items-center px-3 py-1.5 rounded-md transition-colors duration-200 ${
                gameMode === 'local'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
              }`}
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Local
            </button>
            <button
              onClick={() => onGameModeChange('ai')}
              className={`inline-flex items-center px-3 py-1.5 rounded-md transition-colors duration-200 ${
                gameMode === 'ai'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
              }`}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {gameMode === 'ai' && (
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="px-3 py-1.5 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 cursor-pointer"
            >
              <option value="easy" className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">Easy</option>
              <option value="medium" className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">Medium</option>
              <option value="hard" className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">Hard</option>
            </select>
          )}
          
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? 
              <Sun className="w-5 h-5 text-yellow-500 animate-bounce-slow" /> : 
              <Moon className="w-5 h-5 text-gray-600" />
            }
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
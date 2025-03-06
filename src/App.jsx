import React, { useState, useEffect } from 'react';
import GameBoard from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { checkWinner, getAIMove, WINNING_COMBINATIONS } from './utils/gameLogic';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameMode: 'local',
  difficulty: 'medium',
  scores: { X: 0, O: 0, draws: 0 },
  playerNames: { X: 'Player X', O: 'Player O' },
  moveHistory: [],
  isDarkMode: false,
};

function App() {
  const [gameState, setGameState] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    return { ...initialState, isDarkMode: savedDarkMode };
  });
  const [winningCombination, setWinningCombination] = useState(null);

  useEffect(() => {
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && !gameState.winner) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState.board, gameState.difficulty);
        handleMove(aiMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.gameMode]);

  const handleMove = (index) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    let winCombo = null;

    if (winner && winner !== 'draw') {
      for (const combination of WINNING_COMBINATIONS) {
        if (
          newBoard[combination[0]] === winner &&
          newBoard[combination[1]] === winner &&
          newBoard[combination[2]] === winner
        ) {
          winCombo = combination;
          break;
        }
      }
    }

    setWinningCombination(winCombo);

    const newScores = { ...gameState.scores };
    if (winner) {
      if (winner === 'draw') {
        newScores.draws += 1;
      } else {
        newScores[winner] += 1;
      }
    }

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      scores: newScores,
      moveHistory: [...prev.moveHistory, index],
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      moveHistory: [],
    }));
    setWinningCombination(null);
  };

  const handleGameModeChange = (mode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      playerNames: {
        X: 'Player X',
        O: mode === 'ai' ? 'AI' : 'Player O',
      },
    }));
    resetGame();
  };

  const handleDifficultyChange = (difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
    resetGame();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !gameState.isDarkMode;
    localStorage.setItem('darkMode', newDarkMode);
    setGameState(prev => ({ ...prev, isDarkMode: newDarkMode }));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${gameState.isDarkMode ? 'dark' : ''}`}>
      <Navbar
        onReset={resetGame}
        onGameModeChange={handleGameModeChange}
        onDifficultyChange={handleDifficultyChange}
        onDarkModeToggle={toggleDarkMode}
        gameMode={gameState.gameMode}
        difficulty={gameState.difficulty}
        isDarkMode={gameState.isDarkMode}
      />
      
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Mind vs Machine Tic Tac Toe
          </h1>
          
          <GameStatus
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            scores={gameState.scores}
            playerNames={gameState.playerNames}
          />
          
          <GameBoard
            board={gameState.board}
            onCellClick={handleMove}
            winningCombination={winningCombination}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
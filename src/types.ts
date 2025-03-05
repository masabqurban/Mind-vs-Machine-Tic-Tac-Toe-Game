export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameMode = 'ai' | 'local';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  gameMode: GameMode;
  difficulty: Difficulty;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  playerNames: {
    X: string;
    O: string;
  };
  moveHistory: number[];
  isDarkMode: boolean;
}
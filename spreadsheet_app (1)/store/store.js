import create from 'zustand';
import { produce } from 'immer';

export const useSpreadsheetStore = create((set) => ({
  grid: Array.from({ length: 100 }, () => Array(10).fill('')), // Initial grid setup
  undoStack: [],
  redoStack: [],

  updateCell: (rowIndex, colIndex, value) => 
    set(state => 
      produce(state, draft => {
        draft.grid[rowIndex][colIndex] = value;
        draft.undoStack.push(state.grid);
        draft.redoStack = [];
      })
    ),

  updateFormatting: (rowIndex, colIndex, formatting) => 
    set(state => 
      produce(state, draft => {
        draft.grid[rowIndex][colIndex] = {
          ...draft.grid[rowIndex][colIndex],
          ...formatting,
        };
        draft.undoStack.push(state.grid);
        draft.redoStack = [];
      })
    ),

  undo: () => 
    set(state => {
      if (state.undoStack.length > 0) {
        const previousState = state.undoStack.pop();
        state.redoStack.push(state.grid);
        return { grid: previousState };
      }
    }),

  redo: () => 
    set(state => {
      if (state.redoStack.length > 0) {
        const nextState = state.redoStack.pop();
        state.undoStack.push(state.grid);
        return { grid: nextState };
      }
    }),

  searchQuery: '',
  updateSearchQuery: (query) => set({ searchQuery: query }),

  currentPage: 0,
  rowsPerPage: 10,
  nextPage: () => set(state => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set(state => ({ currentPage: state.currentPage - 1 })),
}));

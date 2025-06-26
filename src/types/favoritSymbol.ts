export interface FavoriteSymbol {
  order: number;
  ric: string;
  name: string;
}

export interface FavoriteSymbolStore {
  symbols: FavoriteSymbol[];
  isLoading: boolean;
  error: string | null;

  // 액션들
  addSymbol: (symbol: FavoriteSymbol) => void;
  removeSymbol: (id: string) => void;
  updateSymbolOrder: (id: string, newOrder: number) => void;
  reorderSymbols: (fromIndex: number, toIndex: number) => void;
  clearAll: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export interface FavoriteSymbol {
  id: string;
  name: string;
  ticker: string;
  ric: string;
  order: number;
  createdAt: number;
}

export interface FavoriteSymbolStore {
  symbols: FavoriteSymbol[];
  isLoading: boolean;
  error: string | null;

  // 액션들
  addSymbol: (
    symbol: Omit<FavoriteSymbol, 'id' | 'order' | 'createdAt'>
  ) => void;
  removeSymbol: (id: string) => void;
  updateSymbolOrder: (id: string, newOrder: number) => void;
  reorderSymbols: (fromIndex: number, toIndex: number) => void;
  clearAll: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

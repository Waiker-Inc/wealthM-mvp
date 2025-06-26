import { useCallback } from 'react';
import { useFavoriteSymbolStore } from '@/stores/favoritSymbolStore';
import type { FavoriteSymbol } from '@/types/favoritSymbol';

export const useFavoriteSymbols = () => {
  const {
    symbols,
    isLoading,
    error,
    addSymbol,
    removeSymbol,
    updateSymbolOrder,
    reorderSymbols,
    clearAll,
  } = useFavoriteSymbolStore();

  const addFavoriteSymbol = useCallback(
    (name: string, ticker: string, ric: string) => {
      addSymbol({ name, ticker, ric });
    },
    [addSymbol]
  );

  const removeFavoriteSymbol = useCallback(
    (id: string) => {
      removeSymbol(id);
    },
    [removeSymbol]
  );

  const isSymbolFavorite = useCallback(
    (ticker: string) => {
      return symbols.some((symbol) => symbol.ticker === ticker);
    },
    [symbols]
  );

  const getSymbolById = useCallback(
    (id: string): FavoriteSymbol | undefined => {
      return symbols.find((symbol) => symbol.id === id);
    },
    [symbols]
  );

  const getSortedSymbols = useCallback(() => {
    return [...symbols].sort((a, b) => a.order - b.order);
  }, [symbols]);

  return {
    symbols: getSortedSymbols(),
    isLoading,
    error,
    addFavoriteSymbol,
    removeFavoriteSymbol,
    updateSymbolOrder,
    reorderSymbols,
    clearAll,
    isSymbolFavorite,
    getSymbolById,
    totalCount: symbols.length,
    maxCount: 20,
  };
};

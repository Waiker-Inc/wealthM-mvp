import { useCallback } from "react";
import { useFavoriteSymbolStore } from "@/stores/favoritSymbolStore";
import type { FavoriteSymbol } from "@/types/favoritSymbol";

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
    (symbol: FavoriteSymbol) => {
      addSymbol({ ...symbol, order: 0 });
    },
    [addSymbol]
  );

  const removeFavoriteSymbol = useCallback(
    (ric: string) => {
      removeSymbol(ric);
    },
    [removeSymbol]
  );

  const isSymbolFavorite = useCallback(
    (ric: string) => {
      return symbols.some((symbol) => symbol.ric === ric);
    },
    [symbols]
  );

  const getSymbolById = useCallback(
    (ric: string): FavoriteSymbol | undefined => {
      return symbols.find((symbol) => symbol.ric === ric);
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

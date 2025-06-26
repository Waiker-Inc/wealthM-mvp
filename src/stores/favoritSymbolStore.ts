import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  FavoriteSymbol,
  FavoriteSymbolStore,
} from "@/types/favoritSymbol";

const STORAGE_KEY = "favorite-symbols";
const MAX_SYMBOLS = 20;

export const useFavoriteSymbolStore = create<FavoriteSymbolStore>()(
  persist(
    (set, get) => ({
      symbols: [],
      isLoading: false,
      error: null,

      addSymbol: (symbolData) => {
        const { symbols } = get();

        // 최대 개수 체크
        if (symbols.length >= MAX_SYMBOLS) {
          set({ error: `최대 ${MAX_SYMBOLS}개까지만 등록할 수 있습니다.` });
          return;
        }

        // 중복 체크 (ric, ric, name으로 체크)
        const isDuplicate = symbols.some(
          (existing) =>
            existing.ric === symbolData.ric ||
            existing.ric === symbolData.ric ||
            existing.name === symbolData.name
        );

        if (isDuplicate) {
          set({ error: "이미 등록된 심볼입니다." });
          return;
        }

        const newSymbol: FavoriteSymbol = {
          ...symbolData,
          order: symbols.length,
        };

        set({
          symbols: [...symbols, newSymbol],
          error: null,
        });
      },

      removeSymbol: (ric) => {
        const { symbols } = get();
        const updatedSymbols = symbols
          .filter((symbol) => symbol.ric !== ric)
          .map((symbol, index) => ({ ...symbol, order: index }));

        set({ symbols: updatedSymbols, error: null });
      },

      updateSymbolOrder: (ric, newOrder) => {
        const { symbols } = get();
        const symbolIndex = symbols.findIndex((s) => s.ric === ric);

        if (symbolIndex === -1) return;

        const updatedSymbols = [...symbols];
        const [movedSymbol] = updatedSymbols.splice(symbolIndex, 1);
        movedSymbol.order = newOrder;

        // 다른 심볼들의 순서도 업데이트
        updatedSymbols.forEach((symbol, index) => {
          if (symbol.ric !== ric) {
            symbol.order = index >= newOrder ? index + 1 : index;
          }
        });

        updatedSymbols.splice(newOrder, 0, movedSymbol);

        set({ symbols: updatedSymbols, error: null });
      },

      reorderSymbols: (fromIndex, toIndex) => {
        const { symbols } = get();
        const updatedSymbols = [...symbols];
        const [movedSymbol] = updatedSymbols.splice(fromIndex, 1);
        updatedSymbols.splice(toIndex, 0, movedSymbol);

        // 순서 재정렬
        updatedSymbols.forEach((symbol, index) => {
          symbol.order = index;
        });

        set({ symbols: updatedSymbols, error: null });
      },

      clearAll: () => {
        set({ symbols: [], error: null });
      },

      loadFromStorage: () => {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            set({ symbols: parsed.symbols || [] });
          }
        } catch (error) {
          console.error(
            "로컬스토리지에서 데이터를 불러오는데 실패했습니다:",
            error
          );
          set({ error: "데이터를 불러오는데 실패했습니다." });
        }
      },

      saveToStorage: () => {
        try {
          const { symbols } = get();
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ symbols }));
        } catch (error) {
          console.error(
            "로컬스토리지에 데이터를 저장하는데 실패했습니다:",
            error
          );
          set({ error: "데이터를 저장하는데 실패했습니다." });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ symbols: state.symbols }),
    }
  )
);

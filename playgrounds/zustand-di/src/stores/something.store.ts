import { createStore } from "zustand";

export interface SomethingStoreState {
  something: string;
}

export interface SomethingStoreActions {
  setSomething: (something: string) => void;
}

export interface SomethingStore extends SomethingStoreState {
  actions: SomethingStoreActions;
}

export function createSomethingStore(initialState?: SomethingStoreState) {
  return createStore<SomethingStore>((set) => ({
    something: initialState?.something ?? "SOMETHING",
    actions: {
      setSomething: (something) => set({ something }),
    },
  }));
}

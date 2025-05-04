import { createContext, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import type {
  SomethingStore,
  SomethingStoreActions,
  SomethingStoreState,
} from "../stores/something.store";

export const SomethingStoreContext = createContext<
  StoreApi<SomethingStore> | undefined
>(undefined);
SomethingStoreContext.displayName = "SomethingStoreContext";

export function useSomethingStore<State = unknown>(
  selector: (state: SomethingStoreState) => State
): State {
  const store = useContext(SomethingStoreContext);
  if (store === undefined) {
    throw new Error();
  }

  return useStore(store, selector);
}

export function useSomethingStoreActions<Action = unknown>(
  selector: (actions: SomethingStoreActions) => Action
): Action {
  const store = useContext(SomethingStoreContext);
  if (store === undefined) {
    throw new Error();
  }

  return useStore(store, (state) => selector(state.actions));
}

import { useState } from "react";
import "./App.css";
import { SomethingStoreContext } from "./contexts/something-store.context";
import { createSomethingStore, SomethingStore } from "./stores/something.store";
import { StoreApi } from "zustand";
import { SomethingInput } from "./components/something-input";
import { DisplaySomething } from "./components/display-something";

function App() {
  const [somethingStore] = useState<StoreApi<SomethingStore>>(() =>
    createSomethingStore({
      something: "m1nsuplee!",
    })
  );

  return (
    <SomethingStoreContext.Provider value={somethingStore}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <DisplaySomething />

        <SomethingInput />
      </div>
    </SomethingStoreContext.Provider>
  );
}

export default App;

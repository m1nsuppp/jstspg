import { useState } from "react";
import "./App.css";
import { SomethingStoreContext } from "./contexts/something-store.context";
import { createSomethingStore, SomethingStore } from "./stores/something.store";
import { StoreApi } from "zustand";
import { SomethingInput } from "./components/something-input";
import { DisplaySomething } from "./components/display-something";
import { DisplayAnything } from "./components/display-anything";
import { AnythingInput } from "./components/anything-input";

function App() {
  const [somethingStore] = useState<StoreApi<SomethingStore>>(() =>
    createSomethingStore({
      something: "m1nsuplee!",
    })
  );

  const [anythingStore] = useState<StoreApi<SomethingStore>>(() =>
    createSomethingStore({
      something: "anything!",
    })
  );

  return (
    <>
      <SomethingStoreContext.Provider value={somethingStore}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>Something</h1>
          <DisplaySomething />
          <SomethingInput />
        </div>
      </SomethingStoreContext.Provider>
      <SomethingStoreContext.Provider value={anythingStore}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>Anything</h1>
          <DisplayAnything />
          <AnythingInput />
        </div>
      </SomethingStoreContext.Provider>
    </>
  );
}

export default App;

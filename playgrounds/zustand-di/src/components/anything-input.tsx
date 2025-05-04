import { useSomethingStoreActions } from "../contexts/something-store.context";

export function AnythingInput() {
  const setSomething = useSomethingStoreActions((state) => state.setSomething);

  return <input type="text" onChange={(e) => setSomething(e.target.value)} />;
}

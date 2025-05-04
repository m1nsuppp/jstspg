import { useSomethingStoreActions } from "../contexts/something-store.context";

export function SomethingInput() {
  const setSomething = useSomethingStoreActions((state) => state.setSomething);

  return <input type="text" onChange={(e) => setSomething(e.target.value)} />;
}

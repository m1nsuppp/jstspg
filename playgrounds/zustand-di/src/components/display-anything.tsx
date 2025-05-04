import { useSomethingStore } from "../contexts/something-store.context";

export function DisplayAnything() {
  const anything = useSomethingStore((state) => state.something);

  return <div>{anything}</div>;
}

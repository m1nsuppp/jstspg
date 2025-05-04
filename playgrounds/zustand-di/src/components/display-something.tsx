import { useSomethingStore } from "../contexts/something-store.context";

export function DisplaySomething() {
  const something = useSomethingStore((state) => state.something);

  return <div>{something}</div>;
}

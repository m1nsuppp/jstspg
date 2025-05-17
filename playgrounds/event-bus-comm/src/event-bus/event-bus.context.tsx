import { createContext, useContext } from "react";
import type { EventBusService } from ".";

export const EventBusContext = createContext<EventBusService | undefined>(
  undefined
);
EventBusContext.displayName = "EventBusContext";

export function useEventBusContext(): EventBusService {
  const context = useContext(EventBusContext);
  if (context === undefined) {
    throw new Error(
      "useEventBusContext must be used within an EventBusContext"
    );
  }

  return context;
}

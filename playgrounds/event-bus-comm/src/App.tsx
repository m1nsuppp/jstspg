import { useEffect, useState, type JSX } from "react";
import "./App.css";
import {
  EventBusContext,
  useEventBusContext,
} from "./event-bus/event-bus.context";
import { createEventBusService, type EventBusService } from "./event-bus";

function App() {
  const [eventBus] = useState<EventBusService>(() => createEventBusService());

  return (
    <EventBusContext.Provider value={eventBus}>
      <Sender />
      <Receiver />
    </EventBusContext.Provider>
  );
}

function Sender(): JSX.Element {
  const eventBus = useEventBusContext();

  return (
    <button
      onClick={() => {
        eventBus.sendRequest("test", "skrrt").then((response) => {
          console.log({ response });
        });
      }}
    >
      Send
    </button>
  );
}

function Receiver(): JSX.Element {
  const eventBus = useEventBusContext();

  useEffect(() => {
    const dispose = eventBus.onRequest("test", async (request) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({ request });

      return `Hi there ${request.payload}`;
    });

    return () => {
      dispose();
    };
  }, [eventBus]);

  return <div></div>;
}

export default App;

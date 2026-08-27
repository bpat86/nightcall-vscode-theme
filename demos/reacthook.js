import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange) => {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
};

const getSnapshot = () => `${window.scrollX}:${window.scrollY}`;
const getServerSnapshot = () => "0:0";

export function useScrollPosition() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [x, y] = snapshot.split(":").map(Number);

  return { x, y };
}

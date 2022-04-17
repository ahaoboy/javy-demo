import { proxyWithComputed } from "valtio/utils";
import { useSnapshot } from "valtio";
import React from "react";
const getData = (): string[] => {
  const max = 10;
  const n = (max + Math.random() * max) | 0;
  const data = Array(n)
    .fill(0)
    .map((_, k) => `key_${k}_` + Math.random().toString(36).slice(2, 32));
  return data;
};

type State = { data: string[]; filter: string };
const stateStr = (globalThis as any)?.context?.state as State;
export const state: State = {
  data: getData(),
  filter: "",
};
export const store = proxyWithComputed(stateStr ?? state, {
  todos(s) {
    if (!s.filter && s.data) return s.data;
    return s.data.filter((i) => !i.includes(s.filter));
  },
});

export default function App() {
  const { todos } = useSnapshot(store);
  return (
    <div>
      <div>
        <input type="text" onChange={(e) => (store.filter = e.target.value)} />
        <button
          onClick={() => {
            store.data = getData();
          }}
        >
          refresh
        </button>
      </div>
      <div>
        {todos.map((i, k) => (
          <h2 key={k}>{i}</h2>
        ))}
      </div>
    </div>
  );
}

import { proxyWithComputed } from "valtio/utils";
import { useSnapshot } from "valtio";
import { renderToString } from "react-dom/server";

const getData = (): string => {
  return Math.random().toString(36).slice(2, 32);
};
const state: { data: string[]; filter: string } = {
  data: getData(),
  filter: "",
};
const store = proxyWithComputed(state, {
  todos(s) {
    if (!s.filter && s.data) return s.data;
    return s.data.filter((i) => !i.includes(s.filter));
  },
});

function App() {
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

function main() {
  const str = renderToString(<App></App>);
  console.log(str);
}
(globalThis as any).Shopify = {
  main,
};

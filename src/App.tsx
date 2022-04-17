import { defineStore, useSnapshot } from "binia";
const getData = (): string[] => {
  const max = 10;
  const n = (max + Math.random() * max) | 0;
  const data = Array(n)
    .fill(0)
    .map((_, k) => `key_${k}_` + Math.random().toString(36).slice(2, 32));
  return data;
};
const state: { data: string[]; filter: string } = {
  data: window?.context?.state ?? getData(),
  filter: "",
};
const store = defineStore({
  state,
  computed: {
    todos() {
      if (!this.filter && this.data.length) return this.data;
      return this.data.filter((i) => i.includes(this.filter));
    },
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

export default App;

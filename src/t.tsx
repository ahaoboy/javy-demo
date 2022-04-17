import { renderToString } from "react-dom/server";

const App = () => {
  return <div>1</div>;
};
function main() {
  const r = renderToString(<App></App>);
  console.log(r);
}

var Shopify = {
  main,
};

(globalThis as any).Shopify = Shopify
console.log(main())
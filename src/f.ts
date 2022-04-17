function main(n: number) {
    console.log('n', n, Object.entries(n))
}

(globalThis as any).Shopify = {
    main,
};
/*
rollup --config rollup.config.js ./src/f.ts -o ./dist/f.js  

./target/release/javy ./dist/f.js -o ./f.wasm

echo "{\"a\":1}" |  wasmtime run f.wasm | msgpack2json


*/
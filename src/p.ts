import { proxy, subscribe } from 'valtio'
import { Readable } from 'readable-stream'
import util from 'util'

const sleep = () => new Promise(r => setTimeout(r, 1000))
const main = async (n: number) => {
    console.log('n', n)
    const s = { a: 1 };
    const p = proxy(s);
    subscribe(p, () => {
        console.log('a++')
    })
    await sleep();
    p.a++;
    return p.a
}
var Shopify = {
    main,
};

(globalThis as any).Shopify = Shopify;
(globalThis as any).Readable = Readable;
(globalThis as any).util = util
console.log(main(1))

// ./target/release/javy ./dist/p.js -o ./p.wasm
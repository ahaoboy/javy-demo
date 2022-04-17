import fs from "fs";
async function main() {
  const buf = fs.readFileSync("./f.wasm");
  console.log(buf);
  const instance = await WebAssembly.instantiate(buf, {
    imports: {},
    wasi_snapshot_preview1: {
      fd_write(...args) {
        console.log("fd_write", ...args);
        return args[3];
      },
      fd_read(...args) {
        console.log("fd_read", ...args);
        return new Uint8Array()
      },
      clock_time_get(...args) {
        console.log("clock_time_get", ...args);
        return +new Date();
      },
      proc_exit(...args) {
        console.log("proc_exit", ...args);
      },
      environ_sizes_get(...args) {
        console.log("environ_sizes_get", ...args);
        return 1
      },
      environ_get(...args) {
        console.log("environ_get", ...args);
      },
      fd_seek(...args) {
        console.log("fd_seek", ...args);
      },
      fd_close(...args) {
        console.log("fd_close", ...args);
      },
      fd_fdstat_get(...args) {
        console.log("fd_fdstat_get", ...args);
      },
    },
  });
  console.log(instance);

  const m = instance.instance.exports;
  console.log(m);
  const f = m.main;
  console.log(f);
  console.log(f());
}

main();

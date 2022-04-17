import ts from "rollup-plugin-typescript2";
import commonJS from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import cleanup from "rollup-plugin-cleanup";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

const plugins = [
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("development"),
    "import.meta": JSON.stringify({}),
  }),
  nodeResolve({ extensions: [".js", ".jsx"] }),
  babel({
    presets: ["@babel/preset-react"],
  }),
  json(),
  ts(),
  commonJS({
    include: ["node_modules/**"],
  }),
  cleanup(),
  uglify(),
];
export default {
  plugins,
};

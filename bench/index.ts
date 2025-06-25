import { Bench } from "tinybench";
import CXUtils from "../src/index.js";
import classnames from "classnames";

const bench = new Bench({ name: "simple benchmark", time: 1000 });

bench.add("CXUtils fast test", () => {
  CXUtils("test", "test2");
});

bench.add("CXUtils slow test", () => {
  CXUtils([
    "a",
    "b",
    ["c", "d"],
    null,
    { o: false },
    { e: true },
    ["f", ["g", "h"], { i: false }, { j: true }, ["k", "l"]],
    { u: null, s: undefined },
  ]);
});

bench.add("classnames fast test", () => {
  CXUtils("test", "test2");
});

bench.add("classnames slow test", () => {
  classnames([
    "a",
    "b",
    ["c", "d"],
    null,
    { o: false },
    { e: true },
    ["f", ["g", "h"], { i: false }, { j: true }, ["k", "l"]],
    { u: null, s: undefined },
  ]);
});

bench.run().then(() => {
  console.log(bench.name);
  console.table(bench.table());
});

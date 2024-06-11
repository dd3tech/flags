import { defineConfig } from "tsup";
import type { Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["./src/index.ts"],
  format: ["esm"],
  clean: true,
  minify: false,
  target: "esnext",
  sourcemap: false,
  dts: true,
  ...options,
}));

#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

function updateTsConfig() {
  try {
    if (!fs.existsSync(tsconfigPath)) {
      throw new Error("tsconfig.json not found. Please ensure you are in the root directory of a TypeScript project.");
    }

    let tsconfig;
    try {
      tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
    } catch (parseError) {
      throw new Error("Failed to parse tsconfig.json - please ensure it is valid JSON without trailing commas.");
    }

    const baseUrl = tsconfig.compilerOptions?.baseUrl || ".";
    const prendyPath =
      baseUrl === "."
        ? "./node_modules/prendy/src/index.ts"
        : path.join("..", "node_modules", "prendy", "src", "index.ts");

    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};
    tsconfig.compilerOptions.paths["prendy"] = [prendyPath];

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log("tsconfig.json updated successfully for Prendy.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

updateTsConfig();

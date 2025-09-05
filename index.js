const { spawnSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");
const { homedir } = require("node:os");

function resolveAikenBin() {
  // 1. Check env
  if (process.env.AIKEN_BIN && existsSync(process.env.AIKEN_BIN)) {
    return process.env.AIKEN_BIN;
  }

  // 2. Try which aiken
  const which = spawnSync("which", ["aiken"], { encoding: "utf-8" });
  if (which.status === 0 && which.stdout.trim()) {
    return which.stdout.trim();
  }

  // 3. Try default install dir (~/.aiken/bin/aiken)
  const defaultPath = join(homedir(), ".aiken", "bin", "aiken");
  if (existsSync(defaultPath)) {
    return defaultPath;
  }

  // 4. Fail
  throw new Error(
    "Could not find `aiken` binary. Please install Aiken and/or set AIKEN_BIN env variable."
  );
}

const AIKEN_BIN = resolveAikenBin();

function formatWithAiken(text) {
  const result = spawnSync(AIKEN_BIN, ["fmt", "--stdin"], {
    input: text,
    encoding: "utf-8"
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr || "aiken fmt failed");
  }

  return result.stdout;
}

const languages = [
  {
    name: "Aiken",
    parsers: ["aiken"],
    extensions: [".ak"]
  }
];

const parsers = {
  aiken: {
    parse: text => text,
    astFormat: "aiken-ast"
  }
};

const printers = {
  "aiken-ast": {
    print: path => formatWithAiken(path.getValue())
  }
};

module.exports = {
  languages,
  parsers,
  printers
};

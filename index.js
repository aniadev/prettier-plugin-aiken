const { spawnSync } = require("child_process");

function formatWithAiken(text) {
  const result = spawnSync("aiken", ["fmt", "--stdin"], {
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

module.exports = {
  languages: [
    {
      name: "Aiken",
      parsers: ["aiken"],
      extensions: [".ak"]
    }
  ],
  parsers: {
    aiken: {
      parse: text => text, // giữ nguyên text, không parse AST
      astFormat: "aiken-ast"
    }
  },
  printers: {
    "aiken-ast": {
      print: path => formatWithAiken(path.getValue())
    }
  }
};

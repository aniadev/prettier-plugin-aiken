# Prettier Plugin Aiken

A [Prettier](https://prettier.io/) plugin for the [Aiken](https://aiken-lang.org/) smart contract language.

## Overview

This plugin integrates Aiken's built-in formatter (`aiken fmt`) with Prettier, allowing you to format Aiken smart contract code using Prettier's workflow and editor integrations.

## Features

- 🎯 Format `.ak` files using Aiken's official formatter
- 🔧 Seamless integration with Prettier
- ⚡ Works with popular editors (VS Code, Vim, etc.)
- 🔄 Supports Prettier's CLI and API

## Installation

### Prerequisites

Make sure you have [Aiken](https://aiken-lang.org/installation-instructions) installed on your system:

```bash
# Install Aiken (if not already installed)
curl -sSfL https://install.aiken-lang.org | bash
```

### Install the Plugin

```bash
# Using npm
npm install --save-dev prettier prettier-plugin-aiken

# Using pnpm
pnpm add -D prettier prettier-plugin-aiken

# Using yarn
yarn add --dev prettier prettier-plugin-aiken
```

## Usage

### CLI

Format a single file:
```bash
npx prettier --write validator.ak
```

Format all Aiken files in your project:
```bash
npx prettier --write "**/*.ak"
```

### Configuration

Add to your `package.json`:
```json
{
  "prettier": {
    "plugins": ["prettier-plugin-aiken"]
  }
}
```

Or create a `.prettierrc.js`:
```javascript
module.exports = {
  plugins: ["prettier-plugin-aiken"]
};
```

### VS Code Integration

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Add this plugin to your project dependencies
3. Configure Prettier as your default formatter for `.ak` files

Add to your VS Code `settings.json`:
```json
{
  "[aiken]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## How it Works

This plugin acts as a bridge between Prettier and Aiken's built-in formatter:

1. Prettier detects `.ak` files using this plugin
2. The plugin passes the file content to `aiken fmt --stdin`
3. Returns the formatted code back to Prettier

## Requirements

- Node.js >= 14
- Aiken CLI tool installed and available in PATH
- Prettier (peer dependency)

## Example

Before formatting:
```aiken
validator my_validator{
pub fn spend(datum: Data,redeemer: Data,context: ScriptContext) -> Bool {
let Spend(output_reference) = context.purpose
True
}
}
```

After formatting:
```aiken
validator my_validator {
  pub fn spend(datum: Data, redeemer: Data, context: ScriptContext) -> Bool {
    let Spend(output_reference) = context.purpose
    True
  }
}
```

## Troubleshooting

### "aiken command not found"

Make sure Aiken is installed and available in your PATH:
```bash
aiken --version
```

If not installed, follow the [Aiken installation instructions](https://aiken-lang.org/installation-instructions).

### Plugin not working in VS Code

1. Ensure the plugin is installed in your project (not globally)
2. Restart VS Code after installing the plugin
3. Check that Prettier is configured as the default formatter for `.ak` files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test with a sample Aiken project

## License

[MIT License](LICENSE)

## Related Projects

- [Aiken](https://aiken-lang.org/) - A modern smart contract platform for Cardano
- [Prettier](https://prettier.io/) - An opinionated code formatter

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

# UP Language Support for VS Code

[![CI](https://github.com/uplang/vscode-up/actions/workflows/ci.yml/badge.svg)](https://github.com/uplang/vscode-up/actions/workflows/ci.yml)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/uplang.vscode-up)](https://marketplace.visualstudio.com/items?itemName=uplang.vscode-up)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Official Visual Studio Code extension for [UP (Unified Properties)](https://uplang.org) language support.

**Quick Links:**
- 📦 [Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=uplang.vscode-up)
- 📖 [Documentation](#features)
- 🔧 [Development](#development)
- 🐛 [Report Issues](https://github.com/uplang/vscode-up/issues)

## Features

- ✅ **Syntax Highlighting** - Full TextMate grammar for UP syntax
- ✅ **Language Server** - Integrated LSP support with auto-installation
- ✅ **Auto-completion** - Smart completions for keys and namespace functions
- ✅ **Hover Documentation** - Inline documentation on hover
- ✅ **Go to Definition** - Navigate to symbol definitions
- ✅ **Document Formatting** - Format your UP documents
- ✅ **Error Detection** - Real-time syntax and semantic validation
- ✅ **Snippets** - Common UP patterns

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type: `ext install uplang.vscode-up`
4. Press Enter

### From VSIX

```bash
code --install-extension vscode-up-0.1.0.vsix
```

## Requirements

For full language server features, install the UP language server:

```bash
go install github.com/uplang/tools/language-server@latest
```

The extension will prompt you to install it if not found.

## Configuration

### Extension Settings

- `up.languageServer.enabled`: Enable/disable the language server (default: `true`)
- `up.languageServer.path`: Path to language server executable (default: `up-language-server`)
- `up.languageServer.args`: Additional arguments for the language server
- `up.languageServer.trace.server`: Trace LSP communication (default: `off`)
- `up.format.enable`: Enable document formatting (default: `true`)
- `up.validation.enable`: Enable validation (default: `true`)

### Example Configuration

```json
{
  "up.languageServer.enabled": true,
  "up.languageServer.path": "/usr/local/bin/up-language-server",
  "up.languageServer.args": ["--debug"],
  "up.format.enable": true,
  "[up]": {
    "editor.formatOnSave": true,
    "editor.tabSize": 2
  }
}
```

## Commands

- `UP: Restart Language Server` - Restart the UP language server
- `UP: Show Output Channel` - Show language server output

## File Associations

The extension automatically activates for:
- `.up` files
- `.up-schema` files

## Syntax Highlighting

The extension provides comprehensive syntax highlighting for:

- **Keys** - Property names
- **Type Annotations** - `!int`, `!bool`, `!string`, etc.
- **Values** - String, number, boolean values
- **Blocks** - `{ }` structures
- **Lists** - `[ ]` arrays
- **Multiline Strings** - ` ``` ` delimited blocks
- **Comments** - `#` line comments
- **Tables** - `columns` and `rows` keywords
- **Namespaces** - Dynamic namespace functions

## Theme Support

The extension follows VS Code's semantic token provider and works with all themes. Recommended themes:

- **Dark+** (VS Code default)
- **One Dark Pro**
- **Monokai Pro**
- **Dracula**

## Troubleshooting

### Language Server Not Starting

1. Check if `up-language-server` is in your PATH:
   ```bash
   which up-language-server
   ```

2. Install it if missing:
   ```bash
   go install github.com/uplang/tools/language-server@latest
   ```

3. Check the output channel: `UP: Show Output Channel`

4. Try restarting: `UP: Restart Language Server`

### Syntax Highlighting Not Working

1. Ensure the file has `.up` extension
2. Check the language mode in the status bar
3. Manually select language: `Ctrl+K M` / `Cmd+K M` → "UP"

## Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/uplang/vscode-up
cd vscode-up

# Install dependencies
npm install

# Compile
npm run compile

# Package extension
npm run package
```

### Testing

```bash
# Run tests
npm test

# Open extension development host
code --extensionDevelopmentPath=.
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/uplang/spec/blob/main/CONTRIBUTING.md) for guidelines.

## License

GNU General Public License v3.0 - see [LICENSE](LICENSE) for details.

## Links

- [UP Language Specification](https://github.com/uplang/spec)
- [UP Language Server](https://github.com/uplang/tools/tree/main/language-server)
- [UP Tools](https://github.com/uplang/tools)
- [VS Code Extension API](https://code.visualstudio.com/api)

## Release Notes

### 0.1.0 (Initial Release)

- Syntax highlighting with full TextMate grammar
- Language Server Protocol integration
- Auto-completion and hover documentation
- Document formatting
- Error detection and validation
- Configurable language server settings


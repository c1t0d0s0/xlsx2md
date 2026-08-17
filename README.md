# Excel to Markdown Converter

A browser-based and lightweight desktop tool that converts Excel files (.xlsx, .xls) into Markdown tables.

## Features

- **Privacy-Focused**: All processing is done locally; files are never uploaded to a server.
- **100% Offline**: SheetJS is bundled locally, so no internet connection is required.
- **Drag & Drop Support**: Simply drop a file to start the conversion instantly.
- **Live Preview**: See the converted Markdown results immediately.
- **Downloadable Output**: Save the converted Markdown as a file.
- **Multi-Sheet Support**: Each sheet in an Excel workbook is converted into its own section.
- **Modern UI**: Responsive design with a GitHub-inspired dark mode.
- **Lightweight Desktop App**: Built with [Tauri v2](https://tauri.app/) for small binary sizes (~5-15MB) and fast startup across Windows, macOS, and Linux.

## How to Use (Web)

1. Open `index.html` in your web browser.
2. Drag and drop your Excel file, or click the area to select one.
3. Review the converted Markdown in the preview area.
4. Click the "Download .md" button to save your file.

## Tech Stack

- HTML5 / CSS3 / JavaScript (Vanilla)
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - Local bundled for offline Excel parsing.
- [Tauri v2](https://tauri.app/) - Lightweight, secure desktop application framework.

## Desktop App Development & Build

### Prerequisites

- [Node.js](https://nodejs.org/) (includes `npm`)
- [Rust](https://www.rust-lang.org/tools/install) (via `rustup`)

**Linux Prerequisites (Debian/Ubuntu):**
```bash
sudo apt update && sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

**Windows Prerequisites:**
- WebView2 (installed by default on Windows 10/11)
- Visual Studio C++ Build Tools (MSVC)

**macOS Prerequisites:**
- Xcode Command Line Tools (`xcode-select --install`)

### Development

Run the desktop application in development mode with live reload:

```bash
npm run tauri:dev
```

### Production Build

Build the production installers and executables:

```bash
npm run tauri:build
```

Find the generated installers under:
- `src-tauri/target/release/bundle/nsis/` (Windows NSIS `.exe` installer)
- `src-tauri/target/release/bundle/msi/` (Windows MSI `.msi` installer)
- `src-tauri/target/release/bundle/dmg/` (macOS DMG installer)

### Icon Generation

To regenerate app icons from `scripts/icon.png`:

```bash
npm run build:icon
```

### Automated Releases via GitHub Actions

Pushing a tag starting with `v` (e.g. `v2.0.0`) triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), automatically building the Tauri Windows and macOS applications and publishing the artifacts to a GitHub Release.

## License

MIT License

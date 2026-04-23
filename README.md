# Excel to Markdown Converter

A browser-based tool that converts Excel files (.xlsx, .xls) into Markdown tables.

## Features

- **Privacy-Focused**: All processing is done locally in the browser; files are never uploaded to a server.
- **Drag & Drop Support**: Simply drop a file to start the conversion instantly.
- **Live Preview**: See the converted Markdown results immediately.
- **Downloadable Output**: Save the converted Markdown as a file.
- **Multi-Sheet Support**: Each sheet in an Excel workbook is converted into its own section.
- **Modern UI**: Responsive design with a GitHub-inspired dark mode.

## How to Use

1. Open `index.html` in your web browser.
2. Drag and drop your Excel file, or click the area to select one.
3. Review the converted Markdown in the preview area.
4. Click the "Download .md" button to save your file.

## Tech Stack

- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (Vanilla JS)
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - Used for parsing Excel files.
- [Electron](https://www.electronjs.org/) - Optional desktop shell for Windows.

## Building the Windows app (.exe)

The repository includes an Electron wrapper so you can build installable and portable Windows executables.

### Prerequisites

- [Node.js](https://nodejs.org/) (includes `npm`)

### Steps

1. Open a terminal in this project directory (the folder that contains `package.json`).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Build Windows x64 artifacts:

   ```bash
   npm run dist
   ```

4. Find the outputs under `dist/`:

   - **`xlsx2md Setup <version>.exe`** — NSIS installer (you can choose the install folder).
   - **`xlsx2md <version>.exe`** — Portable executable.
   - **`win-unpacked/`** — Unpacked app folder (useful for quick testing).

To produce only the unpacked folder without installers:

```bash
npm run dist:dir
```

To build **only** the portable `.exe` (no NSIS installer):

```bash
npm run dist:portable
```

### Publishing via GitHub Releases

Pushing a tag whose name starts with `v` (for example `v1.0.1`) runs [`.github/workflows/release.yml`](.github/workflows/release.yml) on GitHub Actions. The workflow builds the portable Windows executable and uploads it to a **GitHub Release** for that tag. For the build step, `package.json` / `package-lock.json` are updated in the runner to match the tag version (without committing to the repository), so the generated `.exe` name lines up with the release.

The packaged app still loads SheetJS from the CDN defined in `index.html`, so a network connection may be required the first time you run the conversion feature.

## License

MIT License

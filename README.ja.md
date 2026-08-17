# Excel to Markdown Converter

エクセルファイル（.xlsx, .xls）をMarkdown形式のテーブルに変換するブラウザ完結型・軽量デスクトップアプリです。

## 特徴

- **プライバシーに配慮**: すべての処理はローカル上で行われるため、ファイルがサーバーにアップロードされることはありません。
- **完全オフライン対応**: SheetJS をローカル同梱しているため、インターネット接続なしで利用できます。
- **ドラッグ＆ドロップ対応**: ファイルをドロップするだけで即座に変換が始まります。
- **プレビュー機能**: 変換後のMarkdownをその場で確認できます。
- **一括ダウンロード**: 変換されたMarkdownをファイルとしてダウンロード可能です。
- **複数シート対応**: 複数のシートが含まれる場合、それぞれのシートを個別のセクションとして変換します。
- **モダンなUI**: GitHub風のダークモードを採用したレスポンシブデザイン。
- **軽量デスクトップアプリ**: [Tauri v2](https://tauri.app/) を採用し、小型バイナリ（約5〜15MB）と高速起動を Windows / macOS / Linux で実現。

## 使い方（Web版）

1. `index.html` をブラウザで開きます。
2. 変換したいエクセルファイルをドラッグ＆ドロップするか、エリアをクリックして選択します。
3. プレビューエリアに表示されたMarkdownを確認します。
4. 「.mdをダウンロード」ボタンをクリックして保存します。

## 技術スタック

- HTML5 / CSS3 / JavaScript (Vanilla)
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - エクセル解析ライブラリ（ローカル同梱）
- [Tauri v2](https://tauri.app/) - 高速・軽量・セキュアなデスクトップアプリフレームワーク

## デスクトップアプリの開発・ビルド

### 前提条件

- [Node.js](https://nodejs.org/)（`npm` を含む）
- [Rust](https://www.rust-lang.org/ja/tools/install)（`rustup` 経由）

**Linux の場合に必要なシステムパッケージ (Debian/Ubuntu):**
```bash
sudo apt update && sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

**Windows の場合:**
- WebView2（Windows 10/11 は標準搭載）
- Visual Studio C++ Build Tools (MSVC)

**macOS の場合:**
- Xcode Command Line Tools (`xcode-select --install`)

### 開発モード

開発用ウィンドウを起動して動作確認します:

```bash
npm run tauri:dev
```

### プロダクションビルド

インストーラーおよび実行ファイルをビルドします:

```bash
npm run tauri:build
```

ビルド成果物は以下に出力されます:
- `src-tauri/target/release/bundle/nsis/`（Windows NSIS インストーラー `.exe`）
- `src-tauri/target/release/bundle/msi/`（Windows MSI インストーラー `.msi`）
- `src-tauri/target/release/bundle/dmg/`（macOS DMG インストーラー）

### アプリアイコンの再生成

`scripts/icon.png` を元に各種解像度のアイコンを再生成する場合:

```bash
npm run build:icon
```

### GitHub Releases での自動リリース

`v` で始まるタグ（例: `v2.0.0`）をリモートにプッシュすると、GitHub Actions の [`.github/workflows/release.yml`](.github/workflows/release.yml) が自動実行され、Windows および macOS 向けの Tauri インストーラーがビルドされて **GitHub Release** に自動添付されます。

## ライセンス

MIT License

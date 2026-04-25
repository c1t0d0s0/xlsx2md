# Excel to Markdown Converter

エクセルファイル（.xlsx, .xls）をMarkdown形式のテーブルに変換するブラウザ完結型のツールです。

## 特徴

- **プライバシーに配慮**: すべての処理はブラウザ上で行われるため、ファイルがサーバーにアップロードされることはありません。
- **ドラッグ＆ドロップ対応**: ファイルをドロップするだけで即座に変換が始まります。
- **プレビュー機能**: 変換後のMarkdownをその場で確認できます。
- **一括ダウンロード**: 変換されたMarkdownをファイルとしてダウンロード可能です。
- **複数シート対応**: 複数のシートが含まれる場合、それぞれのシートを個別のセクションとして変換します。
- **モダンなUI**: GitHub風のダークモードを採用したレスポンシブデザイン。

## 使い方

1. `index.html`をブラウザで開きます。
2. 変換したいエクセルファイルをドラッグ＆ドロップするか、エリアをクリックして選択します。
3. プレビューエリアに表示されたMarkdownを確認します。
4. 「.mdをダウンロード」ボタンをクリックして保存します。

## 技術スタック

- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (Vanilla JS)
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - エクセルファイルの解析に使用
- [Electron](https://www.electronjs.org/) - Windows 向けデスクトップ版（任意）

## デスクトップアプリ（Windows / macOS）のビルド方法

Electron でラップした Windows用 および macOS用の実行ファイルをビルドできます。

### 前提条件

- [Node.js](https://nodejs.org/)（`npm` を含む）
- macOS向けのビルドにはMac環境が推奨または必須です。

### 手順

1. ターミナルで本プロジェクトのディレクトリ（`package.json` がある場所）に移動します。
2. 依存関係をインストールします。

   ```bash
   npm install
   ```

3. アプリアイコンを生成します（ビルド前に必須）。

   ```bash
   npm run build:icon
   ```

4. プラットフォームに合わせてビルドします。

   **WindowsとmacOS両方（Mac環境のみ可能）:**
   ```bash
   npm run dist
   ```

   **Windows用のみ:**
   ```bash
   npm run dist:win
   ```

   **macOS用のみ:**
   ```bash
   npm run dist:mac
   ```

5. 成果物は `dist/` に出力されます。

   **Windows向け:**
   - **`xlsx2md Setup <version>.exe`** — NSIS インストーラー。
   - **`xlsx2md <version>.exe`** — ポータブル版の実行ファイル。
   - **`win-unpacked/`** — Windows用展開アプリ（動作確認用）。

   **macOS向け:**
   - **`xlsx2md-<version>.dmg`** — macOS用 DMGインストーラー。
   - **`xlsx2md-<version>-mac.zip`** — macOS用 zipアーカイブ。
   - **`mac/`** — macOS用展開アプリ (`.app`を含むフォルダ）。

インストーラーを作らず、展開フォルダだけ欲しい場合（Windows向け）は次を実行します。

```bash
npm run dist:dir
```

**ポータブル版の .exe だけ**を作る場合（NSIS インストーラーは生成しません）は次を実行します。

```bash
npm run dist:portable
```

### GitHub Releases での配布

`v` で始まるタグ（例: `v1.0.1`）をリモートにプッシュすると、GitHub Actions の [`.github/workflows/release.yml`](.github/workflows/release.yml) が実行されます。Windows 向けの**ポータブル版** `.exe` がビルドされ、そのタグに対応する **GitHub Release** に成果物として添付されます。ビルド時のみ、ランナー上で `package.json` / `package-lock.json` のバージョンがタグに合わせて更新されます（リポジトリにはコミットされません）。

パッケージ化したアプリでも、`index.html` で指定している SheetJS は CDN から読み込まれるため、変換機能の初回利用時などにネットワーク接続が必要になることがあります。

## ライセンス

MIT License


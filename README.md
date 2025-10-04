# 🚀 Vite Starter

Vite Starterは、軽量で高速なフロントエンド開発を可能にするスターターテンプレートです。  
HTML/CSS/JavaScriptをベースに、Viteを使用して効率的な開発・ビルド環境を提供します。

---

## 📦 セットアップ

### 1. 依存関係のインストール
```bash
npm install
```
または既存のパッケージを更新する場合：
```bash
npm update
```

---

## 🧑‍💻 開発モードでの実行

開発サーバーを起動します：
```bash
npm run dev
```

ブラウザで以下のURLにアクセスしてください：
```
http://localhost:8888
```

ホットリロード対応で、変更が即時に反映されます。

---

## 🏗️ ビルド

本番用に最適化されたファイルを生成します：
```bash
npm run build
```

出力先は `dist/` ディレクトリです。

---

## ⚙️ 設定ファイル

| ファイル名 | 説明 |
|-------------|------|
| `sitedata.json` | サイト全体のテキストやメタデータを管理します |
| `vite.config.js` | Viteのビルド設定を定義します |

---

## 📁 ディレクトリ構成（例）

```
vite_starter/
├── src/                # ソースコード
│   ├── assets/         # 画像・フォントなどの静的ファイル
│   ├── components/     # 再利用可能なUIコンポーネント
│   └── main.js         # エントリーポイント
├── sitedata.json       # サイトデータ設定
├── vite.config.js      # Vite設定
└── package.json        # npmスクリプト・依存関係
```

---

## 🧰 使用技術

- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
- HTML / CSS / JavaScript (ES Modules)

---

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。  
詳細は [LICENSE](./LICENSE) ファイルをご確認ください。

---

## 💡 ヒント

- `.gitignore` に `node_modules` や `dist` を追加しておくと便利です。
- `postcss.config.cjs` を利用してCSSの最適化を行うことができます。

---

> **参考:**  
> - [GitHub公式Markdown記法ガイド](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)  
> - [Qiita: READMEの書き方まとめ](https://qiita.com/dfalcon0001/items/843b93d90f21b9e99d50)  
> - [cpp-learning.com: READMEの作り方](https://cpp-learning.com/readme/)

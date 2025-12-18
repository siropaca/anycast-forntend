# Anycast Frontend - Claude Code Instructions

## プロジェクト概要

Anycast は AI 音声生成専門のポッドキャストプラットフォームのフロントエンドアプリケーション。

### 現在のフェーズ

台本から音声を生成・調整するエディタ画面を優先して開発中。
バックエンドは未完成のため、モックデータを使用する。

## 技術スタック

- **Next.js** (App Router) - 最新バージョン
- **NextAuth.js** - 認証
- **TanStack Query** - サーバー状態管理
- **Tailwind CSS** - スタイリング
- **Base UI** - ヘッドレス UI コンポーネント
- **Biome** - リンター/フォーマッター
- **pnpm** - パッケージマネージャー

## 開発ルール

### コーディング規約

- TypeScript を使用し、型安全性を重視する
- Biome の設定に従ってフォーマットする
- コンポーネントは関数コンポーネント + hooks を使用
- `use client` / `use server` ディレクティブを適切に使い分ける

### ディレクトリ構成

```
src/
├── app/          # Next.js App Router (ルーティング)
├── components/   # 共通コンポーネント
├── features/     # 機能ごとのモジュール (コンポーネント、hooks、型など)
├── hooks/        # 共通カスタムフック
├── lib/          # ユーティリティ、API クライアントなど
├── mocks/        # モックデータ、MSW ハンドラー
└── types/        # グローバル型定義
```

### コマンド

```bash
pnpm dev      # 開発サーバー起動
pnpm build    # プロダクションビルド
pnpm lint     # Biome によるリント
pnpm format   # Biome によるフォーマット
```

## Git ワークフロー

GitHub Flow を採用。

- `main` ブランチから feature ブランチを作成
- PR を作成してレビュー後にマージ
- コミットメッセージは日本語 OK

## バックエンド連携

- バックエンドリポジトリ: https://github.com/siropaca/anycast-backend
- API:
  - 台本生成 API
  - 音声生成 API
- 現在はモックで代用

## 注意事項

- バックエンド API が未実装のため、`src/mocks/` にモックを配置する
- 本番 API 実装後にモックから切り替えられる設計にする
- TanStack Query でデータフェッチを管理し、API 切り替えを容易にする

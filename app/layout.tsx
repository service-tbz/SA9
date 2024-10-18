import './globals.css';
// グローバルなCSSスタイルをインポート。全体のスタイルを適用するためのファイル。

import type { Metadata } from 'next';
// Next.js のメタデータ型をインポート。ページのメタデータ（タイトルや説明）を型チェックするために使用する。

import { Inter } from 'next/font/google';
// Googleフォント「Inter」をインポート。フォントをプロジェクトに適用するために使用。

const inter = Inter({ subsets: ['latin'] });
// Interフォントを設定し、ラテン文字のサブセットを適用する。サブセットを使用することで、必要な文字のみ読み込む。

export const metadata: Metadata = {
  title: 'SkyArea9',
  description: 'Drone flight management application',
};
// ページのメタデータを設定。タイトルと説明を含めることで、SEOやブラウザのタブに表示される情報を管理する。

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // RootLayoutコンポーネントをエクスポート。これはページ全体のレイアウトを定義し、全ての子コンポーネントを表示するためのラッパー。

  return (
    <html lang="en">
      {/* HTMLのlang属性を'en'（英語）に設定 */}
      <body className={inter.className}>
        {/* Interフォントを適用したクラスを<body>に追加し、ページ全体でInterフォントを使用 */}
        {children}
        {/* 子コンポーネント（ページコンテンツ）を表示 */}
      </body>
    </html>
  );
}

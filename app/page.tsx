'use client';
// クライアントサイドでの実行を示すディレクティブ。Next.jsでSSR（サーバーサイドレンダリング）を避けてクライアント側で処理を行う。

import { useState } from 'react';
// ReactのuseStateフックをインポート。コンポーネントの状態を管理するために使用する。

import dynamic from 'next/dynamic';
// Next.jsのdynamic関数をインポート。特にSSRを避けたいコンポーネントを動的にロードするために使用する。

import Header from '@/components/Header';
// ヘッダーコンポーネントをインポート。アプリケーションの上部に表示されるナビゲーションや情報を提供する。

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
// 地図表示用のMapコンポーネントを動的にインポートし、サーバーサイドレンダリングを無効化（ssr: false）。クライアントサイドでのみレンダリングする。

export default function Home() {
  // Homeコンポーネントをエクスポート。アプリケーションのホームページを表現する。

  const [userType, setUserType] = useState<
    'municipality' | 'operator' | 'resident'
  >('municipality');
  // ユーザーの種類を管理する状態を定義。初期値は 'municipality'（自治体）。ユーザーのタイプには 'municipality'（自治体）、'operator'（オペレーター）、'resident'（住民）が含まれる。

  const [isEditing, setIsEditing] = useState(false);
  // 編集モードかどうかを管理する状態を定義。初期値はfalse（編集していない状態）。

  return (
    <div className="flex flex-col h-screen">
      {/* アプリ全体を覆うdivタグ。flexboxを使用して縦に並べ、全画面（h-screen）を占めるように設定 */}

      <Header
        userType={userType}
        setUserType={setUserType}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {/* ヘッダーコンポーネントを表示。ユーザーの種類と編集状態を渡し、ヘッダーから変更できるようにしている */}

      <main className="flex-grow relative">
        {/* メインコンテンツ部分。flex-growを使って利用可能なスペースを全て占めるようにしている */}

        <Map userType={userType} isEditing={isEditing} />
        {/* 地図コンポーネントを表示。ユーザーの種類と編集モードをMapコンポーネントに渡すことで、地図の動作を変更できるようにしている */}
      </main>
    </div>
  );
}

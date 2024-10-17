"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [userType, setUserType] = useState<'municipality' | 'operator' | 'resident'>('municipality');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header 
        userType={userType} 
        setUserType={setUserType} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
      />
      <main className="flex-grow relative">
        <Map userType={userType} isEditing={isEditing} />
      </main>
    </div>
  );
}
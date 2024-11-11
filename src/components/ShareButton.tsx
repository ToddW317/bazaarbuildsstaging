'use client'

import { useState } from 'react';

interface ShareButtonProps {
  buildId: string;
  title: string;
}

export default function ShareButton({ buildId, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/builds/${buildId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>🔗</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
} 
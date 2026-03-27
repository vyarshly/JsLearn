import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 border border-slate-700">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-md transition-all opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.9rem',
          backgroundColor: '#1e293b',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

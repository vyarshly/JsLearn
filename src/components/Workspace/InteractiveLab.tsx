import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, Layout, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveLabProps {
  initialCode: string;
  onSuccess?: () => void;
  successCondition?: string;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ initialCode, onSuccess, successCondition }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');
  const [isSuccess, setIsSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    setOutput([]);
    setIsSuccess(false);
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Custom console implementation for the iframe
    const consoleScript = `
      const originalConsole = console.log;
      console.log = (...args) => {
        window.parent.postMessage({ type: 'console', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
        originalConsole.apply(console, args);
      };
      window.onerror = (msg) => {
        window.parent.postMessage({ type: 'error', content: msg }, '*');
      };

      // Check success condition
      const checkSuccess = () => {
        try {
          const condition = ${successCondition ? `(${successCondition})` : 'false'};
          if (condition) {
            window.parent.postMessage({ type: 'success' }, '*');
          }
        } catch (e) {}
      };

      // Run check periodically
      setInterval(checkSuccess, 1000);
    `;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              font-family: 'Inter', sans-serif; 
              padding: 20px; 
              color: #e2e8f0; 
              background: #0f172a; 
              margin: 0;
            }
            #sandbox-root { 
              min-height: 150px; 
              border: 1px dashed #334155; 
              border-radius: 12px; 
              padding: 1.5rem;
              background: #1e293b;
            }
            .btn {
              padding: 8px 16px;
              border-radius: 6px;
              background: #6366f1;
              color: white;
              border: none;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div id="sandbox-root">
            <h1 id="main-title" class="text-2xl font-bold mb-2">Original Title</h1>
            <p id="description" class="text-slate-400">This is the default description of the lab element.</p>
            <div id="container" class="mt-4 flex flex-wrap gap-2"></div>
            <button id="action-btn" class="btn mt-4">Action Button</button>
          </div>
          <script>${consoleScript}<\/script>
          <script>
            try {
              ${code}
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        setOutput(prev => [...prev, event.data.content]);
      } else if (event.data.type === 'error') {
        setOutput(prev => [...prev, `Error: ${event.data.content}`]);
      } else if (event.data.type === 'success') {
        setIsSuccess(true);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    runCode();
    return () => window.removeEventListener('message', handleMessage);
  }, [code]);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex bg-slate-900 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'preview' ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layout size={14} /> Preview
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'console' ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal size={14} /> Console
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCode(initialCode)}
            className="p-1.5 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors"
            title="Reset Code"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <Play size={14} fill="currentColor" /> RUN
          </button>
        </div>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Challenge Completed!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Editor */}
        <div className="flex flex-col border-r border-slate-800">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-6 bg-slate-950 text-primary font-mono text-sm focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
            placeholder="// Write your JavaScript here..."
          />
        </div>

        {/* Output Area */}
        <div className="bg-slate-950 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'preview' ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <iframe
                  ref={iframeRef}
                  title="Lab Preview"
                  className="w-full h-full border-none"
                />
              </motion.div>
            ) : (
              <motion.div
                key="console"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 font-mono text-sm h-full overflow-y-auto"
              >
                {output.length === 0 ? (
                  <span className="text-slate-600 italic">No console output yet...</span>
                ) : (
                  <div className="space-y-2">
                    {output.map((line, i) => (
                      <div key={i} className="flex gap-3 text-slate-300 border-b border-slate-900 pb-1">
                        <span className="text-slate-600 select-none">{'>'}</span>
                        <span className={line.startsWith('Error:') ? 'text-red-400' : ''}>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './components/Button';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import Slider from './components/Slider';

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState(150);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: text,
          maxL: length
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize");
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-text flex flex-col items-center justify-center p-4 selection:bg-primary/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full space-y-12"
      >
        <header className="text-center space-y-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
          >
            Abstract
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted max-w-lg mx-auto"
          >
            Distill complexity into clarity. Intelligent summarization for the modern web.
          </motion.p>
        </header>

        <main className="space-y-8 backdrop-blur-sm rounded-3xl p-8 border border-white/5 bg-black/20 shadow-2xl">
          <InputArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to begin..."
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
            <div className="w-full md:w-2/3">
              <Slider value={length} onChange={setLength} />
            </div>

            <Button onClick={handleSummarize} disabled={loading || !text} className="w-full md:w-auto">
              {loading ? "Processing..." : "Summarize"}
            </Button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-center bg-red-400/10 p-4 rounded-lg border border-red-400/20"
            >
              {error}
            </motion.div>
          )}

          <OutputArea value={summary} />
        </main>
      </motion.div>
    </div>
  );
}

export default App;

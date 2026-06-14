import React, { useState } from 'react';

export default function CyberDashboard() {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!logs.trim()) return alert("කරුණාකර Network Log එකක් ඇතුළත් කරන්න!");
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs: logs }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing logs:", error);
      alert("Backend එකට සම්බන්ධ වීමට නොහැකි විය! ඔයාගේ FastAPI Server එක Run කරලාද තියෙන්නේ කියලා බලන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono p-6 selection:bg-cyan-500 selection:text-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/30 pb-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
            CYBER DEFENSE LEAGUE
          </h1>
          <p className="text-xs text-slate-400 mt-1">AI-POWERED AUTONOMOUS SOC ENGINE v2.5</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs text-emerald-400 uppercase tracking-widest font-bold">CORE UP AND RUNNING</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Input Log */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-xl shadow-cyan-950/10">
          <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2">
            <span>⚡</span> INPUT STREAM (NETWORK LOGS)
          </h2>
          <textarea
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
            placeholder="පරීක්ෂා කිරීමට අවශ්‍ය Network Logs මෙතනට Paste කරන්න..."
            className="w-full h-80 bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs text-emerald-400 focus:outline-none focus:border-cyan-500 font-mono transition-all resize-none shadow-inner"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black tracking-widest py-3 rounded-lg text-sm uppercase transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "🔄 ANALYZING THREAT LOGS..." : "🛡️ ENGAGE CYBER AGENT"}
          </button>
        </div>

        {/* Right Side: AI Agent Output & Automation */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Threat Status Alert Box */}
              <div className={`border rounded-xl p-6 shadow-xl ${
                result.agent_analysis.status === 'ATTACK_DETECTED' 
                  ? 'bg-rose-950/30 border-rose-500/40 shadow-rose-950/20' 
                  : 'bg-emerald-950/30 border-emerald-500/40 shadow-emerald-950/20'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                    MATCH STATS & TARGET DETECTED
                  </h3>
                  <span className={`px-3 py-1 rounded text-xs font-black tracking-widest border ${
                    result.agent_analysis.status === 'ATTACK_DETECTED'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {result.agent_analysis.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-slate-950/50 p-3 rounded border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase">THREAT TYPE</span>
                    <span className="text-sm font-bold text-slate-200">{result.agent_analysis.threat_type}</span>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase">RISK LEVEL</span>
                    <span className={`text-sm font-black ${
                      result.agent_analysis.risk_score > 70 ? 'text-rose-400' : 'text-amber-400'
                    }`}>{result.agent_analysis.risk_score}%</span>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded border border-slate-800/60 col-span-2">
                    <span className="text-[10px] text-slate-500 block uppercase">ATTACKER TARGET IP</span>
                    <span className="text-sm font-bold text-cyan-400">{result.agent_analysis.target_ip || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Automation Execution Box */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-xl">
                <h3 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 flex items-center gap-2">
                  <span>🤖</span> AUTOMATED DEFENSE PLAYBOOK
                </h3>
                <div className="bg-slate-950 p-4 rounded-lg border border-purple-900/30 font-mono text-xs text-purple-300 shadow-inner">
                  <p className="mb-2 text-slate-500">// Triggering automated security measures...</p>
                  <p className="font-bold text-slate-200">{result.automation_execution.message}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-12 text-center text-slate-500 min-h-[400px]">
              <span className="text-4xl mb-2 opacity-40">🤖</span>
              <p className="text-sm">Awaiting Log Stream Input...</p>
              <p className="text-xs text-slate-600 mt-1">Engage the cyber agent to view dynamic analysis results.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

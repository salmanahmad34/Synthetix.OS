/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Terminal, ArrowRight, Play, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function HeroSection() {
  const [inferenceCount, setInferenceCount] = useState<number>(314892);
  const [currentSystemLoad, setCurrentSystemLoad] = useState<number>(44);

  // Simulated live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSystemLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(15, Math.min(85, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-[#0a0a0a] bg-grid-pattern" id="hero">
      
      {/* Immersive background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#7c3aed]/5 blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#9d50f8]/5 blur-[150px] pointer-events-none animate-pulse-slow-reverse"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial display copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
          
          {/* Animated badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/70 mb-2 animate-slide-in opacity-0"
            style={{ animationDelay: '0ms' }}
          >
            <span className="w-1.5 h-1.5 bg-[#7C3AED] inline-block animate-pulse"></span>
            <span>Synthetix Platform v3.2 [ACTIVE_REDEPLOY]</span>
          </div>

          <h1 
            className="text-fluid-hero font-display font-black tracking-tighter uppercase text-white leading-[0.95] text-left animate-slide-in opacity-0"
            style={{ animationDelay: '50ms' }}
          >
            Automate <br />
            Agent <br />
            Workflows <br />
            <span className="text-gradient-shimmer">With Certainty</span>
          </h1>

          <p 
            className="text-white/60 text-fluid-body font-sans max-w-xl leading-relaxed animate-slide-in opacity-0"
            style={{ animationDelay: '100ms' }}
          >
            The next-generation autonomous multi-agent compiler platform. Deploy zero-trust, cost-optimized pipelines with deep local persistence, instant OCR, and dynamic adapters.
          </p>

          {/* Interactive CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4 animate-slide-in opacity-0"
            style={{ animationDelay: '150ms' }}
          >
            <button
              id="hero-primary-cta"
              onClick={() => handleScrollToSection('features')}
              aria-label="Explore Sandbox: Try out autonomous multi-agent orchestration and compiler simulations"
              className="px-8 py-4 bg-[#7C3AED] hover:bg-white hover:text-black border border-transparent hover:border-white text-white font-mono text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-150 ease-out cursor-pointer rounded-none"
            >
              <span>Explore Sandbox</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={() => handleScrollToSection('pricing')}
              aria-label="Simulate Bill: View pricing matrix and dynamically estimate seat counts"
              className="px-8 py-4 border border-white/20 hover:border-white bg-transparent text-white font-mono text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-150 ease-out cursor-pointer rounded-none"
            >
              <span>Simulate Bill</span>
            </button>
          </div>

          {/* Core Telemetry tags */}
          <div 
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-xl text-left animate-slide-in opacity-0" 
            role="region" 
            aria-label="System Live Telemetry Dashboard"
            style={{ animationDelay: '150ms' }}
          >
            <div>
              <span className="text-white/30 font-mono text-[9px] uppercase tracking-wider block">Live Inferences</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-white mt-1 block" aria-live="polite" aria-atomic="true" aria-label={`Current inferences count: ${inferenceCount}`}>
                {inferenceCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-white/30 font-mono text-[9px] uppercase tracking-wider block">System Latency</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-[#7C3AED] mt-1 block" aria-label="System latency is 8.4 milliseconds">
                8.4ms
              </span>
            </div>
            <div>
              <span className="text-white/30 font-mono text-[9px] uppercase tracking-wider block">Edge Core Load</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-teal-400 mt-1 block" aria-live="polite" aria-atomic="true" aria-label={`Edge core CPU load: ${currentSystemLoad} percent`}>
                {currentSystemLoad}%
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: High-fidelity visual simulated dashboard */}
        <div 
          className="lg:col-span-5 w-full relative animate-slide-in opacity-0"
          style={{ animationDelay: '150ms' }}
        >
          
          {/* Animated decorative ring background */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#7c3aed]/10 to-transparent blur-md opacity-70 pointer-events-none"></div>

          {/* Outer Glass Container */}
          <div className="glass-card rounded-none border border-white/10 p-6 shadow-2xl relative overflow-hidden animate-float">
            
            {/* Top terminal bar */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-[10px] text-white/40 font-mono tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white/20"></span>
                <span className="w-2 h-2 bg-white/40"></span>
                <span className="w-2 h-2 bg-[#7c3aed]"></span>
                <span className="ml-2 font-bold uppercase">sys_sandbox_edge.sh</span>
              </div>
              <span className="text-[#7c3aed] font-bold">ACTIVE OS COMPILER</span>
            </div>

            {/* Simulated Live visual metrics */}
            <div className="space-y-4">
              
              {/* Box 1: Node Streamer */}
              <div className="bg-white/[0.02] border border-white/5 rounded-none p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#7c3aed]" />
                    SYSTEM_NODE_MAP
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping"></span>
                    SYNCED
                  </span>
                </div>

                <div className="h-1 bg-white/5 rounded-none overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#7c3aed] shadow-[0_0_8px_#7c3aed] transition-all duration-1000" style={{ width: `${currentSystemLoad}%` }}></div>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-white/30 tracking-wider">
                  <span>TPU Node Allocation: {currentSystemLoad}/100</span>
                  <span>Active Threads: 1,024</span>
                </div>
              </div>

              {/* Box 2: Secure Outpost logs */}
              <div className="bg-white/[0.02] border border-white/5 rounded-none p-4 font-mono text-[9px] text-white/50 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/5 tracking-wider">
                  <span className="flex items-center gap-1 text-[#7c3aed] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SECURITY_PROXY_LOGS
                  </span>
                  <span>SSL_OK</span>
                </div>
                <div className="space-y-1 text-[9px] text-white/40 leading-relaxed">
                  <p className="flex justify-between">
                    <span className="text-[#7c3aed] font-bold">[COMPLY_PROXY]</span>
                    <span>Scrubbed token "sk_live..."</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#7c3aed] font-bold">[ROUTER_GATE]</span>
                    <span>Redirecting logic query to Flash-Core</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#7c3aed] font-bold">[COGNITIVE]</span>
                    <span>Output compiled in 1.1s</span>
                  </p>
                </div>
              </div>

              {/* Box 3: Quick interactive playground preview toggle */}
              <div className="bg-white/[0.03] border border-white/10 rounded-none p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-mono font-black tracking-widest text-white uppercase mb-0.5">Agent Playground Output</h4>
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Explore dynamic local nodes</p>
                </div>
                <button
                  id="hero-play-btn"
                  onClick={() => handleScrollToSection('features')}
                  aria-label="Launch active sandbox compiler console simulation"
                  className="p-2.5 bg-[#7C3AED] hover:bg-white text-white hover:text-black rounded-none transition-all duration-150 ease-out cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                </button>
              </div>

            </div>

            {/* Subtle gloss element */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

        </div>

      </div>
    </section>
  );
}

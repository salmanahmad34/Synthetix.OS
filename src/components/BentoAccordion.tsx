/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useCallback, memo } from 'react';
import { BENTO_FEATURES } from '../data';
import { FeatureItem } from '../types';
import { BentoProvider, useBento } from '../context/BentoContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Eye, 
  Cpu, 
  Terminal, 
  ShieldAlert, 
  Sparkles, 
  Play, 
  RefreshCw, 
  Lock, 
  CheckCircle,
  Code,
  ArrowRight,
  Database,
  Layers,
  ChevronDown,
  Check,
  Copy
} from 'lucide-react';

// Icons mapper helper
function FeatureIcon({ type, className = "w-5 h-5" }: { type: string; className?: string }) {
  switch (type) {
    case 'text': return <Brain className={`${className} text-[#7C3AED]`} />;
    case 'vision': return <Eye className={`${className} text-cyan-400`} />;
    case 'orchestrator': return <Cpu className={`${className} text-purple-400`} />;
    case 'developer': return <Terminal className={`${className} text-teal-400`} />;
    case 'security': return <Lock className={`${className} text-rose-400`} />;
    default: return <Sparkles className={`${className} text-gray-400`} />;
  }
}

const BentoAccordion = memo(function BentoAccordion() {
  // Wrap everything in BentoProvider so this parent container NEVER re-renders when state changes.
  // The state consumption happens downstream inside BentoGridWrapper.
  return (
    <BentoProvider>
      <BentoGridWrapper />
    </BentoProvider>
  );
});

export default BentoAccordion;

function BentoGridWrapper() {
  const { activeId, setActiveId, openItems, toggleItem } = useBento();

  // Find active feature
  const activeFeature = useMemo(() => {
    return BENTO_FEATURES.find(f => f.id === activeId) || BENTO_FEATURES[0];
  }, [activeId]);

  // Simulation states kept in unified component to sync state between layouts
  // 1. Agent Hub Sim
  const [agentStep, setAgentStep] = useState<number>(0);
  const [agentLog, setAgentLog] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Orchestrator', text: 'Initializing neural pipeline...', time: '02:19:12' }
  ]);
  const [agentRunning, setAgentRunning] = useState<boolean>(false);

  // 2. Vision Sim
  const [visionFrame, setVisionFrame] = useState<number>(0);

  // 3. Router Sim
  const [routerComplexity, setRouterComplexity] = useState<number>(45);

  // 4. SDK Sim
  const [sdkLang, setSdkLang] = useState<'node' | 'python' | 'curl'>('node');
  const [sdkCopied, setSdkCopied] = useState<boolean>(false);

  // 5. PII Redactor Sim
  const [piiInput, setPiiInput] = useState<string>('Auth token is sk_live_9a4f7e2c91 and email is custom-corp@fintech.net');
  const [piiScrubbed, setPiiScrubbed] = useState<boolean>(false);

  // Agent Hub trigger handler
  const triggerAgentSimulation = useCallback(() => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(1);
    setAgentLog(prev => [
      ...prev,
      { sender: 'Planner Agent', text: 'Prompt analysis: "Automate compliance filing". Breaking into 3 sub-routines.', time: '02:19:15' }
    ]);

    setTimeout(() => {
      setAgentStep(2);
      setAgentLog(prev => [
        ...prev,
        { sender: 'Research Node', text: 'Retrieving Section 4.2.1 compliance parameters via secure vector store.', time: '02:19:17' }
      ]);
    }, 1200);

    setTimeout(() => {
      setAgentStep(3);
      setAgentLog(prev => [
        ...prev,
        { sender: 'Synthesis Engine', text: 'Validating formats. Drafting XML and human-readable audit logs.', time: '02:19:20' }
      ]);
    }, 2400);

    setTimeout(() => {
      setAgentStep(4);
      setAgentLog(prev => [
        ...prev,
        { sender: 'Reviewer Agent', text: 'Validation complete. Output signed with secure HMAC keys and stored in Vault.', time: '02:19:22' }
      ]);
      setAgentRunning(false);
    }, 3600);
  }, [agentRunning]);

  const resetAgentSim = useCallback(() => {
    setAgentStep(0);
    setAgentLog([
      { sender: 'Orchestrator', text: 'Initializing neural pipeline...', time: '02:19:12' }
    ]);
    setAgentRunning(false);
  }, []);

  // Router selector computation
  const routedModel = useMemo(() => {
    if (routerComplexity < 30) {
      return {
        name: 'Synthetix Flash (Core)',
        efficiency: '98%',
        cost: '0.00015',
        color: 'text-teal-400',
        bgColor: 'bg-teal-500/5 border-teal-500/10'
      };
    } else if (routerComplexity < 75) {
      return {
        name: 'Synthetix Pro (Reasoning)',
        efficiency: '85%',
        cost: '0.00180',
        color: 'text-[#7C3AED]',
        bgColor: 'bg-[#7C3AED]/5 border-[#7C3AED]/10'
      };
    } else {
      return {
        name: 'Synthetix Ultra (Deep-Search)',
        efficiency: '45%',
        cost: '0.01250',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/5 border-purple-500/10'
      };
    }
  }, [routerComplexity]);

  // SDK code mapper
  const sdkCode = useMemo(() => {
    if (sdkLang === 'node') {
      return `import { Synthetix } from '@synthetix/sdk';\n\nconst sx = new Synthetix({ apiKey: process.env.SX_API_KEY });\n\n// Launch a reactive agent loop\nconst agent = await sx.agents.spawn({\n  model: 'reasoning-pro',\n  instructions: 'Validate PII limits',\n  stream: true\n});\n\nfor await (const chunk of agent.events()) {\n  console.log(\`[Agent Event]: \${chunk.text}\`);\n}`;
    } else if (sdkLang === 'python') {
      return `from synthetix import Synthetix\n\nsx = Synthetix(api_key="SX_API_KEY")\n\n# Spawn autonomous workflow\nagent = sx.agents.spawn(\n    model="reasoning-pro",\n    instructions="Validate PII limits",\n    stream=True\n)\n\nfor event in agent.events():\n    print(f"[Agent Event]: {event.text}")`;
    } else {
      return `curl -X POST "https://api.synthetix.ai/v1/agents/spawn" \\\n  -H "Authorization: Bearer $SX_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "reasoning-pro",\n    "instructions": "Validate PII limits",\n    "stream": false\n  }'`;
    }
  }, [sdkLang]);

  const copySdkCode = useCallback(() => {
    navigator.clipboard.writeText(sdkCode);
    setSdkCopied(true);
    setTimeout(() => setSdkCopied(false), 2000);
  }, [sdkCode]);

  const scrubbedTextOutput = useMemo(() => {
    if (!piiScrubbed) return piiInput;
    return piiInput
      .replace(/sk_live_[a-zA-Z0-9]{10}/g, '[REDACTED_API_KEY]')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_PII_EMAIL]');
  }, [piiInput, piiScrubbed]);

  return (
    <section className="py-24 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden" id="features">
      {/* Decorative gradient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/70 mb-4">
            <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Interactive Platform Architecture</span>
          </div>
          <h2 className="text-fluid-h2 font-display font-black tracking-tighter uppercase text-white mb-4">
            Adaptive Feature Matrix
          </h2>
          <p className="text-white/60 text-fluid-body">
            Interact with different telemetry models. Select any node class below to load its corresponding sandbox environment instantly.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP VIEW: 3-Column Bento Grid Layout (lg:grid, visible code) */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          
          {/* Card 1: Agent Hub (Spans 2 columns) */}
          <article className="col-span-2 flex">
            <button
              id="bento-card-agent-hub"
              onClick={() => setActiveId('agent-hub')}
              aria-label="Agent Orchestration: Autonomous Multi-Agent Orchestrator"
              aria-selected={activeId === 'agent-hub'}
              className={`w-full h-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                activeId === 'agent-hub'
                  ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-none group-hover:border-[#7C3AED]/40 transition-colors">
                  <FeatureIcon type="text" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 bg-white/[0.05] border border-white/10 text-white/50 uppercase">
                  Core Engine
                </span>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-1">Agent Orchestration</span>
              <h3 className="text-lg font-display font-black uppercase text-white mb-2">Autonomous Multi-Agent Orchestrator</h3>
              <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                Deploy stateful autonomous agent loops that coordinate with each other over virtual message brokers, refining outputs recursively with zero context-shifting.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#7C3AED] opacity-80 group-hover:opacity-100">
                <span>{activeId === 'agent-hub' ? 'Active Sandbox Running' : 'Click to launch simulation'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          </article>

          {/* Card 2: Vision Copilot */}
          <article className="col-span-1 flex">
            <button
              id="bento-card-vision-copilot"
              onClick={() => setActiveId('vision-copilot')}
              aria-label="Computer Vision: Multimodal Vision Analytics"
              aria-selected={activeId === 'vision-copilot'}
              className={`w-full h-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                activeId === 'vision-copilot'
                  ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-none group-hover:border-[#7C3AED]/40 transition-colors">
                  <FeatureIcon type="vision" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 bg-white/[0.05] border border-white/10 text-white/50 uppercase">
                  New Model
                </span>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-1">Computer Vision</span>
              <h3 className="text-lg font-display font-black uppercase text-white mb-2">Multimodal Vision Analytics</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Analyze viewport frame stream patterns. Track rendering bounding boxes and evaluate high-fidelity coordinate telemetry instantly.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#7C3AED] opacity-80 group-hover:opacity-100">
                <span>{activeId === 'vision-copilot' ? 'Active Sandbox Running' : 'Click to launch simulation'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          </article>

          {/* Card 3: Smart Router */}
          <article className="col-span-1 flex">
            <button
              id="bento-card-orchestrator"
              onClick={() => setActiveId('orchestrator')}
              aria-label="LLMOps Router: Smart Model Routing"
              aria-selected={activeId === 'orchestrator'}
              className={`w-full h-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                activeId === 'orchestrator'
                  ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-none group-hover:border-[#7C3AED]/40 transition-colors">
                  <FeatureIcon type="orchestrator" />
                </div>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-1">LLMOps Router</span>
              <h3 className="text-lg font-display font-black uppercase text-white mb-2">Smart Model Routing</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Dynamically route prompts between small Flash cores and reasoning engines depending on content complexity to shave latency overheads by up to 60%.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#7C3AED] opacity-80 group-hover:opacity-100">
                <span>{activeId === 'orchestrator' ? 'Active Sandbox Running' : 'Click to launch simulation'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          </article>

          {/* Card 4: Developer SDK (Spans 2 columns) */}
          <article className="col-span-2 flex">
            <button
              id="bento-card-developer-sdk"
              onClick={() => setActiveId('developer-sdk')}
              aria-label="Developer Tools: Server-Side SDK & Webhooks"
              aria-selected={activeId === 'developer-sdk'}
              className={`w-full h-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                activeId === 'developer-sdk'
                  ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-none group-hover:border-[#7C3AED]/40 transition-colors">
                  <FeatureIcon type="developer" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 bg-white/[0.05] border border-white/10 text-white/50 uppercase">
                  SDK v3.1
                </span>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-1">Developer Tools</span>
              <h3 className="text-lg font-display font-black uppercase text-white mb-2">Server-Side SDK & Webhooks</h3>
              <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                Integrate with high-fidelity type-safe Node.js and Python interfaces. Subscribe to real-time events, stream responses on the edge, and leverage standard webhook pipelines.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#7C3AED] opacity-80 group-hover:opacity-100">
                <span>{activeId === 'developer-sdk' ? 'Active Sandbox Running' : 'Click to launch simulation'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          </article>

          {/* Card 5: Security Guardrails */}
          <article className="col-span-1 flex">
            <button
              id="bento-card-security-guardrails"
              onClick={() => setActiveId('security-guardrails')}
              aria-label="Compliance: PII Scrubbing & Guardrails"
              aria-selected={activeId === 'security-guardrails'}
              className={`w-full h-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                activeId === 'security-guardrails'
                  ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-none group-hover:border-[#7C3AED]/40 transition-colors">
                  <FeatureIcon type="security" />
                </div>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-1">Compliance</span>
              <h3 className="text-lg font-display font-black uppercase text-white mb-2">PII Scrubbing & Guardrails</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Enforce local zero-trust boundary scrubbing for API keys, email structures, and sensitive hashes before they hit downstream LLM models.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#7C3AED] opacity-80 group-hover:opacity-100">
                <span>{activeId === 'security-guardrails' ? 'Active Sandbox Running' : 'Click to launch simulation'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          </article>

          {/* Card 6: Live Dynamic Sandbox Playground Terminal (Spans 2 columns) */}
          <aside className="col-span-2 bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden flex flex-col min-h-[420px] shadow-2xl" aria-label="Interactive Sandbox Playground Console">
            {/* Top Bar */}
            <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white/20"></span>
                <span className="w-1.5 h-1.5 bg-white/40"></span>
                <span className="w-1.5 h-1.5 bg-[#7c3aed]"></span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-3">DOCK // PLAYGROUND: {activeFeature.title}</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-0.5 rounded-none border border-[#7C3AED]/20">
                SANDBOX PIPELINE
              </span>
            </div>

            {/* Playground Switch Container */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* PLAYGROUND 1: Agent Hub Sim */}
                  {activeId === 'agent-hub' && (
                    <div className="flex-1 flex flex-col justify-between" id="desktop-playground-agent">
                      <div className="space-y-4">
                        <p className="text-xs text-white/50 leading-relaxed">
                          Test zero-shot task breakdown. Watch a multi-agent cluster automatically delegate, coordinate, and review a complex workflow live.
                        </p>

                        <div className="grid grid-cols-4 gap-2 pb-3 border-b border-white/5">
                          {[
                            { step: 1, label: 'Planner' },
                            { step: 2, label: 'Research' },
                            { step: 3, label: 'Coder' },
                            { step: 4, label: 'Reviewer' }
                          ].map((s) => (
                            <div key={s.step} className="text-center">
                              <div className={`h-1 transition-all duration-300 ${
                                agentStep >= s.step ? 'bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]' : 'bg-white/5'
                              }`}></div>
                              <span className={`text-[8px] font-mono uppercase tracking-widest mt-1 block ${
                                agentStep === s.step ? 'text-[#7C3AED] font-black' : 'text-white/30'
                              }`}>{s.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white/[0.02] rounded-none p-4 border border-white/5 font-mono text-xs text-white/60 h-32 overflow-y-auto space-y-1.5 flex flex-col justify-end">
                          {agentLog.slice(-3).map((log, idx) => (
                            <div key={idx} className="space-y-0.5 border-l border-[#7C3AED] pl-2">
                              <div className="flex items-center justify-between text-[8px] text-white/30">
                                <span className="font-bold">{log.sender}</span>
                                <span>{log.time}</span>
                              </div>
                              <p className="text-[10px] text-white/70 leading-relaxed">{log.text}</p>
                            </div>
                          ))}
                          {agentRunning && (
                            <div className="flex items-center gap-1.5 text-[8px] text-[#7C3AED] pt-1 uppercase tracking-widest font-black">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Inference telemetry streaming...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <button
                          id="desktop-agent-run-btn"
                          onClick={triggerAgentSimulation}
                          disabled={agentRunning}
                          className="flex-1 py-2 bg-[#7C3AED] hover:bg-white hover:text-black disabled:opacity-50 text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer rounded-none border border-transparent hover:border-white"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{agentRunning ? 'PROCESSING...' : 'RUN SIMULATION'}</span>
                        </button>
                        <button
                          id="desktop-agent-reset-btn"
                          onClick={resetAgentSim}
                          className="px-3 border border-white/20 hover:border-white text-white/60 hover:text-white transition-all cursor-pointer rounded-none bg-transparent"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* PLAYGROUND 2: Vision Analytics */}
                  {activeId === 'vision-copilot' && (
                    <div className="flex-1 flex flex-col justify-between animate-fade-in-up" id="desktop-playground-vision">
                      <div className="space-y-4">
                        <p className="text-xs text-white/50 leading-relaxed">
                          Identify spatial coordinates of UI assets. Toggle bounding frame vectors below.
                        </p>

                        <div className="relative bg-white/[0.01] border border-white/5 rounded-none h-36 overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                          {visionFrame === 0 ? (
                            <div className="text-center relative z-10 w-full px-6">
                              <div className="border border-[#7C3AED]/30 rounded-none p-3 bg-[#7C3AED]/5 max-w-xs mx-auto animate-float">
                                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider block">Navbar Node</span>
                                <span className="text-[8px] font-mono text-[#7C3AED] block mt-1">CONFIDENCE: 99.8%</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center relative z-10 w-full px-6">
                              <div className="border border-cyan-500/30 rounded-none p-3 bg-cyan-950/5 max-w-xs mx-auto animate-float">
                                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider block">Call To Action Card</span>
                                <span className="text-[8px] font-mono text-cyan-400 block mt-1">COORDS: [320, 150, 640, 480]</span>
                              </div>
                            </div>
                          )}
                          <span className="absolute bottom-2 left-3 font-mono text-[8px] bg-black/80 px-2 py-0.5 text-white/40 border border-white/10 uppercase tracking-widest">
                            frame_feed_0{visionFrame + 1}.bin
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            id="desktop-vision-f1-btn"
                            onClick={() => setVisionFrame(0)}
                            className={`flex-1 py-1.5 border font-mono text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                              visionFrame === 0 ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white' : 'border-white/10 text-white/40 hover:text-white'
                            }`}
                          >
                            Nav Node Feed
                          </button>
                          <button
                            id="desktop-vision-f2-btn"
                            onClick={() => setVisionFrame(1)}
                            className={`flex-1 py-1.5 border font-mono text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                              visionFrame === 1 ? 'bg-cyan-500/15 border-cyan-500 text-white' : 'border-white/10 text-white/40 hover:text-white'
                            }`}
                          >
                            Card Feed
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <div className="bg-white/[0.02] p-2 rounded-none border border-white/5 font-mono text-[9px] text-white/40 flex justify-between items-center tracking-wider uppercase">
                          <span>FEED LATENCY: <strong className="text-[#7C3AED]">7.8ms</strong></span>
                          <span>DETECTION FRAME: <strong className="text-white">60fps</strong></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PLAYGROUND 3: Smart Router */}
                  {activeId === 'orchestrator' && (
                    <div className="flex-1 flex flex-col justify-between" id="desktop-playground-orchestrator">
                      <div className="space-y-4">
                        <p className="text-xs text-white/50 leading-relaxed">
                          Evaluate edge LLMOps routing latency by shifting query payload complexity.
                        </p>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white/40 font-mono uppercase tracking-widest text-[9px]">Pipeline Complexity</span>
                            <span className="text-[#7C3AED] font-mono font-bold text-[10px]">{routerComplexity}%</span>
                          </div>
                          <input
                            type="range"
                            id="desktop-router-complexity-range"
                            min="1"
                            max="100"
                            value={routerComplexity}
                            onChange={(e) => setRouterComplexity(Number(e.target.value))}
                            className="w-full cursor-pointer h-1 bg-white/10 appearance-none rounded-none accent-[#7C3AED]"
                          />
                        </div>

                        <div className={`p-3 border transition-all duration-300 rounded-none ${routedModel.bgColor}`}>
                          <span className="text-[8px] font-mono text-white/40 block uppercase tracking-widest mb-0.5">Routed Destination Node</span>
                          <h4 className={`text-xs font-mono font-black uppercase ${routedModel.color} mb-1.5`}>{routedModel.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-white/40 uppercase tracking-widest pt-1 border-t border-white/5">
                            <div>Rate: <span className="text-white font-bold">{routedModel.cost} USD / 1k</span></div>
                            <div>Benchmark Accuracy: <span className="text-white font-bold">{routedModel.efficiency}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <div className="bg-[#7C3AED]/10 p-2 rounded-none border border-[#7C3AED]/20 text-center font-mono text-[8px] text-[#7C3AED] uppercase tracking-widest font-black">
                          Savings ratio relative to direct routing: <span className="text-white">58.4%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PLAYGROUND 4: Developer SDK */}
                  {activeId === 'developer-sdk' && (
                    <div className="flex-1 flex flex-col justify-between" id="desktop-playground-developer">
                      <div className="space-y-4">
                        <p className="text-xs text-white/50 leading-relaxed">
                          Incorporate stream workers. Check compiler payload specifications.
                        </p>

                        <div className="flex gap-1 bg-white/[0.02] p-1 border border-white/10 rounded-none">
                          {(['node', 'python', 'curl'] as const).map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setSdkLang(lang)}
                              className={`flex-1 py-1 text-[8px] font-mono uppercase tracking-widest transition-colors cursor-pointer rounded-none ${
                                sdkLang === lang ? 'bg-[#7C3AED] text-white font-bold' : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {lang === 'node' ? 'Node.js' : lang === 'python' ? 'Python' : 'cURL'}
                            </button>
                          ))}
                        </div>

                        <div className="relative">
                          <pre className="bg-white/[0.01] p-3 rounded-none border border-white/10 font-mono text-[8px] text-[#7c3aed] overflow-x-auto h-24 leading-relaxed">
                            <code>{sdkCode}</code>
                          </pre>
                          <button
                            onClick={copySdkCode}
                            className="absolute top-2 right-2 bg-black hover:bg-[#7C3AED] border border-white/15 text-white/50 hover:text-white px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase transition-all cursor-pointer rounded-none"
                          >
                            {sdkCopied ? 'COPIED' : 'COPY'}
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <span className="inline-flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest text-[#7C3AED] font-black">
                          SDK v3.1 loaded successfully
                        </span>
                      </div>
                    </div>
                  )}

                  {/* PLAYGROUND 5: Security Guardrails */}
                  {activeId === 'security-guardrails' && (
                    <div className="flex-1 flex flex-col justify-between" id="desktop-playground-security">
                      <div className="space-y-4">
                        <p className="text-xs text-white/50 leading-relaxed">
                          Test sandbox text parsing block. Modify inputs to instantly redacts credential tokens.
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-white/30 block uppercase tracking-widest">Input Payload</label>
                            <textarea
                              value={piiInput}
                              onChange={(e) => { setPiiInput(e.target.value); setPiiScrubbed(false); }}
                              className="w-full h-16 p-2 bg-white/[0.01] border border-white/10 rounded-none text-[9px] font-mono text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-[#7C3AED] block uppercase tracking-widest">Redacted output</label>
                            <div className="w-full h-16 p-2 bg-white/[0.02] border border-white/5 rounded-none text-[9px] font-mono text-white/70 overflow-y-auto leading-relaxed">
                              {scrubbedTextOutput}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setPiiScrubbed(true)}
                          className="flex-1 py-1.5 bg-[#7C3AED] hover:bg-white hover:text-black text-white font-mono text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer rounded-none border border-transparent hover:border-white transition-all"
                        >
                          <ShieldAlert className="w-3 h-3" />
                          <span>Scrub Payload</span>
                        </button>
                        <button
                          onClick={() => { setPiiInput('Auth token is sk_live_9a4f7e2c91 and email is custom-corp@fintech.net'); setPiiScrubbed(false); }}
                          className="px-3 border border-white/20 hover:border-white text-white/50 hover:text-white font-mono text-[9px] uppercase tracking-widest cursor-pointer rounded-none bg-transparent transition-all"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </aside>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TABLET VIEW: 2-Column Grid Layout (640px to 1024px) */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {BENTO_FEATURES.map((feature: FeatureItem) => {
            const isCardActive = activeId === feature.id;
            return (
              <article key={feature.id} className="flex">
                <button
                  id={`tablet-card-${feature.id}`}
                  onClick={() => setActiveId(feature.id)}
                  aria-label={`${feature.category}: ${feature.title}`}
                  aria-selected={isCardActive}
                  className={`w-full text-left p-6 relative overflow-hidden rounded-none border transition-all duration-200 ease-out group cursor-pointer ${
                    isCardActive 
                      ? 'bg-white/[0.04] border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.1)]' 
                      : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-white/[0.01] border border-white/10 rounded-none group-hover:border-[#7C3AED]/30">
                      <FeatureIcon type={feature.demoType} className="w-4 h-4" />
                    </div>
                    {feature.badge && (
                      <span className="text-[8px] font-mono font-bold tracking-widest px-2.5 py-0.5 bg-white/[0.05] border border-white/10 text-white/40 uppercase">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block mb-0.5">{feature.category}</span>
                  <h3 className="text-sm font-display font-black uppercase text-white mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{feature.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest text-[#7C3AED]/80 group-hover:text-white">
                    <span>{isCardActive ? 'Sandbox Active' : 'Load Simulation'}</span>
                    <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </button>
              </article>
            );
          })}

          {/* Dedicated Simulator Playground below cards (Spans 2 columns) */}
          <div className="col-span-2 bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden flex flex-col min-h-[360px] mt-4 shadow-xl">
            <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#7c3aed]"></span>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">TABLET SIMULATOR // {activeFeature.title}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {activeId === 'agent-hub' && (
                    <div className="flex-1 flex flex-col justify-between" id="tablet-playground-agent">
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2 pb-2 border-b border-white/5">
                          {['Planner', 'Research', 'Coder', 'Reviewer'].map((label, idx) => (
                            <div key={label} className="text-center">
                              <div className={`h-1 ${agentStep > idx ? 'bg-[#7C3AED]' : 'bg-white/5'}`}></div>
                              <span className="text-[8px] font-mono uppercase text-white/40 mt-1 block">{label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-white/[0.01] p-3.5 border border-white/5 font-mono text-[10px] text-white/60 h-24 overflow-y-auto space-y-1">
                          {agentLog.slice(-2).map((log, idx) => (
                            <div key={idx} className="border-l border-[#7C3AED] pl-2">
                              <p className="text-white/80">{log.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3">
                        <button onClick={triggerAgentSimulation} disabled={agentRunning} className="flex-1 py-2 bg-[#7C3AED] hover:bg-white hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest text-white transition-all cursor-pointer rounded-none">
                          Run Sim
                        </button>
                        <button onClick={resetAgentSim} className="px-3 border border-white/20 text-white/50 rounded-none cursor-pointer">
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                  {activeId === 'vision-copilot' && (
                    <div className="flex-1 flex flex-col justify-between" id="tablet-playground-vision">
                      <div className="relative bg-white/[0.01] border border-white/5 rounded-none h-28 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                          {visionFrame === 0 ? 'Frame A: Navbar Node Detected' : 'Frame B: Call To Action Bounding Boxes'}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-3">
                        <button onClick={() => setVisionFrame(0)} className={`flex-1 py-1.5 font-mono text-[9px] uppercase tracking-wider border cursor-pointer rounded-none ${visionFrame === 0 ? 'border-[#7C3AED] text-white' : 'border-white/15 text-white/40'}`}>Frame A</button>
                        <button onClick={() => setVisionFrame(1)} className={`flex-1 py-1.5 font-mono text-[9px] uppercase tracking-wider border cursor-pointer rounded-none ${visionFrame === 1 ? 'border-[#7C3AED] text-white' : 'border-white/15 text-white/40'}`}>Frame B</button>
                      </div>
                    </div>
                  )}

                  {activeId === 'orchestrator' && (
                    <div className="flex-1 flex flex-col justify-between" id="tablet-playground-orchestrator">
                      <div className="space-y-3">
                        <input type="range" min="1" max="100" value={routerComplexity} onChange={(e) => setRouterComplexity(Number(e.target.value))} className="w-full accent-[#7C3AED] h-1 bg-white/10" />
                        <div className="p-3 bg-[#7C3AED]/5 border border-[#7C3AED]/20">
                          <span className="text-[8px] font-mono text-white/40 block uppercase">Destination Model</span>
                          <span className="font-mono text-xs text-[#7C3AED] font-black uppercase">{routedModel.name}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeId === 'developer-sdk' && (
                    <div className="flex-1 flex flex-col justify-between" id="tablet-playground-developer">
                      <pre className="bg-white/[0.01] p-3 border border-white/10 font-mono text-[8px] text-[#7C3AED] overflow-x-auto h-24">
                        <code>{sdkCode}</code>
                      </pre>
                      <button onClick={copySdkCode} className="mt-2 py-1.5 border border-white/20 hover:border-white font-mono text-[9px] text-white uppercase tracking-widest rounded-none cursor-pointer">
                        {sdkCopied ? 'COPIED TO CLIPBOARD' : 'COPY CODE'}
                      </button>
                    </div>
                  )}

                  {activeId === 'security-guardrails' && (
                    <div className="flex-1 flex flex-col justify-between" id="tablet-playground-security">
                      <div className="space-y-2">
                        <textarea value={piiInput} onChange={(e) => { setPiiInput(e.target.value); setPiiScrubbed(false); }} className="w-full h-12 p-2 bg-white/[0.01] border border-white/10 rounded-none text-[9px] font-mono text-white" />
                        <div className="p-2 bg-white/[0.02] border border-white/5 text-[9px] font-mono text-white/60">
                          {scrubbedTextOutput}
                        </div>
                      </div>
                      <button onClick={() => setPiiScrubbed(true)} className="mt-2 py-1.5 bg-[#7C3AED] font-mono text-[9px] text-white uppercase tracking-widest font-black rounded-none cursor-pointer">
                        Scrub Payload
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE VIEW: Compact Accordion Interface (<640px) */}
        {/* ------------------------------------------------------------------ */}
        <div className="block sm:hidden space-y-4">
          {BENTO_FEATURES.map((feature: FeatureItem) => {
            const isOpen = !!openItems[feature.id];
            
            return (
              <div
                key={feature.id}
                id={`mobile-accordion-${feature.id}`}
                className={`border rounded-none overflow-hidden transition-all duration-200 ease-out bg-[#0a0a0a] ${
                  isOpen ? 'border-[#7C3AED]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Trigger (Touch-friendly minimum 48px target) */}
                <button
                  id={`mobile-accordion-trigger-${feature.id}`}
                  onClick={() => toggleItem(feature.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 min-h-[56px] text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none transition-all duration-150 ease-out"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/[0.02] border border-white/10 rounded-none">
                      <FeatureIcon type={feature.demoType} className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[7px] font-mono font-black tracking-widest text-[#7C3AED] uppercase block">
                        {feature.category}
                      </span>
                      <h3 className="text-xs font-display font-black uppercase text-white leading-tight tracking-tight">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-150 ease-out ${
                    isOpen ? 'transform rotate-180 text-[#7C3AED]' : ''
                  }`} />
                </button>

                {/* Animated Collapsible Drawer with height auto to prevent layout shift */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-4 bg-white/[0.01]">
                        {/* Description */}
                        <p className="text-xs text-white/50 leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Custom visual badge if exists */}
                        {feature.badge && (
                          <div className="inline-block">
                            <span className="text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 bg-white/[0.05] border border-white/10 text-white/50 uppercase rounded-none">
                              {feature.badge}
                            </span>
                          </div>
                        )}

                        {/* Inline Playground Sandbox within accordion to prevent shift */}
                        <div className="p-4 bg-black border border-white/10 rounded-none space-y-3">
                          <span className="text-[8px] font-mono text-white/40 block uppercase tracking-widest">
                            Sandbox Console
                          </span>

                          {/* Render specific inline mobile simulation logic */}
                          {feature.id === 'agent-hub' && (
                            <div className="space-y-3" id="mobile-playground-agent">
                              <div className="bg-white/[0.02] p-3 border border-white/5 font-mono text-[9px] text-white/70 h-20 overflow-y-auto space-y-1">
                                {agentLog.slice(-2).map((log, idx) => (
                                  <div key={idx} className="border-l border-[#7C3AED] pl-1.5">
                                    <span className="text-[7px] text-white/30">{log.sender}</span>
                                    <p className="text-[9px] leading-tight">{log.text}</p>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); triggerAgentSimulation(); }}
                                disabled={agentRunning}
                                className="w-full py-2 bg-[#7C3AED] text-white font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
                              >
                                {agentRunning ? 'PROCESSING...' : 'TRIGGER AGENT'}
                              </button>
                            </div>
                          )}

                          {feature.id === 'vision-copilot' && (
                            <div className="space-y-3" id="mobile-playground-vision">
                              <div className="bg-white/[0.01] border border-white/5 p-2 text-center">
                                <span className="text-[9px] font-mono text-cyan-400 uppercase">
                                  {visionFrame === 0 ? 'Frame 1: Bounding UI' : 'Frame 2: SVG Target'}
                                </span>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); setVisionFrame(prev => prev === 0 ? 1 : 0); }}
                                className="w-full py-2 border border-white/20 text-white font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
                              >
                                TOGGLE SOURCE FEED
                              </button>
                            </div>
                          )}

                          {feature.id === 'orchestrator' && (
                            <div className="space-y-2" id="mobile-playground-orchestrator">
                              <input
                                type="range"
                                min="1"
                                max="100"
                                value={routerComplexity}
                                onChange={(e) => { e.stopPropagation(); setRouterComplexity(Number(e.target.value)); }}
                                className="w-full accent-[#7C3AED] h-1"
                              />
                              <div className="p-2 bg-white/[0.03] border border-white/5 text-center font-mono text-[9px]">
                                <span className="text-white/40 block">MODEL</span>
                                <strong className="text-[#7C3AED]">{routedModel.name}</strong>
                              </div>
                            </div>
                          )}

                          {feature.id === 'developer-sdk' && (
                            <div className="space-y-2" id="mobile-playground-developer">
                              <pre className="bg-white/[0.01] p-2 border border-white/10 font-mono text-[8px] text-[#7C3AED] overflow-x-auto max-h-20">
                                <code>{sdkCode}</code>
                              </pre>
                              <button
                                onClick={(e) => { e.stopPropagation(); copySdkCode(); }}
                                className="w-full py-2 border border-white/20 text-white font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
                              >
                                {sdkCopied ? 'COPIED' : 'COPY SDK SNIPPET'}
                              </button>
                            </div>
                          )}

                          {feature.id === 'security-guardrails' && (
                            <div className="space-y-2" id="mobile-playground-security">
                              <textarea
                                value={piiInput}
                                onChange={(e) => { e.stopPropagation(); setPiiInput(e.target.value); setPiiScrubbed(false); }}
                                className="w-full h-12 p-1 bg-[#0a0a0a] border border-white/10 text-[9px] font-mono text-white"
                              />
                              <button
                                onClick={(e) => { e.stopPropagation(); setPiiScrubbed(true); }}
                                className="w-full py-2 bg-[#7C3AED] text-white font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
                              >
                                REDACT PAYLOAD
                              </button>
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

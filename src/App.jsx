import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Menu, 
  X, 
  ChevronRight, 
  Award, 
  List, 
  FileText,
  Clock, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Loader2, 
  Volume2, 
  PlayCircle, 
  Zap, 
  Bell, 
  BarChart3, 
  Image as ImageIcon, 
  PenTool, 
  MessageSquare, 
  Wand2, 
  Target,
  Search,
  Trophy
} from 'lucide-react';

/**
 * ENGLISHVERSE PRO - AI-Powered Learning Ecosystem
 * A single-file React application designed for Indian defense aspirants.
 */

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLabTool, setActiveLabTool] = useState('doubt');
  
  // AI State Management
  const [doubtInput, setDoubtInput] = useState('');
  const [aiDoubtResponse, setAiDoubtResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // API Configuration (Environment provides the key)
  const apiKey = ""; 

  const fetchWithRetry = async (url, options, maxRetries = 5) => {
    let delay = 1000;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return await response.json();
      } catch (err) { 
        if (i === maxRetries - 1) throw err; 
      }
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
    throw new Error("AI Connectivity Failed.");
  };

  const askAI = async () => {
    if (!doubtInput.trim()) return;
    setIsGenerating(true);
    setAiDoubtResponse('');
    
    const prompt = `You are a futuristic English Tutor for Indian defense exams (NDA, Air Force Group Y). 
    Explain this doubt in detail with examples and exam-specific tips: ${doubtInput}`;

    try {
      const data = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: "Use bullet points, bold key terms, and provide a 'Pro Tip' for exams." }] }
          })
        }
      );
      setAiDoubtResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate an answer. Please try rephrasing.");
    } catch (e) { 
      setAiDoubtResponse("Error connecting to the AI Lab. Please try again."); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  const menuItems = [
    { id: 'dashboard', icon: <BarChart3 size={18}/>, label: 'Dashboard' },
    { id: 'ai-lab', icon: <Sparkles size={18} className="text-indigo-400"/>, label: 'AI Innovation Lab' },
    { id: 'classroom', icon: <PlayCircle size={18}/>, label: 'Classroom' },
    { id: 'test-series', icon: <Target size={18}/>, label: 'Test Series' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Futuristic Navigation */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
              <Zap size={22} fill="white"/>
            </div>
            <span className="font-black text-xl italic tracking-tighter uppercase hidden sm:block">
              ENGLISHVERSE <span className="text-indigo-400">PRO</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-3 w-64 focus-within:border-indigo-500/50 transition-all">
            <Search size={14} className="text-slate-500" />
            <input type="text" placeholder="Search concepts..." className="bg-transparent text-xs w-full outline-none" />
          </div>
          <Bell size={20} className="text-slate-400 cursor-pointer hover:text-white" />
          <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-indigo-400/50 flex items-center justify-center font-bold text-sm">
            JD
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static w-64 border-r border-white/5 h-[calc(100vh-64px)] bg-[#020617] transition-transform duration-300 z-40
        `}>
          <nav className="p-6 space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Academic Modules</p>
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all
                ${activeSection === item.id 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
                  : 'text-slate-400 hover:bg-white/5'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            
            <div className="pt-10">
              <div className="bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                <p className="text-[10px] font-black text-indigo-300 uppercase mb-2">Current Batch</p>
                <p className="text-sm font-black italic mb-3">Group Y (Medical Assistant)</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">85% Progress</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-950/20">
          <div className="max-w-5xl mx-auto">
            {activeSection === 'dashboard' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 space-y-8 pb-20">
                <div className="bg-gradient-to-br from-indigo-900/40 via-indigo-950/20 to-black border border-indigo-500/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase bg-indigo-600 px-3 py-1 rounded-full mb-6 inline-block tracking-widest shadow-lg shadow-indigo-600/20">
                      Top Performer
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none uppercase italic">
                      Ready for <span className="text-indigo-400">Mastery</span>?
                    </h2>
                    <p className="text-slate-400 mb-10 max-w-md text-lg leading-relaxed font-medium">
                      You are just 3 concepts away from finishing the 'Noun' chapter. Let's conquer the final quiz.
                    </p>
                    <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/5">
                      Resume Module <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="absolute -bottom-20 -right-20 opacity-5 rotate-12 scale-150 transition-transform group-hover:rotate-0">
                    <BookOpen size={400} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Streak</p>
                      <Zap className="text-orange-400 group-hover:scale-125 transition-transform" size={24} />
                    </div>
                    <p className="text-3xl font-black italic">14 Days</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Doubts Destroyed</p>
                      <Sparkles className="text-indigo-400 group-hover:scale-125 transition-transform" size={24} />
                    </div>
                    <p className="text-3xl font-black italic">128</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Rank</p>
                      <Trophy className="text-yellow-500 group-hover:scale-125 transition-transform" size={24} />
                    </div>
                    <p className="text-3xl font-black italic">#2,450</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'ai-lab' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 pb-20">
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-indigo-500/10 text-indigo-400 rounded-3xl border border-indigo-500/20 shadow-2xl">
                    <Sparkles size={40} />
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter italic uppercase underline decoration-indigo-500 underline-offset-8">AI Innovation Lab</h2>
                  <p className="text-slate-400 max-w-lg mx-auto font-medium">Get instant conceptual clarity with our Gemini 2.5 powered tutor.</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-8">
                    {['doubt', 'essay', 'mnemonic'].map(tool => (
                      <button 
                        key={tool} 
                        onClick={() => setActiveLabTool(tool)}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${activeLabTool === tool 
                          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' 
                          : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'}`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[50px] p-8 md:p-14 shadow-2xl shadow-black relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Sparkles size={120} />
                  </div>
                  
                  {activeLabTool === 'doubt' && (
                    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 relative z-10">
                      <div className="flex items-center gap-4 text-indigo-400">
                        <MessageSquare size={24} />
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">Doubt Destroyer</h3>
                      </div>
                      <div className="relative group">
                        <textarea 
                          value={doubtInput}
                          onChange={(e) => setDoubtInput(e.target.value)}
                          className="w-full bg-white/5 border-2 border-white/10 rounded-[40px] p-10 text-xl outline-none focus:border-indigo-500 transition-all min-h-[220px] font-medium placeholder:text-slate-700 shadow-inner"
                          placeholder="Ask any English doubt... e.g. What is the difference between 'A Few' and 'Few'?"
                        />
                        <button 
                          onClick={askAI} 
                          disabled={isGenerating || !doubtInput.trim()} 
                          className="absolute bottom-8 right-8 bg-indigo-600 p-6 rounded-[30px] hover:scale-110 active:scale-95 shadow-xl shadow-indigo-600/40 disabled:opacity-50 transition-all group"
                        >
                          {isGenerating ? <Loader2 className="animate-spin" size={32}/> : <Send size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </button>
                      </div>
                      {aiDoubtResponse && (
                        <div className="p-10 bg-indigo-500/5 rounded-[50px] border border-indigo-500/10 text-slate-300 whitespace-pre-wrap leading-relaxed animate-in slide-in-from-top-6 text-lg font-medium">
                          <div className="flex items-center gap-3 mb-6 text-indigo-400 font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4">
                            <Sparkles size={18} /> AI EXPERT ANALYSIS
                          </div>
                          {aiDoubtResponse}
                        </div>
                      )}
                    </div>
                  )}
                  {activeLabTool === 'essay' && (
                    <div className="text-center py-20 animate-in fade-in">
                      <PenTool size={48} className="mx-auto text-slate-700 mb-6" />
                      <p className="text-slate-500 font-black uppercase tracking-widest italic">AI Essay Evaluator (Beta) Loading...</p>
                    </div>
                  )}
                  {activeLabTool === 'mnemonic' && (
                    <div className="text-center py-20 animate-in fade-in">
                      <ImageIcon size={48} className="mx-auto text-slate-700 mb-6" />
                      <p className="text-slate-500 font-black uppercase tracking-widest italic">Visual Mnemonic Engine Loading...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'classroom' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-in zoom-in-95">
                <div className="w-28 h-28 bg-indigo-500/10 rounded-[40px] flex items-center justify-center border border-indigo-500/20 shadow-2xl relative">
                  <PlayCircle size={64} className="text-indigo-400" />
                  <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">Classroom Hub</h2>
                  <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg">Your next live session for 'Voice & Narration' begins in 14 minutes. Prepare your notes.</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-indigo-600 px-12 py-5 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all uppercase text-xs tracking-widest">JOIN LIVE</button>
                  <button className="bg-white/5 border border-white/10 px-12 py-5 rounded-2xl font-black hover:bg-white/10 transition-all uppercase text-xs tracking-widest">MY NOTES</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Futuristic FAB */}
      <button 
        onClick={() => { setActiveSection('ai-lab'); setActiveLabTool('doubt'); }}
        className="fixed bottom-12 right-12 w-20 h-20 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-700 rounded-[30px] shadow-3xl shadow-indigo-600/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50 border border-white/10"
      >
        <Sparkles size={32} className="text-white group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default App;

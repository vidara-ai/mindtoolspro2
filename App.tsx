
import React, { useState, useEffect } from 'react';

type ViewState = 'hero' | 'signup' | 'signin' | 'signup-success' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('hero');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  
  // Connection Simulation States
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSteps, setSimSteps] = useState<string[]>([]);
  const [simError, setSimError] = useState(false);

  // Reset error when switching views
  useEffect(() => {
    setError('');
  }, [view]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const startConnectionSimulation = () => {
    setIsSimulating(true);
    setSimSteps([]);
    setSimError(false);

    const steps = [
      "Conectando ao Host... OK!",
      "Verificando IP... OK!",
      "Configurando porta... OK!",
      "Atualizando o servidor... Falha!"
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimSteps(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setTimeout(() => setSimError(true), 800);
        }
      }, (index + 1) * 800);
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('signup-success');
    }, 1500);
  };

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!formData.password) {
      setError('Por favor, insira sua senha.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('dashboard');
    }, 1500);
  };

  const renderHero = () => (
    <div className="relative z-10 w-full max-w-5xl px-4 py-12 md:py-20 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-6 md:mb-8">
        <span className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#1FC3FF]/30 bg-[#0A132E] text-[#00C2D6] text-[10px] md:text-xs font-bold tracking-[0.1em] shadow-[0_0_15px_rgba(0,194,214,0.15)] uppercase">
          Plataforma MindTools Pro
        </span>
      </div>

      <h1 className="mb-4 md:mb-6 flex flex-col gap-1 md:gap-2">
        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          As melhores IAs da atualidade
        </span>
        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold gradient-headline tracking-tight leading-tight">
          num só lugar.
        </span>
      </h1>

      <p className="mb-8 md:mb-10 text-[#C7CFDB] text-base md:text-xl max-w-2xl leading-relaxed px-2">
        Centralize suas ferramentas de inteligência artificial, aumente sua produtividade e tenha acesso ilimitado às principais tecnologias do mercado.
      </p>

      <div className="mb-8 md:mb-10 w-full max-w-xl">
        <div className="bg-[#1A1405] border border-[#F5C451] rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-center shadow-lg mx-2">
          <p className="text-[#F5C451] font-bold text-xs md:text-base text-center">
            ⚠️ O CADASTRO DEVE SER REALIZADO NO MESMO E-MAIL DA COMPRA.
          </p>
        </div>
      </div>

      <button 
        onClick={() => setView('signup')}
        className="mb-12 md:mb-14 group relative flex items-center justify-center w-full max-w-xs md:max-w-none"
      >
        <div className="absolute inset-0 bg-[#00C2D6] blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-lg"></div>
        <span className="relative w-full md:w-auto bg-[#00C2D6] hover:bg-[#00A9BC] text-[#021018] font-black text-base md:text-xl px-8 py-4 md:px-10 md:py-5 rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] shadow-[0_8px_30px_rgb(0,194,214,0.3)]">
          ACESSAR A PLATAFORMA
        </span>
      </button>

      <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="flex -space-x-2 md:-space-x-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              className="inline-block h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-[#060B1A] border border-[rgba(0,194,214,0.35)]"
              src={`https://picsum.photos/seed/${i + 123}/100/100`}
              alt={`Usuário ${i}`}
            />
          ))}
        </div>
        <p className="text-[#8A93A6] text-[10px] md:text-sm font-bold tracking-widest uppercase">
          +25.000 PROFISSIONAIS JÁ USAM O MINDTOOLS
        </p>
      </div>
    </div>
  );

  const renderFormContainer = (title: string, children: React.ReactNode) => (
    <div className="relative z-10 w-full max-w-[360px] px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#0A132E]/80 backdrop-blur-xl border border-[#1FC3FF]/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">{title}</h2>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-xs text-center">
            {error}
          </div>
        )}
        {children}
      </div>
    </div>
  );

  const renderSignup = () => renderFormContainer("Criar sua conta", (
    <form onSubmit={handleSignup} className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider ml-1">E-mail</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="seu@email.com"
          className="bg-[#060B1A] border border-[#1FC3FF]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C2D6] focus:ring-1 focus:ring-[#00C2D6] transition-all"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider ml-1">Senha</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          className="bg-[#060B1A] border border-[#1FC3FF]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C2D6] focus:ring-1 focus:ring-[#00C2D6] transition-all"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider ml-1">Confirmar Senha</label>
        <input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="••••••••"
          className="bg-[#060B1A] border border-[#1FC3FF]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C2D6] focus:ring-1 focus:ring-[#00C2D6] transition-all"
          required
        />
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="mt-2 bg-[#00C2D6] hover:bg-[#00A9BC] disabled:opacity-50 text-[#021018] font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-[#021018]/30 border-t-[#021018] rounded-full animate-spin"></div>
        ) : "Criar conta"}
      </button>
      <p className="text-[#8A93A6] text-xs text-center mt-3">
        Já tem uma conta? <button type="button" onClick={() => setView('signin')} className="text-[#00C2D6] hover:underline font-bold">Fazer login</button>
      </p>
    </form>
  ));

  const renderSignupSuccess = () => (
    <div className="relative z-10 w-full max-w-[360px] px-4 text-center animate-in zoom-in duration-500">
      <div className="bg-[#0A132E]/80 backdrop-blur-xl border border-[#1FC3FF]/20 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl md:text-4xl">✅</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Cadastro realizado!</h2>
        <p className="text-[#C7CFDB] text-sm mb-8">Sua conta está pronta. Agora você pode acessar todas as funcionalidades.</p>
        <button 
          onClick={() => setView('signin')}
          className="w-full bg-[#00C2D6] hover:bg-[#00A9BC] text-[#021018] font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm"
        >
          👉 Fazer login
        </button>
      </div>
    </div>
  );

  const renderSignin = () => renderFormContainer("Entrar na plataforma", (
    <form onSubmit={handleSignin} className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider ml-1">E-mail</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="seu@email.com"
          className="bg-[#060B1A] border border-[#1FC3FF]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C2D6] focus:ring-1 focus:ring-[#00C2D6] transition-all"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider ml-1">Senha</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          className="bg-[#060B1A] border border-[#1FC3FF]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C2D6] focus:ring-1 focus:ring-[#00C2D6] transition-all"
          required
        />
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="mt-2 bg-[#00C2D6] hover:bg-[#00A9BC] disabled:opacity-50 text-[#021018] font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-[#021018]/30 border-t-[#021018] rounded-full animate-spin"></div>
        ) : "Entrar"}
      </button>
      <p className="text-[#8A93A6] text-xs text-center mt-3">
        Não tem uma conta? <button type="button" onClick={() => setView('signup')} className="text-[#00C2D6] hover:underline font-bold">Cadastre-se</button>
      </p>
    </form>
  ));

  const renderSimulationOverlay = () => (
    <div className="fixed inset-0 z-[100] bg-[#060B1A]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-[#0A132E] border border-[#1FC3FF]/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_0_100px_rgba(0,194,214,0.1)] overflow-hidden">
        <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-[#1FC3FF]/10 pb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[#8A93A6] text-[10px] font-mono ml-4">Terminal de Conexão Segura</span>
        </div>
        
        <div className="font-mono text-xs md:text-sm flex flex-col gap-2.5 min-h-[160px] md:min-h-[200px]">
          {simSteps.map((step, i) => (
            <div key={i} className={`animate-in slide-in-from-left-2 duration-300 ${step.includes('Falha') ? 'text-red-400' : 'text-[#00C2D6]'}`}>
              <span className="opacity-50 mr-2">{'>'}</span> {step}
            </div>
          ))}
          
          {!simError && simSteps.length < 4 && (
            <div className="flex items-center gap-2 text-[#00C2D6]">
              <span className="opacity-50 mr-2">{'>'}</span>
              <span className="w-1.5 h-3.5 bg-[#00C2D6] animate-pulse"></span>
            </div>
          )}

          {simError && (
            <div className="mt-4 p-4 md:p-6 bg-red-500/10 border border-red-500/40 rounded-xl animate-in zoom-in duration-500">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl mt-0.5">⚠️</span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-red-400 font-bold text-sm md:text-base leading-tight">
                    Neste momento, estamos com uma alta demanda simultânea. Desculpe-nos pelo transtorno.
                  </p>
                  <p className="text-red-400/80 text-[11px] md:text-xs">
                    Previsão de normalização: em até 6 horas.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsSimulating(false)}
                className="mt-5 w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all font-bold border border-red-500/20 text-xs uppercase tracking-widest"
              >
                FECHAR TERMINAL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="relative z-10 w-full max-w-6xl px-4 md:px-6 py-8 animate-in fade-in zoom-in duration-700">
      <div className="bg-[#0A132E]/90 backdrop-blur-2xl border border-[#1FC3FF]/30 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,194,214,0.1)] text-center">
        <div className="mb-4 md:mb-6 inline-flex px-3 py-1 bg-green-500/10 border border-green-500/50 rounded-full text-green-500 text-[10px] md:text-sm font-bold animate-bounce">
          ✅ Login realizado com sucesso
        </div>
        <h2 className="text-2xl md:text-5xl font-black text-white mb-4 leading-tight">Bem-vindo a Plataforma MindTools Pro</h2>
        
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="px-5 py-2 md:px-6 md:py-2 bg-[#00C2D6]/10 border border-[#00C2D6] rounded-full shadow-[0_0_20px_rgba(0,194,214,0.2)]">
            <span className="text-[#00C2D6] text-sm md:text-xl font-black tracking-widest uppercase">
              PLANO PRO ATIVO
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
          {/* Card 1: Criação Visual & Multimídia */}
          <div 
            onClick={startConnectionSimulation}
            className="bg-[#060B1A] border border-[#1FC3FF]/10 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-[#00C2D6]/40 transition-all cursor-pointer group flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,194,214,0.05)]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00C2D6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl md:text-2xl">🎬</span>
            </div>
            <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Criação Visual & Multimídia</h3>
            <div className="text-[#8A93A6] text-xs md:text-sm flex flex-col gap-1.5 md:gap-2">
              <p>• <strong>Vídeos e Animação:</strong> Hailuo, Runway, Sora, VideoGen, Veo 3.1 Fast, DreamFace.</p>
              <p>• <strong>Imagens Ultra Realistas:</strong> Midjourney, Leonardo, Ideogram, Nano Banana PRO.</p>
              <p>• <strong>Áudio e Música:</strong> Fish Audio (Clonagem), AI Make a Song.</p>
            </div>
          </div>

          {/* Card 2: Inteligência, Texto & Chat */}
          <div 
            onClick={startConnectionSimulation}
            className="bg-[#060B1A] border border-[#1FC3FF]/10 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-[#00C2D6]/40 transition-all cursor-pointer group flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,194,214,0.05)]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl md:text-2xl">🧠</span>
            </div>
            <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Inteligência & Produtividade</h3>
            <div className="text-[#8A93A6] text-xs md:text-sm flex flex-col gap-1.5 md:gap-2">
              <p>• <strong>Chat e Conversação:</strong> ChatGPT 5 PRO, Claude Sonnet 4, Super Grok 4, DeepSeek.</p>
              <p>• <strong>Ebooks e PDFs:</strong> Gamma App, I Love PDF, BK Reviews.</p>
              <p>• <strong>Utilitários & YouTube:</strong> VidIQ, Clicopy (Clonagem de Páginas).</p>
            </div>
          </div>

          {/* Card 3: Design, Marketing & Spy Tools */}
          <div 
            onClick={startConnectionSimulation}
            className="bg-[#060B1A] border border-[#1FC3FF]/10 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-[#00C2D6]/40 transition-all cursor-pointer group flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,194,214,0.05)]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3DDCFF]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl md:text-2xl">📊</span>
            </div>
            <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Design & Market Intelligence</h3>
            <div className="text-[#8A93A6] text-xs md:text-sm flex flex-col gap-1.5 md:gap-2">
              <p>• <strong>Assets Premium:</strong> Canva PRO, Envato, Freepik, Motion Array, Adobe Stock.</p>
              <p>• <strong>Marketing & SEO:</strong> Semrush Business, Moz, Ubersuggest.</p>
              <p>• <strong>Spy Tools:</strong> GuruKiller, SpyHero, Adminer, Filtrify, Adsparo.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setView('hero')}
          className="mt-8 md:mt-12 text-[#8A93A6] hover:text-white transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest flex items-center justify-center mx-auto gap-2"
        >
          <span>🚪</span> Sair da plataforma
        </button>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-[#060B1A]">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#0A132E] blur-[100px] md:blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#120C2E] blur-[100px] md:blur-[120px] opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(31,195,255,0.05)_0%,transparent_70%)]"></div>
        
        {/* Abstract lines/dots for tech feel */}
        <div className="absolute inset-0 opacity-[0.05] md:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Connection Simulation Overlay */}
      {isSimulating && renderSimulationOverlay()}

      {/* View Switcher */}
      <div className="w-full flex items-center justify-center relative z-10 min-h-screen py-6 md:py-0">
        {view === 'hero' && renderHero()}
        {view === 'signup' && renderSignup()}
        {view === 'signup-success' && renderSignupSuccess()}
        {view === 'signin' && renderSignin()}
        {view === 'dashboard' && renderDashboard()}
      </div>
      
      {/* Back button for auth views */}
      {view !== 'hero' && view !== 'dashboard' && view !== 'signup-success' && (
        <button 
          onClick={() => setView('hero')}
          className="fixed top-4 left-4 md:top-8 md:left-8 z-50 text-[#C7CFDB] hover:text-white flex items-center gap-1.5 md:gap-2 font-bold transition-all text-xs md:text-base bg-[#0A132E]/50 md:bg-transparent px-3 py-1.5 rounded-full md:p-0 backdrop-blur-md md:backdrop-blur-none"
        >
          <span className="text-lg md:text-xl">←</span> Voltar
        </button>
      )}
    </main>
  );
};

export default App;

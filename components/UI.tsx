import React from 'react';

export const PageBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50">
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-200/40 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '8s'}} />
    <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}} />
    <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-pink-200/40 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '12s', animationDelay: '2s'}} />
  </div>
);

export const GlassCard = ({ children, className = '', onClick }: any) => (
  <div 
    onClick={onClick} 
    className={`bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/80 hover:shadow-[0_15px_35px_rgb(0,0,0,0.08)] hover:-translate-y-1' : ''} ${className}`}
  >
    {children}
  </div>
);

export const GlassButton = ({ children, onClick, variant = 'primary', className = '', disabled = false }: any) => {
  const baseStyle = "px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 border border-transparent",
    secondary: "bg-white/50 text-slate-700 hover:bg-white/80 border border-white/60 shadow-sm",
    danger: "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100/50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};

export const GlassInput = (props: any) => (
  <input 
    {...props}
    className={`w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/80 transition-all ${props.className || ''}`}
  />
);

export const GlassSelect = (props: any) => (
  <select 
    {...props}
    className={`w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/80 transition-all appearance-none ${props.className || ''}`}
  />
);


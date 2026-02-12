
import React from 'react';
import { Question, Language } from '../types';

interface CardProps {
  question: Question;
  lang: Language;
  onNext: () => void;
  isFlipped: boolean;
  onClick: () => void;
  deckName: { zh: string; en: string };
  deckId: number;
}

export const THEMES: Record<number, any> = {
  1: {
    bg: 'bg-[#f0f9ff]',
    border: 'border-[#7dd3fc]',
    text: 'text-[#0369a1]',
    accent: '#0ea5e9',
    sub: 'text-[#0369a1]/60',
    title: { zh: '表层之下', en: 'Beneath the Surface' },
    tag: 'BENEATH',
    icon: '❄'
  },
  2: {
    bg: 'bg-[#fff1f2]',
    border: 'border-[#fca5a5]',
    text: 'text-[#b91c1c]',
    accent: '#ef4444',
    sub: 'text-[#b91c1c]/60',
    title: { zh: '渐入内心', en: 'Into the Heart' },
    tag: 'INTO HEART',
    icon: '❤'
  },
  3: {
    bg: 'bg-[#111827]',
    border: 'border-[#d4af37]',
    text: 'text-[#f3e5ab]',
    accent: '#d4af37',
    sub: 'text-[#f3e5ab]/60',
    title: { zh: '真实的你', en: 'The Real You' },
    tag: 'REAL YOU',
    icon: '✨'
  }
};

export const MorningIllustration = ({ primary, secondary, className }: any) => (
  <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="60" r="35" fill={secondary} opacity="0.3" />
    <path d="M100 15V35M100 85V105M55 60H75M125 60H145M68.5 28.5L82.5 42.5M117.5 77.5L131.5 91.5M68.5 91.5L82.5 77.5M117.5 42.5L131.5 28.5" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <path d="M70 60C70 43.4315 83.4315 30 100 30C116.569 30 130 43.4315 130 60" stroke={primary} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const HeartIllustration = ({ primary, secondary, className }: any) => (
  <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 85C100 85 140 60 140 40C140 28.9543 131.046 20 120 20C113.639 20 108.019 23.0135 104.5 27.6744C100.981 23.0135 95.3614 20 89 20C77.9543 20 69 28.9543 69 40C69 60 100 85 100 85Z" fill={secondary} opacity="0.3" stroke={primary} strokeWidth="1.5" />
    <path d="M110 95C110 95 150 70 150 50C150 38.9543 141.046 30 130 30C123.639 30 118.019 33.0135 114.5 37.6744C110.981 33.0135 105.361 30 99 30C87.9543 30 79 38.9543 79 50C79 70 110 95 110 95Z" stroke={primary} strokeWidth="1.2" opacity="0.6" />
  </svg>
);

export const MasterIllustration = ({ primary, secondary, className }: any) => (
  <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="60" r="45" stroke={primary} strokeWidth="0.5" strokeDasharray="4 4" />
    <path d="M100 10L115 50H155L123 75L135 115L100 90L65 115L77 75L45 50H85L100 10Z" fill={secondary} opacity="0.2" stroke={primary} strokeWidth="1.5" />
    <circle cx="100" cy="60" r="15" fill={primary} opacity="0.1" />
    <path d="M100 35V85M75 60H125" stroke={primary} strokeWidth="1" opacity="0.5" />
  </svg>
);

export const FloralPattern: React.FC<{ color: string; opacity?: string }> = ({ color, opacity = "0.08" }) => (
  <svg className={`absolute inset-0 w-full h-full pointer-events-none`} style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="floral" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M40 15 C 48 8, 64 8, 72 15 S 56 32, 40 40 S 8 24, 8 15 S 24 8, 40 15" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="40" cy="40" r="2" fill={color} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#floral)" />
  </svg>
);

const CardFrame: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-4 pointer-events-none border opacity-20" style={{ borderColor: color, borderRadius: '1.6rem' }}>
    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-[3px] border-l-[3px]" style={{ borderColor: color, borderTopLeftRadius: '0.6rem' }}></div>
    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-[3px] border-r-[3px]" style={{ borderColor: color, borderTopRightRadius: '0.6rem' }}></div>
    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-[3px] border-l-[3px]" style={{ borderColor: color, borderBottomLeftRadius: '0.6rem' }}></div>
    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-[3px] border-r-[3px]" style={{ borderColor: color, borderBottomRightRadius: '0.6rem' }}></div>
  </div>
);

export const CardBack: React.FC<{ theme: any; deckId: number; minimal?: boolean; lang?: Language }> = ({ theme, deckId, minimal = false, lang = 'zh' }) => {
  const renderIllustration = () => {
    const props = {
      primary: theme.accent,
      secondary: deckId === 3 ? '#1f2937' : '#ffffff',
      className: `w-32 h-auto drop-shadow-2xl z-10 transition-transform duration-500 ${minimal ? 'scale-75' : 'scale-100'}`
    };

    switch (deckId) {
      case 1: return <MorningIllustration {...props} />;
      case 2: return <HeartIllustration {...props} />;
      case 3: return <MasterIllustration {...props} />;
      default: return <MorningIllustration {...props} />;
    }
  };

  const titleText = theme.title[lang];
  // Dynamic Level Text
  const levelText = deckId === 1 ? 'LEVEL 1' : deckId === 2 ? 'LEVEL 2' : 'LEVEL 3';
  const levelSub = lang === 'zh' 
    ? (deckId === 1 ? '表层之下' : deckId === 2 ? '渐入内心' : '真实的你') 
    : (deckId === 1 ? 'Beneath the Surface' : deckId === 2 ? 'Into the Heart' : 'The Real You');

  return (
    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-[2rem] ${theme.bg} p-6 flex flex-col items-center shadow-2xl overflow-hidden border-[3px] ${theme.border} transform-style-3d`}>
      <FloralPattern color={theme.accent} />
      
      {!minimal && (
        <div className="mt-8 flex flex-col items-center relative z-10 animate-fadeIn antialiased">
           {/* Level Badge */}
           <div className={`px-4 py-1.5 rounded-full border ${theme.border} bg-white/30 mb-3`}>
              <span className={`text-[10px] ${theme.text} font-black tracking-[0.2em] uppercase drop-shadow-sm`}>{levelText}</span>
           </div>
           
           {/* Main Title */}
           <h2 className={`text-xl font-black ${theme.text} serif-romantic tracking-widest text-center px-1 leading-snug uppercase max-w-[240px] drop-shadow-sm`}>
              {titleText}
           </h2>
           
           {/* Decorative Lines */}
           <div className="flex gap-2 mt-3 mb-1 opacity-60">
              <div className={`w-2 h-2 rounded-full ${deckId >= 1 ? 'bg-current' : 'border border-current'} ${theme.text}`}></div>
              <div className={`w-2 h-2 rounded-full ${deckId >= 2 ? 'bg-current' : 'border border-current'} ${theme.text}`}></div>
              <div className={`w-2 h-2 rounded-full ${deckId >= 3 ? 'bg-current' : 'border border-current'} ${theme.text}`}></div>
           </div>
           
           <span className={`text-[10px] ${theme.text} opacity-80 font-bold tracking-[0.1em] mt-1`}>{levelSub}</span>
        </div>
      )}

      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        <div className={`absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none ${minimal ? 'scale-125' : ''}`}>
          <div className={`w-60 h-60 border-[1px] ${deckId === 3 ? 'border-[#d4af37]' : 'border-current'} rounded-full animate-[spin_20s_linear_infinite]`}></div>
          <div className={`absolute w-44 h-44 border-[1px] ${deckId === 3 ? 'border-[#d4af37]' : 'border-current'} rounded-full opacity-50`}></div>
        </div>
        
        {renderIllustration()}
        
        {minimal && (
           <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-6xl font-black ${theme.text} opacity-10`}>{deckId}</span>
           </div>
        )}
      </div>

      {!minimal && (
        <div className="mb-8 w-full flex flex-col items-center text-center px-6 relative z-10 antialiased">
          <div className={`w-12 h-[1px] ${theme.text} opacity-30 mb-3`}></div>
          <p className={`text-[8px] ${theme.text} font-black tracking-[0.3em] opacity-60 uppercase`}>
            Deeply Knowing You
          </p>
        </div>
      )}
    </div>
  );
};

export const Card: React.FC<CardProps> = ({ question, lang, onNext, isFlipped, onClick, deckName, deckId }) => {
  const theme = THEMES[deckId] || THEMES[3];

  const mainQuestion = lang === 'zh' ? question.text.zh : question.text.en;
  const subQuestion = lang === 'zh' ? question.text.en : question.text.zh;

  const renderIllustrationStamp = () => {
    const props = {
      primary: theme.accent,
      secondary: deckId === 3 ? '#1f2937' : '#ffffff',
      className: `w-64 h-auto opacity-[0.15] absolute z-0 pointer-events-none transition-all duration-1000 ${isFlipped ? 'scale-110 rotate-12' : 'scale-90'}`
    };

    switch (deckId) {
      case 1: return <MorningIllustration {...props} />;
      case 2: return <HeartIllustration {...props} />;
      case 3: return <MasterIllustration {...props} />;
      default: return <MorningIllustration {...props} />;
    }
  };

  return (
    <div className="perspective-2000 w-full h-[min(75vh,640px)] md:h-[min(70vh,580px)] max-w-[360px] md:max-w-[380px] mx-auto group">
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={onClick}
      >
        {/* Card Design Side (Back) */}
        <CardBack theme={theme} deckId={deckId} lang={lang} />

        {/* Question Side (Front) - Mirroring the rich design of the back */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[2rem] ${theme.bg} p-4 md:p-8 flex flex-col items-center text-center shadow-2xl border-[3px] ${theme.border} overflow-hidden transform-style-3d`}>
          {/* Subtle Paper Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none mix-blend-overlay"></div>
          
          <FloralPattern color={theme.accent} opacity="0.25" />
          <CardFrame color={theme.accent} />
          
          {/* Header Area */}
          <div className="w-full flex flex-col items-center relative z-10 mb-2 antialiased shrink-0">
             <div className="flex gap-2 mb-2">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < deckId ? theme.text : 'opacity-20 ' + theme.text}`}>★</span>
                ))}
             </div>
             <span className={`text-[8px] ${theme.text} opacity-60 font-black tracking-[0.5em] uppercase`}>{theme.tag}</span>
             <div className={`mt-2 p-2.5 rounded-full border border-current opacity-30 ${theme.text}`}>
                <div className="text-xl leading-none">{theme.icon}</div>
             </div>
          </div>

          <div className="flex-1 w-full relative z-10 antialiased overflow-y-auto no-scrollbar">
            {/* Inner Wrapper for Flex Centering Logic: min-h-full ensures it stretches to allow centering, but allows overflow if text is too long */}
            <div className="min-h-full flex flex-col justify-center items-center py-4 px-2">
                {/* Background Illustration watermark - Centered and Larger */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {renderIllustrationStamp()}
                </div>

                <div className={`flex flex-col items-center justify-center w-full transition-all duration-1000 ${isFlipped ? 'question-reveal' : 'opacity-0 scale-95 blur-md'}`}>
                  <h1 className={`text-xl md:text-2xl font-black leading-relaxed ${deckId === 3 ? theme.text : 'text-gray-800'} mb-3 md:mb-5 serif-romantic px-1 md:px-3 drop-shadow-sm relative`}>
                    {mainQuestion}
                  </h1>
                  
                  <div className={`w-14 h-[2px] ${theme.text} opacity-30 mb-3 md:mb-5 rounded-full shrink-0`}></div>
                  
                  <p className={`text-sm md:text-base ${theme.text} font-bold italic leading-relaxed serif-romantic opacity-80 px-2 md:px-5 max-w-[280px]`}>
                    {subQuestion}
                  </p>
                </div>
            </div>
          </div>

          {/* Footer Area */}
          <div className="w-full mt-auto pt-4 flex flex-col items-center gap-4 relative z-10 antialiased shrink-0">
             <div className="w-full flex justify-between items-center px-1">
               <div className="flex flex-col items-start text-left">
                  <span className={`text-[11px] font-black ${theme.text} uppercase tracking-[0.3em]`}>{lang === 'zh' ? deckName.zh : deckName.en}</span>
                  <p className={`text-[8px] ${theme.text} font-black uppercase tracking-[0.2em] opacity-50 mt-1.5 italic serif-romantic`}>NO. {question.id}</p>
               </div>
               <button 
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  className={`${deckId === 3 ? 'bg-[#d4af37] text-gray-900 shadow-[0_12px_40px_rgba(212,175,55,0.6)]' : 'bg-gray-900 text-white shadow-2xl'} px-6 py-3 md:px-9 md:py-3.5 rounded-2xl font-black transition-all active:scale-90 text-[10px] uppercase tracking-[0.3em] border-none hover:brightness-110 flex items-center gap-2`}
               >
                 <span>{lang === 'zh' ? '下一張' : 'NEXT'}</span>
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
               </button>
             </div>
             
             <div className={`w-10 h-[3px] ${theme.text} opacity-20 rounded-full mt-2`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

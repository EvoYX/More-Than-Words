
import React, { useState, useMemo } from 'react';
import { GameView, Language, Deck, Question } from './types';
import { DECKS as INITIAL_DECKS } from './constants';
import { Card, CardBack, THEMES, FloralPattern, MorningIllustration, HeartIllustration, MasterIllustration } from './components/Card';
import { MantineProvider, Button, Text, Stack, Group, Title, Container, Paper, ActionIcon, Center, Box, Loader, Badge, ThemeIcon, ScrollArea, SimpleGrid, Modal, Drawer } from '@mantine/core';

// --- CUSTOM ICONS ---

const IconGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconClose = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconIcebreaker = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
       <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#f3e5ab" />
             <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
       </defs>
       <path d="M25 35 C 25 25, 75 25, 75 35 V 55 C 75 65, 65 65, 55 65 L 35 75 L 35 65 H 25 C 15 65, 15 55, 15 55 V 35 C 15 25, 25 25, 25 35 Z"
             stroke="url(#goldGrad)" strokeWidth="3" fill="white" fillOpacity="0.05" strokeLinejoin="round"/>
       <path d="M60 45 L 85 45 C 90 45, 90 50, 90 50 V 70 C 90 75, 85 75, 85 75 H 75 V 85 L 60 75 H 55" 
             stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none"/>
       <path d="M45 45 L 45 55 M 40 50 H 50" stroke="#f3e5ab" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// New Ritual Book Icon
const IconRitual = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-2-5-2-5 2-5 2V6z" />
    <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-2-5-2-5 2-5 2V6z" />
    <line x1="12" y1="6" x2="12" y2="20" />
    {/* Floating Star */}
    <path d="M12 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="currentColor" stroke="none" />
  </svg>
);

// --- RULES MODAL ---
const RulesModal: React.FC<{ opened: boolean; onClose: () => void; lang: Language }> = ({ opened, onClose, lang }) => {
  const steps = [
    {
       num: '01',
       title: lang === 'zh' ? '頻率共振' : 'Resonance',
       sub: lang === 'zh' ? '選擇層級' : 'Choose Level',
       desc: lang === 'zh' ? '感受當下的氣氛。是輕鬆的破冰？還是準備好進入深層的靈魂交流？選擇最適合你們的牌組。' : 'Feel the vibe. Is it a casual icebreaker? or are you ready for deep soul connection? Choose the deck that fits.',
       icon: <IconIcebreaker className="w-12 h-12 opacity-80" />
    },
    {
       num: '02',
       title: lang === 'zh' ? '命運指引' : 'Fate',
       sub: lang === 'zh' ? '直覺抽牌' : 'Intuitive Pick',
       desc: lang === 'zh' ? '卡牌會自動洗切。深呼吸，放空思緒，憑直覺點擊一張召喚你的卡片。' : 'Cards shuffle automatically. Breathe deep, clear your mind, and tap the card that calls to you.',
       icon: <IconSparkles className="w-8 h-8 text-[#f3e5ab]" />
    },
    {
       num: '03',
       title: lang === 'zh' ? '靈魂交換' : 'Exchange',
       sub: lang === 'zh' ? '真誠對話' : 'Vulnerability',
       desc: lang === 'zh' ? '輪流回答。重點不在於答案的完美，而在於展現真實的自己。請專注傾聽，不帶評判。' : 'Take turns. It\'s not about the perfect answer, but showing your true self. Listen deeply, without judgment.',
       icon: <div className="text-3xl">💬</div>
    }
  ];

  return (
    <Modal 
       opened={opened} 
       onClose={onClose} 
       withCloseButton={false}
       centered 
       size="md"
       radius="2.5rem" 
       padding={0}
       transitionProps={{ transition: 'fade', duration: 400 }}
       styles={{ 
         content: { backgroundColor: '#0f141e', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 0 40px rgba(0,0,0,0.5)' },
         overlay: { backdropFilter: 'blur(12px)', backgroundColor: 'rgba(5,5,10,0.85)' },
         body: { padding: 0, overflow: 'hidden' }
       }}
    >
       <Box className="relative w-full overflow-hidden flex flex-col max-h-[85vh]">
          {/* Custom Close Button */}
          <ActionIcon 
            variant="transparent" 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-[#d4af37] hover:text-[#f3e5ab] hover:scale-110 transition-all"
            size="lg"
          >
             <IconClose className="w-6 h-6" />
          </ActionIcon>

          {/* Decorative Background Elements */}
          <FloralPattern color="#d4af37" opacity="0.05" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#d4af37]/10 to-transparent pointer-events-none" />
          
          {/* Header */}
          <Stack align="center" gap="xs" pt="2.5rem" pb="1rem" className="relative z-10 shrink-0 pointer-events-none">
             <Text className="gold-text text-[10px] font-black uppercase tracking-[0.4em] opacity-80">
                {lang === 'zh' ? '遊戲儀式' : 'THE RITUAL'}
             </Text>
             <Title order={2} className="text-[#f3e5ab] serif-romantic text-3xl font-medium tracking-wide">
                {lang === 'zh' ? '連結指南' : 'How to Connect'}
             </Title>
             <div className="w-12 h-[1px] bg-[#d4af37] opacity-40 mt-2" />
          </Stack>

          {/* Scrollable Steps - Using div with no-scrollbar class for cleaner look */}
          <div className="flex-1 px-8 py-2 overflow-y-auto no-scrollbar">
             <Stack gap="lg" pb="xl">
                {steps.map((s, i) => (
                   <div key={i} className="group relative pl-4">
                      {/* Connecting Line */}
                      {i !== steps.length - 1 && (
                        <div className="absolute left-[19px] top-12 bottom-[-20px] w-[1px] bg-gradient-to-b from-[#d4af37]/30 to-transparent z-0" />
                      )}
                      
                      <div className="flex gap-5 relative z-10">
                         {/* Number Badge */}
                         <div className="shrink-0 w-10 h-10 rounded-full border border-[#d4af37]/30 bg-[#0a0f18] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:border-[#d4af37] transition-colors duration-500 mt-1">
                            <Text className="text-[#d4af37] font-serif italic text-sm">{s.num}</Text>
                         </div>

                         {/* Content Card */}
                         <div className="flex-1 bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:bg-white/[0.06] transition-all duration-300">
                            <Group justify="space-between" align="start" mb="xs">
                               <Stack gap={2}>
                                  <Text className="text-[#f3e5ab] text-lg font-serif tracking-wide">{s.title}</Text>
                                  <Text className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{s.sub}</Text>
                               </Stack>
                               <div className="opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110">
                                  {s.icon}
                               </div>
                            </Group>
                            <Text className="text-gray-400 text-xs leading-relaxed font-light">
                               {s.desc}
                            </Text>
                         </div>
                      </div>
                   </div>
                ))}
             </Stack>
          </div>

          {/* Footer Action */}
          <div className="p-6 pt-2 shrink-0 relative z-10 bg-gradient-to-t from-[#0f141e] to-transparent">
             <Button 
                fullWidth
                variant="outline" 
                color="yellow" 
                radius="xl" 
                size="lg" 
                onClick={onClose}
                className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10 tracking-[0.2em] uppercase font-bold text-xs h-14"
             >
                {lang === 'zh' ? '開始旅程' : 'BEGIN JOURNEY'}
             </Button>
          </div>
       </Box>
    </Modal>
  );
};

const DeckSelectionBackground: React.FC<{ deckId: number; accent: string }> = ({ deckId, accent }) => {
  const props = {
    primary: accent,
    secondary: 'transparent',
    className: "absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700 rotate-12"
  };

  return (
    <>
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
        <FloralPattern color={accent} />
      </div>
      {deckId === 1 && <MorningIllustration {...props} />}
      {deckId === 2 && <HeartIllustration {...props} />}
      {deckId === 3 && <MasterIllustration {...props} />}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
    </>
  );
};

const DECK_UI_CONFIG: Record<number, any> = {
  1: {
    levelZh: "LEVEL I | 表层之下",
    levelEn: "LEVEL I | Beneath the Surface",
    descZh: "每个人表面上看起来都差不多，但往下一点点，就會發現有趣的地方。从你愿意分享的地方開始，我们慢慢聊。",
    descEn: "Everyone seems similar on the surface, but dig a little deeper and you'll find interesting things. Let's start from what you're comfortable sharing.",
    tagsZh: ["轻松", "破冰", "日常"],
    tagsEn: ["Chill", "Icebreaker", "Casual"],
    color: "blue"
  },
  2: {
    levelZh: "LEVEL II | 渐入内心",
    levelEn: "LEVEL II | Into the Heart",
    descZh: "如果聊到這裡還挺舒服的，那我们可以聊得更真实一點。開始說說你真正在意的事、喜欢的樣子。",
    descEn: "If we're still comfortable, let's get real. Start sharing what you actually care about, what you're really like.",
    tagsZh: ["习惯", "互动", "多懂一點"],
    tagsEn: ["Patterns", "Connection", "Closer"],
    color: "pink"
  },
  3: {
    levelZh: "LEVEL III | 真实的你",
    levelEn: "LEVEL III | The Real You",
    descZh: "这一层是留给願意让对方看到真实樣子的人。不用完美，只要真诚就好。看看我们能不能變成真正懂彼此的人。",
    descEn: "This level is for showing your true self. You don't need to be perfect, just genuine. Let's see if we can truly understand each other.",
    tagsZh: ["真心话", "安全感", "深层"],
    tagsEn: ["Honesty", "Safety", "Deep"],
    color: "yellow"
  }
};

const AppContent: React.FC<{
  view: GameView;
  lang: Language;
  decks: Deck[];
  selectedDeck: Deck | null;
  shufflingDeckId: number | null;
  currentQuestionIndex: number | null;
  revealedIndices: Set<number>;
  history: Question[];
  showHistory: boolean;
  isCardFlipped: boolean;
  isShuffling: boolean;
  isShuffleComplete: boolean;
  isDealing: boolean;
  showLevelUpPrompt: boolean;
  onStart: () => void;
  onSelectDeck: (deck: Deck) => void;
  onStartGame: () => void;
  onPickCard: (index: number) => void;
  onNextCard: () => void;
  onToggleLang: () => void;
  onCardFlip: () => void;
  onBackToLanding: () => void;
  onBackToDeckSelection: () => void;
  onCloseHistory: () => void;
  onOpenHistory: () => void;
  onProceedLevel: () => void;
  onStayLevel: () => void;
  shuffleItems: any[];
  onOpenRules: () => void;
}> = ({
  view, lang, decks, selectedDeck, shufflingDeckId, currentQuestionIndex, revealedIndices,
  history, showHistory, isCardFlipped, isShuffling, isShuffleComplete, isDealing,
  showLevelUpPrompt,
  onStart, onSelectDeck, onStartGame, onPickCard, onNextCard, onToggleLang, onCardFlip,
  onBackToLanding, onBackToDeckSelection, onCloseHistory, onOpenHistory,
  onProceedLevel, onStayLevel, shuffleItems, onOpenRules
}) => {
  if (view === GameView.LANDING) {
    return (
      <Container h="100vh" fluid p={0} className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color="#d4af37" opacity="0.05" />
        
        <div className="absolute top-6 right-6 z-50">
           <Button 
             variant="white" 
             color="dark" 
             radius="xl" 
             size="md"
             onClick={onToggleLang}
             leftSection={<IconGlobe className="w-5 h-5" />}
             className="shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
             styles={{ label: { fontWeight: 800, color: '#333' } }}
           >
             {lang === 'zh' ? 'English' : '中文'}
           </Button>
        </div>
        
        <Stack h="100%" justify="center" align="center" gap="xl" className="relative z-10 w-full px-6">
           <Stack align="center" gap="xs" className="animate-fadeIn">
              <div className="mb-6 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] rotate-[-4deg] scale-[0.85]"><div className="w-48 h-72 relative"><CardBack theme={THEMES[3]} deckId={3} lang={lang} /></div></div>
              {/* Increased font size for title */}
              <Text className="gold-text uppercase italic serif-romantic" size="sm" lts="0.5em" fw={300}>Deeply Knowing You</Text>
              <Title order={1} className="gold-text text-center serif-romantic text-4xl">{lang === 'zh' ? '深刻地認識你' : 'Deeply Knowing You'}</Title>
           </Stack>

           <Stack gap="md" align="center" className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {/* Increased font size for Start button */}
              <Button variant="filled" color="dark" size="xl" radius="xl" onClick={onStart} className="border border-[#d4af37]/30 shadow-2xl bg-[#0a0f18]" styles={{ label: { fontSize: '14px', letterSpacing: '0.4em', fontWeight: 900, color: '#f3e5ab' }, root: { height: '60px', paddingLeft: '40px', paddingRight: '40px' } }}>
                 {lang === 'zh' ? '開 啟 旅 程' : 'BEGIN JOURNEY'}
              </Button>
              {/* Increased font size for Rules button and changed Icon */}
              <Button 
                variant="subtle" 
                color="yellow" 
                onClick={onOpenRules}
                leftSection={<IconRitual className="w-5 h-5" />}
                styles={{ label: { fontSize: '13px', letterSpacing: '0.1em', fontWeight: 700, color: '#f3e5ab' } }}
                className="hover:bg-white/5"
              >
                {lang === 'zh' ? '玩法說明' : 'How to Play'}
              </Button>
           </Stack>
        </Stack>
      </Container>
    );
  }

  if (view === GameView.DECK_SELECTION) {
    const activeTheme = THEMES[shufflingDeckId || 3] || THEMES[3];
    if (isShuffling || isShuffleComplete) {
      return (
        <Container h="100vh" fluid p="xl" className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
          <FloralPattern color={activeTheme.accent} opacity="0.05" />
          
          <div className="absolute top-6 right-6 z-50">
             <Button 
               variant="white" 
               color="dark" 
               radius="xl" 
               size="md"
               onClick={onToggleLang}
               leftSection={<IconGlobe className="w-5 h-5" />}
               className="shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
               styles={{ label: { fontWeight: 800, color: '#333' } }}
             >
               {lang === 'zh' ? 'English' : '中文'}
             </Button>
          </div>

          <Stack align="center" gap="lg" className="animate-fadeIn w-full relative z-20 h-full justify-center">
            <Box className="perspective-2000 transform-style-3d relative w-full h-[320px] flex items-center justify-center overflow-visible py-4">
              <Box className={`absolute w-48 h-64 z-10 transition-all duration-500 rounded-[2rem] ${isShuffleComplete ? 'shadow-[0_0_50px_rgba(255,255,255,0.2)] scale-105' : ''}`}>
                <CardBack theme={activeTheme} deckId={shufflingDeckId || 3} minimal={!isShuffleComplete} lang={lang} />
              </Box>
              {isShuffling && shuffleItems.map((_, index) => (
                  <div 
                    key={index}
                    className="absolute w-48 h-64 shadow-xl rounded-[2rem] overflow-hidden bg-transparent"
                    style={{
                      zIndex: index, 
                      animation: `shuffle-layer 0.5s ease-in-out infinite`,
                      animationDelay: `${index * 0.08}s`,
                      left: 'calc(50% - 96px)', 
                    }}
                  >
                     <CardBack theme={activeTheme} deckId={shufflingDeckId || 3} minimal={true} lang={lang} />
                  </div>
              ))}
            </Box>
            <Stack align="center" gap="xs" className="mt-2">
              {isShuffling ? <Text className="gold-text uppercase font-black animate-pulse" lts="0.8em" size="xs">{lang === 'zh' ? '洗牌中...' : 'SHUFFLING...'}</Text> : 
                <Stack align="center" gap="md" className="animate-fadeIn">
                  <Text className="text-[#f3e5ab] uppercase font-black" lts="0.5em" size="xs">{lang === 'zh' ? '洗牌完成' : 'SHUFFLE COMPLETE'}</Text>
                  <Button size="lg" radius="xl" variant="outline" color="yellow" onClick={onStartGame} className="border-[#d4af37] text-[#d4af37] px-10 animate-bounce shadow-[0_0_40px_rgba(212,175,55,0.4)]" styles={{ label: { letterSpacing: '0.2em', fontWeight: 900 } }}>
                      {lang === 'zh' ? '點擊擺牌' : 'TAP TO SPREAD'}
                  </Button>
                  <Button variant="transparent" color="gray" size="xs" onClick={onBackToDeckSelection}>{lang === 'zh' ? '更換卡組' : 'Change Deck'}</Button>
                </Stack>
              }
            </Stack>
          </Stack>
          <style>{`
            @keyframes shuffle-layer {
              0% { transform: translate(0, 0); z-index: 1; }
              50% { transform: translate(40px, -5px) rotate(3deg); z-index: 1; }
              51% { z-index: 20; }
              100% { transform: translate(0, 0); z-index: 20; }
            }
          `}</style>
        </Container>
      );
    }

    return (
      <Container h="100vh" fluid p={0} className="flex flex-col relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color="#d4af37" opacity="0.05" />
        
        <div className="absolute top-6 right-6 z-50">
           <Button 
             variant="white" 
             color="dark" 
             radius="xl" 
             size="md"
             onClick={onToggleLang}
             leftSection={<IconGlobe className="w-5 h-5" />}
             className="shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
             styles={{ label: { fontWeight: 800, color: '#333' } }}
           >
             {lang === 'zh' ? 'English' : '中文'}
           </Button>
        </div>

        {/* Full Height Flex Column Layout */}
        <div className="flex flex-col h-full w-full max-w-lg mx-auto z-10 px-4">
            {/* Header (Shrinkable) */}
            <div className="shrink-0 py-6 pt-10 text-center animate-fadeIn">
              <Title order={2} className="gold-text italic serif-romantic text-3xl">Deeply Knowing You</Title>
              <Text className="gold-text text-xs font-bold uppercase tracking-[0.2em] opacity-60 mt-1">{lang === 'zh' ? '選擇你的旅程' : 'Choose Your Journey'}</Text>
            </div>

            {/* Decks - Flexible Space, Centered Content if fits */}
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center py-2 animate-fadeIn">
                <Stack gap="md" className="w-full">
                  {decks.map(deck => {
                    const ui = DECK_UI_CONFIG[deck.id] || DECK_UI_CONFIG[1];
                    return (
                      <Paper 
                        key={deck.id} 
                        onClick={() => onSelectDeck(deck)} 
                        p="lg" 
                        radius="2rem" 
                        className={`cursor-pointer border transition-all duration-300 group relative overflow-hidden shadow-2xl hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] active:scale-95 ${deck.id === 3 ? 'bg-gray-900/80 border-[#d4af37]/40' : 'bg-white/5 border-white/10'}`}
                      >
                        <DeckSelectionBackground deckId={deck.id} accent={THEMES[deck.id]?.accent || '#fff'} />
                        <Stack gap="xs" className="relative z-10">
                          <Group justify="space-between" align="center" wrap="nowrap">
                             <Text className={`font-black text-lg ${deck.id === 3 ? 'text-[#f3e5ab]' : 'text-white'}`}>{lang === 'zh' ? ui.levelZh : ui.levelEn}</Text>
                             {deck.id === 3 && <IconSparkles className="w-5 h-5 text-[#f3e5ab] animate-pulse" />}
                          </Group>
                          <Text className="text-gray-300 text-xs leading-relaxed font-medium line-clamp-2">{lang === 'zh' ? ui.descZh : ui.descEn}</Text>
                        </Stack>
                      </Paper>
                    );
                  })}
                  
                  {/* Hints Card - Compact */}
                  <Paper p="xs" radius="xl" className="bg-[#f3e5ab]/5 border border-[#f3e5ab]/10 w-full cursor-pointer hover:bg-[#f3e5ab]/10 transition-colors" onClick={onOpenRules}>
                     <Group justify="center" gap="xs">
                        <IconRitual className="w-4 h-4 text-[#f3e5ab]" />
                        <Text className="text-[#f3e5ab] font-bold text-xs uppercase tracking-widest">{lang === 'zh' ? '點擊查看玩法' : 'How to Play'}</Text>
                     </Group>
                  </Paper>
                </Stack>
            </div>

            {/* Footer - Shrinkable */}
            <div className="shrink-0 py-6 text-center animate-fadeIn">
                <Button variant="transparent" color="gray" onClick={onBackToLanding} size="sm" className="opacity-60 hover:opacity-100 transition-opacity">
                   {lang === 'zh' ? '返 回 首 頁' : 'BACK TO HOME'}
                </Button>
            </div>
        </div>
      </Container>
    );
  }

  if (view === GameView.GAMEPLAY) {
    const activeTheme = THEMES[selectedDeck?.id || 3];
    const isMaxLevel = selectedDeck?.id === 3;

    return (
      <Container h="100vh" fluid p="0" className="flex flex-col items-center justify-start relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color={activeTheme.accent} opacity="0.05" />
        
        {/* Header Bar */}
        <Box p="md" className="w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5 shrink-0">
          <Group justify="space-between" className="w-full max-w-sm mx-auto">
            <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={onBackToDeckSelection} className="bg-white/5 border border-white/10"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></ActionIcon>
            <Stack gap={0} align="center">
               <Text className="gold-text font-black italic uppercase serif-romantic" size="xs" lts="0.2em">{selectedDeck?.name[lang]}</Text>
               <Text size="8px" c="dimmed" fw={700} lts="0.1em">{currentQuestionIndex !== null ? 'REVEALED' : `${selectedDeck?.questions.length - revealedIndices.size} CARDS REMAINING`}</Text>
            </Stack>
            <Group gap="xs">
                <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={onToggleLang} className="bg-white/5 border border-white/10">
                    <IconGlobe className="w-5 h-5" />
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={onOpenHistory} className="bg-white/5 border border-white/10"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></ActionIcon>
            </Group>
          </Group>
        </Box>

        {currentQuestionIndex === null ? (
          /* Card Selection Grid with DEALING animation */
          <div className="flex-1 w-full overflow-y-auto no-scrollbar p-6">
            <Container size="sm" py="xl">
               <Center mb="xl">
                  <Stack align="center" gap={4}>
                    <Text ta="center" className="gold-text font-black uppercase tracking-[0.4em]" size="sm">
                      {lang === 'zh' ? '由 命 運 選 擇' : 'CHOSEN BY FATE'}
                    </Text>
                    <Text ta="center" c="dimmed" size="xs" className="italic opacity-60">
                      {lang === 'zh' ? '從牌盤中挑選一張最有感覺的卡片' : 'Pick a card from the table that speaks to you'}
                    </Text>
                  </Stack>
               </Center>
               <SimpleGrid cols={{ base: 2, xs: 3 }} spacing="xl" verticalSpacing="xl" className="pb-32">
                  {selectedDeck?.questions.map((q, idx) => {
                    const isRevealed = revealedIndices.has(idx);
                    return (
                      <Box 
                        key={idx} 
                        className={`transition-all duration-300 perspective-2000 ${isRevealed ? '' : 'cursor-pointer hover:scale-105 active:scale-90 hover:-translate-y-2'}`}
                        style={{ 
                          animation: revealedIndices.size === 0 ? 'spread-card 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                          animationDelay: `${idx * 0.05}s`
                        }}
                        onClick={() => !isRevealed && onPickCard(idx)}
                      >
                         <div className={`relative w-full aspect-[2/3] max-w-[120px] mx-auto transform-style-3d transition-transform duration-700 ${isRevealed ? 'rotate-y-180' : ''}`}>
                            {/* Face Down (Back) */}
                            <div className="absolute inset-0 backface-hidden">
                               <CardBack theme={activeTheme} deckId={selectedDeck.id} minimal={true} lang={lang} />
                            </div>
                            {/* Face Up (Already Answered) */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2rem] bg-[#fffcf5] border-2 flex items-center justify-center p-3 overflow-hidden shadow-inner" style={{ borderColor: activeTheme.accent }}>
                               <FloralPattern color={activeTheme.accent} opacity="0.08" />
                               <Stack gap={2} align="center" className="w-full h-full justify-center relative z-10">
                                  <Text size="xs" c="dark.8" ta="center" className="line-clamp-4 font-serif leading-relaxed text-[10px] font-bold opacity-80" style={{ color: '#1f2937' }}>
                                     {q.text[lang]}
                                  </Text>
                                  <div className="mt-1 w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: activeTheme.accent }}></div>
                                </Stack>
                            </div>
                         </div>
                      </Box>
                    );
                  })}
               </SimpleGrid>
            </Container>
          </div>
        ) : (
          /* Focused revealed card - NO SCROLL */
          <div className="flex-1 w-full flex flex-col items-center justify-center relative px-6 z-10 overflow-hidden pb-10">
            <div className={`w-full transform-style-3d ${isDealing ? 'card-cinema-entrance' : ''}`}>
              {selectedDeck && (
                <Card 
                  question={selectedDeck.questions[currentQuestionIndex]} 
                  lang={lang} 
                  onNext={onNextCard} 
                  isFlipped={isCardFlipped} 
                  onClick={onCardFlip} 
                  deckName={selectedDeck.name} 
                  deckId={selectedDeck.id} 
                />
              )}
            </div>
            
            {/* Back button integrated into layout or floated */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
               <Button 
                  variant="subtle" 
                  color="gray" 
                  onClick={onNextCard}
                  styles={{ label: { letterSpacing: '0.2em', fontWeight: 800 } }}
                  className="hover:bg-white/5"
               >
                  {lang === 'zh' ? '← 返回牌盤' : '← BACK TO TABLE'}
               </Button>
            </div>
          </div>
        )}

        {/* Ascension / Reflection Modal */}
        <Modal 
          opened={showLevelUpPrompt} 
          onClose={onStayLevel} 
          centered 
          withCloseButton={false} 
          radius="2rem"
          padding={0}
          transitionProps={{ transition: 'slide-up' }}
          styles={{ 
            root: { zIndex: 9999 },
            content: { backgroundColor: '#0a0f18', border: `1px solid ${activeTheme.accent}40`, overflow: 'hidden', maxWidth: '340px' },
            overlay: { backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.85)' },
            inner: { padding: '20px' }
          }}
        >
          <Box className="relative p-10 flex flex-col items-center">
            <FloralPattern color={activeTheme.accent} opacity="0.1" />
            <ThemeIcon variant="light" color={activeTheme.accent} size={64} radius="xl" mb="md" className="bg-white/5">
              <IconSparkles className="w-8 h-8" />
            </ThemeIcon>
            
            <Title order={2} className="gold-text serif-romantic text-center mb-2" size="1.6rem">
              {lang === 'zh' ? (isMaxLevel ? '靈魂的共鳴' : '感受到火花了嗎？') : (isMaxLevel ? 'Soul Resonance' : 'Feel the Spark?')}
            </Title>
            
            <Text c="dimmed" ta="center" size="sm" className="leading-relaxed mb-8 px-2">
               {isMaxLevel 
                 ? (lang === 'zh' ? '你已經到達了靈魂對話的最高境界。可以繼續在此探索更多問題，或是休息一下，沈澱剛才的對話。' : 'You have reached the peak of connection. Continue exploring here or take a break to reflect.')
                 : (lang === 'zh' ? `你們的互動非常精彩！準備好進入下一階段，更深層地認識對方嗎？` : `Great chemistry! Ready to enter the next level and know each other deeper?`)
               }
            </Text>

            <Stack gap="sm" w="100%">
              {!isMaxLevel && (
                <Button 
                  fullWidth 
                  radius="xl" 
                  size="lg" 
                  color="yellow" 
                  onClick={onProceedLevel}
                  className="bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-gray-900 border-none animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  styles={{ label: { fontWeight: 900, letterSpacing: '0.1em' } }}
                >
                  {lang === 'zh' ? '進 入 下 一 階 段' : 'GO DEEPER'}
                </Button>
              )}
              
              <Button 
                fullWidth 
                radius="xl" 
                size="lg" 
                variant={isMaxLevel ? "outline" : "outline"} 
                color={isMaxLevel ? "yellow" : "gray"}
                onClick={onStayLevel}
                styles={{ label: { fontWeight: 800 } }}
                className={isMaxLevel ? "border-[#d4af37] text-[#d4af37]" : ""}
              >
                {lang === 'zh' ? (isMaxLevel ? '繼續探索此層級' : '留在這一層') : (isMaxLevel ? 'CONTINUE EXPLORING' : 'STAY IN CURRENT LEVEL')}
              </Button>

              <Button 
                variant="transparent" 
                color="gray" 
                size="xs" 
                onClick={onBackToLanding}
                className="mt-2"
              >
                {lang === 'zh' ? '返回首頁' : 'BACK TO HOME'}
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* History Drawer */}
        <Drawer 
            opened={showHistory} 
            onClose={onCloseHistory} 
            title={<Text className="serif-romantic font-bold text-lg text-gray-800">{lang === 'zh' ? '對話旅程' : 'Journey So Far'}</Text>}
            position="right"
            size="md"
            styles={{ 
                body: { backgroundColor: '#fffcf9', padding: 0 }, 
                header: { backgroundColor: '#fffcf9', borderBottom: '1px solid #f3f4f6' },
                content: { backgroundColor: '#fffcf9' }
            }}
        >
            <div className="h-[calc(100vh-60px)] overflow-y-auto no-scrollbar">
                <Stack p="md" gap="md">
                    <FloralPattern color={activeTheme.accent} opacity="0.05" />
                    {history.length === 0 ? (
                        <Center h={200}>
                            <Text c="dimmed" fs="italic" size="sm">{lang === 'zh' ? '尚未有對話記錄' : 'No cards revealed yet.'}</Text>
                        </Center>
                    ) : (
                        history.slice().reverse().map((q, i) => (
                            <Paper key={i} p="md" radius="lg" className="border border-gray-100 shadow-sm relative overflow-hidden bg-white">
                                <Box className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: THEMES[q.deckId || 3].accent }} />
                                <Text size="xs" c="dimmed" fw={700} className="uppercase tracking-widest mb-2" style={{ color: THEMES[q.deckId || 3].accent }}>
                                    {q.deckId === 1 ? 'LEVEL I' : q.deckId === 2 ? 'LEVEL II' : 'LEVEL III'}
                                </Text>
                                <Text size="sm" c="dark.8" fw={600} className="leading-relaxed font-serif mb-1">
                                    {q.text[lang]}
                                </Text>
                            </Paper>
                        ))
                    )}
                </Stack>
            </div>
        </Drawer>

      </Container>
    );
  }

  return null;
};

const App: React.FC = () => {
  const [view, setView] = useState<GameView>(GameView.LANDING);
  const [lang, setLang] = useState<Language>('zh');
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [shufflingDeckId, setShufflingDeckId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShuffleComplete, setIsShuffleComplete] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [showLevelUpPrompt, setShowLevelUpPrompt] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  const shuffleItems = useMemo(() => Array.from({ length: 5 }).map((_, i) => i), []);

  const handleSelectDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setShufflingDeckId(deck.id);
    setRevealedIndices(new Set());
    setCurrentQuestionIndex(null);
    setIsShuffling(true);
    setIsShuffleComplete(false);
    
    setTimeout(() => {
        setIsShuffling(false);
        setIsShuffleComplete(true);
    }, 3000);
  };

  const handleStartGame = () => {
      setView(GameView.GAMEPLAY);
      setIsDealing(true);
      setTimeout(() => setIsDealing(false), 800);
  };

  const handlePickCard = (idx: number) => {
      setCurrentQuestionIndex(idx);
      setIsCardFlipped(false);
      
      // Update revealed indices immediately when card is picked
      setRevealedIndices(prev => {
          const next = new Set(prev);
          next.add(idx);
          return next;
      });

      if (selectedDeck) {
          const q = selectedDeck.questions[idx];
          setHistory(prev => {
              if (prev.find(x => x.id === q.id)) return prev;
              return [...prev, q];
          });
      }
  };

  const handleNextCard = () => {
      // Logic moved here: Check threshold only when user is done reading and clicks Next
      const count = revealedIndices.size;
      
      // Close the current card view first
      setCurrentQuestionIndex(null);
      setIsCardFlipped(false);

      if (selectedDeck) {
         // Calculate threshold: approx 1/3 of deck size. 
         // Example: 20 cards -> threshold 7. Popups at 7, 14.
         const threshold = Math.ceil(selectedDeck.questions.length / 3);
         
         // Show popup if we hit a threshold, but not if it's the very last card (optional preference, usually good to show completion at end but user asked for 1/3s)
         if (count > 0 && count % threshold === 0) {
            // Add a small delay so the transition back to table happens, then the modal appears
            setTimeout(() => {
                setShowLevelUpPrompt(true);
            }, 500);
         }
      }
  };

  const handleProceedLevel = () => {
      setShowLevelUpPrompt(false);
      if (selectedDeck && selectedDeck.id < 3) {
          const nextId = selectedDeck.id + 1;
          const nextDeck = decks.find(d => d.id === nextId);
          if (nextDeck) {
              handleSelectDeck(nextDeck);
              setView(GameView.DECK_SELECTION);
          }
      }
  };

  // Fixed Handler: Fully resets state when changing deck during/after shuffle
  const handleBackToDeckSelection = () => {
    setView(GameView.DECK_SELECTION);
    setSelectedDeck(null);
    setIsShuffling(false);
    setIsShuffleComplete(false);
    setShufflingDeckId(null);
    setShowLevelUpPrompt(false);
  };

  return (
    <MantineProvider>
       <AppContent 
          view={view}
          lang={lang}
          decks={decks}
          selectedDeck={selectedDeck}
          shufflingDeckId={shufflingDeckId}
          currentQuestionIndex={currentQuestionIndex}
          revealedIndices={revealedIndices}
          history={history}
          showHistory={showHistory}
          isCardFlipped={isCardFlipped}
          isShuffling={isShuffling}
          isShuffleComplete={isShuffleComplete}
          isDealing={isDealing}
          showLevelUpPrompt={showLevelUpPrompt}
          shuffleItems={shuffleItems}
          
          onStart={() => setView(GameView.DECK_SELECTION)}
          onSelectDeck={handleSelectDeck}
          onStartGame={handleStartGame}
          onPickCard={handlePickCard}
          onNextCard={handleNextCard}
          onToggleLang={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
          onCardFlip={() => setIsCardFlipped(f => !f)}
          onBackToLanding={() => { setView(GameView.LANDING); }}
          onBackToDeckSelection={handleBackToDeckSelection}
          onCloseHistory={() => setShowHistory(false)}
          onOpenHistory={() => setShowHistory(true)}
          onProceedLevel={handleProceedLevel}
          onStayLevel={() => setShowLevelUpPrompt(false)}
          onOpenRules={() => setShowRules(true)}
       />
       <RulesModal opened={showRules} onClose={() => setShowRules(false)} lang={lang} />
    </MantineProvider>
  );
};

export default App;

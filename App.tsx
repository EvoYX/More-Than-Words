
import React, { useState, useMemo, useEffect } from 'react';
import { GameView, Language, Deck, Question, Project } from './types';
import { DECKS as INITIAL_DECKS } from './constants';
import { Card, CardBack, THEMES, FloralPattern, MorningIllustration, HeartIllustration, MasterIllustration } from './components/Card';
import { AdminPage } from './components/AdminPage';
import { LoveMBTI } from './components/LoveMBTI';
import { fetchDecks, updateDeckQuestions } from './services/apiService';
import { MantineProvider, Button, Text, Stack, Group, Title, Container, Paper, ActionIcon, Center, Box, Loader, Badge, ThemeIcon, ScrollArea } from '@mantine/core';

// --- CUSTOM ICONS (No Emojis) ---

const IconGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
       {/* Stylized Chat Bubbles */}
       <path d="M25 35 C 25 25, 75 25, 75 35 V 55 C 75 65, 65 65, 55 65 L 35 75 L 35 65 H 25 C 15 65, 15 55, 15 55 V 35 C 15 25, 25 25, 25 35 Z"
             stroke="url(#goldGrad)" strokeWidth="3" fill="white" fillOpacity="0.05" strokeLinejoin="round"/>
       <path d="M60 45 L 85 45 C 90 45, 90 50, 90 50 V 70 C 90 75, 85 75, 85 75 H 75 V 85 L 60 75 H 55" 
             stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none"/>
       {/* Sparkle details */}
       <path d="M45 45 L 45 55 M 40 50 H 50" stroke="#f3e5ab" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const IconLove = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
       <defs>
          <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#fbc2eb" />
             <stop offset="100%" stopColor="#a6c1ee" />
          </linearGradient>
       </defs>
       {/* Stylized Heart Puzzle */}
       <path d="M50 85 C 50 85, 20 60, 20 40 C 20 25, 35 15, 50 25 C 65 15, 80 25, 80 40 C 80 60, 50 85, 50 85 Z"
             stroke="url(#pinkGrad)" strokeWidth="3" fill="white" fillOpacity="0.05" strokeLinejoin="round"/>
       {/* Inner Lines */}
       <path d="M50 25 V 50 M 35 35 C 35 35, 45 35, 50 40" stroke="url(#pinkGrad)" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
       <circle cx="65" cy="40" r="3" fill="#fbc2eb" opacity="0.8" />
    </svg>
  </div>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconLightbulb = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

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
    levelZh: "LEVEL I | 輕鬆聊聊",
    levelEn: "LEVEL I | Just Chatting",
    descZh: "剛認識對方嗎？沒關係，先從小話題開始吧～ 聊聊喜好、趣事、生活小細節，輕鬆又自在，沒有壓力。",
    descEn: "Just met? Start with small talk! Chat about hobbies, fun facts, and life details. Relaxed and pressure-free.",
    tagsZh: ["第一次見面", "破冰", "剛認識的朋友"],
    tagsEn: ["First Meeting", "Icebreaker", "New Friends"],
    color: "blue"
  },
  2: {
    levelZh: "LEVEL II | 慢慢靠近",
    levelEn: "LEVEL II | Getting Closer",
    descZh: "覺得對方有趣、想更了解她/他嗎？這一層的問題會慢慢觸碰心裡的想法、價值觀和小秘密，讓你們的距離自然拉近。",
    descEn: "Want to get closer? These questions touch on inner thoughts, values, and secrets to naturally bridge the gap.",
    tagsZh: ["曖昧中", "朋友升溫", "互動已熟悉"],
    tagsEn: ["Dating", "Deepening Friendship", "Getting Close"],
    color: "pink"
  },
  3: {
    levelZh: "LEVEL III | 真正懂你",
    levelEn: "LEVEL III | Truly Know You",
    descZh: "已經建立信任了嗎？這一層問題會深入內心世界、過去經驗與未來渴望。不是為了答對，而是為了真正理解對方。",
    descEn: "Trust established? Dive into the inner world, past experiences, and future desires. It's about truly understanding.",
    tagsZh: ["穩定關係", "深度對話", "心靈連結"],
    tagsEn: ["Stable Relationship", "Deep Talk", "Soul Connection"],
    color: "yellow"
  }
};

const AppContent: React.FC<{
  loading: boolean;
  view: GameView;
  lang: Language;
  decks: Deck[];
  selectedDeck: Deck | null;
  shufflingDeckId: number | null;
  currentQuestionIndex: number;
  history: Question[];
  showHistory: boolean;
  isCardFlipped: boolean;
  isShuffling: boolean;
  isShuffleComplete: boolean;
  isDealing: boolean;
  activeProject: Project | null;
  onSelectProject: (p: Project | null) => void;
  onStart: () => void;
  onSelectDeck: (deck: Deck) => void;
  onStartGame: () => void;
  onNextCard: () => void;
  onToggleLang: () => void;
  onCardFlip: () => void;
  onBackToLanding: () => void;
  onBackToDeckSelection: () => void;
  onCloseHistory: () => void;
  onOpenHistory: () => void;
  onOpenAdmin: () => void;
  onAddQuestion: (deckId: number, zh: string, en: string) => void;
  shuffleItems: any[];
}> = ({
  loading, view, lang, decks, selectedDeck, shufflingDeckId, currentQuestionIndex,
  history, showHistory, isCardFlipped, isShuffling, isShuffleComplete, isDealing,
  activeProject, onSelectProject,
  onStart, onSelectDeck, onStartGame, onNextCard, onToggleLang, onCardFlip,
  onBackToLanding, onBackToDeckSelection, onCloseHistory, onOpenHistory, onOpenAdmin, onAddQuestion, shuffleItems
}) => {
  if (loading) {
    return (
      <Center h="100vh" bg="#0a0f18">
        <Stack align="center" gap="md">
          <Loader color="#d4af37" size="xl" type="dots" />
          <Text className="gold-text uppercase font-black" lts="0.3em" size="xs">Loading Universe...</Text>
        </Stack>
      </Center>
    );
  }

  // Passing lang and onToggleLang down to MBTI component
  if (activeProject === Project.MBTI) {
    return <LoveMBTI onBack={() => onSelectProject(null)} lang={lang} onToggleLang={onToggleLang} />;
  }

  // Main Landing Page with Redesigned Cards
  if (!activeProject) {
    return (
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
        <FloralPattern color="#d4af37" opacity="0.03" />
        
        {/* Highly Visible Language Toggle */}
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

        <ActionIcon variant="transparent" color="gray" className="absolute top-6 left-6 z-50 opacity-30 hover:opacity-100" onClick={onOpenAdmin}>
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </ActionIcon>

        <Stack align="center" gap="xl" className="z-10 w-full max-w-lg px-6 animate-fadeIn py-12 overflow-y-auto no-scrollbar max-h-screen">
          <Box className="text-center mb-2 shrink-0">
             <Title order={1} className="gold-text text-center serif-romantic text-4xl mb-3 drop-shadow-md">
               {lang === 'zh' ? '深刻地認識你' : 'Deeply Knowing You'}
             </Title>
             <Text c="dimmed" ta="center" size="sm" className="italic opacity-80 text-orange-100">
               {lang === 'zh' ? '開啟你的靈魂對話旅程' : 'Unlock deep conversations and discover your soul connections'}
             </Text>
          </Box>

          <Stack gap="xl" w="100%">
            
            {/* Icebreaker Project Card */}
            <Paper 
                p="xl" 
                radius="2rem" 
                className="bg-gradient-to-br from-[#1a202c] to-[#000000] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all cursor-pointer w-full group overflow-hidden relative shadow-2xl hover:shadow-[#d4af37]/20" 
                onClick={() => onSelectProject(Project.ICEBREAKER)}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/5 rounded-bl-[50%] pointer-events-none transition-transform group-hover:scale-110" />
              <Stack gap="md">
                 <Group wrap="nowrap" align="center">
                    <Box className="w-14 h-14 p-2 bg-[#d4af37]/10 rounded-2xl border border-[#d4af37]/20 flex items-center justify-center">
                       <IconIcebreaker className="w-10 h-10 drop-shadow-lg" />
                    </Box>
                    <Title order={3} className="text-[#f3e5ab] serif-romantic text-2xl">
                       {lang === 'zh' ? '深刻對話卡牌' : 'Deep Talk Card Game'}
                    </Title>
                 </Group>
                 
                 <Text size="sm" c="dimmed" className="leading-relaxed text-gray-300">
                   {lang === 'zh' 
                     ? '告別尬聊！透過三個層級的精心問題，從輕鬆聊天到深度理解，慢慢拉近彼此距離，發現對方不為人知的一面。' 
                     : 'Say goodbye to awkward silence! Through 3 levels of curated questions, journey from casual chat to deep understanding, discovering hidden sides of each other.'}
                 </Text>

                 <Group gap="xs" mt="xs">
                   {(lang === 'zh' 
                      ? ['初見也能自然聊開', '曖昧期慢慢靠近', '信任之後真正懂你']
                      : ['Natural First Meetings', 'Get Closer Gently', 'True Understanding']
                   ).map((tag, i) => (
                      <Badge key={i} variant="outline" color="yellow" className="normal-case font-medium tracking-wide border-[#d4af37]/40 text-[#f3e5ab]">
                        {tag}
                      </Badge>
                   ))}
                 </Group>
              </Stack>
            </Paper>

            {/* MBTI Project Card */}
            <Paper 
                p="xl" 
                radius="2rem" 
                className="bg-gradient-to-br from-[#1a202c] to-[#000000] border border-pink-500/20 hover:border-pink-400 transition-all cursor-pointer w-full group overflow-hidden relative shadow-2xl hover:shadow-pink-500/20" 
                onClick={() => onSelectProject(Project.MBTI)}
            >
               <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/5 rounded-bl-[50%] pointer-events-none transition-transform group-hover:scale-110" />
               <Stack gap="md">
                 <Group wrap="nowrap" align="center">
                    <Box className="w-14 h-14 p-2 bg-pink-500/10 rounded-2xl border border-pink-500/20 flex items-center justify-center">
                       <IconLove className="w-10 h-10 drop-shadow-lg" />
                    </Box>
                    <Title order={3} className="text-pink-200 serif-romantic text-2xl">
                       {lang === 'zh' ? '戀愛人格測驗' : 'Love Personality Quiz'}
                    </Title>
                 </Group>
                 
                 <Text size="sm" className="text-gray-300 leading-relaxed">
                    {lang === 'zh'
                      ? '你是哪種戀人？結合心理學與 AI 分析，揭示你的愛情原型、戀愛強項與地雷，還能看到和你最合拍的戀人類型。'
                      : 'What kind of lover are you? AI-powered insights reveal your romantic archetype, strengths, and deal-breakers, plus your most compatible matches.'}
                 </Text>

                 <Group gap="xs" mt="xs">
                   {(lang === 'zh' 
                      ? ['快速了解戀愛風格', '戀愛命定契合度', '找到心動對象']
                      : ['Discover Love Style', 'Reveal Compatibility', 'Find Your Match']
                   ).map((tag, i) => (
                      <Badge key={i} variant="outline" color="pink" className="normal-case font-medium tracking-wide border-pink-400/40 text-pink-200">
                        {tag}
                      </Badge>
                   ))}
                 </Group>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Container>
    );
  }

  const currentQuestion = selectedDeck?.questions[currentQuestionIndex];

  if (view === GameView.LANDING) {
    // This is the "Sub-landing" for the Icebreaker game specifically
    return (
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color="#d4af37" opacity="0.05" />
        <ActionIcon variant="transparent" color="gray" className="absolute top-6 left-6 opacity-50 hover:opacity-100 z-50" size="lg" onClick={() => onSelectProject(null)}>
          <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </ActionIcon>
        
        {/* Restored Admin Access Button for this sub-project */}
        <ActionIcon variant="transparent" color="gray" className="absolute top-6 right-6 z-50 opacity-30 hover:opacity-100" onClick={onOpenAdmin}>
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </ActionIcon>
        
        <Stack align="center" gap="xs" className="relative z-10 w-full max-w-sm px-10">
          <div className="mb-4 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] rotate-[-4deg] scale-[0.9]"><div className="w-52 h-80 relative"><CardBack theme={THEMES[3]} deckId={3} lang={lang} /></div></div>
          <Text className="gold-text uppercase italic serif-romantic" size="xs" lts="0.5em" fw={300}>Deeply Knowing You</Text>
          <Title order={1} className="gold-text text-center serif-romantic" size="2.5rem">{lang === 'zh' ? '深刻地認識你' : 'Deeply Knowing You'}</Title>
        </Stack>
        <Stack gap="md" className="w-full max-w-[240px] z-10 mt-10">
          <Button variant="filled" color="dark" size="xl" radius="xl" onClick={onStart} className="border border-[#d4af37]/30 shadow-2xl bg-[#0a0f18]" styles={{ label: { fontSize: '12px', letterSpacing: '0.4em', fontWeight: 900, color: '#f3e5ab' }, root: { height: '60px' } }}>
             {lang === 'zh' ? '開 啟 旅 程' : 'BEGIN JOURNEY'}
          </Button>
          
          <Center>
             <Button 
                variant="subtle" 
                color="gray" 
                onClick={onToggleLang} 
                className="hover:bg-white/5"
                styles={{ label: { fontSize: '11px', letterSpacing: '0.2em', fontWeight: 700 } }}
             >
                {lang === 'zh' ? 'Switch to English' : '切換至中文'}
             </Button>
          </Center>
        </Stack>
      </Container>
    );
  }

  if (view === GameView.DECK_SELECTION) {
    const activeTheme = THEMES[shufflingDeckId || 3] || THEMES[3];
    if (isShuffling || isShuffleComplete) {
      return (
        <Container h="100%" fluid p="xl" className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
          <FloralPattern color={activeTheme.accent} opacity="0.05" />
          <Stack align="center" gap="lg" className="animate-fadeIn w-full relative z-20 h-full justify-center">
            {/* Reduce container height from 500px to 320px to prevent cutoff */}
            <Box className="perspective-2000 transform-style-3d relative w-full h-[320px] flex items-center justify-center overflow-visible py-4">
              
              {/* Central Pile - Always Visible */}
              <Box className={`absolute w-48 h-64 z-10 transition-all duration-500 ${isShuffleComplete ? 'shadow-[0_0_50px_rgba(255,255,255,0.2)] scale-105' : ''}`}>
                <CardBack theme={activeTheme} deckId={shufflingDeckId || 3} minimal={!isShuffleComplete} lang={lang} />
              </Box>

              {/* Dynamic Shuffle Animation Cards */}
              {isShuffling && shuffleItems.map((_, index) => {
                 return (
                  <div 
                    key={index}
                    className={`absolute w-48 h-64 shadow-xl rounded-[2.8rem] overflow-hidden border border-white/10`}
                    style={{
                      zIndex: index, 
                      backgroundColor: '#111827', 
                      animation: `shuffle-layer 0.5s ease-in-out infinite`,
                      animationDelay: `${index * 0.08}s`,
                      left: 'calc(50% - 96px)', 
                    }}
                  >
                     <CardBack theme={activeTheme} deckId={shufflingDeckId || 3} minimal={true} lang={lang} />
                  </div>
                 );
              })}
            </Box>
            
            <Stack align="center" gap="xs" className="mt-2">
              {isShuffling ? <Text className="gold-text uppercase font-black animate-pulse" lts="0.8em" size="xs">{lang === 'zh' ? '洗牌中...' : 'SHUFFLING...'}</Text> : 
                <Stack align="center" gap="md" className="animate-fadeIn">
                  <Text className="text-[#f3e5ab] uppercase font-black" lts="0.5em" size="xs">{lang === 'zh' ? '洗牌完成' : 'SHUFFLE COMPLETE'}</Text>
                  <Button size="lg" radius="xl" variant="outline" color="yellow" onClick={onStartGame} className="border-[#d4af37] text-[#d4af37] px-10 animate-bounce shadow-[0_0_40px_rgba(212,175,55,0.4)]" styles={{ label: { letterSpacing: '0.2em', fontWeight: 900 } }}>
                      {lang === 'zh' ? '點擊揭曉' : 'TAP TO REVEAL'}
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
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-start relative overflow-hidden bg-[#0a0f18]">
        <FloralPattern color="#d4af37" opacity="0.05" />
        <ScrollArea h="100vh" w="100%" className="no-scrollbar">
          <Stack align="center" gap="xl" className="w-full max-w-lg animate-fadeIn relative z-10 px-4 py-8 mx-auto">
            
            {/* Header Area */}
            <Stack align="center" gap="xs" className="text-center">
              <Title order={2} className="gold-text italic serif-romantic text-3xl">
                 {lang === 'zh' ? 'Deeply Knowing You' : 'Deeply Knowing You'}
              </Title>
              <Text className="gold-text text-sm font-bold uppercase tracking-[0.2em] opacity-70">
                 {lang === 'zh' ? '深刻地認識你' : 'A Journey of Connection'}
              </Text>
              <Text c="dimmed" size="sm" className="max-w-xs leading-relaxed opacity-80 mt-2">
                 {lang === 'zh' 
                   ? '想和她/他聊得更深入？透過三個層級，從輕鬆到深刻，一步步拉近彼此距離，發現更多不為人知的有趣面向。'
                   : 'Want to deepen your connection? Discover hidden sides of each other through three levels of conversation, from lighthearted to profound.'}
              </Text>
            </Stack>

            {/* Decks List */}
            <Stack gap="xl" className="w-full">
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
                    
                    <Stack gap="sm" className="relative z-10">
                      {/* Title & Level */}
                      <Group justify="space-between" align="center" wrap="nowrap">
                         <Text className={`font-black text-lg ${deck.id === 3 ? 'text-[#f3e5ab]' : 'text-white'}`}>
                            {lang === 'zh' ? ui.levelZh : ui.levelEn}
                         </Text>
                         {deck.id === 3 && <IconSparkles className="w-5 h-5 text-[#f3e5ab] animate-pulse" />}
                      </Group>

                      {/* Description */}
                      <Text className="text-gray-300 text-sm leading-relaxed font-medium">
                         {lang === 'zh' ? ui.descZh : ui.descEn}
                      </Text>

                      {/* Tags */}
                      <Box>
                        <Text size="10px" className="uppercase font-bold tracking-widest text-gray-500 mb-2">
                           {lang === 'zh' ? '適合時機' : 'PERFECT FOR'}
                        </Text>
                        <Group gap={6}>
                           {(lang === 'zh' ? ui.tagsZh : ui.tagsEn).map((tag: string, i: number) => (
                              <Badge 
                                key={i} 
                                variant="light" 
                                color={ui.color} 
                                size="sm" 
                                radius="sm"
                                className="font-bold tracking-wide"
                              >
                                {tag}
                              </Badge>
                           ))}
                        </Group>
                      </Box>
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>

            {/* Gameplay Hints */}
            <Paper p="md" radius="xl" className="bg-[#f3e5ab]/10 border border-[#f3e5ab]/20 w-full mb-8">
               <Stack gap="xs">
                  <Group gap="xs" className="mb-1">
                     <IconLightbulb className="w-5 h-5 text-[#f3e5ab]" />
                     <Text className="text-[#f3e5ab] font-bold text-sm uppercase tracking-widest">
                        {lang === 'zh' ? '玩法小提示' : 'How to Play'}
                     </Text>
                  </Group>
                  <Stack gap={4} className="pl-2">
                     <Text size="xs" className="text-[#f3e5ab]/80 font-medium">
                        {lang === 'zh' ? '• 隨意抽一張卡片 → 回答問題 → 聆聽對方' : '• Draw a card randomly → Answer → Listen'}
                     </Text>
                     <Text size="xs" className="text-[#f3e5ab]/80 font-medium">
                        {lang === 'zh' ? '• 從輕鬆聊到深刻理解，讓對話像慢慢發芽的花' : '• Let the conversation bloom like a flower'}
                     </Text>
                     <Text size="xs" className="text-[#f3e5ab]/80 font-medium">
                        {lang === 'zh' ? '• 沒有對錯答案，只有「更認識彼此」' : '• No right or wrong answers, only understanding'}
                     </Text>
                  </Stack>
               </Stack>
            </Paper>

            <Button variant="transparent" color="gray" onClick={onBackToLanding} className="mb-4">
               {lang === 'zh' ? '返 回 首 頁' : 'BACK TO HOME'}
            </Button>
          </Stack>
        </ScrollArea>
      </Container>
    );
  }

  if (view === GameView.GAMEPLAY) {
    return (
      <Container h="100%" fluid p="md" className="flex flex-col items-center justify-start relative overflow-hidden" bg="#0a0f18">
        <Group justify="space-between" className="w-full max-w-sm z-20" mt="sm">
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={onBackToDeckSelection} className="bg-white/5 border border-white/10 shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></ActionIcon>
          <Text className="gold-text font-black italic uppercase serif-romantic" size="xs" lts="0.2em">{selectedDeck?.name[lang]}</Text>
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={onOpenHistory} className="bg-white/5 border border-white/10 shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></ActionIcon>
        </Group>
        <Stack flex={1} justify="center" align="center" className="w-full relative">
          <div key={currentQuestionIndex} className={`w-full z-10 transform-style-3d ${isDealing ? 'card-cinema-entrance' : ''}`}>{currentQuestion && selectedDeck && <Card question={currentQuestion} lang={lang} onNext={onNextCard} isFlipped={isCardFlipped} onClick={onCardFlip} deckName={selectedDeck.name} deckId={selectedDeck.id} />}</div>
        </Stack>
      </Container>
    );
  }

  if (view === GameView.ADMIN) {
    return <AdminPage decks={decks} onAddQuestion={onAddQuestion} onBack={onBackToLanding} lang={lang} />;
  }

  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<GameView>(GameView.LANDING);
  const [lang, setLang] = useState<Language>('zh');
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [shufflingDeckId, setShufflingDeckId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [history, setHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShuffleComplete, setIsShuffleComplete] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const shuffleItems = useMemo(() => Array.from({ length: 5 }), []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const fetchedDecks = await fetchDecks();
      if (fetchedDecks && fetchedDecks.length > 0) {
        setDecks(fetchedDecks);
      } else {
        setDecks(INITIAL_DECKS);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleSelectProject = (p: Project | null) => {
    setActiveProject(p);
    if (p === Project.ICEBREAKER) {
       setView(GameView.LANDING);
    } else {
       // MBTI handles its own view or we reset
       setView(GameView.LANDING);
    }
  };

  const handleStart = () => {
    setView(GameView.DECK_SELECTION);
  };

  const handleSelectDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setShufflingDeckId(deck.id);
    setIsShuffling(true);
    setIsShuffleComplete(false);
    
    setTimeout(() => {
      setIsShuffling(false);
      setIsShuffleComplete(true);
    }, 2500);
  };

  const handleStartGame = () => {
    if (!selectedDeck) return;
    const shuffledQuestions = [...selectedDeck.questions].sort(() => Math.random() - 0.5);
    const deckWithShuffled = { ...selectedDeck, questions: shuffledQuestions };
    setSelectedDeck(deckWithShuffled);
    setCurrentQuestionIndex(0);
    setHistory([]);
    setView(GameView.GAMEPLAY);
    setIsDealing(true);
    
    // Auto-reveal: Wait for dealing animation then flip
    setTimeout(() => {
        setIsDealing(false);
        setIsCardFlipped(true);
    }, 600);
  };

  const handleNextCard = () => {
    if (!selectedDeck) return;
    setIsCardFlipped(false); // Flip back to hide old question
    
    setTimeout(() => {
        if (selectedDeck) {
             const currentQ = selectedDeck.questions[currentQuestionIndex];
             setHistory(prev => [...prev, currentQ]);
             const nextIndex = (currentQuestionIndex + 1) % selectedDeck.questions.length;
             setCurrentQuestionIndex(nextIndex);
        }
        setIsDealing(true); // Bring in new card
        
        // Auto-reveal new card
        setTimeout(() => {
            setIsDealing(false);
            setIsCardFlipped(true);
        }, 600);
    }, 300);
  };

  const handleToggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleBackToLanding = () => {
    // Go back to the landing page of the active project (Icebreaker)
    setView(GameView.LANDING);
  };
  
  const handleBackToDeckSelection = () => {
    setView(GameView.DECK_SELECTION);
    setIsShuffling(false);
    setIsShuffleComplete(false);
    setShufflingDeckId(null);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  const handleOpenHistory = () => {
    setShowHistory(true);
  };

  const handleOpenAdmin = () => {
    setView(GameView.ADMIN);
  };

  const handleAddQuestion = async (deckId: number, zh: string, en: string) => {
      const deckIndex = decks.findIndex(d => d.id === deckId);
      if (deckIndex === -1) return;

      const newId = Math.floor(Math.random() * 100000) + 1000;
      const newQuestion: Question = {
          id: newId,
          deckId,
          text: { zh, en }
      };

      const updatedDeck = { ...decks[deckIndex], questions: [...decks[deckIndex].questions, newQuestion] };
      const updatedDecks = [...decks];
      updatedDecks[deckIndex] = updatedDeck;
      setDecks(updatedDecks);

      await updateDeckQuestions(deckId, updatedDeck.questions);
  };

  return (
    <MantineProvider>
      <AppContent
        loading={loading}
        view={view}
        lang={lang}
        decks={decks}
        selectedDeck={selectedDeck}
        shufflingDeckId={shufflingDeckId}
        currentQuestionIndex={currentQuestionIndex}
        history={history}
        showHistory={showHistory}
        isCardFlipped={isCardFlipped}
        isShuffling={isShuffling}
        isShuffleComplete={isShuffleComplete}
        isDealing={isDealing}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        onStart={handleStart}
        onSelectDeck={handleSelectDeck}
        onStartGame={handleStartGame}
        onNextCard={handleNextCard}
        onToggleLang={handleToggleLang}
        onCardFlip={handleCardFlip}
        onBackToLanding={handleBackToLanding}
        onBackToDeckSelection={handleBackToDeckSelection}
        onCloseHistory={handleCloseHistory}
        onOpenHistory={handleOpenHistory}
        onOpenAdmin={handleOpenAdmin}
        onAddQuestion={handleAddQuestion}
        shuffleItems={shuffleItems}
      />
    </MantineProvider>
  );
};

export default App;

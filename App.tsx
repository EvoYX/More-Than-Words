
import React, { useState, useMemo, useEffect } from 'react';
import { GameView, Language, Deck, Question, Project } from './types';
import { DECKS as INITIAL_DECKS } from './constants';
import { Card, CardBack, THEMES, FloralPattern, MorningIllustration, HeartIllustration, MasterIllustration } from './components/Card';
import { AdminPage } from './components/AdminPage';
import { LoveMBTI } from './components/LoveMBTI';
import { fetchDecks, updateDeckQuestions } from './services/apiService';
import { MantineProvider, Button, Text, Stack, Group, Title, Container, Paper, ActionIcon, Center, Box, Loader, Badge, ThemeIcon, ScrollArea, SimpleGrid, Modal, Drawer } from '@mantine/core';

// --- CUSTOM ICONS ---

const IconGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <circle cx="12" cy="12" r="3" />
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

const IconLove = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
       <defs>
          <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#fbc2eb" />
             <stop offset="100%" stopColor="#a6c1ee" />
          </linearGradient>
       </defs>
       <path d="M50 85 C 50 85, 20 60, 20 40 C 20 25, 35 15, 50 25 C 65 15, 80 25, 80 40 C 80 60, 50 85, 50 85 Z"
             stroke="url(#pinkGrad)" strokeWidth="3" fill="white" fillOpacity="0.05" strokeLinejoin="round"/>
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

// --- RULES MODAL ---
const RulesModal: React.FC<{ opened: boolean; onClose: () => void; lang: Language }> = ({ opened, onClose, lang }) => {
  const steps = [
    {
       icon: <IconIcebreaker className="w-16 h-16" />,
       title: lang === 'zh' ? '選擇層級' : 'Choose Level',
       desc: lang === 'zh' ? '根據你們的關係熱度，選擇合適的牌組。' : 'Select the right deck based on your connection depth.'
    },
    {
       icon: <IconSparkles className="w-12 h-12 text-[#f3e5ab]" />,
       title: lang === 'zh' ? '洗牌與命運' : 'Shuffle & Fate',
       desc: lang === 'zh' ? '讓系統洗牌，憑直覺點擊一張最有感覺的卡片。' : 'Let fate shuffle, then pick the card that calls to you.'
    },
    {
       icon: <IconLove className="w-16 h-16" />,
       title: lang === 'zh' ? '深刻對話' : 'Deep Talk',
       desc: lang === 'zh' ? '輪流回答問題。重點不是答案，而是分享的過程。' : 'Take turns answering. It\'s about the sharing, not just the answer.'
    }
  ];

  return (
    <Modal 
       opened={opened} 
       onClose={onClose} 
       centered 
       size="lg"
       radius="2rem" 
       padding={0}
       styles={{ 
         content: { backgroundColor: '#0f141e', border: '1px solid #d4af37' },
         overlay: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.8)' }
       }}
    >
       <Box className="relative p-8 overflow-hidden">
          <FloralPattern color="#d4af37" opacity="0.05" />
          <Stack align="center" gap="xl" className="relative z-10">
             <Title order={2} className="gold-text serif-romantic text-3xl">{lang === 'zh' ? '遊戲規則' : 'Game Rules'}</Title>
             
             <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" w="100%">
                {steps.map((s, i) => (
                   <Stack key={i} align="center" gap="sm" className="bg-white/5 p-6 rounded-[1.5rem] border border-white/10 h-full">
                      {s.icon}
                      <Text className="text-[#f3e5ab] font-bold uppercase tracking-widest text-sm">{s.title}</Text>
                      <Text c="dimmed" size="xs" ta="center" className="leading-relaxed">{s.desc}</Text>
                   </Stack>
                ))}
             </SimpleGrid>

             <Button 
                variant="outline" 
                color="yellow" 
                radius="xl" 
                size="md" 
                onClick={onClose}
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
             >
                {lang === 'zh' ? '我準備好了' : 'I\'m Ready'}
             </Button>
          </Stack>
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
    levelZh: "LEVEL I | 心动开场",
    levelEn: "LEVEL I | The Spark",
    descZh: "不用想太多，轻轻开启气氛，让聊天自然流动。",
    descEn: "No pressure, no impressing. Just warming up the vibe.",
    tagsZh: ["轻松", "破冰", "日常"],
    tagsEn: ["Chill", "Icebreaker", "Casual"],
    color: "blue"
  },
  2: {
    levelZh: "LEVEL II | 字里行间",
    levelEn: "LEVEL II | Between the Lines",
    descZh: "开始多懂一点彼此的习惯和想法，但依然轻松。",
    descEn: "Getting closer, noticing patterns, still light but more real.",
    tagsZh: ["习惯", "互动", "多懂一点"],
    tagsEn: ["Patterns", "Connection", "Closer"],
    color: "pink"
  },
  3: {
    levelZh: "LEVEL III | 温柔真心",
    levelEn: "LEVEL III | Soft Truths",
    descZh: "在安心的状态下，慢慢说一点真心话。",
    descEn: "Only when it feels safe. Gentle honesty, no pressure.",
    tagsZh: ["真心话", "安全感", "深层"],
    tagsEn: ["Honesty", "Safety", "Deep"],
    color: "yellow"
  }
};

const QUESTIONS_PER_STAGE = 3;

const AppContent: React.FC<{
  loading: boolean;
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
  activeProject: Project | null;
  showLevelUpPrompt: boolean;
  onSelectProject: (p: Project | null) => void;
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
  onOpenAdmin: () => void;
  onAddQuestion: (deckId: number, zh: string, en: string) => void;
  onProceedLevel: () => void;
  onStayLevel: () => void;
  shuffleItems: any[];
  onOpenRules: () => void;
}> = ({
  loading, view, lang, decks, selectedDeck, shufflingDeckId, currentQuestionIndex, revealedIndices,
  history, showHistory, isCardFlipped, isShuffling, isShuffleComplete, isDealing,
  activeProject, showLevelUpPrompt,
  onSelectProject,
  onStart, onSelectDeck, onStartGame, onPickCard, onNextCard, onToggleLang, onCardFlip,
  onBackToLanding, onBackToDeckSelection, onCloseHistory, onOpenHistory, onOpenAdmin, onAddQuestion,
  onProceedLevel, onStayLevel, shuffleItems, onOpenRules
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

  if (activeProject === Project.MBTI) {
    return <LoveMBTI onBack={() => onSelectProject(null)} lang={lang} onToggleLang={onToggleLang} />;
  }

  if (!activeProject) {
    return (
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
        <FloralPattern color="#d4af37" opacity="0.03" />
        
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

        <Button
           variant="subtle"
           color="gray"
           size="xs"
           className="absolute top-6 left-6 z-50 hover:bg-white/10"
           onClick={onOpenAdmin}
           leftSection={<IconSettings className="w-4 h-4" />}
        >
          {lang === 'zh' ? '後台' : 'Admin'}
        </Button>

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

            <Paper 
                p="xl" 
                radius="2rem" 
                className="bg-gradient-to-br from-[#1a202c] to-[#000000] border border-pink-500/10 w-full relative shadow-none opacity-60 cursor-not-allowed overflow-hidden select-none" 
            >
               <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                  <Badge 
                    size="lg" 
                    color="gray" 
                    variant="light"
                    className="font-black tracking-[0.3em] border border-white/20 bg-black/60 text-white shadow-xl"
                  >
                    {lang === 'zh' ? '即將推出' : 'COMING SOON'}
                  </Badge>
               </div>

               <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/5 rounded-bl-[50%] pointer-events-none" />
               <Stack gap="md" className="blur-[1px]">
                 <Group wrap="nowrap" align="center">
                    <Box className="w-14 h-14 p-2 bg-pink-500/10 rounded-2xl border border-pink-500/20 flex items-center justify-center">
                       <IconLove className="w-10 h-10 drop-shadow-lg grayscale" />
                    </Box>
                    <Title order={3} className="text-pink-200/50 serif-romantic text-2xl">
                       {lang === 'zh' ? '戀愛人格測驗' : 'Love Personality Quiz'}
                    </Title>
                 </Group>
                 <Text size="sm" className="text-gray-500 leading-relaxed">
                    {lang === 'zh'
                      ? '你是哪種戀人？結合心理學與 AI 分析，揭示你的愛情原型、戀愛強項與地雷，還能看到和你最合拍的戀人類型。'
                      : 'What kind of lover are you? AI-powered insights reveal your romantic archetype, strengths, and deal-breakers, plus your most compatible matches.'}
                 </Text>
                 <Group gap="xs" mt="xs" className="opacity-50">
                   {(lang === 'zh' 
                      ? ['快速了解戀愛風格', '戀愛命定契合度', '找到心動對象']
                      : ['Discover Love Style', 'Reveal Compatibility', 'Find Your Match']
                   ).map((tag, i) => (
                      <Badge key={i} variant="outline" color="pink" className="normal-case font-medium tracking-wide border-pink-400/20 text-pink-200/50">
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

  if (view === GameView.LANDING) {
    return (
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-center relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color="#d4af37" opacity="0.05" />
        <ActionIcon variant="transparent" color="gray" className="absolute top-6 left-6 opacity-50 hover:opacity-100 z-50" size="lg" onClick={() => onSelectProject(null)}>
          <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </ActionIcon>
        
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
        
        <Button
           variant="subtle"
           color="gray"
           size="xs"
           className="absolute bottom-6 right-6 z-50 hover:bg-white/10 opacity-50 hover:opacity-100"
           onClick={onOpenAdmin}
           leftSection={<IconSettings className="w-4 h-4" />}
        >
          Admin
        </Button>
        
        <Stack align="center" gap="xs" className="relative z-10 w-full max-sm px-10">
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
                color="yellow" 
                onClick={onOpenRules}
                leftSection={<IconLightbulb className="w-4 h-4" />}
                styles={{ label: { fontSize: '11px', letterSpacing: '0.1em', fontWeight: 700, color: '#f3e5ab' } }}
                className="hover:bg-white/5"
             >
                {lang === 'zh' ? '玩法說明' : 'How to Play'}
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
              {/* Fix: Added rounded-[2rem] to match card radius so shadow doesn't show black edges */}
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
      <Container h="100%" fluid p={0} className="flex flex-col items-center justify-start relative overflow-hidden" bg="#0a0f18">
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

        <ScrollArea h="100vh" w="100%" className="no-scrollbar">
          <Stack align="center" gap="xl" className="w-full max-w-lg animate-fadeIn relative z-10 px-4 py-8 mx-auto">
            <Stack align="center" gap="xs" className="text-center">
              <Title order={2} className="gold-text italic serif-romantic text-3xl">Deeply Knowing You</Title>
              <Text className="gold-text text-sm font-bold uppercase tracking-[0.2em] opacity-70">{lang === 'zh' ? '深刻地認識你' : 'A Journey of Connection'}</Text>
              <Text c="dimmed" size="sm" className="max-w-xs leading-relaxed opacity-80 mt-2">
                 {lang === 'zh' 
                   ? '想和她/他聊得更深入？透過三個層級，從輕鬆到深刻，一步步拉近彼此距離，發現更多不為人知有趣的面向。'
                   : 'Want to deepen your connection? Discover hidden sides of each other through three levels of conversation, from lighthearted to profound.'}
              </Text>
            </Stack>

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
                      <Group justify="space-between" align="center" wrap="nowrap">
                         <Text className={`font-black text-lg ${deck.id === 3 ? 'text-[#f3e5ab]' : 'text-white'}`}>{lang === 'zh' ? ui.levelZh : ui.levelEn}</Text>
                         {deck.id === 3 && <IconSparkles className="w-5 h-5 text-[#f3e5ab] animate-pulse" />}
                      </Group>
                      <Text className="text-gray-300 text-sm leading-relaxed font-medium">{lang === 'zh' ? ui.descZh : ui.descEn}</Text>
                      <Box>
                        <Text size="10px" className="uppercase font-bold tracking-widest text-gray-500 mb-2">{lang === 'zh' ? '适合时机' : 'PERFECT FOR'}</Text>
                        <Group gap={6}>
                           {(lang === 'zh' ? ui.tagsZh : ui.tagsEn).map((tag: string, i: number) => (
                              <Badge key={i} variant="light" color={ui.color} size="sm" radius="sm" className="font-bold tracking-wide">{tag}</Badge>
                           ))}
                        </Group>
                      </Box>
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>

            <Paper p="md" radius="xl" className="bg-[#f3e5ab]/10 border border-[#f3e5ab]/20 w-full mb-8" onClick={onOpenRules} style={{ cursor: 'pointer' }}>
               <Stack gap="xs">
                  <Group gap="xs" className="mb-1">
                     <IconLightbulb className="w-5 h-5 text-[#f3e5ab]" />
                     <Text className="text-[#f3e5ab] font-bold text-sm uppercase tracking-widest">{lang === 'zh' ? '玩法小提示' : 'How to Play'}</Text>
                  </Group>
                  <Stack gap={4} className="pl-2">
                     <Text size="xs" className="text-[#f3e5ab]/80 font-medium">
                        {lang === 'zh' ? '• 洗牌後選擇一張心動的卡片 → 揭曉問題' : '• Pick a card after shuffle → Reveal the question'}
                     </Text>
                     <Text size="xs" className="text-[#f3e5ab]/80 font-medium">
                        {lang === 'zh' ? '• 放慢腳步，享受每一段對話帶來的共鳴' : '• Slow down, enjoy the resonance of each talk'}
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
    const activeTheme = THEMES[selectedDeck?.id || 3];
    const isMaxLevel = selectedDeck?.id === 3;

    return (
      <Container h="100%" fluid p="0" className="flex flex-col items-center justify-start relative overflow-hidden" bg="#0a0f18">
        <FloralPattern color={activeTheme.accent} opacity="0.05" />
        
        {/* Header Bar */}
        <Box p="md" className="w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
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
          <ScrollArea h="calc(100vh - 80px)" w="100%" className="no-scrollbar p-6">
            <Container size="sm" py="xl">
               <Center mb="xl">
                  <Stack align="center" gap={4}>
                    <Text ta="center" className="gold-text font-black uppercase tracking-[0.4em]" size="sm">
                      {lang === 'zh' ? '由 命 運 選 擇' : 'CHOSEN BY FATE'}
                    </Text>
                    <Text ta="center" c="dimmed" size="xs" className="italic opacity-60">
                      {lang === 'zh' ? '從牌盤中挑選一張讓你心動的卡片' : 'Pick a card from the table that speaks to you'}
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
                            {/* Face Up (Already Answered) - UPDATED FOR LIGHT THEME + SVG BG + ROUNDED MATCH */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2rem] bg-[#fffcf5] border-2 flex items-center justify-center p-3 overflow-hidden shadow-inner" style={{ borderColor: activeTheme.accent }}>
                               <FloralPattern color={activeTheme.accent} opacity="0.08" />
                               <Stack gap={2} align="center" className="w-full h-full justify-center relative z-10">
                                  <Text size="xs" c="dark.8" ta="center" className="line-clamp-4 font-serif leading-relaxed text-[10px] font-bold opacity-80" style={{ color: '#1f2937' }}>
                                     {q.text[lang]}
                                  </Text>
                                  {/* Small decorative mark */}
                                  <div className="mt-1 w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: activeTheme.accent }}></div>
                               </Stack>
                            </div>
                         </div>
                      </Box>
                    );
                  })}
               </SimpleGrid>
            </Container>
          </ScrollArea>
        ) : (
          /* Focused revealed card */
          <Stack flex={1} justify="center" align="center" className="w-full relative px-6 z-10">
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
            <Button 
               variant="subtle" 
               color="gray" 
               mt="xl" 
               onClick={onNextCard}
               styles={{ label: { letterSpacing: '0.2em', fontWeight: 800 } }}
            >
               {lang === 'zh' ? '← 返回牌盤' : '← BACK TO TABLE'}
            </Button>
          </Stack>
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
            <ScrollArea h="calc(100vh - 60px)" className="no-scrollbar">
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
            </ScrollArea>
        </Drawer>

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShuffleComplete, setIsShuffleComplete] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showLevelUpPrompt, setShowLevelUpPrompt] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  const shuffleItems = useMemo(() => Array.from({ length: 5 }).map((_, i) => i), []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const remoteDecks = await fetchDecks();
        if (remoteDecks.length > 0) {
           setDecks(remoteDecks);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

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

      // Check if we hit the milestone (e.g. every 3 cards)
      if (count > 0 && count % QUESTIONS_PER_STAGE === 0) {
          // Add a small delay so the transition back to table happens, then the modal appears
          setTimeout(() => {
              setShowLevelUpPrompt(true);
          }, 500);
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
          loading={loading}
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
          activeProject={activeProject}
          showLevelUpPrompt={showLevelUpPrompt}
          shuffleItems={shuffleItems}
          
          onSelectProject={setActiveProject}
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
          onOpenAdmin={() => setView(GameView.ADMIN)}
          onAddQuestion={async (deckId, zh, en) => {
              const newQ: Question = { id: Date.now(), deckId, text: { zh, en } };
              const targetDeck = decks.find(d => d.id === deckId);
              if (targetDeck) {
                  const updatedQuestions = [...targetDeck.questions, newQ];
                  setDecks(prev => prev.map(d => d.id === deckId ? { ...d, questions: updatedQuestions } : d));
              }
          }}
          onProceedLevel={handleProceedLevel}
          onStayLevel={() => setShowLevelUpPrompt(false)}
          onOpenRules={() => setShowRules(true)}
       />
       <RulesModal opened={showRules} onClose={() => setShowRules(false)} lang={lang} />
    </MantineProvider>
  );
};

export default App;

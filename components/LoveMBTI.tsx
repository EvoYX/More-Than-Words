
import React, { useState, useEffect, useCallback } from 'react';
import { MBTI_QUESTIONS, MBTI_RESULTS, MBTI_RESULTS_LIST, ZODIAC_SIGNS, ExpandedMBTIResult, GLOBAL_VISUAL_RULE } from '../mbtiConstants';
import { ZodiacSign, Language } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Stack, Text, Button, Title, Container, Group, Paper, Center, Box, ScrollArea, SimpleGrid, Badge, Loader, Image, Divider, Modal, ThemeIcon, Grid } from '@mantine/core';

interface LoveMBTIProps {
  onBack: () => void;
  lang: Language;
  onToggleLang: () => void;
}

// --- UTILS FOR IMAGE PERSISTENCE ---
const STORAGE_PREFIX = 'mbti_char_';

const getStoredImage = (mbti: string): string | null => {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${mbti}`);
  } catch (e) {
    console.warn('Storage access failed', e);
    return null;
  }
};

const saveImageToStorage = (mbti: string, base64: string) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${mbti}`, base64);
  } catch (e) {
    console.warn('Storage quota exceeded, image stored in memory only', e);
  }
};

const HealingBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#fffcf9]">
    <div className="absolute top-[-10%] left-[-5%] w-[100%] h-[70%] rounded-full blur-[140px] bg-[#fff5f7] opacity-60"></div>
    <div className="absolute bottom-[-15%] right-[-10%] w-[90%] h-[60%] rounded-full blur-[120px] bg-[#fefaf0] opacity-60"></div>
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>
  </div>
);

const LoveMBTILogo = () => (
  <Box className="relative w-56 h-56 flex items-center justify-center mb-6">
    <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse"></div>
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl z-10">
      <defs>
        <linearGradient id="soulGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#d68c9a" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g className="origin-center animate-[spin_20s_linear_infinite]">
        <circle cx="100" cy="100" r="90" stroke="url(#soulGradient)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="100" cy="100" r="90" stroke="url(#soulGradient)" strokeWidth="0.2" opacity="0.3" />
        <circle cx="100" cy="10" r="2" fill="#d68c9a" />
        <circle cx="100" cy="190" r="2" fill="#8b5cf6" />
      </g>
      <g className="origin-center animate-[spin_15s_linear_infinite_reverse]">
        <circle cx="100" cy="100" r="70" stroke="#d68c9a" strokeWidth="1" opacity="0.4" />
        <path d="M100 30 L100 35 M100 165 L100 170 M30 100 L35 100 M165 100 L170 100" stroke="#d68c9a" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <g className="origin-center animate-pulse">
         <path d="M100 135 C60 100, 50 75, 70 55 C85 40, 100 60, 100 60 C100 60, 115 40, 130 55 C150 75, 140 100, 100 135" stroke="url(#soulGradient)" strokeWidth="2" fill="none" filter="url(#glow)"/>
         <path d="M100 45 L102 50 L107 52 L102 54 L100 59 L98 54 L93 52 L98 50 Z" fill="#fff" opacity="0.9" className="animate-bounce" />
         <path d="M70 80 L71 83 L74 84 L71 85 L70 88 L69 85 L66 84 L69 83 Z" fill="#fff" opacity="0.6" />
         <path d="M130 80 L131 83 L134 84 L131 85 L130 88 L129 85 L126 84 L129 83 Z" fill="#fff" opacity="0.6" />
      </g>
    </svg>
  </Box>
);

const IconCollection = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
       <defs><linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fbc2eb" /><stop offset="100%" stopColor="#a6c1ee" /></linearGradient></defs>
       <path d="M20 30 C 20 30, 40 25, 50 35 C 60 25, 80 30, 80 30 V 80 C 80 80, 60 75, 50 85 C 40 75, 20 80, 20 80 Z" stroke="url(#bookGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.4"/>
       <path d="M50 35 V 85" stroke="url(#bookGrad)" strokeWidth="3" strokeLinecap="round"/>
       <path d="M30 45 L 32 47" stroke="#fbc2eb" strokeWidth="2" strokeLinecap="round"/>
       <path d="M70 45 L 68 47" stroke="#a6c1ee" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const IconBoy = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
       <defs><linearGradient id="boyGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
       <circle cx="45" cy="55" r="22" stroke="url(#boyGrad)" strokeWidth="4" fill="white" fillOpacity="0.2"/>
       <path d="M62 38 L 78 22 M 78 22 H 60 M 78 22 V 40" stroke="url(#boyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const IconGirl = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
       <defs><linearGradient id="girlGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#fb7185" /></linearGradient></defs>
       <circle cx="50" cy="45" r="22" stroke="url(#girlGrad)" strokeWidth="4" fill="white" fillOpacity="0.2"/>
       <path d="M50 67 V 85 M 38 76 H 62" stroke="url(#girlGrad)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  </div>
);

const SoulManifestation = () => (
  <Box className="relative w-72 h-72 flex items-center justify-center mb-10">
     <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-[60px] animate-pulse"></div>
     <div className="absolute inset-0 bg-indigo-300/20 rounded-full blur-[40px] animate-pulse delay-75"></div>
     <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full z-10">
        <defs>
          <linearGradient id="manifestGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="origin-center animate-[spin_3s_linear_infinite]"><circle cx="150" cy="150" r="120" stroke="url(#manifestGradient)" strokeWidth="1" strokeDasharray="20 40" opacity="0.3" /></g>
        <g className="origin-center animate-[spin_5s_linear_infinite_reverse]"><circle cx="150" cy="150" r="100" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" /></g>
        <g className="origin-center animate-[spin_10s_linear_infinite]">
           {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={i} x1="150" y1="50" x2="150" y2="90" stroke="url(#manifestGradient)" strokeWidth="2" strokeLinecap="round" transform={`rotate(${angle} 150 150)`} opacity="0.6">
                 <animate attributeName="y1" values="50; 80; 50" dur="2s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2s" repeatCount="indefinite" />
              </line>
           ))}
        </g>
        <g className="origin-center animate-[pulse_2s_ease-in-out_infinite]">
           <circle cx="150" cy="150" r="30" fill="url(#manifestGradient)" opacity="0.2" />
           <circle cx="150" cy="150" r="15" fill="white" filter="url(#softGlow)" opacity="0.9" />
           <path transform="translate(150, 150) scale(0.8) translate(-150, -150)" d="M150 170 C120 145, 110 125, 125 110 C135 100, 150 115, 150 115 C150 115, 165 100, 175 110 C190 125, 180 145, 150 170" fill="#fbcfe8" opacity="0.8"/>
        </g>
     </svg>
  </Box>
);

const ZodiacFeedCard: React.FC<{ sign: ZodiacSign; gender: 'boy' | 'girl'; lang: Language }> = ({ sign, gender, lang }) => {
  const isBoy = gender === 'boy';
  const data = isBoy ? sign.boyfriend : sign.girlfriend;
  return (
    <Paper radius="2rem" className="overflow-hidden bg-[#fffcf9] shadow-xl border border-pink-100 relative flex flex-col h-full hover:shadow-2xl transition-all group">
        <Box className="h-28 bg-gradient-to-br from-pink-50 via-indigo-50 to-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-[6rem] leading-none select-none font-serif">{sign.emoji}</div>
           <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
           <Center className="h-full pt-2 flex-col relative z-10"><Text className="text-4xl filter drop-shadow-md mb-2">{sign.emoji}</Text><Badge variant="filled" color="dark" size="sm" className="uppercase tracking-widest">{sign.date}</Badge></Center>
        </Box>
        <Stack align="center" gap={4} p="md" className="shrink-0 -mt-6">
          <Paper shadow="md" radius="xl" p="xs" px="lg" bg="white" className="z-10 border border-gray-100"><Title order={3} className="serif-romantic text-gray-800 text-2xl font-black">{sign.name[lang]}</Title></Paper>
          <Group gap={6} mt="xs" justify="center" className="flex-wrap">{data.keywords.map((k, i) => (<Badge key={i} variant="outline" color={i === 0 ? 'pink' : i===1 ? 'indigo' : 'gray'} size="sm" className="bg-white/50">#{k[lang]}</Badge>))}</Group>
        </Stack>
        <Divider mx="lg" my="xs" color="gray.2" />
        <Stack gap="lg" p="md" pt="xs" className="grow">
          <Box><Group gap="xs" mb={4}><ThemeIcon variant="light" color="pink" radius="xl" size="sm">❤️</ThemeIcon><Text fw={900} size="xs" c="gray.8" className="uppercase tracking-widest">{lang === 'zh' ? '戀愛模樣' : 'The Vibe'}</Text></Group><Text size="sm" c="gray.7" className="leading-relaxed font-serif text-justify bg-pink-50/50 p-3 rounded-xl border border-pink-100/50">{data.desc[lang]}</Text></Box>
          <SimpleGrid cols={2} spacing="xs">
             <Box className="bg-green-50/40 p-3 rounded-xl border border-green-100/50"><Group gap={4} mb={4}><Text size="xs">✅</Text><Text size="10px" fw={900} c="green.8" className="uppercase tracking-widest">{lang === 'zh' ? '優點' : 'GREEN FLAGS'}</Text></Group><Text size="xs" c="gray.7" fw={600} className="leading-snug">{data.pros[lang]}</Text></Box>
             <Box className="bg-red-50/40 p-3 rounded-xl border border-red-100/50"><Group gap={4} mb={4}><Text size="xs">⚠️</Text><Text size="10px" fw={900} c="red.8" className="uppercase tracking-widest">{lang === 'zh' ? '地雷' : 'RED FLAGS'}</Text></Group><Text size="xs" c="gray.7" fw={600} className="leading-snug">{data.cons[lang]}</Text></Box>
          </SimpleGrid>
          <Box className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border border-gray-200 shadow-sm mt-auto"><Group mb={6} gap="xs"><Text size="lg">💡</Text><Text fw={900} size="xs" c="dark.3" className="uppercase tracking-widest">{lang === 'zh' ? '攻略心法' : 'STRATEGY'}</Text></Group><Text size="sm" c="gray.8" fw={700} className="leading-relaxed italic font-serif">"{data.advice[lang]}"</Text></Box>
        </Stack>
    </Paper>
  );
};

const ZodiacFeed: React.FC<{ gender: 'boy' | 'girl'; lang: Language; onBack: () => void }> = ({ gender, lang, onBack }) => {
  const list = ZODIAC_SIGNS;
  const isBoy = gender === 'boy';
  return (
    <Box h="100vh" className="bg-[#fffcf9] flex flex-col relative z-10">
      <HealingBackground />
      <Box p="md" className="z-20 bg-white/80 backdrop-blur-md sticky top-0 border-b border-pink-100 shadow-sm">
        <Group justify="space-between"><Button variant="subtle" color="gray" onClick={onBack} leftSection={<span>←</span>} radius="xl" fw={700} size="compact-sm">{lang === 'zh' ? '返回' : 'Back'}</Button><Title order={4} className="serif-romantic text-gray-800 font-black">{lang === 'zh' ? (isBoy ? '12星座男朋友會給你什麼樣的愛' : '十二星座女生｜戀愛模式大公開') : (isBoy ? '12 Zodiac Boyfriends: Their Love' : '12 Zodiac Girls: Love Patterns')}</Title><Box w={40} /></Group>
      </Box>
      <ScrollArea className="flex-1 px-4 pb-32 no-scrollbar scroll-smooth bg-[#fffcf9]"><Container fluid py="xl" px={0}><SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">{list.map(sign => (<ZodiacFeedCard key={sign.id} sign={sign} gender={gender} lang={lang} />))}</SimpleGrid><Divider my="xl" label="✨" labelPosition="center" /><Text ta="center" c="dimmed" size="xs" fw={700} pb="xl">{lang === 'zh' ? '你已經看完了所有的星座' : 'You have viewed all signs'}</Text></Container></ScrollArea>
    </Box>
  );
};

const MBTIFeedCard: React.FC<{ result: ExpandedMBTIResult; lang: Language; generatedImage?: string | null; onImageGenerated: (mbti: string, base64: string) => void; isResultView?: boolean; }> = ({ result, lang, generatedImage, onImageGenerated, isResultView = false }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <Paper radius="2rem" className={`bg-[#fffbf5] shadow-lg border border-stone-100 flex flex-col overflow-hidden relative h-full ${isResultView ? '' : 'hover:shadow-2xl transition-all hover:-translate-y-1'}`}>
      <Box className="relative pt-8 pb-4 flex flex-col items-center z-10 bg-gradient-to-b from-white to-[#fffbf5]"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ backgroundColor: result.color || '#ffb7b2' }} /><Box className="relative w-48 h-48 mb-2 flex items-center justify-center transition-transform hover:scale-105 duration-500">
             {generatedImage ? (<Image src={generatedImage} alt={result.mbti} className="w-full h-full object-contain filter drop-shadow-lg animate-fadeIn" style={{ filter: 'drop-shadow(0 0 0 4px white) drop-shadow(0 4px 10px rgba(0,0,0,0.15))' }}/>) : (<Image src={result.characterImg} alt={result.mbti} className="w-full h-full object-contain filter drop-shadow-lg animate-fadeIn" style={{ filter: 'drop-shadow(0 0 0 4px white) drop-shadow(0 4px 10px rgba(0,0,0,0.15))' }} onError={() => setImgError(true)} display={imgError ? 'none' : 'block'}/>)}
             {imgError && !generatedImage && (<Text size="80px" className="animate-bounce">{result.emoji}</Text>)}
        </Box><Stack gap={2} align="center"><Badge size="md" radius="sm" variant="filled" color="dark">{result.mbti}</Badge><Title order={3} className="text-gray-900 text-2xl font-black serif-romantic ta-center mt-1 px-2 leading-tight">{result.name[lang]}</Title><Text size="sm" c="dimmed" fw={700} className="font-serif italic tracking-wide line-clamp-1">{result.vibeTag[lang]}</Text></Stack></Box>
      <Stack gap="md" className="px-5 pb-8 relative z-10 grow"><Box className="relative py-3 border-y border-stone-200/60 min-h-[4rem] flex items-center justify-center"><Text className="text-gray-700 text-md font-medium serif-romantic leading-relaxed ta-center italic">"{result.oneSentence[lang]}"</Text></Box><Paper p="md" radius="lg" className="bg-white/60 border border-white/50 shadow-sm grow"><Group gap="xs" mb={2} wrap="nowrap"><span className="text-md">💡</span><Text size="10px" fw={900} c="gray.5" className="uppercase tracking-widest">{lang === 'zh' ? '戀愛模式' : 'Love Pattern'}</Text></Group><Text size="sm" c="gray.8" fw={500} className="leading-relaxed font-serif text-justify">{result.loveTypeInterpretation[lang]}</Text></Paper><SimpleGrid cols={2} spacing="xs"><Box className="bg-green-50/50 p-3 rounded-xl border border-green-100/50"><Text size="9px" fw={900} c="green.8" className="uppercase tracking-widest mb-1">{lang === 'zh' ? '優勢' : 'STRENGTH'}</Text><Text size="xs" c="gray.7" fw={700} className="leading-snug">{result.strength[lang]}</Text></Box><Box className="bg-red-50/50 p-3 rounded-xl border border-red-100/50"><Text size="9px" fw={900} c="red.8" className="uppercase tracking-widest mb-1">{lang === 'zh' ? '注意' : 'WARNING'}</Text><Text size="xs" c="gray.7" fw={700} className="leading-snug">{result.warning[lang]}</Text></Box></SimpleGrid><Box className="bg-orange-50/50 p-3 rounded-xl border border-orange-100/50"><Text size="9px" fw={900} c="orange.8" className="uppercase tracking-widest mb-2">{lang === 'zh' ? '愛裡的樣子' : 'IN LOVE'}</Text><Text size="sm" c="gray.7" fw={600} className="leading-relaxed font-serif">{result.inLove[lang]}</Text></Box><SimpleGrid cols={2} spacing="xs"><Paper p="xs" radius="lg" bg="white" className="border border-pink-200"><Text size="9px" fw={900} c="pink.4" className="uppercase tracking-widest mb-1.5">{lang === 'zh' ? '天生一對' : 'BEST MATCH'}</Text><Group gap={4}>{result.bestMatch.map(m => <Badge key={m} size="sm" color="pink" variant="dot" className="bg-pink-50">{m}</Badge>)}</Group></Paper><Paper p="xs" radius="lg" bg="white" className="border border-gray-200"><Text size="9px" fw={900} c="gray.5" className="uppercase tracking-widest mb-1.5">{lang === 'zh' ? '相愛相殺' : 'TOXIC MATCH'}</Text><Group gap={4}>{result.toxicMatch.map(m => <Badge key={m} size="sm" color="gray" variant="dot" className="bg-gray-50">{m}</Badge>)}</Group></Paper></SimpleGrid><Box className="bg-purple-50/50 p-3 rounded-xl border border-purple-100/50"><Group gap="xs" mb={1}><span className="text-sm">📅</span><Text size="9px" fw={900} c="grape.8" className="uppercase tracking-widest">{lang === 'zh' ? '理想約會' : 'IDEAL DATE'}</Text></Group><Text size="xs" c="gray.7" fw={600} className="leading-snug font-serif italic">"{result.idealDate[lang]}"</Text></Box><Box><Text size="9px" fw={900} c="gray.4" className="uppercase tracking-widest mb-1.5">{lang === 'zh' ? '愛的語言' : 'LOVE LANGUAGES'}</Text><Group gap={6}>{result.loveLanguages.map((l, i) => (<Badge key={i} variant="outline" color="gray" size="sm" className="font-normal opacity-80">{l[lang]}</Badge>))}</Group></Box></Stack>
    </Paper>
  );
};

export const LoveMBTI: React.FC<LoveMBTIProps> = ({ onBack, lang, onToggleLang }) => {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'manifesting' | 'result' | 'zodiac_boy' | 'zodiac_girl' | 'mbti_gallery'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [mbtiType, setMbtiType] = useState<string>('');
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>(() => {
     const initial: Record<string, string> = {};
     MBTI_RESULTS_LIST.forEach(r => { const stored = getStoredImage(r.mbti); if (stored) initial[r.mbti] = stored; });
     return initial;
  });
  const [infoOpened, setInfoOpened] = useState(false); 

  const handleImageGenerated = useCallback((mbti: string, base64: string) => {
      saveImageToStorage(mbti, base64);
      setGeneratedImages(prev => ({ ...prev, [mbti]: base64 }));
  }, []);

  const triggerSingleGeneration = async (type: string) => {
    const result = MBTI_RESULTS[type];
    if (generatedImages[type]) { setStep('result'); return; }
    try {
        if (!process.env.API_KEY) throw new Error("No API Key");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `${GLOBAL_VISUAL_RULE} Character Archetype: ${result.visualPrompt || result.name.en}`;
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: { parts: [{ text: prompt }] } });
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64 = part.inlineData.data;
                    const fullData = `data:${part.inlineData.mimeType};base64,${base64}`;
                    handleImageGenerated(type, fullData);
                    break;
                }
            }
        }
    } catch (e) {
        console.error("Generation failed", e);
    } finally {
        setStep('result'); // ALWAYS transition to result screen even if AI fails
    }
  };

  const calculateResult = async () => {
    const scores: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    MBTI_QUESTIONS.forEach(q => { const val = answers[q.id] || 3; scores[q.dimension] += (val - 3) * q.direction; });
    const type = [scores.EI >= 0 ? 'E' : 'I', scores.SN >= 0 ? 'S' : 'N', scores.TF >= 0 ? 'T' : 'F', scores.JP >= 0 ? 'J' : 'P'].join('');
    const finalType = MBTI_RESULTS[type] ? type : 'ENFP';
    setMbtiType(finalType);
    setStep('manifesting');
    if (generatedImages[finalType]) {
        setTimeout(() => setStep('result'), 1500);
    } else {
        await triggerSingleGeneration(finalType);
    }
  };

  const getAiAdvice = async () => {
    if (!mbtiType) return;
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = MBTI_RESULTS[mbtiType];
      const prompt = lang === 'zh' ? `你是一位極具洞察力的女性戀愛心理導師。使用者是 ${mbtiType} (${result.name.zh})。請根據他的戀人原型寫一封擊中靈魂的「愛情私信」。繁體中文。約120字。` : `You are a soulful feminine love mentor. The user is ${mbtiType} (${result.name.en}). Write a deep, soulful "Love Soul Letter". English. ~80 words.`;
      const res = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: prompt });
      setAiAdvice(res.text || "...");
    } catch {
      setAiAdvice(lang === 'zh' ? "宇宙的訊息正在傳遞中..." : "Message is still traveling through the stars...");
    } finally {
      setLoadingAi(false);
    }
  };

  if (step === 'zodiac_boy' || step === 'zodiac_girl') return <ZodiacFeed gender={step === 'zodiac_boy' ? 'boy' : 'girl'} lang={lang} onBack={() => setStep('welcome')} />;
  if (step === 'mbti_gallery') return (<Box h="100vh" className="bg-[#fffcf9] flex flex-col relative z-10"><HealingBackground /><Box p="md" className="z-20 bg-white/80 backdrop-blur-md sticky top-0 border-b border-pink-100 shadow-sm"><Group justify="space-between"><Button variant="subtle" color="gray" onClick={() => setStep('welcome')} leftSection={<span>←</span>} radius="xl" fw={700} size="compact-sm">{lang === 'zh' ? '返回' : 'Back'}</Button><Title order={4} className="serif-romantic text-gray-800 font-black">{lang === 'zh' ? '戀愛人格全集' : 'The Love Collection'}</Title><Box w={40} /></Group></Box><ScrollArea className="flex-1 px-4 pb-32 no-scrollbar bg-[#fffcf9]"><Container fluid py="xl" px={0}><Stack align="center" mb="2rem"><Text size="sm" c="dimmed" fw={700} ta="center" className="max-w-xs font-serif italic">{lang === 'zh' ? '探索 16 種不同的愛與被愛的方式' : 'Explore the 16 unique ways of loving and being loved'}</Text></Stack><SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">{MBTI_RESULTS_LIST.map(r => (<MBTIFeedCard key={r.mbti} result={r} lang={lang} generatedImage={generatedImages[r.mbti]} onImageGenerated={handleImageGenerated}/>))}</SimpleGrid><Divider my="xl" label="✨" labelPosition="center" /><Text ta="center" c="dimmed" size="xs" fw={700} pb="xl">End of Collection</Text></Container></ScrollArea></Box>);
  const progress = Math.round(((currentIdx + 1) / MBTI_QUESTIONS.length) * 100);

  return (
    <Box h="100vh" className="bg-[#fffcf9] min-h-screen relative flex flex-col font-sans text-gray-800 overflow-hidden">
      <HealingBackground />
      {step !== 'manifesting' && (<Box className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none"><Button variant="subtle" color="gray" radius="xl" onClick={() => step === 'welcome' || step === 'result' ? onBack() : setStep('welcome')} className="pointer-events-auto" size="compact-sm">← {step === 'welcome' ? (lang === 'zh' ? '返回主頁' : 'Home') : (lang === 'zh' ? '離開' : 'Exit')}</Button><Button variant="white" color="pink" radius="xl" size="sm" onClick={onToggleLang} className="shadow-sm border border-pink-50 pointer-events-auto">{lang === 'zh' ? 'English' : '中文'}</Button></Box>)}
      {step === 'welcome' && (<ScrollArea h="100vh" className="w-full"><Container h="100%" fluid className="flex flex-col items-center justify-center animate-fadeIn relative z-10 p-6 min-h-[850px] pb-24"><Stack align="center" gap="xl" className="text-center w-full max-w-sm"><LoveMBTILogo /><Stack gap={2} mb="lg"><Text size="sm" className="serif-romantic italic text-[#d68c9a] font-bold tracking-[0.2em] opacity-80 uppercase">{lang === 'zh' ? 'Soul Archetype' : 'Soul Archetype'}</Text><Title order={1} className="text-gray-800 serif-romantic text-5xl font-black mt-1 leading-tight drop-shadow-sm">{lang === 'zh' ? '戀愛人格' : 'Love'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">MBTI</span></Title><Text size="sm" c="gray.5" fw={500} className="mt-2 tracking-wider">{lang === 'zh' ? '探索你的靈魂原型與命定契合' : 'Discover your true soul shape in love'}</Text></Stack><Box className="relative w-full mt-2 mb-6 group cursor-pointer" onClick={() => setStep('quiz')}><div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-indigo-300 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div><Paper radius="3rem" className="bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] relative z-10 flex items-center justify-center h-20 shadow-[0_10px_30px_rgba(236,72,153,0.3)] group-hover:scale-[1.02] transition-transform animate-[float_4s_ease-in-out_infinite]"><Stack gap={0} align="center"><Text fw={900} size="xl" lts={4} c="white" className="drop-shadow-sm">{lang === 'zh' ? '開始測驗' : 'START TEST'}</Text></Stack></Paper></Box><Paper radius="xl" p="lg" className="w-full bg-white/60 backdrop-blur-md border border-white/50 shadow-lg cursor-pointer hover:border-pink-200 transition-all group relative overflow-hidden" onClick={() => setStep('mbti_gallery')}><Group justify="space-between" align="center" wrap="nowrap" className="relative z-10"><Group gap="md"><div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-50 to-white flex items-center justify-center shadow-inner border border-white/80"><IconCollection className="w-8 h-8 drop-shadow-sm opacity-90" /></div><Stack gap={0} align="flex-start"><Text fw={800} size="md" c="gray.8" className="serif-romantic">{lang === 'zh' ? '戀愛人格圖鑑' : 'The Love Collection'}</Text><Text size="xs" c="gray.5" fw={600}>{lang === 'zh' ? '查看 16 種靈魂原型' : 'View all 16 archetypes'}</Text></Stack></Group><ThemeIcon radius="xl" variant="light" color="pink" className="bg-pink-50 text-pink-400">➜</ThemeIcon></Group></Paper><SimpleGrid cols={2} spacing="md" w="100%"><Paper radius="xl" p="md" className="bg-gradient-to-br from-indigo-50/80 to-white border border-indigo-100 shadow-md cursor-pointer hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 h-36 relative overflow-hidden group hover:-translate-y-1" onClick={() => setStep('zodiac_boy')}><div className="absolute top-0 right-0 p-2 opacity-[0.05] scale-150"><IconBoy className="w-32 h-32" /></div><div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center z-10 group-hover:scale-110 transition-transform border border-indigo-50"><IconBoy className="w-10 h-10 drop-shadow-sm" /></div><Stack gap={0} align="center" className="z-10"><Text size="10px" fw={900} c="indigo.3" className="uppercase tracking-widest">{lang === 'zh' ? '男友圖鑑' : 'ZODIAC HE'}</Text><Text fw={800} size="sm" c="gray.7" className="serif-romantic">{lang === 'zh' ? '他的愛' : 'His Love'}</Text></Stack></Paper><Paper radius="xl" p="md" className="bg-gradient-to-br from-pink-50/80 to-white border border-pink-100 shadow-md cursor-pointer hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 h-36 relative overflow-hidden group hover:-translate-y-1" onClick={() => setStep('zodiac_girl')}><div className="absolute top-0 right-0 p-2 opacity-[0.05] scale-150"><IconGirl className="w-32 h-32" /></div><div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center z-10 group-hover:scale-110 transition-transform border border-pink-50"><IconGirl className="w-10 h-10 drop-shadow-sm" /></div><Stack gap={0} align="center" className="z-10"><Text size="10px" fw={900} c="pink.3" className="uppercase tracking-widest">{lang === 'zh' ? '女友圖鑑' : 'ZODIAC SHE'}</Text><Text fw={800} size="sm" c="gray.7" className="serif-romantic">{lang === 'zh' ? '她的愛' : 'Her Love'}</Text></Stack></Paper></SimpleGrid></Stack></Container></ScrollArea>)}
      {step === 'quiz' && (<Container fluid h="100%" p={0} className="flex flex-col relative z-10 w-full overflow-hidden bg-[#fffcf9]"><Box p="md" pb="xs" className="shrink-0 bg-[#fffcf9] z-20 pt-20"><Group justify="center" mb="sm"><Text size="xs" fw={900} c="#d68c9a" lts={5}>{currentIdx + 1} / {MBTI_QUESTIONS.length}</Text><div className="h-1 flex-1 bg-pink-100/30 rounded-full overflow-hidden"><div className="h-full bg-[#d68c9a] transition-all duration-500" style={{ width: `${progress}%` }} /></div></Group></Box><ScrollArea className="flex-1 w-full px-4" type="auto" offsetScrollbars><Stack gap="2rem" py="md" className="pb-32"><Paper p="xl" radius="2.5rem" className="bg-white/60 backdrop-blur-md border border-white/80 shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl"><Title order={2} ta="center" className="text-gray-900 text-2xl font-black serif-romantic leading-relaxed px-2 flex items-center justify-center min-h-[5rem] mb-6 drop-shadow-sm">{MBTI_QUESTIONS[currentIdx]?.text[lang]}</Title><Box className="relative w-full h-16 flex items-center justify-between px-2 mb-6"><div className="absolute left-6 right-6 h-1.5 bg-gradient-to-r from-gray-200 via-pink-200 to-gray-200 rounded-full opacity-60" />{[1, 2, 3, 4, 5].map(num => { const isSelected = answers[MBTI_QUESTIONS[currentIdx].id] === num; const hasAnswer = answers[MBTI_QUESTIONS[currentIdx].id] !== undefined; return (<div key={num} onClick={() => setAnswers({...answers, [MBTI_QUESTIONS[currentIdx].id]: num})} className={`relative z-10 cursor-pointer flex items-center justify-center transition-all duration-500 ease-out ${isSelected ? 'scale-[1.4] -translate-y-2' : 'scale-100 hover:scale-110'} ${hasAnswer && !isSelected ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`} style={{ width: '18%', height: '100%' }}><Text className={`filter drop-shadow-lg select-none transition-all duration-300 ${isSelected ? 'text-5xl animate-[pulse_2s_infinite]' : 'text-3xl text-pink-300'}`}>❤️</Text>{isSelected && (<div className="absolute -bottom-2 w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />)}</div>); })}</Box><Group justify="space-between" align="start" className="w-full px-2" wrap="nowrap"><div className={`w-[45%] text-left cursor-pointer transition-all duration-300 group ${answers[MBTI_QUESTIONS[currentIdx].id] <= 2 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'opacity-100 translate-x-1' : 'opacity-60 hover:opacity-100'}`} onClick={() => setAnswers({...answers, [MBTI_QUESTIONS[currentIdx].id]: 1})}><Text className={`serif-romantic font-bold leading-tight text-lg ${answers[MBTI_QUESTIONS[currentIdx].id] <= 2 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'text-pink-600 scale-105' : 'text-gray-600'}`}>{MBTI_QUESTIONS[currentIdx]?.minLabel[lang]}</Text><div className={`h-0.5 bg-pink-400 mt-2 transition-all duration-300 ${answers[MBTI_QUESTIONS[currentIdx].id] <= 2 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'w-12' : 'w-0 group-hover:w-6'}`} /></div><div className={`w-[45%] text-right cursor-pointer transition-all duration-300 group ${answers[MBTI_QUESTIONS[currentIdx].id] >= 4 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'opacity-100 -translate-x-1' : 'opacity-60 hover:opacity-100'}`} onClick={() => setAnswers({...answers, [MBTI_QUESTIONS[currentIdx].id]: 5})}><Text className={`serif-romantic font-bold leading-tight text-lg ${answers[MBTI_QUESTIONS[currentIdx].id] >= 4 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'text-pink-600 scale-105' : 'text-gray-600'}`}>{MBTI_QUESTIONS[currentIdx]?.maxLabel[lang]}</Text><div className={`h-0.5 bg-pink-400 mt-2 ml-auto transition-all duration-300 ${answers[MBTI_QUESTIONS[currentIdx].id] >= 4 && answers[MBTI_QUESTIONS[currentIdx].id] ? 'w-12' : 'w-0 group-hover:w-6'}`} /></div></Group></Paper></Stack></ScrollArea><Box className="shrink-0 p-6 bg-[#fffcf9] z-50 border-t border-pink-100"><Group justify="center" gap="xl"><Button variant="subtle" color="gray" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} fw={800}>{lang === 'zh' ? '上一題' : 'Back'}</Button><Button radius="3rem" size="xl" className="flex-1 bg-[#d68c9a] font-black h-16 shadow-lg" disabled={!answers[MBTI_QUESTIONS[currentIdx].id]} onClick={() => currentIdx === MBTI_QUESTIONS.length - 1 ? calculateResult() : setCurrentIdx(currentIdx + 1)}>{currentIdx === MBTI_QUESTIONS.length - 1 ? (lang === 'zh' ? '揭曉結果' : 'REVEAL') : (lang === 'zh' ? '下一題' : 'NEXT')}</Button></Group></Box></Container>)}
      {step === 'manifesting' && (<Box className="fixed inset-0 z-50 bg-[#fffcf9] flex flex-col items-center justify-center"><HealingBackground /><div className="relative z-10 flex flex-col items-center justify-center animate-fadeIn"><SoulManifestation /><Stack align="center" gap="xs"><Title order={2} className="serif-romantic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 animate-[pulse_3s_infinite] tracking-widest text-3xl">{lang === 'zh' ? '靈魂顯化中' : 'Manifesting Soul'}</Title><Text c="dimmed" size="sm" className="italic font-medium tracking-wide opacity-80">{lang === 'zh' ? '宇宙正在連結你的答案...' : 'The universe is aligning your stars...'}</Text></Stack></div></Box>)}
      {step === 'result' && (<ScrollArea h="100vh" className="z-10 no-scrollbar"><Container p="xl" pt="32" className="max-w-md mx-auto pb-48"><Stack gap="xl"><MBTIFeedCard result={MBTI_RESULTS[mbtiType]} lang={lang} generatedImage={generatedImages[mbtiType]} onImageGenerated={handleImageGenerated} isResultView={true}/><Paper p="lg" radius="xl" bg="white" className="border border-pink-50 shadow-sm cursor-pointer hover:bg-pink-50/10 transition-colors" onClick={() => setInfoOpened(true)}><Group justify="center" gap="xs"><span className="text-lg">✨</span><Text size="xs" fw={900} c="pink.4" className="uppercase tracking-[0.2em]">{lang === 'zh' ? '為什麼結果不一樣？' : 'Why is it different?'}</Text></Group></Paper><Paper p="xl" radius="3rem" className="bg-white/95 border border-white shadow-xl"><Stack gap="md"><Title order={4} className="text-gray-800 serif-romantic text-xl flex items-center gap-2">✉️ {lang === 'zh' ? '靈魂私訊' : 'Soul Message'}</Title><Box className="min-h-[100px] border-l-4 border-pink-100 pl-6 my-2">{aiAdvice ? <Text size="md" c="gray.8" fw={700} className="italic leading-relaxed font-serif">{aiAdvice}</Text> : <Center h={80} className="flex-col gap-3"><Loader color="#d68c9a" size="sm" /><Text size="xs" c="dimmed" fw={700}>{lang === 'zh' ? '正在為您向宇宙尋求解答...' : 'Connecting...'}</Text></Center>}</Box><Button variant="filled" color="pink.4" radius="xl" fullWidth h={54} onClick={getAiAdvice} loading={loadingAi} fw={900}>{aiAdvice ? (lang === 'zh' ? "再讀一封" : "Reread Letter") : (lang === 'zh' ? "開啟專屬導師信件" : "Read Soul Letter")}</Button></Stack></Paper><Button fullWidth radius="xl" h={60} color="gray" variant="white" onClick={() => setStep('mbti_gallery')} fw={900} className="border border-pink-50 shadow-sm">{lang === 'zh' ? '❤️ 查看：戀愛人格全集' : '❤️ View: Love Personality Collection'}</Button><Button fullWidth radius="xl" size="xl" color="gray" variant="outline" onClick={() => setStep('welcome')} fw={900}>{lang === 'zh' ? '重新測驗' : 'Retake Quiz'}</Button></Stack></Container><Modal opened={infoOpened} onClose={() => setInfoOpened(false)} radius="2rem" centered title={lang === 'zh' ? "關於結果的差異" : "Difference in Results"}><Stack p="sm" gap="lg"><Text size="sm" c="gray.7" fw={700} className="leading-relaxed">{lang === 'zh' ? "為什麼結果和你原本的 MBTI 不一樣？因為有些人在愛裡會變成的那個你。有些人平時安靜，但在愛裡會變得主動；有些人看起來外向，卻只在關係中保留真心。這就是「戀愛人格」的迷人之處。" : "Why is it different? Some people are quiet daily but proactive in love; others seem extroverted but only show their true hearts in intimate bonds. This is the magic of your 'Lover Type'."}</Text><Divider /><Box><Group mb={4}><Badge color="pink" variant="light">戀愛 E</Badge><Text size="xs" fw={900} c="dimmed">{lang === 'zh' ? '外向表達' : 'Expressive'}</Text></Group><Text size="sm" c="gray.8" fw={600}>{lang === 'zh' ? '在關係中，你傾向透過分享、互動與陪伴來確認愛。' : 'In relationships, you confirm love through sharing, interaction, and companionship.'}</Text></Box><Box><Group mb={4}><Badge color="indigo" variant="light">戀愛 I</Badge><Text size="xs" fw={900} c="dimmed">{lang === 'zh' ? '內向感受' : 'Internal'}</Text></Group><Text size="sm" c="gray.8" fw={600}>{lang === 'zh' ? '在關係中，你需要安全的空間，透過內在感受來確認愛。' : 'In relationships, you need safe space to confirm love through inner feelings.'}</Text></Box><Button fullWidth radius="xl" color="pink" onClick={() => setInfoOpened(false)} fw={900} mt="md">OK</Button></Stack></Modal></ScrollArea>)}
    </Box>
  );
};

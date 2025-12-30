
import React, { useState } from 'react';
import { Stack, Title, Text, Button, TextInput, Select, Paper, Group, Divider, ScrollArea, Center, Tabs, Box, SimpleGrid, Loader, Image, Badge, ActionIcon } from '@mantine/core';
import { Deck, Question, Language } from '../types';
import { Card } from './Card';
import { MBTI_RESULTS_LIST, GLOBAL_VISUAL_RULE } from '../mbtiConstants';
import { GoogleGenAI } from "@google/genai";

interface AdminPageProps {
  decks: Deck[];
  onAddQuestion: (deckId: number, zh: string, en: string) => void;
  onBack: () => void;
  lang: Language;
}

export const AdminPage: React.FC<AdminPageProps> = ({ decks, onAddQuestion, onBack, lang }) => {
  const [newZh, setNewZh] = useState('');
  const [newEn, setNewEn] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(decks[0]?.id.toString() || null);
  const [previewFlipped, setPreviewFlipped] = useState(false);

  // Asset Generation State
  const [genImages, setGenImages] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState<Record<string, boolean>>({});

  const selectedDeck = decks.find(d => d.id.toString() === selectedDeckId);

  const handleSubmit = () => {
    if (newZh && newEn && selectedDeckId) {
      onAddQuestion(parseInt(selectedDeckId), newZh, newEn);
      setNewZh('');
      setNewEn('');
    }
  };

  const generateAsset = async (mbti: string, visualPrompt: string) => {
    if (!process.env.API_KEY) {
        alert("No API Key found");
        return;
    }

    setGenerating(prev => ({ ...prev, [mbti]: true }));
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const fullPrompt = `${GLOBAL_VISUAL_RULE} Character Archetype: ${visualPrompt}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: fullPrompt }] },
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64 = part.inlineData.data;
                    const fullData = `data:${part.inlineData.mimeType};base64,${base64}`;
                    setGenImages(prev => ({ ...prev, [mbti]: fullData }));
                    break;
                }
            }
        }
    } catch (e) {
        console.error("Generation failed", e);
        alert(`Failed to generate ${mbti}. Try again.`);
    } finally {
        setGenerating(prev => ({ ...prev, [mbti]: false }));
    }
  };

  const handleDownload = (mbti: string) => {
      const dataUrl = genImages[mbti];
      if (!dataUrl) return;
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${mbti}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const generateAll = async () => {
      // Sequence generation to avoid rate limits (approx 1 every 2 seconds)
      for (const result of MBTI_RESULTS_LIST) {
          if (!genImages[result.mbti]) {
              await generateAsset(result.mbti, result.visualPrompt || '');
              // Simple delay
              await new Promise(r => setTimeout(r, 2500));
          }
      }
  };

  const previewQuestion: Question = {
    id: 0,
    deckId: selectedDeck?.id || 1,
    text: { zh: newZh || (lang === 'zh' ? '在此預覽問題' : 'Preview Question Here'), en: newEn || 'Preview Question Here' }
  };

  return (
    <ScrollArea h="100vh" bg="#0a0f18" className="animate-fadeIn no-scrollbar">
      <Stack p="xl" gap="xl" maw={900} mx="auto">
        <Group justify="space-between">
          <Title order={2} className="gold-text serif-romantic">
            {lang === 'zh' ? '後台管理' : 'Admin Panel'}
          </Title>
          <Button variant="subtle" color="gray" onClick={onBack}>
            {lang === 'zh' ? '離開' : 'Exit'}
          </Button>
        </Group>

        <Tabs defaultValue="assets" color="yellow" variant="pills" styles={{ tab: { letterSpacing: '0.1em', fontWeight: 700 } }}>
          <Tabs.List grow mb="lg">
            <Tabs.Tab value="assets">🎨 {lang === 'zh' ? '素材工坊' : 'Asset Studio'}</Tabs.Tab>
            <Tabs.Tab value="edit">📝 {lang === 'zh' ? '新增題目' : 'Add Content'}</Tabs.Tab>
            <Tabs.Tab value="list">📚 {lang === 'zh' ? '題目列表' : 'Questions'}</Tabs.Tab>
            <Tabs.Tab value="preview">👀 {lang === 'zh' ? '卡片預覽' : 'Preview'}</Tabs.Tab>
          </Tabs.List>

          {/* ASSET STUDIO TAB */}
          <Tabs.Panel value="assets">
             <Stack gap="md">
                <Paper p="lg" bg="rgba(255,255,255,0.05)" radius="xl" className="border border-white/10">
                   <Group justify="space-between" mb="md">
                      <Stack gap={0}>
                         <Text c="white" fw={700} size="lg">MBTI Character Generator</Text>
                         <Text c="dimmed" size="sm">Generate consistent AI characters here, then download and save to <code>/public/images/mbti/</code></Text>
                      </Stack>
                      <Button variant="gradient" gradient={{ from: 'pink', to: 'yellow' }} onClick={generateAll} loading={Object.values(generating).some(Boolean)}>
                         Generate All (Batch)
                      </Button>
                   </Group>
                   
                   <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="lg">
                      {MBTI_RESULTS_LIST.map(result => (
                         <Paper key={result.mbti} p="xs" radius="lg" bg="#fff" className="overflow-hidden flex flex-col items-center">
                            <Box className="w-full aspect-square bg-gray-100 rounded-lg mb-2 relative flex items-center justify-center overflow-hidden border border-gray-200">
                               {genImages[result.mbti] ? (
                                   <Image src={genImages[result.mbti]} alt={result.mbti} className="object-contain w-full h-full" />
                               ) : (
                                   <Text size="xl">{result.emoji}</Text>
                               )}
                               {generating[result.mbti] && (
                                   <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                       <Loader color="pink" size="sm" />
                                   </div>
                               )}
                            </Box>
                            
                            <Group justify="space-between" w="100%" px={4} mb={4}>
                               <Badge color="dark" size="sm">{result.mbti}</Badge>
                               <Text size="xs" fw={700} c="dimmed" className="truncate max-w-[60px]">{result.name.zh}</Text>
                            </Group>

                            <Group w="100%" gap={4} grow>
                               <Button size="xs" variant="light" color="blue" onClick={() => generateAsset(result.mbti, result.visualPrompt || '')} disabled={generating[result.mbti]} p={0}>
                                  Gen
                                </Button>
                               <Button size="xs" variant="filled" color="green" onClick={() => handleDownload(result.mbti)} disabled={!genImages[result.mbti]} p={0}>
                                  Save
                               </Button>
                            </Group>
                         </Paper>
                      ))}
                   </SimpleGrid>
                </Paper>
             </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="edit">
            <Paper p="xl" radius="2rem" bg="rgba(255,255,255,0.03)" className="border border-white/5 shadow-2xl">
              <Stack gap="md">
                <Select
                  label={lang === 'zh' ? '選擇卡組' : 'Select Deck'}
                  data={decks.map(d => ({ value: d.id.toString(), label: d.name[lang] }))}
                  value={selectedDeckId}
                  onChange={setSelectedDeckId}
                  styles={{ input: { borderRadius: '1rem' } }}
                />
                <TextInput
                  label={lang === 'zh' ? '中文問題' : 'Chinese Question'}
                  placeholder="輸入對話核心..."
                  value={newZh}
                  onChange={(e) => setNewZh(e.currentTarget.value)}
                  styles={{ input: { borderRadius: '1rem' } }}
                />
                <TextInput
                  label={lang === 'zh' ? '英文問題' : 'English Question'}
                  placeholder="The core of your dialogue..."
                  value={newEn}
                  onChange={(e) => setNewEn(e.currentTarget.value)}
                  styles={{ input: { borderRadius: '1rem' } }}
                />
                <Button 
                  fullWidth 
                  size="lg"
                  radius="xl"
                  onClick={handleSubmit}
                  className="bg-[#d4af37] text-gray-900 mt-2 shadow-xl active:scale-95"
                >
                  {lang === 'zh' ? '保存至數據庫' : 'SAVE TO DATABASE'}
                </Button>
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="preview">
             <Stack align="center" gap="md">
                <Text size="xs" c="dimmed" fs="italic" ta="center">
                  {lang === 'zh' ? '點擊卡片測試翻轉效果' : 'Click card to test flip effect'}
                </Text>
                <Box w="100%" h={450} className="scale-90">
                   {selectedDeck && (
                     <Card 
                        question={previewQuestion}
                        lang={lang}
                        onNext={() => {}}
                        isFlipped={previewFlipped}
                        onClick={() => setPreviewFlipped(!previewFlipped)}
                        deckName={selectedDeck.name}
                        deckId={selectedDeck.id}
                     />
                   )}
                </Box>
             </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="list">
             <Stack gap="xl">
                {decks.map(deck => (
                  <div key={deck.id}>
                    <Group justify="space-between" mb="xs">
                       <Text fw={900} className="gold-text uppercase" size="xs" lts="0.2em">{deck.name[lang]}</Text>
                       <Text size="xs" c="dimmed">{deck.questions.length} cards</Text>
                    </Group>
                    <Stack gap={6}>
                      {deck.questions.slice().reverse().slice(0, 10).map((q, idx) => (
                        <Paper key={idx} p="sm" bg="rgba(255,255,255,0.02)" radius="md" className="border border-white/5">
                          <Text size="xs" c="white" fw={600}>{q.text.zh}</Text>
                          <Text size="xs" c="dimmed" fs="italic">{q.text.en}</Text>
                        </Paper>
                      ))}
                    </Stack>
                  </div>
                ))}
             </Stack>
          </Tabs.Panel>
        </Tabs>
        
        <Divider opacity={0.1} />
        
        <Center pb="xl">
          <Text size="xs" c="dimmed" className="gold-text opacity-50 uppercase font-black" lts="0.3em">
             Card System v2.0 • Build 2025
          </Text>
        </Center>
      </Stack>
    </ScrollArea>
  );
};

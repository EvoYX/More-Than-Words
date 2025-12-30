
import { Deck, Question, InteractionPrompt } from './types';

const icebreakerQuestions: Question[] = [
  { id: 101, deckId: 1, text: { zh: "你最近聽過最喜歡的一首歌是什麼？", en: "What's the best song you've heard recently?" } },
  { id: 102, deckId: 1, text: { zh: "如果你有一整天完全自由的時間，你會怎麼度過？", en: "If you had a completely free day, how would you spend it?" } },
  { id: 103, deckId: 1, text: { zh: "你最喜歡哪種天氣？為什麼？", en: "What's your favorite kind of weather? Why?" } },
  { id: 104, deckId: 1, text: { zh: "分享一個你最近覺得很有趣的小事。", en: "Share a small funny thing that happened lately." } },
  { id: 105, deckId: 1, text: { zh: "你最嚮往的一次旅行是去哪裡？", en: "Where is the one place you dream of traveling to?" } },
  { id: 106, deckId: 1, text: { zh: "你早起後的第一個習慣是什麼？", en: "What is your very first morning habit?" } },
  { id: 107, deckId: 1, text: { zh: "最近有什麼食物讓你感到特別幸福嗎？", en: "Has any food made you feel especially happy lately?" } },
  { id: 108, deckId: 1, text: { zh: "如果可以立刻學會一種語言，你會選哪種？", en: "If you could instantly learn any language, which would it be?" } },
  { id: 109, deckId: 1, text: { zh: "你最喜歡的手機 App 是什麼？", en: "What's your most used app on your phone?" } },
  { id: 110, deckId: 1, text: { zh: "如果你要寫一本自傳，第一章的標題會是什麼？", en: "If you wrote an autobiography, what would the first chapter title be?" } },
];

const connectionQuestions: Question[] = [
  { id: 201, deckId: 2, text: { zh: "你生命中哪一個瞬間讓你覺得最自豪？", en: "Which moment in your life are you most proud of?" } },
  { id: 202, deckId: 2, text: { zh: "你現在最想學習或精進的技能是什麼？", en: "What skill do you most want to learn or improve right now?" } },
  { id: 203, deckId: 2, text: { zh: "哪本書或電影曾深刻影響過你的想法？", en: "Which book or movie has profoundly influenced your thinking?" } },
  { id: 204, deckId: 2, text: { zh: "你最欣賞自己身上的什麼特質？", en: "What quality about yourself do you admire most?" } },
  { id: 205, deckId: 2, text: { zh: "你希望十年後的自己看起來是什麼樣子？", en: "What do you hope your self 10 years from now looks like?" } },
  { id: 206, deckId: 2, text: { zh: "什麼事對你來說是「真正的成功」？", en: "What does 'true success' mean to you?" } },
  { id: 207, deckId: 2, text: { zh: "你覺得目前的生活節奏適合你嗎？", en: "Does your current pace of life suit you?" } },
  { id: 208, deckId: 2, text: { zh: "當你感到脆弱時，你最需要什麼樣的支持？", en: "What kind of support do you need most when you feel vulnerable?" } },
  { id: 209, deckId: 2, text: { zh: "你如何定義「靈魂伴侶」？", en: "How do you define a 'soulmate'?" } },
  { id: 210, deckId: 2, text: { zh: "分享一個讓你感到被深深愛著的時刻。", en: "Share a moment when you felt deeply loved." } },
];

export const DECKS: Deck[] = [
  {
    id: 1,
    name: { zh: "初見的溫度", en: "Warmth of First Meeting" },
    description: { zh: "在晨曦中，輕輕敲開彼此的話題。", en: "Light icebreakers to start the day together." },
    color: "#D0EFFF", // Soft Sky Blue
    illustration: "morning", 
    questions: icebreakerQuestions
  },
  {
    id: 2,
    name: { zh: "溫柔地靠近", en: "Gently Getting Closer" },
    description: { zh: "透過故事，走進彼此未曾言說的世界。", en: "Share stories and step into each other's inner worlds." },
    color: "#FFD6E7", // Soft Rose Pink
    illustration: "connection",
    questions: connectionQuestions
  },
  {
    id: 3,
    name: { zh: "深刻地認識你", en: "Deeply Knowing You" },
    description: { zh: "融合所有深度的對話旅程。", en: "A complete journey through all levels of conversation." },
    color: "#E8D5FF", // Soft Lavender Purple
    illustration: "master",
    questions: [...icebreakerQuestions, ...connectionQuestions]
  }
];

export const INTERACTION_PROMPTS: InteractionPrompt[] = [
  { id: 1, type: "respond", emoji: "💬", text: { zh: "追問", en: "Follow-up" } },
  { id: 2, type: "praise", emoji: "💖", text: { zh: "讚美", en: "Praise" } },
  { id: 3, type: "deepen", emoji: "🔍", text: { zh: "深挖", en: "Deepen" } }
];

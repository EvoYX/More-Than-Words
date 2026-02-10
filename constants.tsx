
import { Deck, Question, InteractionPrompt } from './types';

// Level 1: The Spark / 心动开场
const level1Questions: Question[] = [
  { id: 101, deckId: 1, text: { en: "If today suddenly becomes a free day with zero responsibilities, what’s the first thing you’d do?", zh: "如果今天突然不用上班、没有任何责任，你第一件会去做的事是什么？" } },
  { id: 102, deckId: 1, text: { en: "When you travel, are you the ‘full itinerary’ type or the ‘let’s see how it goes’ type?", zh: "旅行时你是行程排满型，还是随缘走走派？" } },
  { id: 103, deckId: 1, text: { en: "If we could teleport anywhere for dinner right now, where would we end up?", zh: "如果现在可以瞬间移动去世界任何地方吃晚餐，你会选哪里？" } },
  { id: 104, deckId: 1, text: { en: "Choose one for daily life: reading minds or seeing the future?", zh: "如果只能选一个超能力用在日常生活，你会选读心术还是预知未来？" } },
  { id: 105, deckId: 1, text: { en: "If you won 10 million TOTO, what’s the first thing you’d buy just for fun?", zh: "如果你中了1000万 TOTO，第一样纯粹为了开心而买的东西会是什么？" } },
  { id: 106, deckId: 1, text: { en: "After a long workday in Singapore, what small thing instantly makes your day better?", zh: "在新加坡上了一整天班后，哪一个小事可以立刻让你心情变好？" } },
  { id: 107, deckId: 1, text: { en: "What’s something simple you secretly enjoy more than people expect?", zh: "有没有一件很简单、但你其实比别人想象中更喜欢的事？" } },
  { id: 108, deckId: 1, text: { en: "Coffee, tea, or bubble tea — which one are you?", zh: "咖啡、茶，还是奶茶？你是哪一派？" } },
  { id: 109, deckId: 1, text: { en: "Are you more of a morning-energy person or a night-thoughts person?", zh: "你是早上比较有精神，还是晚上比较容易想很多？" } },
  { id: 110, deckId: 1, text: { en: "Is there something small you’re looking forward to recently?", zh: "最近有没有一件小小的事情，是你在期待的？" } },
  { id: 111, deckId: 1, text: { en: "Hawker centre or café hopping — which feels more like you?", zh: "小贩中心还是咖啡馆，你觉得哪一个比较像你？" } },
  { id: 112, deckId: 1, text: { en: "What kind of weather instantly puts you in a better mood?", zh: "什么样的天气会立刻让你心情变好？" } },
  { id: 113, deckId: 1, text: { en: "If today was a movie scene, would it be comedy, slice-of-life, or light drama?", zh: "如果今天是一段电影画面，会比较像喜剧、日常片，还是小小剧情片？" } },
  { id: 114, deckId: 1, text: { en: "Are you more ‘plan first’ or ‘decide when we’re there’?", zh: "你比较喜欢先计划好，还是到了再说？" } },
  { id: 115, deckId: 1, text: { en: "What’s something that almost always makes you smile?", zh: "有没有一件事，是几乎每次都会让你笑的？" } },
  { id: 116, deckId: 1, text: { en: "If you could instantly be good at one random skill, what would it be?", zh: "如果可以瞬间精通一项技能，你会选什么？" } },
  { id: 117, deckId: 1, text: { en: "Are you more ‘take photos’ or ‘just enjoy the moment’?", zh: "你是比较爱拍照，还是更喜欢当下享受的人？" } },
  { id: 118, deckId: 1, text: { en: "What kind of conversations make time pass very fast for you?", zh: "什么样的聊天，会让你觉得时间过得特别快？" } }
];

// Level 2: Between the Lines / 字里行间
const level2Questions: Question[] = [
  { id: 201, deckId: 2, text: { en: "What’s one experience that changed you more than you expected?", zh: "有没有一段经历，对你的影响比你原本想象中更大？" } },
  { id: 202, deckId: 2, text: { en: "What’s something you care about more now than before?", zh: "有没有一件事，是你现在比以前更在意的？" } },
  { id: 203, deckId: 2, text: { en: "What’s something you’re currently trying to get better at — for yourself?", zh: "最近有没有一件你在努力变好的事情，是为了自己？" } },
  { id: 204, deckId: 2, text: { en: "After a really draining day, how do you usually recharge?", zh: "在很累、很消耗的一天后，你通常是怎么恢复能量的？" } },
  { id: 205, deckId: 2, text: { en: "Do you enjoy being alone more, or being with people more?", zh: "你比较享受独处，还是和人在一起？" } },
  { id: 206, deckId: 2, text: { en: "What’s a small routine you enjoy more than you expected?", zh: "有没有一个小习惯，是你后来才发现其实蛮享受的？" } },
  { id: 207, deckId: 2, text: { en: "What kind of situations make you laugh the easiest?", zh: "什么样的情况最容易让你笑出来？" } },
  { id: 208, deckId: 2, text: { en: "When you meet new people, do you warm up fast or slowly?", zh: "你认识新朋友时，通常是热得快，还是慢慢来型？" } },
  { id: 209, deckId: 2, text: { en: "What’s something you always need a bit of time to get used to?", zh: "有没有一件事，是你通常需要一点时间才能习惯的？" } },
  { id: 210, deckId: 2, text: { en: "What’s a small thing that can instantly improve your mood?", zh: "有没有一个很小的事情，可以立刻让你心情好一点？" } },
  { id: 211, deckId: 2, text: { en: "Are you more comfortable in small groups or one-to-one chats?", zh: "你比较自在的是小团体，还是一对一聊天？" } },
  { id: 212, deckId: 2, text: { en: "What’s something you usually enjoy more when it’s unplanned?", zh: "有没有一件事，是临时发生反而更好玩的？" } },
  { id: 213, deckId: 2, text: { en: "What’s a topic you can easily chat about without getting bored?", zh: "有没有一个话题，是你很容易聊下去、不太会腻的？" } },
  { id: 214, deckId: 2, text: { en: "What’s something people often misunderstand about you?", zh: "有没有一个地方，是别人常常误会你的？" } },
  { id: 215, deckId: 2, text: { en: "What kind of effort makes you feel most appreciated?", zh: "什么样的付出，会让你最有被珍惜的感觉？" } }
];

// Level 3: Soft Truths / 温柔真心
const level3Questions: Question[] = [
  { id: 301, deckId: 3, text: { en: "Is there something you always try to be honest about, even if it’s uncomfortable?", zh: "有没有一件事，是你即使不太舒服，也会尽量对它诚实的？" } },
  { id: 302, deckId: 3, text: { en: "If life turns out simpler than expected, would you be okay with that?", zh: "如果未来的生活比想象中平凡，你会觉得可以接受吗？" } },
  { id: 303, deckId: 3, text: { en: "Is there a version of yourself you feel you’re still becoming?", zh: "有没有一个你觉得自己还在慢慢成为的样子？" } },
  { id: 304, deckId: 3, text: { en: "When you like someone, what kind of effort do you naturally give?", zh: "当你喜欢一个人时，你通常会很自然地付出哪一方面？" } },
  { id: 305, deckId: 3, text: { en: "When you’re very tired, what kind of treatment do you appreciate most?", zh: "当你很累的时候，什么样的对待会让你最舒服？" } },
  { id: 306, deckId: 3, text: { en: "What’s a small action that makes you feel cared for?", zh: "有没有一个很小的举动，会让你觉得被关心？" } },
  { id: 307, deckId: 3, text: { en: "In a relationship, what helps you feel the most at ease?", zh: "在一段关系里，什么会最让你觉得安心？" } },
  { id: 308, deckId: 3, text: { en: "What kind of partner do you hope to be?", zh: "你希望自己在关系里，成为怎样的伴侣？" } },
  { id: 309, deckId: 3, text: { en: "What makes a place feel like home to you?", zh: "对你来说，一个地方要有什么，才会有家的感觉？" } }
];

export const DECKS: Deck[] = [
  {
    id: 1,
    name: { zh: "LEVEL I｜心动开场", en: "LEVEL I | The Spark" },
    description: { zh: "不用想太多，轻轻开启气氛，让聊天自然流动。", en: "No pressure, no impressing. Just warming up the vibe." },
    color: "#D0EFFF", // Soft Sky Blue
    illustration: "morning", 
    questions: level1Questions
  },
  {
    id: 2,
    name: { zh: "LEVEL II｜字里行间", en: "LEVEL II | Between the Lines" },
    description: { zh: "开始多懂一点彼此的习惯和想法，但依然轻松。", en: "Getting closer, noticing patterns, still light but more real." },
    color: "#FFD6E7", // Soft Rose Pink
    illustration: "connection",
    questions: level2Questions
  },
  {
    id: 3,
    name: { zh: "LEVEL III｜温柔真心", en: "LEVEL III | Soft Truths" },
    description: { zh: "在安心的状态下，慢慢说一点真心话。", en: "Only when it feels safe. Gentle honesty, no pressure." },
    color: "#FFF9C4", // Soft Yellow
    illustration: "master",
    questions: level3Questions
  }
];

export const INTERACTION_PROMPTS: InteractionPrompt[] = [
  { id: 1, type: "respond", emoji: "💬", text: { zh: "追問", en: "Follow-up" } },
  { id: 2, type: "praise", emoji: "💖", text: { zh: "讚美", en: "Praise" } },
  { id: 3, type: "deepen", emoji: "🔍", text: { zh: "深挖", en: "Deepen" } }
];

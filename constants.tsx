
import { Deck, Question, InteractionPrompt } from './types';

// Level 1: The Spark / 心动开场
const level1Questions: Question[] = [
  { 
    id: 101, 
    deckId: 1, 
    text: { 
      en: "If today suddenly becomes a free day with zero responsibilities, what's the first thing you'd do?", 
      zh: "如果今天突然不用上班、没有任何责任，你第一件会去做的事是什么？" 
    } 
  },
  { 
    id: 102, 
    deckId: 1, 
    text: { 
      en: "When you travel, are you the 'full itinerary' type or the 'let's see how it goes' type?", 
      zh: "旅行时你是行程排满型，还是随缘走走派？" 
    } 
  },
  { 
    id: 103, 
    deckId: 1, 
    text: { 
      en: "If we could teleport anywhere for dinner right now, where would we end up?", 
      zh: "如果现在可以瞬间移动去世界任何地方吃晚餐，你会选哪里？" 
    } 
  },
  { 
    id: 104, 
    deckId: 1, 
    text: { 
      en: "If you could skip one annoying thing in daily life forever, what would it be?", 
      zh: "如果可以永远跳过日常生活中一件烦人的事，你会选什么？" 
    } 
  },
  { 
    id: 105, 
    deckId: 1, 
    text: { 
      en: "If you won 10 million TOTO, what's the first thing you'd buy just for fun?", 
      zh: "如果你中了1000万 TOTO，第一样纯粹为了开心而买的东西会是什么？" 
    } 
  },
  { 
    id: 106, 
    deckId: 1, 
    text: { 
      en: "After a long workday in Singapore, what small thing instantly makes your day better?", 
      zh: "在新加坡上了一整天班后，哪一个小事可以立刻让你心情变好？" 
    } 
  },
  { 
    id: 107, 
    deckId: 1, 
    text: { 
      en: "What's something simple you secretly enjoy more than people expect?", 
      zh: "有没有一件很简单、但你其实比别人想象中更喜欢的事？" 
    } 
  },
  { 
    id: 108, 
    deckId: 1, 
    text: { 
      en: "Coffee, tea, or bubble tea — which one are you?", 
      zh: "咖啡、茶，还是奶茶？你是哪一派？" 
    } 
  },
  { 
    id: 109, 
    deckId: 1, 
    text: { 
      en: "Are you more of a morning-energy person or a night-thoughts person?", 
      zh: "你是早上比较有精神，还是晚上比较容易想很多？" 
    } 
  },
  { 
    id: 110, 
    deckId: 1, 
    text: { 
      en: "Is there something small you're looking forward to recently?", 
      zh: "最近有没有一件小小的事情，是你在期待的？" 
    } 
  },
  { 
    id: 111, 
    deckId: 1, 
    text: { 
      en: "When hanging out, do you prefer trying new places or going back to favorites?", 
      zh: "出去玩的时候，你喜欢去新地方探索，还是回去熟悉的老地方？" 
    } 
  },
  { 
    id: 112, 
    deckId: 1, 
    text: { 
      en: "What kind of weather instantly puts you in a better mood?", 
      zh: "什么样的天气会立刻让你心情变好？" 
    } 
  },
  { 
    id: 113, 
    deckId: 1, 
    text: { 
      en: "What's something you do just for fun, no other reason?", 
      zh: "有没有一件事，你做纯粹是因为好玩，没有别的原因？" 
    } 
  },
  { 
    id: 114, 
    deckId: 1, 
    text: { 
      en: "Are you more 'plan first' or 'decide when we're there'?", 
      zh: "你比较喜欢先计划好，还是到了再说？" 
    } 
  },
  { 
    id: 115, 
    deckId: 1, 
    text: { 
      en: "What's something that almost always makes you smile?", 
      zh: "有没有一件事，是几乎每次都会让你笑的？" 
    } 
  },
  { 
    id: 116, 
    deckId: 1, 
    text: { 
      en: "If you could instantly be good at one random skill, what would it be?", 
      zh: "如果可以瞬间精通一项技能，你会选什么？" 
    } 
  },
  { 
    id: 117, 
    deckId: 1, 
    text: { 
      en: "Are you more of a 'document everything' or 'be present in the moment' person — or somewhere in between?", 
      zh: "你是比较爱记录一切的人，还是更享受当下的人 — 还是介于两者之间？" 
    } 
  },
  { 
    id: 118, 
    deckId: 1, 
    text: { 
      en: "What kind of conversations make time pass very fast for you?", 
      zh: "什么样的聊天，会让你觉得时间过得特别快？" 
    } 
  },
  { 
    id: 119, 
    deckId: 1, 
    text: { 
      en: "What's your go-to comfort food after a bad day?", 
      zh: "心情不好时你的comfort food是什么？" 
    } 
  },
  { 
    id: 120, 
    deckId: 1, 
    text: { 
      en: "If you could relive one age for a week, which one would you pick?", 
      zh: "如果可以重新活一个年纪一星期，你会选几岁？" 
    } 
  }
];

// Level 2: Between the Lines / 字里行间
const level2Questions: Question[] = [
  { 
    id: 201, 
    deckId: 2, 
    text: { 
      en: "What's something you wish you started doing earlier?", 
      zh: "有什么事你希望自己更早开始做？" 
    } 
  },
  { 
    id: 202, 
    deckId: 2, 
    text: { 
      en: "What's something you care about more now than before?", 
      zh: "有没有一件事，是你现在比以前更在意的？" 
    } 
  },
  { 
    id: 203, 
    deckId: 2, 
    text: { 
      en: "What's something you're currently trying to get better at — for yourself?", 
      zh: "最近有没有一件你在努力变好的事情，是为了自己？" 
    } 
  },
  { 
    id: 204, 
    deckId: 2, 
    text: { 
      en: "After a really draining day, how do you usually recharge?", 
      zh: "在很累、很消耗的一天后，你通常是怎么恢复能量的？" 
    } 
  },
  { 
    id: 205, 
    deckId: 2, 
    text: { 
      en: "Do you enjoy being alone more, or being with people more?", 
      zh: "你比较享受独处，还是和人在一起？" 
    } 
  },
  { 
    id: 206, 
    deckId: 2, 
    text: { 
      en: "What's a small routine you enjoy more than you expected?", 
      zh: "有没有一个小习惯，是你后来才发现其实蛮享受的？" 
    } 
  },
  { 
    id: 207, 
    deckId: 2, 
    text: { 
      en: "What kind of situations make you laugh the easiest?", 
      zh: "什么样的情况最容易让你笑出来？" 
    } 
  },
  { 
    id: 208, 
    deckId: 2, 
    text: { 
      en: "What's your social battery level right now — fully charged or running low?", 
      zh: "你现在的社交电量是满格还是快没电了？" 
    } 
  },
  { 
    id: 209, 
    deckId: 2, 
    text: { 
      en: "What's something you always need a bit of time to get used to?", 
      zh: "有没有一件事，是你通常需要一点时间才能习惯的？" 
    } 
  },
  { 
    id: 210, 
    deckId: 2, 
    text: { 
      en: "When you're stressed, what's the one thing that always helps?", 
      zh: "当你压力大的时候，什么事情总是能帮到你？" 
    } 
  },
  { 
    id: 211, 
    deckId: 2, 
    text: { 
      en: "Are you more comfortable in small groups or one-to-one chats?", 
      zh: "你比较自在的是小团体，还是一對一聊天？" 
    } 
  },
  { 
    id: 212, 
    deckId: 2, 
    text: { 
      en: "What's something you usually enjoy more when it's unplanned?", 
      zh: "有没有一件事，是临时发生反而更好玩的？" 
    } 
  },
  { 
    id: 213, 
    deckId: 2, 
    text: { 
      en: "What's a topic you can easily chat about without getting bored?", 
      zh: "有没有一个话题，是你很容易聊下去、不太会腻的？" 
    } 
  },
  { 
    id: 214, 
    deckId: 2, 
    text: { 
      en: "What do people always assume about you that's totally wrong?", 
      zh: "别人总是对你有什么误解，但其实完全错了？" 
    } 
  },
  {
    id: 215,
    deckId: 2,
    text: {
      en: "What’s a small thing that instantly makes your day better?",
      zh: "有没有一件小事，可以立刻让你心情变好？"
    }
  },
  {
    id: 216,
    deckId: 2,
    text: {
      en: "What’s something you’re surprisingly patient about?",
      zh: "有没有一件事，其实你比别人想象中更有耐心？"
    }
  },
  { 
    id: 217, 
    deckId: 2, 
    text: { 
      en: "Do you prefer texting or voice messages?", 
      zh: "你比较喜欢打字还是语音信息？" 
    } 
  }
];

// Level 3: Soft Truths / 温柔真心
const level3Questions: Question[] = [
  { 
    id: 301, 
    deckId: 3, 
    text: { 
      en: "What's something important to you that most people don't notice?", 
      zh: "有什么事对你很重要，但大部分人不会注意到？" 
    } 
  },
  { 
    id: 302, 
    deckId: 3, 
    text: { 
      en: "If life turns out simpler than expected, would you be okay with that?", 
      zh: "如果未来的生活比想象中平凡，你会觉得可以接受吗？" 
    } 
  },
  { 
    id: 303, 
    deckId: 3, 
    text: { 
      en: "Is there a version of yourself you feel you're still becoming?", 
      zh: "有没有一个你觉得自己还在慢慢成为的样子？" 
    } 
  },
  { 
    id: 304, 
    deckId: 3, 
    text: { 
      en: "How do you usually show someone you care — through words, actions, or time?", 
      zh: "你通常怎么表达在乎 — 通过语言、行动，还是陪伴？" 
    } 
  },
  { 
    id: 305, 
    deckId: 3, 
    text: { 
      en: "When you're exhausted, what helps you recharge the most?", 
      zh: "当你很累的时候，什么最能让你恢复精神？" 
    } 
  },
  { 
    id: 306, 
    deckId: 3, 
    text: { 
      en: "What's a small action that makes you feel cared for?", 
      zh: "有没有一个很小的举动，会让你觉得被关心？" 
    } 
  },
  { 
    id: 307, 
    deckId: 3, 
    text: { 
      en: "In a relationship, what helps you feel the most at ease?", 
      zh: "在一段关系里，什么会最让你觉得安心？" 
    } 
  },
  { id: 308, deckId: 3, text: { en: "What's one thing you think is important in a relationship that others might overlook?", zh: "在关系里，有什么事你觉得很重要，但别人可能会忽略？" } 
  },
  {
    id: 309,
    deckId: 3,
    text: {
      en: "What makes you feel truly at home with someone?",
      zh: "和一个人在一起时，什么会让你真正有「家的感觉」？"
    }
  },
  { 
    id: 310, 
    deckId: 3, 
    text: { 
      en: "What's a dealbreaker for you in a relationship?", 
      zh: "在关系里什么是你的底线？" 
    } 
  },
  { 
    id: 311, 
    deckId: 3, 
    text: { 
      en: "If we were dating, what's one thing you'd want me to know about you from the start?", 
      zh: "如果我们在一起，有什么事你希望我一开始就知道？" 
    } 
  },
  { 
    id: 312, 
    deckId: 3, 
    text: { 
      en: "What's something you're still learning to accept about yourself?", 
      zh: "有什么事是你还在学着接受自己的？" 
    } 
  },
  { 
    id: 313, 
    deckId: 3, 
    text: { 
      en: "When you think about the future, what makes you feel hopeful?", 
      zh: "当你想到未来，什么会让你觉得有希望？" 
    } 
  },
  { 
    id: 314, 
    deckId: 3, 
    text: { 
      en: "What kind of love language do you respond to the most?", 
      zh: "你最能感受到的爱的语言是哪一种？" 
    } 
  },
  { 
    id: 315, 
    deckId: 3, 
    text: { 
      en: "If someone really wanted to understand you, what would you want them to know?", 
      zh: "如果有人真的想了解你，你会希望他们知道什么？" 
    } 
  }
];

export const DECKS: Deck[] = [
  {
    id: 1,
    name: { zh: "LEVEL I｜表层之下", en: "LEVEL I | Beneath the Surface" },
    description: { zh: "每个人表面上看起来都差不多，但往下一点点，就会发现有趣的地方。从你愿意分享的地方开始，我们慢慢聊。", en: "Everyone seems similar on the surface, but dig a little deeper and you'll find interesting things. Let's start from what you're comfortable sharing, and take it slow." },
    color: "#D0EFFF", // Soft Sky Blue
    illustration: "morning", 
    questions: level1Questions
  },
  {
    id: 2,
    name: { zh: "LEVEL II｜渐入内心", en: "LEVEL II | Into the Heart" },
    description: { zh: "如果聊到这里还挺舒服的，那我们可以聊得更真实一点。开始说说你真正在意的事、喜欢的样子。也许会发现我们想的比想象中接近。", en: "If we're still comfortable at this point, let's get more real. Start sharing what you actually care about, what you're really like. Maybe we'll find we're more similar than we thought." },
    color: "#FFD6E7", // Soft Rose Pink
    illustration: "connection",
    questions: level2Questions
  },
  {
    id: 3,
    name: { zh: "LEVEL III｜真实的你", en: "LEVEL III | The Real You" },
    description: { zh: "都走到这里了，不如聊点真心话？這一层是留给願意让对方看到真实样子的人。不用完美，只要真诚就好。看看我们能不能从陌生人，变成真正懂彼此的人。", en: "We've come this far, why not share some real thoughts? This level is for people willing to show their true selves. You don't need to be perfect, just genuine. Let's see if we can go from strangers to people who truly get each other." },
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


import { MBTIQuestion, MBTIResult, ZodiacSign, MultiLangString } from './types';

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  { id: 1, dimension: "EI", text: { zh: "談戀愛時，和對方長時間相處後，我通常會", en: "After spending a long time with my partner, I usually" }, minLabel: { zh: "需要空間充電", en: "Need space" }, maxLabel: { zh: "想繼續黏著", en: "Stay clingy" }, direction: -1 },
  { id: 2, dimension: "EI", text: { zh: "如果心裡有情緒，我比較傾向", en: "When feeling emotional, I tend to" }, minLabel: { zh: "先自己消化", en: "Process alone" }, maxLabel: { zh: "立刻想分享", en: "Share now" }, direction: 1 },
  { id: 3, dimension: "EI", text: { zh: "約會結束後，我通常會", en: "After a date, I usually" }, minLabel: { zh: "回味在心裡", en: "Savor silently" }, maxLabel: { zh: "一直傳訊息", en: "Keep texting" }, direction: 1 },
  { id: 4, dimension: "SN", text: { zh: "我被吸引，通常是因為對方", en: "I am attracted to people who are" }, minLabel: { zh: "貼心行動派", en: "Practical" }, maxLabel: { zh: "靈魂投合者", en: "Soulful" }, direction: 1 },
  { id: 5, dimension: "SN", text: { zh: "談到未來，我更在意", en: "Regarding the future, I care about" }, minLabel: { zh: "生活的細節", en: "Daily life" }, maxLabel: { zh: "夢想的契合", en: "Shared dreams" }, direction: 1 },
  { id: 6, dimension: "SN", text: { zh: "我覺得浪漫比較像是", en: "Romance to me is" }, minLabel: { zh: "被細心照顧", en: "Being cared for" }, maxLabel: { zh: "心靈的共振", en: "Soul resonance" }, direction: 1 },
  { id: 7, dimension: "TF", text: { zh: "發生衝突時，我比較在意", en: "In a conflict, I care about" }, minLabel: { zh: "邏輯對不對", en: "Logic" }, maxLabel: { zh: "心情好不好", en: "Feelings" }, direction: 1 },
  { id: 8, dimension: "TF", text: { zh: "我給建議時通常是", en: "When giving advice, I am" }, minLabel: { zh: "直中要害", en: "Direct" }, maxLabel: { zh: "溫柔同理", en: "Empathetic" }, direction: 1 },
  { id: 9, dimension: "TF", text: { zh: "如果對方情緒低落，我會", en: "If my partner is down, I will" }, minLabel: { zh: "幫忙解決它", en: "Solve it" }, maxLabel: { zh: "靜靜陪著他", en: "Just stay" }, direction: 1 },
  { id: 10, dimension: "JP", text: { zh: "戀愛中，我對關係的狀態", en: "Regarding our status, I prefer" }, minLabel: { zh: "明確的定位", en: "Clear status" }, maxLabel: { zh: "順其自然感", en: "Go with flow" }, direction: 1 },
  { id: 11, dimension: "JP", text: { zh: "約會或相處，我比較喜歡", en: "For dates, I prefer" }, minLabel: { zh: "提早規劃好", en: "Planned" }, maxLabel: { zh: "當下的驚喜", en: "Spontaneous" }, direction: 1 },
  { id: 12, dimension: "JP", text: { zh: "如果行程突然改變，我會", en: "If the schedule changes suddenly, I" }, minLabel: { zh: "感到很焦慮", en: "Feel anxious" }, maxLabel: { zh: "覺得蠻有趣", en: "Find it fun" }, direction: 1 },
  { id: 13, dimension: "EI", text: { zh: "我需要的安全感多半來自", en: "My security comes from" }, minLabel: { zh: "被尊重邊界", en: "Respected space" }, maxLabel: { zh: "被頻繁陪伴", en: "Constant company" }, direction: 1 },
  { id: 14, dimension: "SN", text: { zh: "我判斷對方是否適合，會看", en: "I judge suitability based on" }, minLabel: { zh: "價值觀契合", en: "Values" }, maxLabel: { zh: "靈魂的共鳴", en: "Soul resonance" }, direction: 1 },
  { id: 15, dimension: "TF", text: { zh: "當我受傷時，我希望對方", en: "When hurt, I want them to" }, minLabel: { zh: "給予實質建議", en: "Give solutions" }, maxLabel: { zh: "接納我情緒", en: "Accept feelings" }, direction: 1 },
  { id: 16, dimension: "JP", text: { zh: "關係不確定時，我會", en: "During uncertainty, I" }, minLabel: { zh: "想趕快釐清", en: "Clarify ASAP" }, maxLabel: { zh: "先感受流動", en: "Feel the flow" }, direction: 1 },
  { id: 17, dimension: "EI", text: { zh: "我表達喜歡的方式比較是", en: "I express love by" }, minLabel: { zh: "默默地守護", en: "Silent guarding" }, maxLabel: { zh: "熱情地訴說", en: "Verbal heat" }, direction: 1 },
  { id: 18, dimension: "SN", text: { zh: "我更容易因為什麼而心動", en: "I feel a spark when" }, minLabel: { zh: "實質的付出", en: "Practical acts" }, maxLabel: { zh: "深度的懂我", en: "Deeply known" }, direction: 1 },
  { id: 19, dimension: "TF", text: { zh: "如果要做重要決定，我會", en: "For big decisions, I" }, minLabel: { zh: "冷靜利弊分析", en: "Analyze facts" }, maxLabel: { zh: "憑藉內心直覺", en: "Trust intuition" }, direction: 1 },
  { id: 20, dimension: "JP", text: { zh: "我理想中的戀愛節奏是", en: "My ideal pace is" }, minLabel: { zh: "安穩有步調", en: "Steady pace" }, maxLabel: { zh: "隨心所欲感", en: "Freedom flow" }, direction: 1 }
];

export interface ExpandedMBTIResult extends MBTIResult {
  oneSentence: MultiLangString;
  inLove: MultiLangString;
  inConflict: MultiLangString;
  needs: MultiLangString;
  characterImg: string;
  loveTypeInterpretation: MultiLangString;
  vibeTag: MultiLangString;
  color: string;
  visualPrompt?: string; 
  // New enriched fields
  bestMatch: string[];
  toxicMatch: string[];
  idealDate: MultiLangString;
  loveLanguages: MultiLangString[];
}

export const GLOBAL_VISUAL_RULE = `
STYLE GUIDE: "Chibi Fantasy Sticker Art".
1. PROPORTIONS: Super Deformed (SD), Head is 50% of image, tiny body, tiny limbs. Cute and round.
2. ART STYLE: Flat vector illustration, clean lines, pastel colors, soft shading (no realistic gradients).
3. OUTLINE: Must have a thick WHITE STICKER OUTLINE around the character.
4. CONTENT: Fantasy RPG Class archetypes (Mage, Knight, King, etc) interpreted as cute chibi characters. NO REALISTIC HUMANS.
5. VIBE: LINE Sticker x MapleStory x Dark Romance.
6. BACKGROUND: White background (for sticker effect).
`;

export const MBTI_RESULTS: Record<string, ExpandedMBTIResult> = {
  "INTJ": { 
    mbti: "INTJ", name: { zh: "深謀君王", en: "The Strategy King" }, emoji: "👑", 
    tagline: { zh: "在陰影中守護，愛是縝密的計劃", en: "Guarding from the shadows; love is a meticulous plan" },
    description: { zh: "你是冷靜的觀察者，帶有一點神祕的侵略性。", en: "A cool observer with a hint of mysterious aggression." },
    oneSentence: { zh: "你逃不掉的，因為我早已把你寫進我的未來", en: "You can't escape, because I've already written you into my future" },
    inLove: { zh: "會默默觀察你的一舉一動，並排除掉所有威脅你的因素", en: "Silent observer; removes all threats to your well-being" },
    inConflict: { zh: "冷處理之王，直到想出完美的解決路徑才開口", en: "King of cold processing until a perfect path is found" },
    needs: { zh: "被理解冷酷下的深情，與智性上的高度共鳴", en: "Affection under the cold shell; intellectual resonance" },
    strength: { zh: "極致忠誠、洞察力強", en: "Extreme loyalty, high insight" },
    warning: { zh: "過度掌控、情感隔閡", en: "Overly controlling, emotional gap" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "影子君王", en: "Shadow King" },
    characterImg: "/images/mbti/INTJ.png",
    color: "#B0C4DE", 
    visualPrompt: "Class: Shadow King. A cute chibi king sitting on a floating chess piece. Wearing a dark blue cloak with silver trim. Expression: Calculating but cute. Holding a small pawn.",
    bestMatch: ["ENFP", "ENTP"],
    toxicMatch: ["ESFJ", "ISFJ"],
    idealDate: { zh: "安靜的博物館之旅，接著在深夜咖啡廳深入辯論人類的未來。", en: "A quiet museum tour followed by a deep late-night debate about the future of humanity." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "精心時刻", en: "Quality Time" }]
  },
  "ENTJ": { 
    mbti: "ENTJ", name: { zh: "鐵血領主", en: "The Iron Lord" }, emoji: "⚔️", 
    tagline: { zh: "征服世界，是為了將它獻給你", en: "Conquering the world just to gift it to you" },
    description: { zh: "你是強勢的保護者，愛就是要讓你過得最好。", en: "A dominant protector; love means giving you the absolute best." },
    oneSentence: { zh: "我已經為我們規劃好了未來一百年，你只需跟隨", en: "I've planned our next century; you just need to follow" },
    inLove: { zh: "會主動清除你生活中的所有障礙，像軍隊般守護這段關係", en: "Clears all obstacles in your life; guards the bond like an army" },
    inConflict: { zh: "習慣直接下達指令解決問題，容易忽略你的細微情緒", en: "Direct commands to solve issues; might miss subtle feelings" },
    needs: { zh: "對你能力的仰慕，與能和你並肩作戰的夥伴", en: "Admiration of your power; a partner to fight alongside" },
    strength: { zh: "負責、強大、充滿安全感", en: "Responsible, powerful, secure" },
    warning: { zh: "容易過於霸道", en: "Prone to being overbearing" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "可愛軍閥", en: "Cute Warlord" },
    characterImg: "/images/mbti/ENTJ.png",
    color: "#C0392B", 
    visualPrompt: "Class: Cute Warlord. A chibi commander with a red cape fluttering. Standing on a map. Holding a tiny sword. Expression: Confident smirk.",
    bestMatch: ["INTP", "INFP"],
    toxicMatch: ["ISFP", "ISFJ"],
    idealDate: { zh: "一場高質感的晚宴，或是一起參加具有挑戰性的雙人競賽。", en: "A high-class gala dinner or participating in a challenging duo competition together." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "禮物", en: "Gifts" }]
  },
  "INTP": { 
    mbti: "INTP", name: { zh: "秘術學者", en: "The Arcane Sage" }, emoji: "🧙‍♂️", 
    tagline: { zh: "在宇宙中，尋找關於你的邏輯", en: "Finding the logic of you in the universe" },
    description: { zh: "你是清醒的思考者，愛情對你來說是最有趣的謎題。", en: "A awake thinker, love is the most fun puzzle." },
    oneSentence: { zh: "我或許不善言辭，但我大腦裡寫滿了對你的研究", en: "I may be quiet, but my mind is full of research about you" },
    inLove: { zh: "會嘗試用邏輯去理解感性的你，給予最真誠且純粹的專注", en: "Uses logic to understand emotions, offering pure focus" },
    inConflict: { zh: "試圖理出衝突的根源，這常被對方解讀為冷漠分析", en: "Finds the root of conflict, often seen as cold analysis" },
    needs: { zh: "智性的共鳴，與一個能容納你怪奇想法的避風港", en: "Intellectual resonance and a haven for your quirky ideas" },
    strength: { zh: "純真、有深度", en: "Innocent, extremely deep" },
    warning: { zh: "忽冷忽熱、不重儀式", en: "Hot and cold, ignores ritual" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "軟萌法師", en: "Soft Wizard" },
    characterImg: "/images/mbti/INTP.png",
    color: "#E6E6FA", 
    visualPrompt: "Class: Soft Wizard. A chibi wizard in oversized lavender robes. Floating books around head. Expression: Distracted/Curious. Holding a bubbling test tube.",
    bestMatch: ["ENTJ", "ESTJ"],
    toxicMatch: ["ESFJ", "ENFJ"],
    idealDate: { zh: "逛科技展覽或書店，然後一起窩在沙發上打電動。", en: "Visiting a tech expo or bookstore, then gaming together on the couch." },
    loveLanguages: [{ zh: "精心時刻", en: "Quality Time" }, { zh: "服務的行動", en: "Acts of Service" }]
  },
  "ENTP": { 
    mbti: "ENTP", name: { zh: "鬼才發明家", en: "The Mad Inventor" }, emoji: "💡", 
    tagline: { zh: "打破規劇，重構浪漫", en: "Breaking rules, reconstructing romance" },
    description: { zh: "你是充滿創意的冒險家，愛情是場有趣的實驗。", en: "A creative adventurer, love is a fun experiment." },
    oneSentence: { zh: "跟我在一起，你永遠猜不到下秒會有什麼驚喜", en: "With me, you'll never guess the next second's surprise" },
    inLove: { zh: "愛得隨性且有趣，會用各種奇特的想法來挑戰與寵溺你", en: "Casual and fun; challenges and pampers with odd ideas" },
    inConflict: { zh: "喜歡辯論到贏，常忽略了當下的情緒安撫", en: "Loves to win debates, often overlooking emotional comfort" },
    needs: { zh: "智性的對等溝通與無限的自由，能跟上你腦洞的人", en: "Intellectual parity, total freedom, and someone fast" },
    strength: { zh: "機智、活力十足", en: "Witty, full of vitality" },
    warning: { zh: "不夠穩重、三分熱度", en: "Unstable, short-term focus" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "調皮天才", en: "Playful Genius" },
    characterImg: "/images/mbti/ENTP.png",
    color: "#9B59B6", 
    visualPrompt: "Class: Mad Inventor. A chibi character with steampunk goggles and a messy scarf. Holding a lightbulb that is sparking. Expression: Mischievous grin.",
    bestMatch: ["INFJ", "INTJ"],
    toxicMatch: ["ISFJ", "ISTJ"],
    idealDate: { zh: "去沒去過的怪奇景點探險，或是一起嘗試從沒吃過的異國料理。", en: "Exploring a weird, unknown spot or trying exotic food you've never had before." },
    loveLanguages: [{ zh: "精心時刻", en: "Quality Time" }, { zh: "身體接觸", en: "Physical Touch" }]
  },
  "INFJ": { 
    mbti: "INFJ", name: { zh: "神秘祭司", en: "The Mystic Priest" }, emoji: "🕯️", 
    tagline: { zh: "洞察深淵，依然溫柔", en: "Peering into the abyss, yet remaining gentle" },
    description: { zh: "你是深沉的導師，愛得像海底的洋流，靜謐而強大。", en: "A deep mentor, loving like ocean currents, quiet yet strong." },
    oneSentence: { zh: "你看透了一切虛幻，卻依然選擇深愛這個世界", en: "Seeing through illusions, yet choosing to love the world deeply" },
    inLove: { zh: "會將你的人生規劃進他的靈魂深處，給予最穩定的精神支撐", en: "Plans you into his soul, offering the most stable mental support" },
    inConflict: { zh: "極度理性地處理情緒，可能顯得有些冷酷，實則是為了保護彼此", en: "Handles emotions logically; may seem cold but protects the bond" },
    needs: { zh: "一個懂你的面具下的疲憊、並給你溫熱回應的人", en: "Someone who knows the fatigue under your mask and responds warmly" },
    strength: { zh: "洞察人心、包容性極強", en: "Deep insight, highly inclusive" },
    warning: { zh: "常因過度思考而感到孤獨", en: "Often lonely due to overthinking" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "溫柔先知", en: "Gentle Oracle" },
    characterImg: "/images/mbti/INFJ.png",
    color: "#ABC9A8", 
    visualPrompt: "Class: Gentle Oracle. A chibi priest with a hood covering eyes slightly. Holding a glowing candle. Expression: Serene smile.",
    bestMatch: ["ENTP", "ENFP"],
    toxicMatch: ["ESTP", "ISTP"],
    idealDate: { zh: "在安靜的書店角落共讀一本書，然後去散步聊哲學。", en: "Reading together in a quiet bookshop corner, then a walk discussing philosophy." },
    loveLanguages: [{ zh: "精心時刻", en: "Quality Time" }, { zh: "肯定的言語", en: "Words of Affirmation" }]
  },
  "INFP": { 
    mbti: "INFP", name: { zh: "森林精靈", en: "The Forest Spirit" }, emoji: "🦋", 
    tagline: { zh: "追隨星辰，守護純真", en: "Following stars, guarding innocence" },
    description: { zh: "你是純粹的理想主義者，愛的是靈魂的共鳴。", en: "A pure idealist, loving soul resonance." },
    oneSentence: { zh: "在庸俗的世界裡，你始終守護著最純淨的對話", en: "In a mundane world, you always guard the purest dialogue" },
    inLove: { zh: "給予對方超越現實的包容，願意為了守護這份純真付出一切", en: "Gives beyond-reality tolerance, sacrifices all for innocence" },
    inConflict: { zh: "會因理想破滅而感到極度憂傷，陷入深沉的自我懷疑", en: "Deep sorrow when ideals shatter, falling into self-doubt" },
    needs: { zh: "被珍視那顆易碎卻珍貴的心，與無條件的情感支持", en: "Cherishing that fragile yet precious heart with unconditional support" },
    strength: { zh: "共情力滿分、忠誠專一", en: "Perfect empathy, loyal and dedicated" },
    warning: { zh: "容易過度美化對方", en: "Prone to over-idealizing partners" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "自然妖精", en: "Nature Fairy" },
    characterImg: "/images/mbti/INFP.png",
    color: "#F8C8DC", 
    visualPrompt: "Class: Nature Fairy. A chibi fairy with butterfly wings. Sitting on a mushroom or flower. Holding a book of poems. Expression: Dreamy/Shy.",
    bestMatch: ["ENFJ", "ENTJ"],
    toxicMatch: ["ESTJ", "ISTJ"],
    idealDate: { zh: "去森林或海邊野餐，寫詩，聊關於宇宙與夢想的秘密。", en: "Picnic in a forest or beach, writing poems, sharing secrets about dreams." },
    loveLanguages: [{ zh: "肯定的言語", en: "Words of Affirmation" }, { zh: "精心時刻", en: "Quality Time" }]
  },
  "ENFJ": { 
    mbti: "ENFJ", name: { zh: "光輝使者", en: "The Radiant Herald" }, emoji: "✨", 
    tagline: { zh: "掌舵未來，溫暖人心", en: "Steering the future, warming hearts" },
    description: { zh: "你是天生的導師，希望彼此都能成為更好的人。", en: "A natural mentor lover, helping both grow." },
    oneSentence: { zh: "我最大的幸福，就是看著你在我的愛裡閃閃發亮", en: "My greatest joy is seeing you shine in my love" },
    inLove: { zh: "主動規劃所有的進程，給予對方全方位的關懷與引導", en: "Proactively plans everything; total care and guidance" },
    inConflict: { zh: "會感到強烈的挫敗感，試圖站在道德高地說服對方", en: "Strong frustration, attempts to persuade from moral high ground" },
    needs: { zh: "被強烈地肯定與感激，以及靈魂深處的真誠回饋", en: "Strong affirmation, gratitude, and sincere soul feedback" },
    strength: { zh: "體貼、極具領袖魅力", en: "Thoughtful, charismatic leader" },
    warning: { zh: "控制慾強、負擔感", en: "Controlling, overbearing" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "持光者", en: "Light Bearer" },
    characterImg: "/images/mbti/ENFJ.png",
    color: "#FFD700", 
    visualPrompt: "Class: Light Bearer. A chibi paladin in golden robes. Holding a staff that emits warm light. Expression: Warm, welcoming, open arms.",
    bestMatch: ["INFP", "ISFP"],
    toxicMatch: ["ISTP", "INTP"],
    idealDate: { zh: "一起去當志工，或是一場深度的心靈成長工作坊。", en: "Volunteering together, or attending a deep spiritual workshop." },
    loveLanguages: [{ zh: "肯定的言語", en: "Words of Affirmation" }, { zh: "精心時刻", en: "Quality Time" }]
  },
  "ENFP": { 
    mbti: "ENFP", name: { zh: "吟遊詩人", en: "The Bard" }, emoji: "🌻", 
    tagline: { zh: "追隨陽光，散播快樂", en: "Following the sun, spreading joy" },
    description: { zh: "你是熱情的激發者，身邊永遠充滿無限的可能。", en: "A passionate inspirer, always full of possibilities." },
    oneSentence: { zh: "遇見你之後，我發現生活原來可以這麼彩色", en: "After meeting you, I found life can be so colorful" },
    inLove: { zh: "給予對方最強的情緒價值，每天都像是在熱戀期", en: "Offers highest emotional value; every day is a honeymoon" },
    inConflict: { zh: "情緒反應快且劇烈，需要對方及時的擁抱與安慰", en: "Fast and intense emotional reactions; needs hugs and comfort" },
    needs: { zh: "被全然地接納與鼓勵，以及源源不斷的新鮮體驗", en: "Total acceptance, encouragement, and fresh experiences" },
    strength: { zh: "元氣滿滿、充滿想像力", en: "Full of energy, imaginative" },
    warning: { zh: "缺乏耐心、情緒化", en: "Lacks patience, emotional" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "快樂旅人", en: "Joyful Traveler" },
    characterImg: "/images/mbti/ENFP.png",
    color: "#98FB98", 
    visualPrompt: "Class: Joyful Bard. A chibi traveler with a big hat and a ukulele. Surrounded by confetti or sparkles. Expression: Big open-mouth laugh/smile.",
    bestMatch: ["INTJ", "INFJ"],
    toxicMatch: ["ISTJ", "ESTJ"],
    idealDate: { zh: "一場沒有目的地的城市漫遊，看到什麼吃什麼，隨性而至。", en: "A purposeless city wander, eating whatever looks good, totally spontaneous." },
    loveLanguages: [{ zh: "肯定的言語", en: "Words of Affirmation" }, { zh: "身體接觸", en: "Physical Touch" }]
  },
  "ISTJ": { 
    mbti: "ISTJ", name: { zh: "皇家護衛", en: "The Royal Guard" }, emoji: "🛡️", 
    tagline: { zh: "在細節中沈淪，愛是永恆的記錄", en: "Sinking into details; love is an eternal record" },
    description: { zh: "你是最可靠的背影，記住了關於你的一切小事。", en: "The most reliable presence; remembering every tiny detail of you." },
    oneSentence: { zh: "你的喜好都在我的清單裡，每一條我都會完美達成", en: "Your preferences are in my logs; every single one will be met" },
    inLove: { zh: "會建立一套專屬你的日常規範，確保你的生活有序且安全", en: "Establishes a dedicated routine for you to ensure safety" },
    inConflict: { zh: "用事實說話，對無理取鬧感到非常頭疼", en: "Facts over feelings; struggles with irrational drama" },
    needs: { zh: "穩定的生活結構，與對他付出的具體認可", en: "Stable life structure; concrete recognition of efforts" },
    strength: { zh: "絕對可靠、言出必行", en: "Absolutely reliable, man of his word" },
    warning: { zh: "生活稍顯單調", en: "Life can be monotonous" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "可愛騎士", en: "Cute Knight" },
    characterImg: "/images/mbti/ISTJ.png",
    color: "#74B9FF", 
    visualPrompt: "Class: Cute Knight. A chibi guard in polished silver armor. Holding a large shield. Expression: Serious, stoic, alert.",
    bestMatch: ["ESFP", "ESTP"],
    toxicMatch: ["ENFP", "INFP"],
    idealDate: { zh: "按照計畫好的行程表，去評價最高的餐廳享受經典晚餐。", en: "Following a planned itinerary, enjoying a classic dinner at a top-rated spot." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "精心時刻", en: "Quality Time" }]
  },
  "ISFJ": { 
    mbti: "ISFJ", name: { zh: "白袍醫者", en: "The White Healer" }, emoji: "🥐", 
    tagline: { zh: "揉碎溫柔，發酵愛意", en: "Kneading tenderness, fermenting love" },
    description: { zh: "你是溫潤的照顧者，習慣在細節處溫暖人心。", en: "A gentle caregiver, warm through tiny details." },
    oneSentence: { zh: "世界再亂，我也會為你守護那盞回家的燈", en: "No matter the chaos, I will guard the home light for you" },
    inLove: { zh: "無怨無悔地付出，會記住你所有的細小習慣並體貼入微", en: "Selfless giving, remembering all your tiny habits" },
    inConflict: { zh: "習慣忍讓，累積過多負能量後會突然心碎落淚", en: "Endures too much; sudden heartbreak and tears after buildup" },
    needs: { zh: "被需要、被讚美，感受到自己的付出是被珍惜的", en: "To be needed, praised, and to feel their effort is valued" },
    strength: { zh: "體貼入微、周到", en: "Ultra-caring, thorough" },
    warning: { zh: "過度犧牲、易被忽視", en: "Prone to over-sacrificing, ignored" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "溫暖看護", en: "Warm Caregiver" },
    characterImg: "/images/mbti/ISFJ.png",
    color: "#F0F8FF", 
    visualPrompt: "Class: White Healer. A chibi character in a white apron/robe. Holding a first aid kit and a croissant. Expression: Gentle, worried smile.",
    bestMatch: ["ESFJ", "ESTP"],
    toxicMatch: ["ENTP", "INTJ"],
    idealDate: { zh: "在家一起做一頓豐盛的晚餐，然後窩在沙發看一部老電影。", en: "Cooking a big dinner at home, then cuddling on the sofa watching an old movie." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "肯定的言語", en: "Words of Affirmation" }]
  },
  "ESTJ": { 
    mbti: "ESTJ", name: { zh: "帝國執政", en: "The Grand Overseer" }, emoji: "👮", 
    tagline: { zh: "規範愛意，你是我的唯一重任", en: "Regulating affection; you are my only mission" },
    description: { zh: "你是秩序的化身，對這段感情有無比的責任感。", en: "The embodiment of order; carrying a heavy duty for this love." },
    oneSentence: { zh: "這段關係已經進入我的管理範疇，我會負責到底", en: "This relationship is now under my management; I'll handle it" },
    inLove: { zh: "會像教官一樣關心你的起居，用最強硬的方式愛護你", en: "Cares for your life like a coach; protective in the strongest way" },
    inConflict: { zh: "第一時間釐清對錯，希望一切都有法可依", en: "Clarifies right and wrong immediately; seeks order" },
    needs: { zh: "權威的認可，與高效的溝通模式", en: "Authority recognition; efficient communication" },
    strength: { zh: "執行力滿分、踏實", en: "Perfect execution, grounded" },
    warning: { zh: "有時太過說教", en: "Can be preachy at times" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "秩序執行官", en: "Order Enforcer" },
    characterImg: "/images/mbti/ESTJ.png",
    color: "#8B4513", 
    visualPrompt: "Class: Order Enforcer. A chibi officer in a neat uniform. Holding a clipboard and pointing a baton. Expression: Stern, authoritative but cute.",
    bestMatch: ["ISTP", "ISFP"],
    toxicMatch: ["INFP", "ENFP"],
    idealDate: { zh: "參加一場正式的社交舞會，或是去觀看一場精彩的體育賽事。", en: "Attending a formal gala, or watching an exciting sports match." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "禮物", en: "Gifts" }]
  },
  "ESFJ": { 
    mbti: "ESFJ", name: { zh: "宮廷長", en: "The Royal Host" }, emoji: "🧁", 
    tagline: { zh: "甜蜜共享，守護和諧", en: "Sweet sharing, guarding harmony" },
    description: { zh: "你是熱心的組織者，致力於打造最和諧的環境。", en: "A hearty organizer, striving for a harmonious environment." },
    oneSentence: { zh: "我只想把全世界最好的，都整齊地擺在你面前", en: "I want to place the best of the world neatly before you" },
    inLove: { zh: "極其周到地照顧對方的所有社交與情緒，付出感極強", en: "Thoroughly manages social/emotional needs; strong giver" },
    inConflict: { zh: "容易感到委屈與不平，會因為對方不合群而焦慮", en: "Easily hurt/unbalanced; anxious if the partner doesn't fit in" },
    needs: { zh: "社會認可的身份、家庭的穩定與頻喚的情感確認", en: "Social status, family stability, and frequent confirmation" },
    strength: { zh: "大方大氣、社交高手", en: "Generous, social expert" },
    warning: { zh: "易情緒勒索、玻璃心", en: "Prone to emotional blackmail, fragile" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "社交女王", en: "Social Queen" },
    characterImg: "/images/mbti/ESFJ.png",
    color: "#FDCB6E", 
    visualPrompt: "Class: Royal Host. A chibi character in a party dress/suit. Holding a tray of cupcakes. Expression: Beaming smile, winking.",
    bestMatch: ["ISFP", "ISFJ"],
    toxicMatch: ["INTJ", "INTP"],
    idealDate: { zh: "和一群朋友去遊樂園，然後兩個人去吃網美甜點店。", en: "Amusement park with friends, then just the two of you at a cute dessert cafe." },
    loveLanguages: [{ zh: "肯定的言語", en: "Words of Affirmation" }, { zh: "服務的行動", en: "Acts of Service" }]
  },
  "ISTP": { 
    mbti: "ISTP", name: { zh: "工匠大師", en: "The Artificer" }, emoji: "🔧", 
    tagline: { zh: "活在當下，修復憂愁", en: "Living now, fixing sorrow" },
    description: { zh: "你是務實的行動派，愛你就是幫你搞定所有困難。", en: "A practical doer, loving you means fixing all your troubles." },
    oneSentence: { zh: "不愛說漂亮話，但你需要時我永遠都在", en: "No sweet talk, but always there when you need me" },
    inLove: { zh: "給你很大的個人空間，卻會在關鍵時刻展現最強的爆發力", en: "Gives space, yet shows strongest explosive support in crises" },
    inConflict: { zh: "直球對決或冷酷神隱，不耐煩無意義的情緒拉扯", en: "Direct confrontation or ghosting; impatient with drama" },
    needs: { zh: "一個懂你的沈默、並能陪你一起瘋狂探險的夥伴", en: "A partner who knows your silence and joins crazy adventures" },
    strength: { zh: "冷靜可靠、行動力極強", en: "Calm, reliable, active" },
    warning: { zh: "情感交流匱乏", en: "Lack of emotional communication" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "沈默修理者", en: "Silent Fixer" },
    characterImg: "/images/mbti/ISTP.png",
    color: "#B0C4DE", 
    visualPrompt: "Class: Silent Fixer. A chibi mechanic in overalls. Holding a wrench larger than their body. Expression: Bored/Neutral cool.",
    bestMatch: ["ESTJ", "ENTJ"],
    toxicMatch: ["ENFJ", "INFJ"],
    idealDate: { zh: "去玩極限運動、卡丁車，或者一起動手組裝傢俱。", en: "Extreme sports, go-karting, or assembling furniture together." },
    loveLanguages: [{ zh: "服務的行動", en: "Acts of Service" }, { zh: "身體接觸", en: "Physical Touch" }]
  },
  "ISFP": { 
    mbti: "ISFP", name: { zh: "流浪畫家", en: "The Wandering Artist" }, emoji: "🎨", 
    tagline: { zh: "在靜謐中感知愛的力量", en: "Perceiving the power of love in silence" },
    description: { zh: "你是感性的藝術家，愛得低調卻極致。", en: "A sensitive artist, loving quietly but intensely." },
    oneSentence: { zh: "你是那抹清晨的微光，照亮了平凡的日常", en: "You are that glimmer of dawn, lighting up ordinary days" },
    inLove: { zh: "會細膩地觀察對方的喜好，用充滿美感的行動來寵溺另一半", en: "Observes preferences finely, pampering with aesthetic actions" },
    inConflict: { zh: "容易感到委屈，習慣躲進自己的世界，透過沈默消化傷害", en: "Easily hurt, retreats into their own world, processing pain through silence" },
    needs: { zh: "一個能讀懂你沈默、並給你絕對安全感的懷抱", en: "An embrace that decodes your silence and offers security" },
    strength: { zh: "審美極佳、溫柔體貼", en: "Great aesthetic, gentle and thoughtful" },
    warning: { zh: "過度敏感、缺乏溝通", en: "Overly sensitive, lacks communication" },
    loveTypeInterpretation: { zh: "戀愛 I：在關係中，你需要安全的空間，透過內在感受來確認愛。", en: "Love I: You need safe space to confirm love through inner feelings." },
    vibeTag: { zh: "軟萌藝術家", en: "Soft Artist" },
    characterImg: "/images/mbti/ISFP.png",
    color: "#FFFACD", 
    visualPrompt: "Class: Soft Artist. A chibi artist with a beret. Holding a paintbrush and a small canvas. Paint splatters on face. Expression: Soft, focused.",
    bestMatch: ["ENFJ", "ESFJ"],
    toxicMatch: ["ENTJ", "ESTJ"],
    idealDate: { zh: "去美術館看展，然後去公園散步，一起聽同一首歌。", en: "Art gallery hopping, then walking in the park sharing earphones." },
    loveLanguages: [{ zh: "精心時刻", en: "Quality Time" }, { zh: "服務的行動", en: "Acts of Service" }]
  },
  "ESTP": { 
    mbti: "ESTP", name: { zh: "無畏勇者", en: "The Daredevil" }, emoji: "🏎️", 
    tagline: { zh: "風馳電掣，愛在瞬間", en: "Fast and furious, love in a blink" },
    description: { zh: "你是大膽的開拓者，愛情是一場刺激的競速。", en: "A bold pioneer, love is a thrilling high-speed race." },
    oneSentence: { zh: "如果你跟不上我的速度，那就看著我的尾燈嘆氣吧", en: "If you can't keep up, just watch my taillights and sigh" },
    inLove: { zh: "用各種新奇的冒險來填滿生活，愛得直接且狂放", en: "Fills life with novel adventures; direct and wild" },
    inConflict: { zh: "直球對決，不愛冷戰，吵架對你來說也是種交流", en: "Direct confrontation; fighting is communication" },
    needs: { zh: "極致的感官刺激、挑戰與一個能跟你勢均力敵的對手", en: "Ultimate sensory stimuli, challenge, and an equal rival" },
    strength: { zh: "有膽識、反應快", en: "Bold, fast reaction" },
    warning: { zh: "三分鐘熱度、忽略細節", en: "Short-lived interest, ignores details" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "Q版英雄", en: "Action Hero" },
    characterImg: "/images/mbti/ESTP.png",
    color: "#FF6F61", 
    visualPrompt: "Class: Action Hero. A chibi racer with aviator goggles on forehead. Wearing a leather jacket. Leaning forward. Expression: Cool confident grin.",
    bestMatch: ["ISFJ", "ISTJ"],
    toxicMatch: ["INFJ", "INTJ"],
    idealDate: { zh: "衝浪、跳傘，或者去最熱鬧的酒吧喝一杯。", en: "Surfing, skydiving, or drinks at the liveliest bar in town." },
    loveLanguages: [{ zh: "身體接觸", en: "Physical Touch" }, { zh: "禮物", en: "Gifts" }]
  },
  "ESFP": { 
    mbti: "ESFP", name: { zh: "閃耀明星", en: "The Superstar" }, emoji: "💃", 
    tagline: { zh: "舞動當下，盡享甜蜜", en: "Dancing the present, enjoying sweetness" },
    description: { zh: "你是舞台中心的焦點，愛情是你最熱烈的演出。", en: "Center stage focus, love is your most passionate performance." },
    oneSentence: { zh: "別談以後，我們現在就去狂歡、去擁吻吧", en: "Forget later; let's party and kiss right now" },
    inLove: { zh: "愛得轟轟烈烈，會把所有感官快樂都毫無保留地分享", en: "Passionate love, sharing all sensory joys" },
    inConflict: { zh: "害怕沈重的氣氛，會想用快樂或物質來掩蓋問題", en: "Fears heavy vibes, masks problems with joy" },
    needs: { zh: "被全場矚目與讚美，以及一個能陪你瘋到底的靈魂", en: "Attention, praise, and a soul that goes crazy with you" },
    strength: { zh: "魅力爆表、及時行樂", en: "Charming, carpe diem" },
    warning: { zh: "逃避壓力、承諾較輕", en: "Avoids pressure, light commitment" },
    loveTypeInterpretation: { zh: "戀愛 E：在關係中，你傾向透過分享、互動與陪伴來確認愛。", en: "Love E: You confirm love through sharing, interaction, and company." },
    vibeTag: { zh: "舞台愛豆", en: "Stage Idol" },
    characterImg: "/images/mbti/ESFP.png",
    color: "#FF7F50", 
    visualPrompt: "Class: Stage Idol. A chibi character in a party dress/suit. Holding a microphone. Expression: Winking, star-struck eyes.",
    bestMatch: ["ISTJ", "ISFJ"],
    toxicMatch: ["INTJ", "INFJ"],
    idealDate: { zh: "一場驚喜派對，或者去音樂祭從早跳到晚。", en: "A surprise party, or dancing all day at a music festival." },
    loveLanguages: [{ zh: "身體接觸", en: "Physical Touch" }, { zh: "精心時刻", en: "Quality Time" }]
  },
};

export const MBTI_RESULTS_LIST = Object.values(MBTI_RESULTS);

// Kept DiceBear for Zodiacs to avoid breakage, as user specifically requested MBTI updates.
export const ZODIAC_SIGNS: ZodiacSign[] = [
  { 
    id: 'aries', 
    name: { zh: '牡羊座', en: 'Aries' }, 
    date: '3/21 - 4/19', 
    color: '#FF4D4D', 
    emoji: '♈', 
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Aries&backgroundColor=ff4d4d',
    boyfriend: {
      keywords: [{zh: '熱情似火', en: 'Passionate'}, {zh: '長不大的孩子', en: 'Man-Child'}, {zh: '直球對決', en: 'Direct'}],
      desc: { zh: '他的愛就像夏天的雷陣雨，來得快去得也快，但當下絕對是傾盆而下的真心。他不會玩猜心遊戲，愛你就大聲說，生氣就直接吵，吵完又像沒事一樣拉你去吃宵夜。', en: 'His love is like a summer storm—intense and direct. He doesn\'t play mind games; if he loves you, he shouts it; if he\'s mad, he yells, then buys you food like nothing happened.' },
      pros: { zh: '絕對不讓你猜疑，保護慾極強，讓你覺得自己是公主。', en: 'Zero guessing games, extremely protective, treats you like a princess.' },
      cons: { zh: '脾氣暴躁，三分鐘熱度，需要你常常幫他收拾爛攤子。', en: 'Short temper, short attention span, you might need to clean up his mess.' },
      advice: { zh: '千萬不要跟他冷戰，直接告訴他你要什麼，誇獎他像個英雄。', en: 'Never give him the silent treatment. Be direct and praise him like a hero.' }
    },
    girlfriend: {
      keywords: [{zh: '大姐大', en: 'Bossy'}, {zh: '敢愛敢恨', en: 'Fearless'}, {zh: '行動派', en: 'Active'}],
      desc: { zh: '她是愛情裡的戰士，喜歡強者，更喜歡征服強者。如果你比她弱，她會保護你；如果你比她強，她會崇拜你。在她面前，請收起你的優柔寡斷。', en: 'A warrior in love. She likes strong partners. If you are weak, she protects you; if strong, she adores you. Don\'t be indecisive.' },
      pros: { zh: '絕不拖泥帶水，愛你就把全世界搬來給你。', en: 'Decisive. If she loves you, she gives you the world.' },
      cons: { zh: '說話不經大腦，容易傷人而不自知。', en: 'Can be harsh with words without realizing it.' },
      advice: { zh: '陪她瘋、陪她鬧，不要試圖控制她，要跟上她的步伐。', en: 'Join her madness, don\'t control her, keep up with her pace.' }
    }
  },
  { 
    id: 'taurus', 
    name: { zh: '金牛座', en: 'Taurus' }, 
    date: '4/20 - 5/20', 
    color: '#4CAF50', 
    emoji: '♉', 
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Taurus&backgroundColor=4caf50',
    boyfriend: {
      keywords: [{zh: '沈穩可靠', en: 'Steady'}, {zh: '美食家', en: 'Foodie'}, {zh: '悶騷', en: 'Reserved'}],
      desc: { zh: '他的浪漫不是鮮花，而是記得你愛吃哪家麵店，並默默把你的碗填滿。他動作慢，是因為他在確認這一步踩得夠不夠穩。一旦認定你，就是一輩子的責任。', en: 'His romance isn\'t flowers, but filling your bowl with your favorite food. He moves slow to ensure stability. Once he commits, it\'s for life.' },
      pros: { zh: '情緒穩定，理財觀念好，能給你實實在在的未來。', en: 'Emotionally stable, good with money, offers a tangible future.' },
      cons: { zh: '固執得像頭牛，不愛變通，有時無趣到讓人想睡。', en: 'Stubborn as a bull, inflexible, can be boring.' },
      advice: { zh: '不要逼他改變習慣，用美食和質感好物來融化他的心。', en: 'Don\'t force change. Melt his heart with good food and quality items.' }
    },
    girlfriend: {
      keywords: [{zh: '精緻生活', en: 'Classy'}, {zh: '慢熱', en: 'Slow-burn'}, {zh: '佔有慾', en: 'Possessive'}],
      desc: { zh: '她是感官的信徒，喜歡一切有質感的事物。愛對她來說是肌膚的觸碰、是好聞的香水味、是安穩的陪伴。她不會輕易說愛，但會把你照顧得無微不至。', en: 'A believer in senses. Love is touch, scent, and company. She rarely says "I love you" lightly but cares for you deeply.' },
      pros: { zh: '極度忠誠，能把生活打理得井井有條且充滿美感。', en: 'Extremely loyal, organizes life beautifully.' },
      cons: { zh: '鑽牛角尖時誰也拉不回來，對物質安全感要求高。', en: 'Stubborn when stuck, high need for material security.' },
      advice: { zh: '給她足夠的安全感與肢體接觸，不要突然打亂她的計畫。', en: 'Give security and touch. Don\'t disrupt her plans suddenly.' }
    }
  },
  { 
    id: 'gemini', 
    name: { zh: '雙子座', en: 'Gemini' }, 
    date: '5/21 - 6/20', 
    color: '#FFD700', 
    emoji: '♊',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Gemini&backgroundColor=ffd700', 
    boyfriend: {
      keywords: [{zh: '幽默風趣', en: 'Witty'}, {zh: '變化多端', en: 'Variable'}, {zh: '情報中心', en: 'Info Hub'}],
      desc: { zh: '跟他談戀愛像在看 Netflix，每天都有新劇情。他害怕無聊勝過害怕分手。他需要的是一個能跟他「腦力激盪」的玩伴，而不只是一個保母。', en: 'Dating him is like Netflix—new episodes daily. He fears boredom more than breakups. He needs a mental playmate, not a nanny.' },
      pros: { zh: '永遠不會讓你冷場，帶你看遍世界的新奇。', en: 'Never boring, shows you the novelty of the world.' },
      cons: { zh: '承諾對他來說太沈重，容易分心，讓你覺得抓不住。', en: 'Commitment feels heavy, easily distracted, hard to pin down.' },
      advice: { zh: '保持神秘感，不要一次把話說完，讓他永遠對你好奇。', en: 'Stay mysterious, don\'t reveal everything, keep him curious.' }
    },
    girlfriend: {
      keywords: [{zh: '古靈精怪', en: 'Quirky'}, {zh: '雙重人格', en: 'Dual'}, {zh: '話癆', en: 'Chatty'}],
      desc: { zh: '她身體裡住著兩個靈魂，一個想黏你，一個想去流浪。愛上她，你同時擁有了情人、朋友和辯論對手。她最受不了「一成不變」的約會模式。', en: 'Two souls in one body: one clingy, one wandering. Loving her means having a lover, friend, and debater. She hates routine.' },
      pros: { zh: '聰明機靈，能陪你聊哲學也能陪你講幹話。', en: 'Smart, can discuss philosophy or talk trash with you.' },
      cons: { zh: '情緒跳躍太快，上一秒笑下一秒哭，讓人跟不上。', en: 'Mood swings are too fast to catch up with.' },
      advice: { zh: '陪她聊天！傾聽她所有的奇思妙想，不要限制她的交友。', en: 'Chat with her! Listen to her ideas, don\'t limit her social life.' }
    }
  },
  { 
    id: 'cancer', 
    name: { zh: '巨蟹座', en: 'Cancer' }, 
    date: '6/21 - 7/22', 
    color: '#607D8B', 
    emoji: '♋', 
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Cancer&backgroundColor=607d8b',
    boyfriend: {
      keywords: [{zh: '溫柔暖男', en: 'Warm'}, {zh: '玻璃心', en: 'Sensitive'}, {zh: '顧家', en: 'Family-man'}],
      desc: { zh: '他是那個會幫你剝蝦、記住你經期、怕你冷怕你餓的超級保姆。他的愛是滲透式的，像水一樣包圍你。但他堅硬的殼下，藏著一顆極度易碎的心。', en: 'The guy who peels shrimp for you and tracks your period. His love surrounds you like water. But under the shell, he\'s fragile.' },
      pros: { zh: '給予家一般的安全感，細膩體貼，絕對的忠誠。', en: 'Home-like security, detailed care, absolute loyalty.' },
      cons: { zh: '情緒化，喜歡冷暴力，心事都憋在心裡讓人猜。', en: 'Moody, loves silent treatment, hides feelings.' },
      advice: { zh: '不要批評他的家人，多給他情緒價值，主動抱抱他。', en: 'Don\'t criticize his family. Give emotional value and hugs.' }
    },
    girlfriend: {
      keywords: [{zh: '母性光輝', en: 'Maternal'}, {zh: '情緒雷達', en: 'Radar'}, {zh: '黏人', en: 'Clingy'}],
      desc: { zh: '她擁有最強的情緒感知力，你眉頭一皺她就知道你不開心。她渴望建立一個屬於你們的堡壘。對她來說，愛就是「被需要」和「照顧」。', en: 'She senses your mood instantly. She wants to build a fortress with you. To her, love is "being needed" and "caring".' },
      pros: { zh: '溫柔似水，能包容你所有的脆弱與缺點。', en: 'Gentle as water, accepts all your flaws.' },
      cons: { zh: '容易陷入回憶與憂鬱，對任何風吹草動都過度敏感。', en: 'Stuck in memories, overly sensitive to tiny changes.' },
      advice: { zh: '給她無條件的偏愛，讓她知道無論如何你都在。', en: 'Give unconditional bias. Let her know you are always there.' }
    }
  },
  { 
    id: 'leo', 
    name: { zh: '獅子座', en: 'Leo' }, 
    date: '7/23 - 8/22', 
    color: '#FF9800', 
    emoji: '♌', 
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Leo&backgroundColor=ff9800',
    boyfriend: {
      keywords: [{zh: '霸道總裁', en: 'Dominant'}, {zh: '愛面子', en: 'Proud'}, {zh: '大方', en: 'Generous'}],
      desc: { zh: '他希望成為你世界裡的國王，而你是被他寵壞的王后。他愛面子，但在你面前會變成一隻求摸頭的大貓。他的愛是熱烈、高調且毫無保留的。', en: 'He wants to be your King. Proud, but a big cat needing pets privately. His love is loud, hot, and unreserved.' },
      pros: { zh: '願意為你摘星星，保護慾爆棚，帶出去極有面子。', en: 'Will catch stars for you, super protective, looks good publicly.' },
      cons: { zh: '大男人主義，聽不進反對意見，死要面子活受罪。', en: 'Chauvinistic, ignores opposing views, pride over logic.' },
      advice: { zh: '在外給足他面子，在家再讓他跪算盤。誇他就對了。', en: 'Respect him publicly, scold him privately. Just praise him.' }
    },
    girlfriend: {
      keywords: [{zh: '女王氣場', en: 'Queen'}, {zh: '傲嬌', en: 'Tsundere'}, {zh: '向日葵', en: 'Sunny'}],
      desc: { zh: '她是舞台上的主角，自信閃耀。她需要你的目光時刻追隨。雖然外表強勢，其實內心是個渴望被哄的小女孩。如果你能征服她，她會對你死心塌地。', en: 'She is the star on stage, confident and shining. She needs your eyes on her. Strong outside, but a little girl wanting to be coaxed inside. If you conquer her, she is yours.' },
      pros: { zh: '帶出去絕對有面子，熱情大方，是你最忠實的啦啦隊。', en: 'Looks great publicly, passionate, generous, your most loyal cheerleader.' },
      cons: { zh: '佔有慾強，脾氣來得快去得也快，需要常常哄。', en: 'Possessive, quick temper (but quick to cool), needs frequent coaxing.' },
      advice: { zh: '把她當女神寵，但在關鍵時刻要展現你的霸氣。', en: 'Treat her like a goddess, but show your dominance when it matters.' }
    }
  },
  {
    id: 'virgo',
    name: { zh: '處女座', en: 'Virgo' },
    date: '8/23 - 9/22',
    color: '#9C27B0',
    emoji: '♍',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Virgo&backgroundColor=9c27b0',
    boyfriend: {
      keywords: [{zh: '完美主義', en: 'Perfectionist'}, {zh: '細節控', en: 'Detail-Oriented'}, {zh: '口是心非', en: 'Tsundere'}],
      desc: { zh: '他的愛藏在碎碎唸裡。「穿外套沒？」「多喝水。」他對你的挑惕其實是他愛你的方式。他希望你變得更好，而他會是你最堅實的後盾。', en: 'His love is hidden in nagging. "Did you wear a coat?" "Drink water." His pickiness is his way of loving. He wants you to be better and will back you up.' },
      pros: { zh: '做事有條理，生活品質高，永遠把你的事放在心上。', en: 'Organized, high quality of life, always keeps your matters in mind.' },
      cons: { zh: '太愛說教，神經質，有時候會讓人覺得壓力很大。', en: 'Preachy, neurotic, can be stressful to be around.' },
      advice: { zh: '聽出他嘮叨背後的關心，主動幫他分擔焦慮。', en: 'Hear the care behind the nagging, help him share his anxiety.' }
    },
    girlfriend: {
      keywords: [{zh: '潔癖', en: 'Clean'}, {zh: '聰明', en: 'Smart'}, {zh: '奉獻', en: 'Dedicated'}],
      desc: { zh: '她是那個會默默幫你整理衣領、把家裡打掃得一塵不染的人。她的愛是服務型的，雖然嘴上不饒人，但身體卻很誠實地為你付出一切。', en: 'She tidies your collar and cleans the house perfectly. Her love is service-oriented. Sharp tongue, but devoted actions.' },
      pros: { zh: '極度細心，是最好的賢內助，對感情有潔癖般的忠誠。', en: 'Extremely careful, best partner, loyal as if emotionally hygienic.' },
      cons: { zh: '標準太高，容易對小事抓狂，讓你覺得自己永遠不夠好。', en: 'Standards too high, freaks out over small things, makes you feel inadequate.' },
      advice: { zh: '保持整潔，展現你的上進心，不要對她撒謊。', en: 'Stay clean, show ambition, never lie to her.' }
    }
  },
  {
    id: 'libra',
    name: { zh: '天秤座', en: 'Libra' },
    date: '9/23 - 10/22',
    color: '#E91E63',
    emoji: '♎',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Libra&backgroundColor=e91e63',
    boyfriend: {
      keywords: [{zh: '優雅紳士', en: 'Gentleman'}, {zh: '選擇困難', en: 'Indecisive'}, {zh: '好人緣', en: 'Social'}],
      desc: { zh: '他是天生的王子，舉手投足都充滿魅力。他追求的是一段「好看」且「平衡」的關係。他不會跟你大吵大鬧，冷戰是他最擅長的武器。', en: 'A born prince, charming in every move. He seeks a "good-looking" and "balanced" relationship. He won\'t yell; cold war is his weapon.' },
      pros: { zh: '懂得浪漫，品味極佳，會讓你在朋友面前很有面子。', en: 'Romantic, great taste, makes you look good in front of friends.' },
      cons: { zh: '猶豫不決，對誰都好，讓你覺得自己不是唯一。', en: 'Indecisive, nice to everyone, makes you feel not unique.' },
      advice: { zh: '幫他做決定，把自己打扮得漂漂亮亮，成為他的驕傲。', en: 'Make decisions for him, dress up well, be his pride.' }
    },
    girlfriend: {
      keywords: [{zh: '氣質美女', en: 'Elegant'}, {zh: '陪伴狂', en: 'Companion'}, {zh: '公平', en: 'Fair'}],
      desc: { zh: '她需要的是那種「勢均力敵」的愛情。她害怕孤單，喜歡你陪她逛街、吃飯、看電影。對她來說，愛就是兩個人在一起做所有無聊的小事。', en: 'She needs an "equal" love. Fears loneliness, loves your company in shopping and dining. Love is doing boring things together.' },
      pros: { zh: '善解人意，社交能力強，能完美融入你的生活圈。', en: 'Understanding, great social skills, fits perfectly into your circle.' },
      cons: { zh: '依賴心強，容易受朋友影響，需要你不斷的確認與陪伴。', en: 'Dependent, influenced by friends, needs constant confirmation.' },
      advice: { zh: '多陪陪她，給予她足夠的讚美，創造儀式感。', en: 'Spend time with her, give enough praise, create rituals.' }
    }
  },
  {
    id: 'scorpio',
    name: { zh: '天蠍座', en: 'Scorpio' },
    date: '10/23 - 11/21',
    color: '#212121',
    emoji: '♏',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Scorpio&backgroundColor=212121',
    boyfriend: {
      keywords: [{zh: '深情', en: 'Deep'}, {zh: '控制慾', en: 'Controlling'}, {zh: '神秘', en: 'Mysterious'}],
      desc: { zh: '他的愛是窒息式的，要嘛全給，要嘛全無。他會想知道你的一切秘密，掌控你的行蹤。被他愛上是極致的幸福，也是極致的束縛。', en: 'Suffocating love, all or nothing. He wants your secrets and location. Being loved by him is ultimate bliss and bondage.' },
      pros: { zh: '愛上了就是一輩子，願意為你擋下所有子彈，性張力強。', en: 'Loves for life, takes bullets for you, high sexual tension.' },
      cons: { zh: '疑心病重，報復心強，一旦背叛絕無回頭路。', en: 'Suspicious, vengeful, no return after betrayal.' },
      advice: { zh: '對他絕對誠實，不要試探他的底線，給他完全的歸屬感。', en: 'Be absolutely honest, don\'t test his limits, give total belonging.' }
    },
    girlfriend: {
      keywords: [{zh: '性感', en: 'Sexy'}, {zh: '極端', en: 'Extreme'}, {zh: '偵探', en: 'Detective'}],
      desc: { zh: '她是愛情裡的偵探，你的一個眼神她就能讀出你的靈魂。她渴望靈魂深處的共鳴，受不了膚淺的關係。她的愛濃烈如酒，容易讓人醉，也容易傷身。', en: 'A love detective, reads your soul from a glance. Craves deep resonance. Her love is strong like wine, intoxicating but potentially hurtful.' },
      pros: { zh: '深情且專一，能陪你走過人生最低谷，不離不棄。', en: 'Deeply loyal, stays with you through lowest points.' },
      cons: { zh: '情緒極端，佔有慾強到讓人無法呼吸，愛恨分明。', en: 'Extreme emotions, suffocating possessiveness, clear love/hate.' },
      advice: { zh: '不要有任何隱瞞，展現你的脆弱，讓她成為你的唯一。', en: 'No secrets, show vulnerability, make her your one and only.' }
    }
  },
  {
    id: 'sagittarius',
    name: { zh: '射手座', en: 'Sagittarius' },
    date: '11/22 - 12/21',
    color: '#FF5722',
    emoji: '♐',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Sagittarius&backgroundColor=ff5722',
    boyfriend: {
      keywords: [{zh: '自由靈魂', en: 'Free Spirit'}, {zh: '樂觀', en: 'Optimistic'}, {zh: '大男孩', en: 'Big Boy'}],
      desc: { zh: '他是一陣抓不住的風。他愛你，但他更愛自由。跟他在一起每天都像在冒險，充滿歡笑。不要試圖把他關在籠子裡，他會為了自由撞破頭。', en: 'An uncatchable wind. Loves you, but loves freedom more. Daily adventures and laughter. Don\'t cage him; he\'ll break out.' },
      pros: { zh: '幽默風趣，不記仇，能帶你體驗生活最快樂的一面。', en: 'Funny, holds no grudges, shows you the happiest side of life.' },
      cons: { zh: '承諾恐懼症，神經大條，容易忽略你的感受。', en: 'Fear of commitment, oblivious, ignores your feelings.' },
      advice: { zh: '當他最好的玩伴，給他空間，讓他主動回來找你。', en: 'Be his playmate, give space, let him come back to you.' }
    },
    girlfriend: {
      keywords: [{zh: '陽光女孩', en: 'Sunny'}, {zh: '直率', en: 'Straightforward'}, {zh: '哲學家', en: 'Philosopher'}],
      desc: { zh: '她看得很遠，追求的是精神上的契合。她討厭束縛和沈重的責任。她需要一個能陪她看世界、聊未來的伴侶，而不是一個管家公。', en: 'She looks far, seeks spiritual match. Hates chains and heavy duties. Needs a partner to see the world, not a manager.' },
      pros: { zh: '獨立自主，充滿正能量，不會給你太多情感壓力。', en: 'Independent, positive energy, low emotional pressure.' },
      cons: { zh: '說話太直容易傷人，愛好自由讓人覺得抓不住。', en: 'Too blunt, love for freedom makes her hard to hold.' },
      advice: { zh: '支持她的夢想，帶她去旅行，不要用責任綁架她。', en: 'Support her dreams, travel with her, don\'t bind her with duty.' }
    }
  },
  {
    id: 'capricorn',
    name: { zh: '摩羯座', en: 'Capricorn' },
    date: '12/22 - 1/19',
    color: '#795548',
    emoji: '♑',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Capricorn&backgroundColor=795548',
    boyfriend: {
      keywords: [{zh: '工作狂', en: 'Workaholic'}, {zh: '務實', en: 'Pragmatic'}, {zh: '責任感', en: 'Responsible'}],
      desc: { zh: '他的浪漫是把你的名字寫進他的未來規劃裡。他不善言辭，但會默默幫你修好電腦、付清帳單。他的愛是沈重而踏實的，像一座山。', en: 'His romance is writing your name in his future plans. Quiet, but fixes your PC and pays bills. Love is heavy and solid like a mountain.' },
      pros: { zh: '潛力股，能給你最穩定的物質生活，絕不輕易放棄感情。', en: 'High potential, offers stable material life, never gives up easily.' },
      cons: { zh: '無趣，把工作看得比你重，情感表達障礙。', en: 'Boring, prioritizes work over you, struggles to express feelings.' },
      advice: { zh: '理解他的事業心，照顧他的生活，成為他背後的支柱。', en: 'Understand his ambition, care for his life, be his pillar.' }
    },
    girlfriend: {
      keywords: [{zh: '冰山美人', en: 'Ice Queen'}, {zh: '女強人', en: 'Boss Lady'}, {zh: '慢熱', en: 'Slow'}],
      desc: { zh: '她外表高冷，內心其實渴望被溫暖。她對感情非常謹慎，會評估你的各項條件。一旦認定你，她會把你當作人生最重要的合夥人。', en: 'Cold outside, wants warmth inside. Cautious in love, evaluates you. Once decided, you are her most important life partner.' },
      pros: { zh: '成熟穩重，能幫你分擔人生難題，極度自律。', en: 'Mature, helps with life problems, highly disciplined.' },
      cons: { zh: '太過理性，缺乏情趣，心情不好時會變成一座冰山。', en: 'Too rational, lacks romance, becomes an iceberg when moody.' },
      advice: { zh: '展現你的上進心與能力，融化她的冰冷，給她承諾。', en: 'Show ambition and ability, melt her coldness, give promises.' }
    }
  },
  {
    id: 'aquarius',
    name: { zh: '水瓶座', en: 'Aquarius' },
    date: '1/20 - 2/18',
    color: '#00BCD4',
    emoji: '♒',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Aquarius&backgroundColor=00bcd4',
    boyfriend: {
      keywords: [{zh: '外星人', en: 'Alien'}, {zh: '博愛', en: 'Humanitarian'}, {zh: '理智', en: 'Rational'}],
      desc: { zh: '你永遠猜不透他在想什麼。他需要的是靈魂伴侶，是一個能懂他獨特邏輯的人。他對朋友很好，有時讓你覺得你比朋友還不如。', en: 'You never guess his thoughts. Needs a soulmate who gets his logic. Treats friends well, sometimes better than you.' },
      pros: { zh: '尊重你的自由，思想開放，跟他在一起永遠有新鮮話題。', en: 'Respects freedom, open-minded, always fresh topics.' },
      cons: { zh: '忽冷忽熱，抽離感強，讓你覺得像在跟機器人談戀愛。', en: 'Hot and cold, detached, feels like dating a robot.' },
      advice: { zh: '保持獨立，不要太黏他，當他最聰明的朋友。', en: 'Stay independent, don\'t cling, be his smartest friend.' }
    },
    girlfriend: {
      keywords: [{zh: '特立獨行', en: 'Unique'}, {zh: '智慧', en: 'Wise'}, {zh: '疏離', en: 'Distant'}],
      desc: { zh: '她不屬於任何人，她只屬於她自己。她討厭傳統的束縛，喜歡獨特的人事物。想追她，你必須足夠特別，並且給她極大的空間。', en: 'Belongs to no one but herself. Hates tradition, loves uniqueness. To woo her, be special and give huge space.' },
      pros: { zh: '獨立自主，不依賴，能給你很多獨特的見解。', en: 'Independent, not clingy, gives unique insights.' },
      cons: { zh: '難以捉摸，對感情反應遲鈍，常讓人覺得距離很遠。', en: 'Hard to read, slow in love, feels distant.' },
      advice: { zh: '不要試圖改變她，跟上她的思維跳躍，做個有趣的人。', en: 'Don\'t change her, keep up with her mind, be interesting.' }
    }
  },
  {
    id: 'pisces',
    name: { zh: '雙魚座', en: 'Pisces' },
    date: '2/19 - 3/20',
    color: '#03A9F4',
    emoji: '♓',
    characterImg: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Pisces&backgroundColor=03a9f4',
    boyfriend: {
      keywords: [{zh: '浪漫詩人', en: 'Poet'}, {zh: '多情', en: 'Affectionate'}, {zh: '軟弱', en: 'Soft'}],
      desc: { zh: '他活在童話故事裡，會為你製造各種浪漫驚喜。他心地善良，容易心軟。他是最好的傾聽者，能接住你所有的情緒。', en: 'Lives in fairytales, creates romantic surprises. Kind heart, soft. Best listener, catches all your emotions.' },
      pros: { zh: '溫柔體貼，浪漫至極，願意為愛犧牲奉獻。', en: 'Gentle, extremely romantic, sacrifices for love.' },
      cons: { zh: '優柔寡斷，容易濫情，逃避現實，需要人推著走。', en: 'Indecisive, overly affectionate, escapes reality, needs pushing.' },
      advice: { zh: '保護他的夢想，給他足夠的愛與關注，幫他理清現實。', en: 'Protect his dreams, give enough love, help him face reality.' }
    },
    girlfriend: {
      keywords: [{zh: '愛哭鬼', en: 'Crybaby'}, {zh: '夢幻', en: 'Dreamy'}, {zh: '聖母', en: 'Saint'}],
      desc: { zh: '她是水做的女人，需要被呵護、被疼愛。她對愛情充滿了美好的幻想。她會為了愛人無底線地包容，甚至委屈自己。', en: 'Made of water, needs care. Full of beautiful love fantasies. Tolerates limitlessly for her lover, even suffering.' },
      pros: { zh: '極度善良，柔情似水，能滿足你對大男人主義的幻想。', en: 'Extremely kind, gentle, satisfies chauvinistic fantasies.' },
      cons: { zh: '情緒起伏大，容易受傷，對現實生活缺乏概念。', en: 'Emotional, easily hurt, lacks concept of reality.' },
      advice: { zh: '給她浪漫的儀式感，不要欺騙她，當她的守護騎士。', en: 'Give romantic rituals, never lie, be her guardian knight.' }
    }
  }
];

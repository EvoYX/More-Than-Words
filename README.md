
# 🌌 Deeply Knowing You (深刻地認識你)

> **"Not just a game, but a journey into the soul."**

A premium, bilingual (English/Traditional Chinese) digital card game and personality analysis application designed to foster deep, meaningful connections. Built with **React**, **Vite**, **Mantine**, and **Google Gemini AI**.

![Project Banner](https://placehold.co/1200x600/0a0f18/d4af37?text=Deeply+Knowing+You)

## ✨ Core Experiences

### 1. 🃏 Deep Talk Card Game (The Icebreaker)
A beautifully animated digital card deck experience designed to guide strangers into becoming soulmates through three distinct levels of intimacy.

*   **Level I: The Spark (Blue)** - Casual icebreakers to warm up the vibe.
*   **Level II: Between the Lines (Pink)** - Discovering habits, values, and subtle thoughts.
*   **Level III: Soft Truths (Gold)** - Deep soul connection and vulnerability.
*   **Features:** 
    *   Realistic 3D Card Flip & Shuffling animations.
    *   "Fate" selection mechanism (pick a card from the spread).
    *   Bilingual toggle (ZH/EN) instantly translates content.

### 2. 💘 Love Personality MBTI Quiz
A psychological test designed specifically for romantic archetypes.

*   **Visual Slider:** Interactive heart-based input method for intuitive answering.
*   **16 Love Archetypes:** Custom detailed analysis for every MBTI type (e.g., *The Royal Guard*, *The Wandering Artist*).
*   **AI Soul Manifestation:** A mesmerizing loading sequence while the universe aligns.
*   **AI Soul Letter:** Generates a personalized, soulful advice letter using **Gemini 3 Flash**.

### 3. 🔮 Zodiac Love Guide
A curated magazine-style guide exploring how different signs behave in relationships.

*   **Dual Perspectives:** Separate, detailed analyses for "Him" (Boyfriend) and "Her" (Girlfriend).
*   **Strategy Guide:** Covers Keywords, Green Flags, Red Flags, and Conquest Advice.
*   **Aesthetics:** Glassmorphism UI with custom iconography.

### 4. 🎨 Admin & AI Studio
A hidden panel for content creators and administrators.

*   **Asset Studio:** Generate consistency-styled chibi character illustrations on-the-fly using **Gemini 2.5 Flash Image**.
*   **Content Editor:** Add new bilingual questions to the decks directly.

---

## 🤖 AI Models Used

This project leverages the latest **Google GenAI SDK** (`@google/genai`) with specific models optimized for latency and creativity:

| Feature | Model | Purpose |
| :--- | :--- | :--- |
| **Soul Letters** | `gemini-3-flash-preview` | Generates empathetic, deep romantic advice in the MBTI results. |
| **Character Art** | `gemini-2.5-flash-image` | Generates "Chibi Fantasy Sticker" style avatars for MBTI archetypes. |
| **Conversation** | `gemini-3-flash-preview` | (Optional) Generates follow-up questions or sample answers. |

---

## 🛠 Tech Stack

*   **Framework:** React 18, TypeScript, Vite
*   **UI Library:** Mantine UI (v7)
*   **Styling:** Tailwind CSS (for layout & typography)
*   **Animation:** CSS3 3D Transforms, Keyframes, Backdrop Filters
*   **State Management:** React Hooks
*   **Icons:** Custom SVG Components

---

## 🚀 Getting Started

### Prerequisites
1.  **Node.js** (v18 or higher)
2.  **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/digital-icebreaker.git
    cd digital-icebreaker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and add your API Key.
    *Note: The app uses `process.env.API_KEY` via Vite define config.*
    ```env
    API_KEY=your_actual_google_api_key_here
    ```

4.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## 📱 Mobile & Tablet Optimization

The app is specifically designed to look amazing on **iPad Mini** and mobile devices (iPhone/Pixel), featuring:
*   **No-Scroll Gameplay:** The card game fits perfectly within the viewport to prevent accidental scrolling.
*   **Touch Targets:** Large, thumb-friendly buttons.
*   **Responsive Typography:** Font sizes adjust dynamically between mobile and tablet views.

---

## 📄 License

MIT License. Designed for love, friendship, and deep conversations.

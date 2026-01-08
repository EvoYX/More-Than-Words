
# 🌌 Deeply Knowing You (深刻地認識你)

A beautiful, bilingual (English/Chinese) digital card game and personality analysis application designed to foster deep connections. Built with **React**, **Vite**, **Mantine**, and **Google Gemini AI**.

![Project Banner](https://placehold.co/1200x600/0a0f18/d4af37?text=Deeply+Knowing+You)

## ✨ Features

### 1. 🃏 Deep Talk Card Game (Icebreaker)
A digital card deck experience designed to guide strangers into becoming soulmates through three distinct levels of intimacy.
*   **3 Levels of Depth:**
    *   **Level I (Blue):** *Just Chatting* - Casual icebreakers.
    *   **Level II (Pink):** *Getting Closer* - Values and inner thoughts.
    *   **Level III (Gold):** *Truly Know You* - Deep soul connection.
*   **Immersive UI:** 3D Card flip animations, realistic shuffling effects, and glassmorphism design.
*   **Bilingual Support:** One-click toggle between Traditional Chinese and English.

### 2. 💘 Love Personality MBTI Quiz
A 20-question psychological test to discover your specific "Love Archetype" (e.g., The Royal Guard, The Wandering Artist).
*   **Visual Assessment:** Interactive "Love Slider" input method.
*   **16 Unique Archetypes:** Custom illustrations and deep psycho-analysis for every MBTI type in a romantic context.
*   **AI Soul Letter:** Uses **Google Gemini** to generate a personalized, soulful advice letter based on your result.
*   **Soul Manifestation:** Beautiful loading animations while the universe "aligns" your results.

### 3. 🔮 Zodiac Love Guide
A curated magazine-style guide exploring how different signs behave in relationships.
*   **Dual Perspectives:** Separate analyses for "Him" (Boyfriend) and "Her" (Girlfriend).
*   **Detailed Insights:** Covers Green Flags, Red Flags, and Strategy advice.
*   **Aesthetics:** Pastel, healing visual design with custom iconography.

### 4. ⚙️ Admin & AI Studio
A hidden panel for content management.
*   **Asset Studio:** Generate MBTI character illustrations on-the-fly using Google Gemini's Image Generation model.
*   **Content Editor:** Add new questions to the decks directly.

---

## 🛠 Tech Stack

*   **Core:** React 18, TypeScript, Vite
*   **UI/Styling:** Mantine UI (v7), Tailwind CSS
*   **AI Integration:** Google GenAI SDK (`@google/genai`)
*   **Animations:** CSS3 3D Transforms, Keyframes

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
    Create a file named `.env` in the root directory and add your API Key:
    ```env
    API_KEY=your_actual_google_api_key_here
    ```

4.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Select your repository.
4.  **Important:** In the **Environment Variables** section, add:
    *   **Name:** `API_KEY`
    *   **Value:** `your_google_api_key_string`
5.  Click **Deploy**.

---

## 📱 Mobile & Tablet Optimization

The app is specifically designed to look amazing on **iPad Mini** and mobile devices, featuring:
*   Touch-friendly buttons.
*   Prevented scrolling on game screens for an "App-like" feel.
*   Responsive typography.

---

## 📄 License

MIT License. Feel free to use and modify for your own social gatherings!

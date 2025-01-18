# Quiz App

Test your knowledge with this fun and interactive **Quiz App**! Built with **React** and **Vite**, this app lets you play a 10-question quiz fetched from the [Open Trivia DB](https://opentdb.com/). Track your high scores, answer timed questions, and improve your trivia skills!

---


## 📸 Live Preview

👉 [Quiz App Live Demo](https://benjmainrasoliquizgame.vercel.app//) 

---

## 🔥 Features

- **10-Question Quiz**: Answer a series of 10 trivia questions.
- **Timed Gameplay**: Each question has a **10-second timer**—don’t let it run out!
- **Real-Time Feedback**: Immediately see if your answer is correct or incorrect, along with the right answer.
- **High Score System**: 
  - Tracks your score for each game.
  - Saves the highest score using **local storage**.
- **Responsive Design**: Enjoy seamless gameplay on any device.
- **Global State Management**: Powered by **Zustand** for efficient state handling.

---

## 🚀 Tech Stack

- **Frontend**: React with Vite
- **Trivia API**: Open Trivia DB
- **State Management**: Zustand
- **Styling**: CSS
- **Persistent Storage**: Local Storage for high scores

---

## 🛠 Installation Guide

### Prerequisites

- **Node.js** (v16 or higher)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:

   ```bash
   http://localhost:5173
   ```

### Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the app for production.
- `npm start` - Start the production server.

---

## 🎮 How to Play

1. **Start the Game**:
   - Click the **"Press to start quiz"** button to begin the game.
   
2. **Answer Questions**:
   - Each question appears with either true or false options or multiple.
   - You have **10 seconds** to select your answer.
   - If time runs out, the question is marked incorrect.

3. **View Results**:
   - After submitting, see if your answer is **correct** or **incorrect**.
   - The correct answer is displayed after each question.

4. **Finish the Quiz**:
   - At the end of 10 questions, your **final score** is displayed.
   - Your **high score** is saved and shown in the navbar.

5. **Replay Anytime**:
   - Click **"Play Again"** to restart the game.

---

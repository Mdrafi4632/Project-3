import React, { useState } from "react";
import ReactDOM from "react-dom";

const initialFlashcards = [
  {
    question: "Who is known for building the Ark to survive the flood?",
    answer: "Prophet Nuh",
  },
  {
    question: "Who was swallowed by a large fish and later saved by Allah?",
    answer: "Prophet Yunus",
  },
  {
    question: "Who led the Bani Israel out of Egypt and received the Torah?",
    answer: "Prophet Musa",
  },
  {
    question: "Who was known for his wisdom and judgment, and ruled as a king?",
    answer: "Prophet Sulaiman",
  },
  {
    question: "Who was the father of Prophet Yahya?",
    answer: "Prophet Zakariya",
  },
  {
    question: "Who was the first man created by Allah and the first prophet?",
    answer: "Prophet Adam",
  },
  {
    question:
      "Who was the wife of Prophet Ibrahim and mother of Prophet Ishaq?",
    answer: "Sarah",
  },
  {
    question: "Who was the brother of Prophet Musa and a prophet?",
    answer: "Prophet Harun",
  },
  {
    question: "Who was the prophet and king who defeated Jalut?",
    answer: "Prophet Dawud",
  },
  {
    question: "Who was the prophet taken to heaven in a miraculous journey?",
    answer: "Prophet Isa",
  },
  {
    question: "Who was the prophet who anointed Prophet Ilyasas his successor?",
    answer: "Prophet Ilyas",
  },
  {
    question: "Who was the prophet who saw a vision of a valley of dry bones?",
    answer: "Prophet Ezekiel",
  },
  {
    question:
      "Who was the prophet who interpreted dreams for the king of Egypt?",
    answer: "Prophet Yusuf",
  },
  {
    question:
      "Who was the prophet who foretold the coming of Prophet Muhammad (PBUH)?",
    answer: "Prophet Isa",
  },
  {
    question: "Who was the prophet who was called by Allah as a young boy?",
    answer: "Prophet Muhammad (PBUH)",
  },
  {
    question: "Who is the last and final prophet of Allah?",
    answer: "Prophet Muhammad (PBUH)",
  },
  {
    question: "Who was the prophet known for his patience and trials?",
    answer: "Prophet Ayyub",
  },
  {
    question: "Who was the prophet who built the Kaaba with his son?",
    answer: "Prophet Ibrahim",
  },
  {
    question:
      "Who was the prophet known for his beautiful voice and recitation of the Psalms?",
    answer: "Prophet Dawud",
  },
  {
    question:
      "Who was the prophet who was given the ability to speak as a baby?",
    answer: "Prophet Isa",
  },
];

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function FlashcardApp() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0); // 🔥 Tracks current correct streak
  const [longestStreak, setLongestStreak] = useState(0); // 🔥 Tracks longest streak

  const handleNextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard((prev) => prev + 1);
      setIsFlipped(false);
      setGuess("");
      setFeedback("");
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
      setIsFlipped(false);
      setGuess("");
      setFeedback("");
    }
  };

  const handleGuessSubmit = () => {
    const correctAnswer = flashcards[currentCard].answer.trim().toLowerCase();
    const userAnswer = guess.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback("✅ Correct!");
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > longestStreak) setLongestStreak(newStreak); // Update longest streak
        return newStreak;
      });
    } else {
      setFeedback("❌ Incorrect, try again!");
      setCurrentStreak(0); // Reset current streak on wrong answer
    }
  };

  const handleShuffle = () => {
    const shuffledFlashcards = shuffleArray(initialFlashcards);
    setFlashcards(shuffledFlashcards);
    setCurrentCard(0); // Reset to the first card in the new order
    setIsFlipped(false);
    setGuess("");
    setFeedback("");
    setCurrentStreak(0); // Reset streak when shuffling
  };

  return (
    <div className="container">
      <h1>Guess the Prophets</h1>

      {/* Card Number Display */}
      <div className="card-counter">
        <p>
          Card {currentCard + 1} of {flashcards.length}
        </p>
      </div>

      {/* Streak Display */}
      <div className="streak-container">
        <p>
          Current Streak: <strong>{currentStreak}</strong>
        </p>
        <p>
          Longest Streak: <strong>{longestStreak}</strong>
        </p>
      </div>

      <div
        className="card-container"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
          <div className="card-face front">
            {flashcards[currentCard].question}
          </div>
          <div className="card-face back">{flashcards[currentCard].answer}</div>
        </div>
      </div>

      {/* Guessing Section - Always Visible */}
      <div className="guess-section">
        <input
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuessSubmit}>Submit</button>
      </div>

      {/* Feedback Section */}
      {feedback && <div className="feedback">{feedback}</div>}

      <div className="button-group">
        <button onClick={handlePrevCard} disabled={currentCard === 0}>
          Back
        </button>
        <button
          onClick={handleNextCard}
          disabled={currentCard === flashcards.length - 1}
        >
          Next
        </button>
        <button onClick={handleShuffle} className="shuffle-button">
          Shuffle
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<FlashcardApp />, document.getElementById("root"));

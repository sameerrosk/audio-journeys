import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/data/mockData";

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
      onComplete(score + (selectedAnswer === question.correctIndex ? 1 : 0));
    }
  };

  if (isCompleted) {
    const finalScore = score;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-10 h-10 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
        <p className="text-muted-foreground">
          You scored{" "}
          <span className="text-primary font-bold">{finalScore}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQuestion
                ? "bg-primary"
                : i === currentQuestion
                ? "bg-primary/50"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="text-sm text-muted-foreground mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-6">{question.q}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let bgClass = "bg-secondary hover:bg-secondary/80";
            if (showResult) {
              if (i === question.correctIndex) {
                bgClass = "bg-primary/20 border-primary";
              } else if (i === selectedAnswer) {
                bgClass = "bg-destructive/20 border-destructive";
              }
            } else if (selectedAnswer === i) {
              bgClass = "bg-primary/10 border-primary/50";
            }

            return (
              <motion.button
                key={i}
                whileHover={{ scale: showResult ? 1 : 1.01 }}
                whileTap={{ scale: showResult ? 1 : 0.99 }}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-3 ${bgClass}`}
              >
                <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-foreground">{option}</span>
                {showResult && i === question.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
                {showResult && i === selectedAnswer && i !== question.correctIndex && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button
            variant="spotify"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button variant="spotify" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;

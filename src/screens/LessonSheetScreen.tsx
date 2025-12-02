import { motion } from "framer-motion";
import { BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import QuizComponent from "@/components/QuizComponent";
import { lessonSheet, quiz } from "@/data/mockData";
import { toast } from "sonner";

interface LessonSheetScreenProps {
  dayNumber: number;
  onQuizComplete: (score: number) => void;
}

const LessonSheetScreen = ({ dayNumber, onQuizComplete }: LessonSheetScreenProps) => {
  const handleQuizComplete = (score: number) => {
    onQuizComplete(score);
    toast.success(`Quiz completed! You scored ${score}/${quiz.length}`, {
      description: "Great job on today's learning!",
    });
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Lesson Sheet</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Day {dayNumber} Summary</h1>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">AI Summary</h2>
          </div>
          <div className="prose prose-sm prose-invert">
            {lessonSheet.aiSummary.split("\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Vocabulary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <h2 className="font-semibold text-foreground mb-4">Key Vocabulary</h2>
          <div className="space-y-3">
            {lessonSheet.vocabulary.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex gap-3 p-3 rounded-xl bg-secondary/50"
              >
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{item.word}</p>
                  <p className="text-sm text-muted-foreground">{item.definition}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Mini Quiz</h2>
          </div>
          <QuizComponent questions={quiz} onComplete={handleQuizComplete} />
        </motion.div>
      </div>
    </div>
  );
};

export default LessonSheetScreen;

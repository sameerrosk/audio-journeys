import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import GoalCard from "@/components/GoalCard";
import { goals } from "@/data/mockData";

interface GoalSelectionScreenProps {
  onSelectGoal: (goalId: string) => void;
}

const GoalSelectionScreen = ({ onSelectGoal }: GoalSelectionScreenProps) => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-primary">
          <Zap className="w-6 h-6 text-primary-foreground" fill="currentColor" />
        </div>
        <span className="text-2xl font-bold text-foreground tracking-tight">
          Spotify <span className="text-primary">SkillBuilder</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          What do you want to <span className="text-gradient">master</span>?
        </h1>
        <p className="text-muted-foreground">Choose your learning focus to begin</p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-4">
        {goals.map((goal, index) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            index={index}
            onClick={() => onSelectGoal(goal.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalSelectionScreen;

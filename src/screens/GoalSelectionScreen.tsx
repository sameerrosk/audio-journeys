import { motion } from "framer-motion";
import GoalCard from "@/components/GoalCard";
import { goals } from "@/data/mockData";

interface GoalSelectionScreenProps {
  onSelectGoal: (goalId: string) => void;
}

const GoalSelectionScreen = ({ onSelectGoal }: GoalSelectionScreenProps) => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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

import { motion } from "framer-motion";
import type { Goal } from "@/data/mockData";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
  index: number;
}

const GoalCard = ({ goal, onClick, index }: GoalCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-left group"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{goal.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {goal.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
        </div>
        <motion.div
          className="text-muted-foreground group-hover:text-primary transition-colors"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
};

export default GoalCard;

import { motion } from "framer-motion";
import CircularProgress from "@/components/CircularProgress";
import { goals, user, progress } from "@/data/mockData";
import { Flame, Calendar, Trophy } from "lucide-react";

interface ProgressScreenProps {
  goalId: string;
  daysCompleted: number;
  currentStreak: number;
  onChangeGoal: () => void;
}

const ProgressScreen = ({
  goalId,
  daysCompleted,
  currentStreak,
  onChangeGoal,
}: ProgressScreenProps) => {
  const goal = goals.find((g) => g.id === goalId);
  const percentComplete = Math.min((daysCompleted / 100) * 100, 100);

  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Hello, <span className="text-gradient">{user.firstName}</span> 👋
        </h1>
        <button
          onClick={onChangeGoal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors mt-3"
        >
          <span className="text-xl">{goal?.icon}</span>
          <span className="text-sm font-medium text-foreground">{goal?.title}</span>
          <span className="text-xs text-muted-foreground">Change</span>
        </button>
      </motion.div>

      <div className="max-w-lg mx-auto">
        {/* Circular Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <CircularProgress
            percentage={percentComplete}
            size={180}
            strokeWidth={14}
            label="Overall Progress"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-5 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{daysCompleted}</p>
            <p className="text-sm text-muted-foreground">Days Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-5 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak 🔥</p>
          </motion.div>
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-5 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Keep it up!</h3>
              <p className="text-sm text-muted-foreground">
                {currentStreak >= 7
                  ? "You're on fire! 🔥 One week streak achieved!"
                  : `${7 - currentStreak} more days for weekly milestone`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressScreen;

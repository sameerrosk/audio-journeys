import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface ThunderNudgeProps {
  onClick: () => void;
}

const ThunderNudge = ({ onClick }: ThunderNudgeProps) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl glow-pulse"
      aria-label="Open Mini-Guide Assistant"
    >
      <Zap className="w-6 h-6" />
    </motion.button>
  );
};

export default ThunderNudge;

import { motion } from "framer-motion";
import { Target, Headphones, BarChart3, BookOpen } from "lucide-react";

export type Screen = "goals" | "pack" | "progress" | "lesson";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  showLesson: boolean;
}

const navItems = [
  { id: "goals" as const, icon: Target, label: "Goals" },
  { id: "pack" as const, icon: Headphones, label: "Pack" },
  { id: "progress" as const, icon: BarChart3, label: "Progress" },
  { id: "lesson" as const, icon: BookOpen, label: "Lesson" },
];

const BottomNav = ({ currentScreen, onNavigate, showLesson }: BottomNavProps) => {
  const filteredItems = showLesson ? navItems : navItems.filter((item) => item.id !== "lesson");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {filteredItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-primary"
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

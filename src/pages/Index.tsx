import { useState } from "react";
import BottomNav, { Screen } from "@/components/BottomNav";
import ThunderNudge from "@/components/ThunderNudge";
import AssistantDrawer from "@/components/AssistantDrawer";
import GoalSelectionScreen from "@/screens/GoalSelectionScreen";
import DailyPackScreen from "@/screens/DailyPackScreen";
import ProgressScreen from "@/screens/ProgressScreen";
import LessonSheetScreen from "@/screens/LessonSheetScreen";
import { toast } from "sonner";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("goals");
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [daysCompleted, setDaysCompleted] = useState(7);
  const [currentStreak, setCurrentStreak] = useState(3);
  const [showLesson, setShowLesson] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    setCurrentScreen("pack");
    toast.success("Goal selected!", {
      description: "Your daily audio pack is ready.",
    });
  };

  const handleCompletePack = () => {
    setDaysCompleted((prev) => prev + 1);
    setCurrentStreak((prev) => prev + 1);
    setShowLesson(true);
    setCurrentScreen("lesson");
    toast.success("Pack completed! 🎉", {
      description: "Check out your lesson summary.",
    });
  };

  const handleQuizComplete = (score: number) => {
    // Quiz completion handled in LessonSheetScreen
  };

  const handleNavigate = (screen: Screen) => {
    if (screen === "pack" && !selectedGoalId) {
      toast.error("Please select a goal first");
      setCurrentScreen("goals");
      return;
    }
    if (screen === "lesson" && !showLesson) {
      toast.error("Complete your daily pack first");
      return;
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "goals":
        return <GoalSelectionScreen onSelectGoal={handleSelectGoal} />;
      case "pack":
        return (
          <DailyPackScreen
            goalId={selectedGoalId || "goal_english"}
            dayNumber={daysCompleted + 1}
            onComplete={handleCompletePack}
          />
        );
      case "progress":
        return (
          <ProgressScreen
            goalId={selectedGoalId || "goal_english"}
            daysCompleted={daysCompleted}
            currentStreak={currentStreak}
            onChangeGoal={() => setCurrentScreen("goals")}
          />
        );
      case "lesson":
        return (
          <LessonSheetScreen
            dayNumber={daysCompleted}
            onQuizComplete={handleQuizComplete}
          />
        );
      default:
        return <GoalSelectionScreen onSelectGoal={handleSelectGoal} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        showLesson={showLesson}
      />
      {currentScreen !== "goals" && (
        <ThunderNudge onClick={() => setIsAssistantOpen(true)} />
      )}
      <AssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

export default Index;

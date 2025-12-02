import { useState } from "react";
import { motion } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";
import TrackList from "@/components/TrackList";
import { Button } from "@/components/ui/button";
import { dailyPack, goals } from "@/data/mockData";
import { CheckCircle } from "lucide-react";

interface DailyPackScreenProps {
  goalId: string;
  dayNumber: number;
  onComplete: () => void;
}

const DailyPackScreen = ({ goalId, dayNumber, onComplete }: DailyPackScreenProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = dailyPack.audioItems[currentTrackIndex];
  const goal = goals.find((g) => g.id === goalId);

  const handleNext = () => {
    if (currentTrackIndex < dailyPack.audioItems.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <span>{goal?.icon}</span>
          <span className="text-sm font-medium">{goal?.title}</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Day {dayNumber}</h1>
        <p className="text-muted-foreground text-sm mt-1">Your Daily Audio Pack</p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-6">
        <AudioPlayer
          track={currentTrack}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-3">
            Today's Playlist
          </h2>
          <TrackList
            tracks={dailyPack.audioItems}
            currentTrackId={currentTrack.id}
            onSelectTrack={setCurrentTrackIndex}
          />
        </div>

        <Button variant="hero" className="w-full" onClick={onComplete}>
          <CheckCircle className="w-5 h-5 mr-2" />
          Mark as Complete & View Lesson
        </Button>
      </div>
    </div>
  );
};

export default DailyPackScreen;

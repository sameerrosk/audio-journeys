import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { AudioItem } from "@/data/mockData";
import { formatDuration } from "@/data/mockData";

interface AudioPlayerProps {
  track: AudioItem;
  onNext: () => void;
  onPrevious: () => void;
}

const AudioPlayer = ({ track, onNext, onPrevious }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.durationSec) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track.durationSec]);

  useEffect(() => {
    setProgress((currentTime / track.durationSec) * 100);
  }, [currentTime, track.durationSec]);

  useEffect(() => {
    setCurrentTime(0);
    setProgress(0);
  }, [track.id]);

  const handleSeek = (value: number[]) => {
    const newTime = Math.floor((value[0] / 100) * track.durationSec);
    setCurrentTime(newTime);
    setProgress(value[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 border border-border"
    >
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg"
        >
          <span className="text-2xl">{track.type === "Podcast" ? "🎙️" : "🎵"}</span>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Volume2 className="w-4 h-4" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(track.durationSec)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon" onClick={onPrevious}>
          <SkipBack className="w-5 h-5" />
        </Button>
        <Button
          variant="spotify"
          size="lg"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext}>
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;

import { motion } from "framer-motion";
import { Music, Mic } from "lucide-react";
import type { AudioItem } from "@/data/mockData";
import { formatDuration } from "@/data/mockData";

interface TrackListProps {
  tracks: AudioItem[];
  currentTrackId: string;
  onSelectTrack: (index: number) => void;
}

const TrackList = ({ tracks, currentTrackId, onSelectTrack }: TrackListProps) => {
  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <motion.button
          key={track.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ backgroundColor: "hsl(var(--surface-elevated))" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectTrack(index)}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 text-left ${
            currentTrackId === track.id
              ? "bg-primary/10 border border-primary/30"
              : "bg-transparent hover:bg-secondary"
          }`}
        >
          <span className="w-6 text-center text-sm text-muted-foreground">
            {currentTrackId === track.id ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 mx-auto rounded-full bg-primary"
              />
            ) : (
              index + 1
            )}
          </span>
          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
            {track.type === "Podcast" ? (
              <Mic className="w-5 h-5 text-primary" />
            ) : (
              <Music className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium truncate ${currentTrackId === track.id ? "text-primary" : "text-foreground"}`}>
              {track.title}
            </p>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
          <span className="text-sm text-muted-foreground">{formatDuration(track.durationSec)}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default TrackList;

export interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AudioItem {
  id: string;
  type: "Song" | "Podcast";
  title: string;
  artist: string;
  durationSec: number;
  url: string;
}

export interface Progress {
  userId: string;
  goalId: string;
  daysCompleted: number;
  currentStreak: number;
  percentComplete: number;
}

export interface VocabularyItem {
  word: string;
  definition: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correctIndex: number;
}

export const goals: Goal[] = [
  {
    id: "goal_english",
    title: "Improve English",
    description: "Master professional vocabulary and clear communication.",
    icon: "🗣️",
  },
  {
    id: "goal_focus",
    title: "Build Focus",
    description: "Develop deep work habits and concentration skills.",
    icon: "🎯",
  },
  {
    id: "goal_mindfulness",
    title: "Practice Mindfulness",
    description: "Learn meditation and stress management techniques.",
    icon: "🧘",
  },
  {
    id: "goal_business",
    title: "Business Skills",
    description: "Entrepreneurship insights from industry leaders.",
    icon: "💼",
  },
];

export const user = {
  id: "usr_91011",
  firstName: "Arjun",
  email: "student_alpha@mail.com",
  currentGoalId: "goal_english",
};

export const dailyPack = {
  id: "pack_001_eng",
  goalId: "goal_english",
  dayNumber: 1,
  audioItems: [
    { id: "audio_s1", type: "Song" as const, title: "Work Song", artist: "Hozier", durationSec: 240, url: "spotify:track:xyz1" },
    { id: "audio_s2", type: "Song" as const, title: "Vienna", artist: "Billy Joel", durationSec: 235, url: "spotify:track:xyz2" },
    { id: "audio_s3", type: "Song" as const, title: "Better Together", artist: "Jack Johnson", durationSec: 200, url: "spotify:track:xyz3" },
    { id: "audio_s4", type: "Song" as const, title: "Lovely Day", artist: "Bill Withers", durationSec: 250, url: "spotify:track:xyz4" },
    { id: "audio_s5", type: "Song" as const, title: "A-Team", artist: "Ed Sheeran", durationSec: 270, url: "spotify:track:xyz5" },
    { id: "audio_p1", type: "Podcast" as const, title: "How I Built This: Guy Raz", artist: "NPR", durationSec: 120, url: "spotify:podcast:xyz" },
  ],
};

export const progress: Progress = {
  userId: "usr_91011",
  goalId: "goal_english",
  daysCompleted: 7,
  currentStreak: 3,
  percentComplete: 0.07,
};

export const lessonSheet = {
  id: "ls_001_eng",
  aiSummary: `Today's audio pack explores themes of perseverance, patience, and meaningful connection through carefully curated songs and a podcast clip.

**Key Themes:**
- **Work Song by Hozier** introduces the concept of dedication and hard work as expressions of love
- **Vienna by Billy Joel** reminds us to slow down and appreciate the journey
- **Better Together by Jack Johnson** emphasizes collaboration and partnership
- **The podcast clip** features Guy Raz discussing entrepreneurial resilience

**Learning Focus:**
Pay attention to how artists use metaphor and storytelling to convey complex emotions. Notice the vocabulary used to describe persistence and relationships.`,
  vocabulary: [
    { word: "Perseverance", definition: "Persistence in doing something despite difficulty or delay in achieving success" },
    { word: "Meticulous", definition: "Showing great attention to detail; very careful and precise" },
    { word: "Ambivalent", definition: "Having mixed feelings or contradictory ideas about something" },
    { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing" },
    { word: "Resilience", definition: "The capacity to recover quickly from difficulties; toughness" },
  ],
};

export const quiz: QuizQuestion[] = [
  {
    q: "Based on today's podcast clip, which word best describes a determined effort?",
    options: ["Ambivalent", "Perseverance", "Apathy"],
    correctIndex: 1,
  },
  {
    q: "The vocabulary word 'Meticulous' means:",
    options: ["Quick and careless", "Showing great attention to detail", "Loud and boisterous"],
    correctIndex: 1,
  },
  {
    q: "In which song did the artist discuss the idea of long-term commitment?",
    options: ["Work Song", "Vienna", "Lovely Day"],
    correctIndex: 0,
  },
];

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

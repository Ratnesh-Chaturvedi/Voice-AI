export interface QuickAction {
  title: string;
  description: string;
  gradient: string;
  href: string;
};

export const quickActions: QuickAction[] = [
  {
    title: "Narrate a Story",
    description: "Bring characters to life with expressive AI narration",
    gradient: "from-cyan-400 to-cyan-50",
    href: "/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    title: "Voicemail Greeting",
    description: "Create a professional and welcoming phone greeting",
    gradient: "from-purple-400 to-purple-50",
    href: "/text-to-speech?text=Thank you for calling. We are currently away from the desk helping other clients, but your call is very important to us. Please leave your name and number after the tone.",
  },
  {
    title: "Podcast Intro",
    description: "Generate an energetic opening for an audio show",
    gradient: "from-emerald-400 to-emerald-50",
    href: "/text-to-speech?text=Welcome back to the Daily Tech Pulse, your number one source for the stories shaping tomorrow. Grab your coffee, sit back, and let tracker frequencies guide your morning routine.",
  },
  {
    title: "Audiobook Excerpt",
    description: "Read dramatic dialogue with rich character tones",
    gradient: "from-amber-400 to-amber-50",
    href: "/text-to-speech?text=The detective stared at the muddy footprints leading straight to the locked safe. Whoever took the emeralds didn't pick the lock; they knew the combination before they even walked in.",
  },
  {
    title: "Document Readout",
    description: "Listen to a clear narration of an educational article",
    gradient: "from-rose-400 to-rose-50",
    href: "/text-to-speech?text=Photosynthesis is the process used by plants and other organisms to convert light energy into chemical energy, which can later be released to fuel the organisms metabolic activities.",
  },
  {
    title: "Meditation Guide",
    description: "Produce a calm, soothing voice for relaxation",
    gradient: "from-indigo-400 to-indigo-50",
    href: "/text-to-speech?text=Close your eyes and take a deep, slow breath in. Let the tension leave your shoulders as you exhale, focusing completely on the gentle sound of the ocean waves fading in the distance.",
  }
  

];
import { useEffect, useState } from "react";
import { Blocks, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing blockchain...");

  useEffect(() => {
    const texts = [
      "Initializing blockchain...",
      "Connecting to nodes...",
      "Syncing blocks...",
      "Verifying chain integrity...",
      "Loading dashboard...",
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        if (newProgress >= 20 && newProgress < 40) {
          setLoadingText(texts[1]);
        } else if (newProgress >= 40 && newProgress < 60) {
          setLoadingText(texts[2]);
        } else if (newProgress >= 60 && newProgress < 80) {
          setLoadingText(texts[3]);
        } else if (newProgress >= 80) {
          setLoadingText(texts[4]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Logo and loading animation */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Blocks className="w-16 h-16 text-primary animate-pulse" />
            <div className="absolute inset-0 animate-pulse-ring">
              <div className="w-full h-full border-2 border-primary/50 rounded-full" />
            </div>
          </div>
          <span className="text-4xl font-bold text-gradient">ChainGo</span>
        </div>
      </div>

      {/* Loading spinner */}
      <div className="relative mb-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80 mb-4">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-muted-foreground font-mono text-sm animate-pulse">
        {loadingText}
      </p>

      {/* Progress percentage */}
      <p className="text-primary font-mono text-xs mt-2">
        {Math.round(progress)}%
      </p>

      {/* Animated blocks flowing at bottom */}
      <div className="absolute bottom-20 left-0 right-0 h-16 overflow-hidden opacity-30">
        <div className="flex gap-4 animate-block-flow">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-primary/30 border border-primary/50 rounded-lg flex-shrink-0"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

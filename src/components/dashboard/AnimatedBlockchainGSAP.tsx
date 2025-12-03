import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Block {
  id: number;
  hash: string;
  timestamp: string;
  txCount: number;
}

const generateHash = () => {
  return "0x" + [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
};

// Static blocks representing the chain
const staticBlocks: Block[] = [
  { id: 2847, hash: generateHash(), timestamp: "2 min ago", txCount: 15 },
  { id: 2846, hash: generateHash(), timestamp: "6 min ago", txCount: 8 },
  { id: 2845, hash: generateHash(), timestamp: "10 min ago", txCount: 23 },
  { id: 2844, hash: generateHash(), timestamp: "14 min ago", txCount: 12 },
  { id: 2843, hash: generateHash(), timestamp: "18 min ago", txCount: 5 },
  { id: 2842, hash: generateHash(), timestamp: "22 min ago", txCount: 19 },
  { id: 2841, hash: generateHash(), timestamp: "26 min ago", txCount: 7 },
  { id: 2840, hash: generateHash(), timestamp: "30 min ago", txCount: 11 },
];

export const AnimatedBlockchainGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate chain moving left to right continuously
    if (chainRef.current) {
      gsap.to(chainRef.current, {
        x: 100,
        duration: 8,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }

    // Animate glow on connection line
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: "100vw",
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }

    // Stagger animate blocks on mount
    gsap.fromTo(
      ".block-card",
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power3.out" 
      }
    );
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -8,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      
      {/* Connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />
      
      {/* Animated glow on line */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-0 w-40 h-2 bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2 blur-sm"
        style={{ transform: "translateX(-160px) translateY(-50%)" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Blocks container with left-to-right movement */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto scrollbar-hide"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={chainRef}
          className="flex items-center gap-6 px-8 min-w-max"
        >
          {staticBlocks.map((block, index) => (
            <Link
              key={block.id}
              to={`/blocks/${block.id}`}
              className="block-card relative flex-shrink-0"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Block card */}
              <div
                className={cn(
                  "glass-card w-40 md:w-48 p-4 rounded-xl border border-border/50",
                  "hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                )}
              >
                {/* Block header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-mono font-bold text-primary">#{block.id}</span>
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                </div>

                {/* Block visualization */}
                <div className="relative w-full aspect-square mb-3 rounded-lg bg-gradient-to-br from-primary/20 via-secondary to-accent/10 border border-primary/30 overflow-hidden">
                  {/* Inner grid */}
                  <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-sm transition-all duration-500",
                          i < (block.txCount % 9) + 1
                            ? "bg-primary/50"
                            : "bg-muted/30"
                        )}
                      />
                    ))}
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Block info */}
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-muted-foreground truncate">
                    {block.hash}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {block.txCount} txns
                    </p>
                    <p className="text-xs text-primary/70">
                      {block.timestamp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connection arrow */}
              {index < staticBlocks.length - 1 && (
                <div className="absolute top-1/2 -right-6 w-6 flex items-center -translate-y-1/2">
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary/70 to-primary/30" />
                  <div className="absolute right-0 w-0 h-0 border-l-[6px] border-l-primary/50 border-y-[4px] border-y-transparent" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};

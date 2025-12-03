import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface Block {
  id: number;
  hash: string;
  timestamp: number;
  txCount: number;
  isNew: boolean;
}

const generateHash = () => {
  return "0x" + [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
};

export const AnimatedBlockchain = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with some blocks
    const initialBlocks: Block[] = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      hash: generateHash(),
      timestamp: Date.now() - (8 - i) * 10000,
      txCount: Math.floor(Math.random() * 20) + 1,
      isNew: false,
    }));
    setBlocks(initialBlocks);

    // Add new blocks periodically
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlock: Block = {
          id: prev.length + 1,
          hash: generateHash(),
          timestamp: Date.now(),
          txCount: Math.floor(Math.random() * 20) + 1,
          isNew: true,
        };
        
        // Keep only last 12 blocks
        const updated = [...prev.slice(-11), newBlock];
        
        // Reset isNew flag after animation
        setTimeout(() => {
          setBlocks((current) =>
            current.map((b) => (b.id === newBlock.id ? { ...b, isNew: false } : b))
          );
        }, 1000);
        
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
      
      {/* Animated glow effect on line */}
      <div className="absolute top-1/2 left-0 w-32 h-1 bg-gradient-to-r from-transparent to-primary -translate-y-1/2 animate-shimmer" />

      {/* Blocks container */}
      <div
        ref={containerRef}
        className="flex items-center justify-start gap-4 px-4 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={cn(
              "relative flex-shrink-0 w-32 md:w-40 transition-all duration-500",
              block.isNew && "animate-scale-in"
            )}
          >
            {/* Block card */}
            <div
              className={cn(
                "glass-card p-4 rounded-xl border transition-all duration-300 hover:scale-105",
                block.isNew
                  ? "border-primary glow-primary"
                  : "border-border/50 hover:border-primary/50"
              )}
            >
              {/* Block header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-primary">#{block.id}</span>
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    block.isNew ? "bg-accent animate-pulse" : "bg-primary"
                  )}
                />
              </div>

              {/* Block visualization */}
              <div className="relative w-full aspect-square mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 overflow-hidden">
                {/* Inner grid pattern */}
                <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-sm transition-all duration-300",
                        i < block.txCount % 10
                          ? "bg-primary/40"
                          : "bg-muted/20"
                      )}
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Pulse effect for new blocks */}
                {block.isNew && (
                  <div className="absolute inset-0 bg-primary/20 animate-ping" />
                )}
              </div>

              {/* Block info */}
              <div className="space-y-1">
                <p className="font-mono text-[10px] text-muted-foreground truncate">
                  {block.hash}
                </p>
                <p className="text-xs text-muted-foreground">
                  {block.txCount} transactions
                </p>
              </div>
            </div>

            {/* Connection arrow */}
            {index < blocks.length - 1 && (
              <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-primary/50 -translate-y-1/2">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary/50 border-y-2 border-y-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

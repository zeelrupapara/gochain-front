import { useState } from "react";
import { Pickaxe, Play, Square, Cpu, Zap, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: Date;
}

export const MiningStatus = () => {
  const [isMining, setIsMining] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      message: "Mining engine initialized",
      type: "info",
      timestamp: new Date(),
    },
  ]);

  const toggleMining = () => {
    const newState = !isMining;
    setIsMining(newState);

    const newLog: LogEntry = {
      id: Date.now().toString(),
      message: newState ? "Mining started..." : "Mining stopped",
      type: newState ? "success" : "warning",
      timestamp: new Date(),
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);

    if (newState) {
      // Simulate mining logs
      const interval = setInterval(() => {
        if (!isMining) {
          clearInterval(interval);
          return;
        }
        
        const messages = [
          "Searching for valid nonce...",
          "Hash rate: 1.2 MH/s",
          "Block candidate generated",
          "Validating proof of work...",
          "Connected to 12 peers",
        ];
        
        setLogs((prev) => [
          {
            id: Date.now().toString(),
            message: messages[Math.floor(Math.random() * messages.length)],
            type: "info",
            timestamp: new Date(),
          },
          ...prev.slice(0, 19),
        ]);
      }, 2000);

      return () => clearInterval(interval);
    }
  };

  return (
    <div className="glass-card rounded-xl h-full">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              isMining ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <Pickaxe className={cn("w-5 h-5", isMining && "animate-pulse")} />
            </div>
            <h3 className="font-semibold text-foreground">Mining Status</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-medium",
              isMining ? "text-primary" : "text-muted-foreground"
            )}>
              {isMining ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={isMining}
              onCheckedChange={toggleMining}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-border/50">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Hash className="w-4 h-4 text-primary" />
          </div>
          <p className="text-lg font-bold text-foreground">1.2</p>
          <p className="text-xs text-muted-foreground">MH/s</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Cpu className="w-4 h-4 text-accent" />
          </div>
          <p className="text-lg font-bold text-foreground">4</p>
          <p className="text-xs text-muted-foreground">Threads</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-lg font-bold text-foreground">24</p>
          <p className="text-xs text-muted-foreground">Difficulty</p>
        </div>
      </div>

      {/* Logs */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Miner Logs</h4>
        <ScrollArea className="h-[140px]">
          <div className="space-y-2 font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className={cn(
                  "flex items-start gap-2 animate-fade-in",
                  log.type === "success" && "text-primary",
                  log.type === "warning" && "text-accent",
                  log.type === "info" && "text-muted-foreground"
                )}
              >
                <span className="text-muted-foreground/50">
                  [{log.timestamp.toLocaleTimeString()}]
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Button
            variant={isMining ? "outline" : "default"}
            size="sm"
            className="flex-1"
            onClick={toggleMining}
          >
            {isMining ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Mining
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Pickaxe, 
  Play, 
  Square, 
  Cpu, 
  Zap, 
  Hash,
  Activity,
  Thermometer,
  Fan
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
}

const Mining = () => {
  const [isMining, setIsMining] = useState(false);
  const [threads, setThreads] = useState(4);
  const [hashRate, setHashRate] = useState(0);
  const [blocksFound, setBlocksFound] = useState(3);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", message: "Mining engine ready", type: "info", timestamp: new Date() },
  ]);

  useEffect(() => {
    if (!isMining) {
      setHashRate(0);
      return;
    }

    const interval = setInterval(() => {
      setHashRate(threads * 0.3 + Math.random() * 0.2);

      const messages = [
        { msg: `Scanning nonce range ${Math.floor(Math.random() * 1000000)}...`, type: "info" as const },
        { msg: `Hash rate: ${(threads * 0.3 + Math.random() * 0.2).toFixed(2)} MH/s`, type: "info" as const },
        { msg: "Validating block candidate...", type: "info" as const },
        { msg: `Connected to ${Math.floor(Math.random() * 5) + 8} peers`, type: "info" as const },
      ];

      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      setLogs((prev) => [
        { id: Date.now().toString(), message: randomMsg.msg, type: randomMsg.type, timestamp: new Date() },
        ...prev.slice(0, 49),
      ]);

      // Occasionally find a block
      if (Math.random() < 0.05) {
        setBlocksFound((prev) => prev + 1);
        setLogs((prev) => [
          { id: Date.now().toString(), message: "🎉 BLOCK FOUND! Reward: 50 CGO", type: "success", timestamp: new Date() },
          ...prev.slice(0, 49),
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMining, threads]);

  const toggleMining = () => {
    const newState = !isMining;
    setIsMining(newState);

    setLogs((prev) => [
      {
        id: Date.now().toString(),
        message: newState ? "Mining started with " + threads + " threads" : "Mining stopped",
        type: newState ? "success" : "warning",
        timestamp: new Date(),
      },
      ...prev.slice(0, 49),
    ]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Mining Console
          </h1>
          <p className="text-muted-foreground">
            Mine new blocks and earn CGO rewards
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mining Rig Visualization */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 animate-slide-in-left">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Pickaxe className="w-5 h-5 text-primary" />
              Mining Rig
            </h2>

            {/* Rig Visual */}
            <div className="relative p-8 rounded-xl bg-gradient-to-br from-muted/50 to-primary/5 border border-border/50 mb-6 overflow-hidden">
              {/* Animated background */}
              {isMining && (
                <div className="absolute inset-0 opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative grid grid-cols-3 gap-6">
                {/* GPU Units */}
                {[...Array(threads)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-300",
                      isMining
                        ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/20"
                        : "bg-muted/30 border-border/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Cpu className={cn(
                        "w-6 h-6",
                        isMining ? "text-primary animate-pulse" : "text-muted-foreground"
                      )} />
                      <span className="text-xs text-muted-foreground">GPU {i + 1}</span>
                    </div>
                    
                    {/* LED Indicator */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        isMining ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                      )} />
                      <span className="text-xs text-muted-foreground">
                        {isMining ? "Active" : "Idle"}
                      </span>
                    </div>

                    {/* Fan Animation */}
                    <div className="flex items-center gap-2">
                      <Fan className={cn(
                        "w-4 h-4 text-muted-foreground",
                        isMining && "animate-spin-slow"
                      )} />
                      <span className="text-xs text-muted-foreground">
                        {isMining ? "3200 RPM" : "0 RPM"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mining Animation Effect */}
              {isMining && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <Hash className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{hashRate.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">MH/s</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <Zap className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-muted-foreground">Difficulty</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{blocksFound}</p>
                <p className="text-xs text-muted-foreground">Blocks Found</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <Thermometer className="w-5 h-5 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{isMining ? "65°C" : "35°C"}</p>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
            </div>
          </div>

          {/* Controls & Logs */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Controls */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Controls</h3>

              {/* Thread Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Mining Threads</span>
                  <span className="font-mono text-primary">{threads}</span>
                </div>
                <Slider
                  value={[threads]}
                  onValueChange={([value]) => setThreads(value)}
                  min={1}
                  max={8}
                  step={1}
                  disabled={isMining}
                  className="w-full"
                />
              </div>

              {/* Start/Stop Button */}
              <Button
                className={cn(
                  "w-full h-12 text-lg transition-all duration-300",
                  isMining ? "bg-destructive hover:bg-destructive/90" : "glow-primary"
                )}
                onClick={toggleMining}
              >
                {isMining ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Mining
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Mining
                  </>
                )}
              </Button>

              {/* Earnings */}
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-primary">{blocksFound * 50} CGO</p>
              </div>
            </div>

            {/* Miner Logs */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Miner Logs</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-2 font-mono text-xs">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={cn(
                        "flex items-start gap-2 animate-fade-in",
                        log.type === "success" && "text-primary",
                        log.type === "warning" && "text-accent",
                        log.type === "error" && "text-destructive",
                        log.type === "info" && "text-muted-foreground"
                      )}
                    >
                      <span className="text-muted-foreground/50 flex-shrink-0">
                        [{log.timestamp.toLocaleTimeString()}]
                      </span>
                      <span className="break-all">{log.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mining;

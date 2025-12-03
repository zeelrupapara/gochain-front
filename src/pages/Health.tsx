import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Database, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  icon: typeof Cpu;
}

const Health = () => {
  const [syncProgress, setSyncProgress] = useState(98.5);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [uptime, setUptime] = useState(172800); // seconds

  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { name: "CPU Usage", value: 45, unit: "%", status: "healthy", icon: Cpu },
    { name: "Memory", value: 2.1, unit: "GB", status: "healthy", icon: Server },
    { name: "Disk Usage", value: 68, unit: "%", status: "warning", icon: HardDrive },
    { name: "Database Size", value: 1.2, unit: "GB", status: "healthy", icon: Database },
  ]);

  const [healthChecks, setHealthChecks] = useState([
    { name: "Node Connection", status: "healthy", lastCheck: Date.now() - 5000 },
    { name: "Database", status: "healthy", lastCheck: Date.now() - 10000 },
    { name: "P2P Network", status: "healthy", lastCheck: Date.now() - 15000 },
    { name: "RPC Server", status: "healthy", lastCheck: Date.now() - 8000 },
    { name: "Block Sync", status: "healthy", lastCheck: Date.now() - 3000 },
  ]);

  useEffect(() => {
    // Update uptime
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate metric fluctuations
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: m.name === "CPU Usage" 
            ? Math.min(100, Math.max(20, m.value + (Math.random() - 0.5) * 10))
            : m.name === "Memory"
            ? Math.min(8, Math.max(1, m.value + (Math.random() - 0.5) * 0.2))
            : m.value,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Chart data for activity
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: 30 + Math.random() * 50,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Node Health
            </h1>
            <p className="text-muted-foreground">
              Monitor system performance and sync status
            </p>
          </div>
          <Button variant="outline" onClick={refresh} disabled={isRefreshing}>
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Uptime */}
          <div className="glass-card rounded-xl p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Uptime</span>
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">
              {formatUptime(uptime)}
            </p>
          </div>

          {/* Sync Status */}
          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sync Status</span>
            </div>
            <p className="text-2xl font-bold text-primary">{syncProgress.toFixed(1)}%</p>
          </div>

          {/* Block Height */}
          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Block Height</span>
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">1,247</p>
          </div>

          {/* Overall Status */}
          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Status</span>
            </div>
            <p className="text-2xl font-bold text-primary">Healthy</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Metrics */}
            <div className="glass-card rounded-xl p-6 animate-slide-in-left">
              <h2 className="text-xl font-semibold text-foreground mb-6">System Metrics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {metrics.map((metric, i) => (
                  <div key={metric.name} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <metric.icon className={cn(
                          "w-4 h-4",
                          metric.status === "healthy" && "text-primary",
                          metric.status === "warning" && "text-accent",
                          metric.status === "critical" && "text-destructive"
                        )} />
                        <span className="text-sm text-muted-foreground">{metric.name}</span>
                      </div>
                      <span className="font-mono text-foreground">
                        {typeof metric.value === "number" ? metric.value.toFixed(1) : metric.value}
                        {metric.unit}
                      </span>
                    </div>
                    <Progress
                      value={metric.name.includes("Usage") || metric.name.includes("Memory") 
                        ? (metric.value / (metric.name === "Memory" ? 8 : 100)) * 100 
                        : metric.value}
                      className={cn(
                        "h-2",
                        metric.status === "healthy" && "[&>div]:bg-primary",
                        metric.status === "warning" && "[&>div]:bg-accent",
                        metric.status === "critical" && "[&>div]:bg-destructive"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="glass-card rounded-xl p-6 animate-slide-in-left" style={{ animationDelay: "200ms" }}>
              <h2 className="text-xl font-semibold text-foreground mb-6">24h Activity</h2>
              <div className="h-40 flex items-end gap-1">
                {chartData.map((point, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all duration-500 hover:from-accent hover:to-accent/50"
                    style={{ 
                      height: `${point.value}%`,
                      animationDelay: `${i * 30}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>24h ago</span>
                <span>12h ago</span>
                <span>Now</span>
              </div>
            </div>

            {/* Sync Progress */}
            <div className="glass-card rounded-xl p-6 animate-slide-in-left" style={{ animationDelay: "300ms" }}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Sync Progress</h2>
              <div className="relative">
                <Progress value={syncProgress} className="h-4 [&>div]:bg-primary" />
                <div 
                  className="absolute top-0 h-4 w-4 bg-primary rounded-full shadow-lg glow-primary animate-pulse"
                  style={{ left: `calc(${syncProgress}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-muted-foreground">Block 1,230</span>
                <span className="text-primary font-mono">{syncProgress.toFixed(1)}%</span>
                <span className="text-muted-foreground">Block 1,247</span>
              </div>
            </div>
          </div>

          {/* Health Checks */}
          <div className="glass-card rounded-xl p-6 animate-slide-in-right">
            <h2 className="text-xl font-semibold text-foreground mb-6">Health Checks</h2>
            <div className="space-y-4">
              {healthChecks.map((check, i) => (
                <div
                  key={check.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {check.status === "healthy" ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
                    )}
                    <span className="text-sm text-foreground">{check.name}</span>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    check.status === "healthy" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-destructive/10 text-destructive"
                  )}>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Last Update */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Health;

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Network as NetworkIcon, 
  Globe, 
  Signal, 
  Users,
  ArrowUpDown,
  Clock,
  Wifi,
  WifiOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Peer {
  id: string;
  address: string;
  port: number;
  latency: number;
  status: "connected" | "connecting" | "disconnected";
  version: string;
  lastSeen: number;
  blockHeight: number;
}

const generatePeers = (): Peer[] => {
  const statuses: Peer["status"][] = ["connected", "connected", "connected", "connecting", "disconnected"];
  return Array.from({ length: 12 }, (_, i) => ({
    id: `peer-${i}`,
    address: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    port: 8333 + Math.floor(Math.random() * 100),
    latency: Math.floor(Math.random() * 200) + 10,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    version: "v1.0." + Math.floor(Math.random() * 5),
    lastSeen: Date.now() - Math.floor(Math.random() * 60000),
    blockHeight: 1247 - Math.floor(Math.random() * 10),
  }));
};

const Network = () => {
  const [peers, setPeers] = useState<Peer[]>(generatePeers());
  const [networkStats, setNetworkStats] = useState({
    totalPeers: 12,
    activePeers: 9,
    avgLatency: 85,
    bandwidth: 1.2,
  });

  useEffect(() => {
    // Simulate peer updates
    const interval = setInterval(() => {
      setPeers((prev) =>
        prev.map((peer) => ({
          ...peer,
          latency: peer.status === "connected" 
            ? Math.floor(Math.random() * 200) + 10 
            : peer.latency,
          lastSeen: peer.status === "connected" ? Date.now() : peer.lastSeen,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  const connectedPeers = peers.filter((p) => p.status === "connected");
  const avgLatency = connectedPeers.length > 0
    ? Math.round(connectedPeers.reduce((sum, p) => sum + p.latency, 0) / connectedPeers.length)
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Network & Peers
          </h1>
          <p className="text-muted-foreground">
            Monitor connected nodes and network health
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Peers</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{peers.length}</p>
          </div>

          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-2">
              <Signal className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Connected</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{connectedPeers.length}</p>
          </div>

          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Avg Latency</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{avgLatency}<span className="text-lg text-muted-foreground">ms</span></p>
          </div>

          <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-2">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Bandwidth</span>
            </div>
            <p className="text-3xl font-bold text-foreground">1.2<span className="text-lg text-muted-foreground">MB/s</span></p>
          </div>
        </div>

        {/* Network Visualization */}
        <div className="glass-card rounded-xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Network Map
          </h2>

          <div className="relative h-64 md:h-80 rounded-xl bg-muted/20 border border-border/50 overflow-hidden">
            {/* Central node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center glow-primary">
                  <NetworkIcon className="w-8 h-8 text-primary" />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 animate-pulse-ring">
                  <div className="w-full h-full border-2 border-primary/50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Peer nodes */}
            {peers.slice(0, 8).map((peer, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={peer.id}
                  className="absolute top-1/2 left-1/2 transition-all duration-500"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: radius,
                      height: 2,
                      transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                      transformOrigin: "0 50%",
                    }}
                  >
                    <line
                      x1="0"
                      y1="1"
                      x2={radius}
                      y2="1"
                      stroke={peer.status === "connected" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                      strokeWidth="1"
                      strokeDasharray={peer.status === "connecting" ? "4 4" : "none"}
                      className={cn(peer.status === "connecting" && "animate-pulse")}
                    />
                  </svg>

                  {/* Peer node */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      peer.status === "connected" && "bg-primary/20 border border-primary",
                      peer.status === "connecting" && "bg-accent/20 border border-accent animate-pulse",
                      peer.status === "disconnected" && "bg-muted/50 border border-muted-foreground/30"
                    )}
                  >
                    {peer.status === "connected" ? (
                      <Wifi className="w-4 h-4 text-primary" />
                    ) : peer.status === "connecting" ? (
                      <Wifi className="w-4 h-4 text-accent" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peers List */}
        <div className="glass-card rounded-xl overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-border/50">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Connected Peers
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left">
                  <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Address</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Latency</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Block Height</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Version</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {peers.map((peer, i) => (
                  <tr
                    key={peer.id}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          peer.status === "connected" && "bg-primary",
                          peer.status === "connecting" && "bg-accent animate-pulse",
                          peer.status === "disconnected" && "bg-muted-foreground/30"
                        )} />
                        <span className={cn(
                          "text-sm capitalize",
                          peer.status === "connected" && "text-primary",
                          peer.status === "connecting" && "text-accent",
                          peer.status === "disconnected" && "text-muted-foreground"
                        )}>
                          {peer.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm text-foreground">
                      {peer.address}:{peer.port}
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-sm font-mono",
                        peer.latency < 50 && "text-primary",
                        peer.latency >= 50 && peer.latency < 100 && "text-accent",
                        peer.latency >= 100 && "text-destructive"
                      )}>
                        {peer.latency}ms
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-foreground">
                      #{peer.blockHeight}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {peer.version}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatTime(peer.lastSeen)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Network;

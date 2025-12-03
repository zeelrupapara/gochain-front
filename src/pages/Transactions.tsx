import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  ArrowRight, 
  Clock,
  Plus,
  Play,
  Pause
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: "pending" | "confirmed";
  blockHeight?: number;
}

const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    hash: "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    from: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    to: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    amount: Math.random() * 10,
    timestamp: Date.now() - i * 15000,
    status: i < 5 ? "pending" : "confirmed",
    blockHeight: i >= 5 ? 1247 - Math.floor(i / 3) : undefined,
  }));
};

// Particle animation component
const ParticleBackground = ({ isPlaying }: { isPlaying: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      });
    }

    let animationId: number;

    const animate = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 209, 193, 0.3)";
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 209, 193, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const Transactions = () => {
  const [transactions] = useState<Transaction[]>(generateTransactions(30));
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("all");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" || tx.status === filter;
    return matchesSearch && matchesFilter;
  });

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <ParticleBackground isPlaying={isAnimationPlaying} />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Transactions
                </h1>
                <p className="text-muted-foreground">
                  View all transactions on the network
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAnimationPlaying(!isAnimationPlaying)}
                  title={isAnimationPlaying ? "Pause animation" : "Play animation"}
                >
                  {isAnimationPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Link to="/transactions/create">
                  <Button className="glow-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Transaction
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by hash, from, or to address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/30 border-border/50"
                />
              </div>

              <div className="flex gap-2">
                {(["all", "pending", "confirmed"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className={cn(
                      filter === f && "glow-primary"
                    )}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((tx, index) => (
              <Link
                key={tx.hash}
                to={`/transactions/${tx.hash}`}
                className={cn(
                  "glass-card rounded-xl p-4 block transition-all duration-300 hover:scale-[1.01] hover:border-primary/50 animate-fade-in group"
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      tx.status === "pending" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-primary/10 text-primary"
                    )}>
                      <ArrowLeftRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground truncate max-w-[200px] md:max-w-[400px]">
                        {tx.hash}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(tx.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      {tx.amount.toFixed(4)} <span className="text-primary">CGO</span>
                    </p>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      tx.status === "pending"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    )}>
                      {tx.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-xs text-muted-foreground truncate max-w-[120px]">
                    {tx.from}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono text-xs text-muted-foreground truncate max-w-[120px]">
                    {tx.to}
                  </span>
                  {tx.blockHeight && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Block #{tx.blockHeight}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
